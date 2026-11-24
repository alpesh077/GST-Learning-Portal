// GST Registration practice form UI — delegates validation to app.js
(function () {
    function setFieldError(errorEl, message, hasError) {
        app.showInlineError(errorEl, message, hasError);
    }

    function validateForm() {
        const panEl = document.getElementById('pan');
        const businessNameEl = document.getElementById('businessName');
        const stateEl = document.getElementById('state');
        const businessTypeEl = document.getElementById('businessType');

        const result = app.validatePracticeRegistration({
            pan: panEl ? panEl.value : '',
            businessName: businessNameEl ? businessNameEl.value : '',
            state: stateEl ? stateEl.value : '',
            businessType: businessTypeEl ? businessTypeEl.value : ''
        });

        setFieldError(document.getElementById('panError'), result.errors && result.errors.pan ? result.errors.pan : 'PAN must be 10 characters', !!(result.errors && result.errors.pan));
        setFieldError(document.getElementById('nameError'), result.errors && result.errors.businessName ? result.errors.businessName : 'Business name is required', !!(result.errors && result.errors.businessName));
        setFieldError(document.getElementById('stateError'), result.errors && result.errors.state ? result.errors.state : 'Please select a state', !!(result.errors && result.errors.state));
        setFieldError(document.getElementById('typeError'), result.errors && result.errors.businessType ? result.errors.businessType : 'Please select business type', !!(result.errors && result.errors.businessType));

        return result.valid === true;
    }

    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('registrationForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateForm()) {
                app.showSuccessMessage(document.getElementById('successMsg'), true);
            } else {
                app.showSuccessMessage(document.getElementById('successMsg'), false);
            }
        });
    });
})();
