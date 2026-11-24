// Central app logic: auth, validation, calculations, and UI helpers
(function () {
    const ALLOWED_RATES = [5, 12, 18, 28];
    const PUBLIC_PAGES = new Set([
        'index.html', 'blog.html', 'income_tax.html', 'about.html', 'services.html', 'gst-laws.html', 'downloads.html',
        'search.html', 'help.html', 'einvoice.html', 'news.html', 'contact.html', 'register.html',
        'gst_registration.html', 'case-studies.html', 'practice-labs.html', 'ai-tutor.html', 'simulator.html',
        'chapter-1.html', 'chapter-2.html', 'chapter-3.html', 'chapter-4.html',
        'chapter-5.html', 'chapter-6.html', 'chapter-7.html', ''
    ]);

    const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const MOBILE_REGEX = /^[6-9][0-9]{9}$/;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    // -------------------------------------------------------------------------
    // Auth
    // -------------------------------------------------------------------------
    function requireAuth() {
        const path = location.pathname.split('/').pop();
        if (path === 'login.html' || PUBLIC_PAGES.has(path)) return;
        const token = localStorage.getItem('gst_token');
        if (!token) location.href = 'login.html';
    }

    function logout() {
        localStorage.removeItem('gst_token');
        localStorage.removeItem('gstUser');
        location.href = 'login.html';
    }

    // -------------------------------------------------------------------------
    // Validation
    // -------------------------------------------------------------------------
    function normalizePAN(pan) {
        return (pan || '').trim().toUpperCase();
    }

    function validatePAN(pan) {
        const value = normalizePAN(pan);
        if (!value) return { valid: false, error: 'PAN is required.' };
        if (!PAN_REGEX.test(value)) return { valid: false, error: 'Invalid PAN format. Expected: AAAAA9999A' };
        return { valid: true, value };
    }

    function validateGSTIN(gstin) {
        const value = (gstin || '').trim().toUpperCase();
        if (!value) return { valid: false, error: 'GSTIN is required.' };
        if (value.length !== 15) return { valid: false, error: 'GSTIN must be 15 characters.' };
        if (!GSTIN_REGEX.test(value)) return { valid: false, error: 'Invalid GSTIN format.' };
        return { valid: true, value, stateCode: value.substring(0, 2) };
    }

    function validateMobile(mobile) {
        const value = (mobile || '').trim();
        if (!value) return { valid: false, error: 'Mobile number is required.' };
        if (!MOBILE_REGEX.test(value)) {
            return { valid: false, error: 'Invalid mobile number. Enter a valid 10-digit number starting with 6-9.' };
        }
        return { valid: true, value };
    }

    function validateEmail(email) {
        const value = (email || '').trim();
        if (!value) return { valid: false, error: 'Email is required.' };
        if (!EMAIL_REGEX.test(value)) return { valid: false, error: 'Enter a valid email address.' };
        return { valid: true, value };
    }

    function validateNumeric(value, options) {
        options = options || {};
        const num = Number(value);
        if (isNaN(num)) return { valid: false, error: options.error || 'Enter a valid number.' };
        if (options.min !== undefined && num < options.min) {
            return { valid: false, error: options.minError || ('Value must be at least ' + options.min + '.') };
        }
        if (options.max !== undefined && num > options.max) {
            return { valid: false, error: options.maxError || ('Value must be at most ' + options.max + '.') };
        }
        return { valid: true, value: num };
    }

    function validateRequired(value, fieldLabel) {
        const trimmed = (value || '').toString().trim();
        if (!trimmed) return { valid: false, error: (fieldLabel || 'This field') + ' is required.' };
        return { valid: true, value: trimmed };
    }

    function validateRegistration(pan, name, businessPan, mobileNumber, address) {
        const errors = {};
        const panResult = validatePAN(pan);
        if (!panResult.valid) errors.pan = panResult.error;

        const nameResult = validateRequired(name, 'Business name');
        if (!nameResult.valid) errors.name = 'Business name should be at least 3 characters.';
        else if (nameResult.value.length < 3) errors.name = 'Business name should be at least 3 characters.';

        if (businessPan) {
            const businessPanResult = validatePAN(businessPan);
            if (!businessPanResult.valid) errors.businessPan = 'Invalid Business PAN format. Expected: AAAAA9999A';
        }

        const mobileResult = validateMobile(mobileNumber);
        if (!mobileResult.valid) errors.mobileNumber = mobileResult.error;

        const addressResult = validateRequired(address, 'Address');
        if (!addressResult.valid) errors.address = 'Address should be at least 10 characters long.';
        else if (addressResult.value.length < 10) errors.address = 'Address should be at least 10 characters long.';

        if (Object.keys(errors).length) return { errors };
        return { valid: true };
    }

    function validatePracticeRegistration(fields) {
        const errors = {};
        fields = fields || {};

        const panResult = validatePAN(fields.pan);
        if (!panResult.valid) errors.pan = panResult.error;

        const nameResult = validateRequired(fields.businessName, 'Business name');
        if (!nameResult.valid) errors.businessName = 'Business name is required';

        const stateResult = validateRequired(fields.state, 'State');
        if (!stateResult.valid) errors.state = 'Please select a state';

        const typeResult = validateRequired(fields.businessType, 'Business type');
        if (!typeResult.valid) errors.businessType = 'Please select business type';

        if (Object.keys(errors).length) return { errors };
        return { valid: true };
    }

    // -------------------------------------------------------------------------
    // GST calculations (single source of truth)
    // -------------------------------------------------------------------------
    function calculateInvoiceTaxes(params) {
        params = params || {};
        const seller = params.seller || '';
        const customer = params.customer || '';
        const taxable = Number(params.taxable) || 0;
        const rate = Number(params.rate) || 0;
        const validate = params.validate === true;

        if (validate) {
            const errors = {};
            if (isNaN(Number(params.taxable)) || taxable <= 0) {
                errors.taxable = 'Enter a taxable value greater than 0.';
            }
            if (!ALLOWED_RATES.includes(rate)) {
                errors.gstRate = 'Select a valid GST rate.';
            }
            if (Object.keys(errors).length) return { errors };
        }

        const taxAmount = roundAmount((taxable * rate) / 100);
        let cgst = 0;
        let sgst = 0;
        let igst = 0;
        const isIntraState = seller === customer && seller !== '' && customer !== '';

        if (isIntraState) {
            cgst = roundAmount(taxAmount / 2);
            sgst = roundAmount(taxAmount / 2);
        } else {
            igst = taxAmount;
        }

        const totalInvoice = roundAmount(taxable + taxAmount);
        return {
            cgst,
            sgst,
            igst,
            taxAmount,
            totalTax: taxAmount,
            totalInvoice
        };
    }

    function calculateNetTax(output, input, options) {
        options = options || {};
        const validate = options.validate !== false;

        if (validate) {
            const errors = {};
            const outputResult = validateNumeric(output, { min: 0, error: 'Enter a valid non-negative number.' });
            const inputResult = validateNumeric(input, { min: 0, error: 'Enter a valid non-negative number.' });
            if (!outputResult.valid) errors.output = outputResult.error;
            if (!inputResult.valid) errors.input = inputResult.error;
            if (Object.keys(errors).length) return { errors };
        }

        const net = roundAmount(Number(output) - Number(input));
        let message = '';
        let status = '';

        if (net > 0) {
            message = 'Net Tax Payable: You must remit this amount to the government.';
            status = 'payable';
        } else if (net === 0) {
            message = 'Nil tax: No payment required for this period.';
            status = 'nil';
        } else {
            message = 'Excess ITC - Carry Forward (input tax exceeds output tax).';
            status = 'credit';
        }

        return { net, message, status };
    }

    // -------------------------------------------------------------------------
    // Utilities
    // -------------------------------------------------------------------------
    function roundAmount(amount) {
        return Math.round((Number(amount) || 0) * 100) / 100;
    }

    function formatINR(amount) {
        return 'Rs. ' + roundAmount(amount).toFixed(2);
    }

    function formatNumber(amount, decimals) {
        decimals = decimals === undefined ? 2 : decimals;
        return roundAmount(amount).toFixed(decimals);
    }

    function formatPercent(value, decimals) {
        decimals = decimals === undefined ? 0 : decimals;
        return roundAmount(value).toFixed(decimals) + '%';
    }

    function formatDate(dateInput) {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    function calculatePercent(part, total) {
        if (!total) return 0;
        return roundAmount((part / total) * 100);
    }

    // -------------------------------------------------------------------------
    // UI helpers
    // -------------------------------------------------------------------------
    function showFieldError(fieldEl, message) {
        if (!fieldEl) return;
        fieldEl.classList.add('border-red-500');
        let hint = fieldEl.nextElementSibling;
        if (!hint || !hint.classList || !hint.classList.contains('field-error')) {
            hint = document.createElement('div');
            hint.className = 'field-error text-sm text-red-600 mt-1';
            fieldEl.parentNode.insertBefore(hint, fieldEl.nextSibling);
        }
        hint.textContent = message;
    }

    function clearFieldError(fieldEl) {
        if (!fieldEl) return;
        fieldEl.classList.remove('border-red-500');
        let hint = fieldEl.nextElementSibling;
        if (hint && hint.classList && hint.classList.contains('field-error')) hint.remove();
    }

    function showInlineError(errorEl, message, show) {
        if (!errorEl) return;
        if (show) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
        } else {
            errorEl.classList.add('hidden');
        }
    }

    function showSuccessMessage(messageEl, show) {
        if (!messageEl) return;
        if (show) messageEl.classList.remove('hidden');
        else messageEl.classList.add('hidden');
    }

    window.app = {
        ALLOWED_RATES,
        requireAuth,
        logout,
        validatePAN,
        validateGSTIN,
        validateMobile,
        validateEmail,
        validateNumeric,
        validateRequired,
        validateRegistration,
        validatePracticeRegistration,
        calculateInvoiceTaxes,
        calculateNetTax,
        roundAmount,
        formatINR,
        formatNumber,
        formatPercent,
        formatDate,
        calculatePercent,
        showFieldError,
        clearFieldError,
        showInlineError,
        showSuccessMessage
    };

    try {
        if (document && location) requireAuth();
    } catch (e) {}
})();
