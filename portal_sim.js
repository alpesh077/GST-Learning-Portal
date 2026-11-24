// js/portal_sim.js
// Mock Government GST Portal Controller
// Simulates the exact workflow of the Indian GST Portal (www.gst.gov.in)

(function () {
    // 1. Initial State
    let portalState = {
        isAuthenticated: false,
        activeTab: 'overview', // overview, returns, services, notices, downloads, tracker
        taxpayer: {
            legalName: "Apex Trading Corp",
            tradeName: "Apex Retailers",
            gstin: "27AAAPC1018J1ZR",
            pan: "AAAPC1018J",
            constitution: "Proprietorship",
            effectiveDate: "01/07/2026",
            address: "101 Corporate Park, Bandra, Mumbai, Maharashtra - 400051",
            stateCode: "27",
            status: "Active"
        },
        ledgers: {
            cash: 45000.00,
            credit: 124300.00,
            liability: 0.00
        },
        applications: [
            { arn: "ARN-2026-REG-9872", type: "New Registration", date: "2026-07-02", status: "Approved" },
            { arn: "ARN-2026-AMD-1154", type: "Core Field Amendment", date: "2026-08-01", status: "Under Verification" },
            { arn: "ARN-2026-RFD-3302", type: "Refund Claim (RFD-01)", date: "2026-08-06", status: "Submitted" }
        ],
        notices: [
            { id: "NT-2026-001", type: "Registration Clarification", date: "2026-07-03", subject: "Clarification on Principal Place of Business", status: "Resolved", dueDate: "2026-07-10", body: "Please upload a valid electricity bill matching the owner name listed in PAN." },
            { id: "NT-2026-002", type: "ITC Mismatch (GSTR-2B vs 3B)", date: "2026-08-02", subject: "Discrepancy in Input Tax Credit claimed", status: "Pending Reply", dueDate: "2026-08-15", body: "It is noticed that the ITC claimed in GSTR-3B exceeds the auto-populated credit in GSTR-2B by Rs. 24,000. Show cause why this shouldn't be recovered with interest." }
        ],
        returns: {
            "GSTR-1": { period: "July 2026", status: "Filed", date: "2026-08-10", arn: "RT-R1-8827361" },
            "GSTR-3B": { period: "July 2026", status: "Filed", date: "2026-08-18", arn: "RT-3B-9918273" },
            "CMP-08": { period: "Q1 2026-27", status: "Not Applicable", date: "-", arn: "-" },
            "GSTR-9": { period: "FY 2025-26", status: "Pending", date: "-", arn: "-" }
        }
    };

    // 2. DOM elements and initial setup
    document.addEventListener('DOMContentLoaded', () => {
        initPortalView();
        setupEventListeners();
    });

    function initPortalView() {
        // Clear login form fields
        const loginUser = document.getElementById('portal-username');
        if (loginUser) loginUser.value = '27AAAPC1018J1ZR';
        const loginPass = document.getElementById('portal-password');
        if (loginPass) loginPass.value = '********';

        // Check active session
        const savedSession = localStorage.getItem('gst_portal_session');
        if (savedSession === 'active') {
            portalState.isAuthenticated = true;
            showAuthenticatedView();
        } else {
            portalState.isAuthenticated = false;
            showPublicView();
        }
        renderApplicationTracker();
    }

    function setupEventListeners() {
        // Public Home Links
        document.getElementById('portal-nav-login')?.addEventListener('click', showLoginScreen);
        document.getElementById('portal-btn-login-main')?.addEventListener('click', showLoginScreen);
        document.getElementById('portal-nav-home')?.addEventListener('click', showPublicView);
        document.getElementById('portal-logo-link')?.addEventListener('click', showPublicView);

        // Submit Login Form
        document.getElementById('portal-login-submit')?.addEventListener('click', handlePortalLoginSubmit);
        document.getElementById('otp-verify-submit')?.addEventListener('click', handleOtpSubmit);
        document.getElementById('portal-logout')?.addEventListener('click', handlePortalLogout);

        // Tracking Form (Public)
        document.getElementById('track-arn-btn')?.addEventListener('click', handlePublicTracking);

        // Return Filing Forms
        document.getElementById('file-return-select')?.addEventListener('change', handleReturnFormToggle);
        document.getElementById('return-calculate-btn')?.addEventListener('click', handleReturnCalculations);
        document.getElementById('return-submit-btn')?.addEventListener('click', handleReturnFilingSubmit);

        // Amendment Form
        document.getElementById('amend-submit-btn')?.addEventListener('click', handleAmendmentSubmit);

        // Notice Reply Form
        document.getElementById('notice-reply-submit')?.addEventListener('click', handleNoticeReplySubmit);
    }

    // 3. UI State Transition Helpers
    function showPublicView() {
        document.getElementById('portal-public-home').classList.remove('hidden');
        document.getElementById('portal-login-screen').classList.add('hidden');
        document.getElementById('portal-auth-dashboard').classList.add('hidden');
        document.getElementById('portal-otp-screen').classList.add('hidden');
    }

    function showLoginScreen() {
        document.getElementById('portal-public-home').classList.add('hidden');
        document.getElementById('portal-login-screen').classList.remove('hidden');
        document.getElementById('portal-auth-dashboard').classList.add('hidden');
        document.getElementById('portal-otp-screen').classList.add('hidden');
        // Generate random captcha
        generateCaptcha();
    }

    function showAuthenticatedView() {
        document.getElementById('portal-public-home').classList.add('hidden');
        document.getElementById('portal-login-screen').classList.add('hidden');
        document.getElementById('portal-otp-screen').classList.add('hidden');
        document.getElementById('portal-auth-dashboard').classList.remove('hidden');

        // Render dashboard values
        renderDashboardData();
        switchPortalTab('overview');
    }

    // 4. Captcha generator
    function generateCaptcha() {
        const captchaBox = document.getElementById('portal-captcha-img');
        if (!captchaBox) return;
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 5; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaBox.textContent = code;
        captchaBox.dataset.val = code;
    }

    // 5. Auth Handlers
    function handlePortalLoginSubmit(e) {
        e.preventDefault();
        const user = document.getElementById('portal-username').value.trim();
        const pass = document.getElementById('portal-password').value;
        const captchaInput = document.getElementById('portal-captcha-input').value.trim().toUpperCase();
        const captchaCorrect = document.getElementById('portal-captcha-img').dataset.val;

        if (!user || !pass) {
            alert("Please enter Username/GSTIN and Password.");
            return;
        }

        if (captchaInput !== captchaCorrect) {
            alert("Incorrect captcha code. Please try again.");
            generateCaptcha();
            return;
        }

        // Transition to OTP screen
        document.getElementById('portal-login-screen').classList.add('hidden');
        document.getElementById('portal-otp-screen').classList.remove('hidden');
        
        // Auto-fill mock OTP
        document.getElementById('portal-otp-input').value = '123456';
    }

    function handleOtpSubmit(e) {
        e.preventDefault();
        const otpVal = document.getElementById('portal-otp-input').value.trim();
        if (otpVal === '123456') {
            portalState.isAuthenticated = true;
            localStorage.setItem('gst_portal_session', 'active');
            showAuthenticatedView();
        } else {
            alert("Invalid OTP code. Use standard test OTP '123456'.");
        }
    }

    function handlePortalLogout() {
        portalState.isAuthenticated = false;
        localStorage.removeItem('gst_portal_session');
        showPublicView();
    }

    // 6. Dashboard Renderers
    function renderDashboardData() {
        // Set Profile titles
        document.getElementById('dash-profile-name').textContent = portalState.taxpayer.legalName;
        document.getElementById('dash-profile-gstin').textContent = portalState.taxpayer.gstin;
        document.getElementById('dash-profile-constitution').textContent = portalState.taxpayer.constitution;
        document.getElementById('dash-profile-address').textContent = portalState.taxpayer.address;

        // Ledger balances
        document.getElementById('lbl-cash-bal').textContent = formatINR(portalState.ledgers.cash);
        document.getElementById('lbl-credit-bal').textContent = formatINR(portalState.ledgers.credit);
        document.getElementById('lbl-liability-bal').textContent = formatINR(portalState.ledgers.liability);

        // Application history list
        renderApplicationTracker();

        // Notices list
        renderNoticesList();

        // Returns history
        renderReturnsHistory();
    }

    function renderApplicationTracker() {
        const list = document.getElementById('track-list-body');
        if (!list) return;

        list.innerHTML = '';
        portalState.applications.forEach(app => {
            const tr = document.createElement('tr');
            tr.className = "border-b text-xs";
            
            let statusColor = "text-slate-500 bg-slate-100";
            if (app.status === 'Approved') statusColor = "text-emerald-700 bg-emerald-50 border-emerald-200 border";
            if (app.status === 'Under Verification') statusColor = "text-blue-700 bg-blue-50 border-blue-200 border";
            if (app.status === 'Submitted') statusColor = "text-amber-700 bg-amber-50 border-amber-200 border";

            tr.innerHTML = `
                <td class="p-3 font-mono font-bold">${app.arn}</td>
                <td class="p-3">${app.type}</td>
                <td class="p-3 font-mono">${app.date}</td>
                <td class="p-3"><span class="px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${statusColor}">${app.status}</span></td>
                <td class="p-3"><button class="text-blue-600 font-bold hover:underline" onclick="downloadPortalAck('${app.arn}', '${app.type}', '${app.date}')">💾 Receipt</button></td>
            `;
            list.appendChild(tr);
        });
    }

    function renderNoticesList() {
        const container = document.getElementById('dash-notices-container');
        if (!container) return;

        container.innerHTML = '';
        portalState.notices.forEach(nt => {
            const card = document.createElement('div');
            card.className = "p-4 border rounded-xl bg-slate-50 flex flex-col justify-between gap-3 shadow-sm hover:shadow transition duration-150";

            let tag = `<span class="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full w-max">${nt.status}</span>`;
            if (nt.status === 'Resolved') {
                tag = `<span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full w-max">${nt.status}</span>`;
            }

            card.innerHTML = `
                <div class="space-y-1">
                    <div class="flex justify-between items-start">
                        <span class="text-[10px] font-mono text-slate-400 font-semibold">${nt.id} | Issued: ${nt.date}</span>
                        ${tag}
                    </div>
                    <h4 class="text-sm font-extrabold text-slate-800">${nt.type}</h4>
                    <p class="text-xs font-semibold text-blue-900 mb-1">Subject: ${nt.subject}</p>
                    <p class="text-xs text-slate-600 leading-relaxed font-mono bg-white p-2.5 border rounded-lg">${nt.body}</p>
                </div>
                <div class="flex justify-between items-center mt-2 border-t pt-2.5">
                    <span class="text-[10px] text-rose-700 font-bold">Due Date: ${nt.dueDate}</span>
                    ${nt.status === 'Pending Reply' ? `<button class="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-lg shadow-sm" onclick="openNoticeReplyForm('${nt.id}', '${nt.subject}')">Draft Reply</button>` : `<span class="text-[10px] text-emerald-600 font-semibold">Reply Filed</span>`}
                </div>
            `;
            container.appendChild(card);
        });
    }

    function renderReturnsHistory() {
        const body = document.getElementById('dash-returns-body');
        if (!body) return;

        body.innerHTML = '';
        Object.keys(portalState.returns).forEach(key => {
            const ret = portalState.returns[key];
            const tr = document.createElement('tr');
            tr.className = "border-b text-xs";
            
            let statusColor = "text-slate-500 bg-slate-50";
            if (ret.status === 'Filed') statusColor = "text-emerald-700 bg-emerald-50 border border-emerald-200";
            if (ret.status === 'Pending') statusColor = "text-rose-700 bg-rose-50 border border-rose-200";

            tr.innerHTML = `
                <td class="p-3 font-bold text-slate-800">${key}</td>
                <td class="p-3">${ret.period}</td>
                <td class="p-3"><span class="px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${statusColor}">${ret.status}</span></td>
                <td class="p-3 font-mono">${ret.date}</td>
                <td class="p-3 font-mono font-semibold text-slate-500">${ret.arn}</td>
            `;
            body.appendChild(tr);
        });
    }

    // 7. Tab switcher
    window.switchPortalTab = function (tabId) {
        portalState.activeTab = tabId;
        document.querySelectorAll('.portal-tab-btn').forEach(btn => {
            btn.classList.remove('border-blue-600', 'text-blue-700', 'font-bold');
            btn.classList.add('border-transparent', 'text-slate-500');
        });
        document.getElementById(`tab-link-${tabId}`).classList.add('border-blue-600', 'text-blue-700', 'font-bold');

        document.getElementById('portal-pane-overview').classList.add('hidden');
        document.getElementById('portal-pane-returns').classList.add('hidden');
        document.getElementById('portal-pane-services').classList.add('hidden');
        document.getElementById('portal-pane-notices').classList.add('hidden');
        document.getElementById('portal-pane-downloads').classList.add('hidden');
        document.getElementById('portal-pane-tracker').classList.add('hidden');

        document.getElementById(`portal-pane-${tabId}`).classList.remove('hidden');

        if (tabId === 'downloads') {
            renderCertificateView();
        }
    };

    // 8. Public Tracker Handler
    function handlePublicTracking() {
        const arnInput = document.getElementById('track-arn-input').value.trim();
        const box = document.getElementById('track-result-box');
        if (!arnInput) {
            alert("Please enter a valid Application Reference Number (ARN).");
            return;
        }

        // Search in state
        const app = portalState.applications.find(a => a.arn.toUpperCase() === arnInput.toUpperCase());
        box.classList.remove('hidden');
        
        if (app) {
            box.innerHTML = `
                <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1.5 font-mono text-xs text-emerald-900">
                    <p class="font-bold">ARN Matches: Found</p>
                    <p>Application Type: ${app.type}</p>
                    <p>Submission Date: ${app.date}</p>
                    <p class="font-semibold text-sm">Current Status: <span class="bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">${app.status}</span></p>
                </div>
            `;
        } else {
            box.innerHTML = `
                <div class="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs font-mono text-rose-900">
                    <p class="font-bold">ARN Mismatch: Not Found</p>
                    <p>Please check your 15-character ARN code and try again.</p>
                </div>
            `;
        }
    }

    // 9. Returns Filing Calculation & Handler
    function handleReturnFormToggle() {
        const type = document.getElementById('file-return-select').value;
        const detailsDiv = document.getElementById('return-form-fields');
        if (!type) {
            detailsDiv.classList.add('hidden');
            return;
        }
        detailsDiv.classList.remove('hidden');
        
        // Update labels based on return types
        const labelTaxable = document.getElementById('lbl-ret-taxable');
        const labelRate = document.getElementById('lbl-ret-rate');
        
        if (type === 'GSTR-1' || type === 'GSTR-3B') {
            labelTaxable.textContent = "Total Taxable Sales / Supplies Value (INR) *";
            labelRate.textContent = "GST Rate Applicable (%) *";
            document.getElementById('ret-inputs-div').classList.remove('hidden');
        } else if (type === 'CMP-08') {
            labelTaxable.textContent = "Aggregate Quarter Turnover (INR) *";
            labelRate.textContent = "Composition Tax Rate (%) *";
            document.getElementById('ret-inputs-div').classList.remove('hidden');
        } else {
            document.getElementById('ret-inputs-div').classList.add('hidden');
        }
    }

    function handleReturnCalculations() {
        const taxable = Number(document.getElementById('ret-taxable-val').value) || 0;
        const rate = Number(document.getElementById('ret-tax-rate').value) || 0;
        
        const cgst = (taxable * rate) / 200;
        const sgst = (taxable * rate) / 200;
        const totalTax = cgst + sgst;

        document.getElementById('calc-output-cgst').textContent = formatINR(cgst);
        document.getElementById('calc-output-sgst').textContent = formatINR(sgst);
        document.getElementById('calc-output-total').textContent = formatINR(totalTax);

        // Store temp calculations in dataset
        const calcBox = document.getElementById('calc-result-summary');
        calcBox.classList.remove('hidden');
        calcBox.dataset.taxable = taxable;
        calcBox.dataset.rate = rate;
        calcBox.dataset.cgst = cgst;
        calcBox.dataset.sgst = sgst;
        calcBox.dataset.total = totalTax;
    }

    function handleReturnFilingSubmit() {
        const type = document.getElementById('file-return-select').value;
        const period = document.getElementById('file-return-period').value;
        const calcBox = document.getElementById('calc-result-summary');

        if (!type || !period) {
            alert("Please select Return Type and Period.");
            return;
        }

        if (calcBox.classList.contains('hidden') && type !== 'GSTR-9') {
            alert("Please calculate liability before submitting.");
            return;
        }

        // Add to return state
        const randomArn = 'RT-' + type.replace('-', '') + '-' + Math.floor(1000000 + Math.random() * 9000000);
        const today = new Date().toISOString().split('T')[0];

        portalState.returns[type] = {
            period: period,
            status: "Filed",
            date: today,
            arn: randomArn
        };

        // Reset inputs
        document.getElementById('file-return-select').value = '';
        document.getElementById('return-form-fields').classList.add('hidden');
        calcBox.classList.add('hidden');

        // Refresh lists
        renderReturnsHistory();
        alert(`Success! Form ${type} for period ${period} filed successfully. ARN Reference: ${randomArn}`);
    }

    // 10. Amendment Submission
    function handleAmendmentSubmit(e) {
        e.preventDefault();
        const tradeName = document.getElementById('amend-trade-name').value.trim();
        const address = document.getElementById('amend-address').value.trim();
        const mobile = document.getElementById('amend-mobile').value.trim();

        if (!tradeName && !address && !mobile) {
            alert("Please edit at least one field to submit amendment.");
            return;
        }

        // Update taxpayer state conditionally
        if (tradeName) portalState.taxpayer.tradeName = tradeName;
        if (address) portalState.taxpayer.address = address;

        const newArn = 'ARN-2026-AMD-' + Math.floor(1000 + Math.random() * 9000);
        const today = new Date().toISOString().split('T')[0];

        portalState.applications.push({
            arn: newArn,
            type: "Core Field Amendment",
            date: today,
            status: "Approved" // Automatically approved in mock environment
        });

        // Clear inputs
        document.getElementById('amend-trade-name').value = '';
        document.getElementById('amend-address').value = '';
        document.getElementById('amend-mobile').value = '';

        renderDashboardData();
        alert(`Core Field Amendment approved immediately! GST Certificate updated. ARN Code: ${newArn}`);
    }

    // 11. Notice Reply Drafting & Submission
    window.openNoticeReplyForm = function (noticeId, noticeSubject) {
        const block = document.getElementById('notice-reply-block');
        block.classList.remove('hidden');
        document.getElementById('reply-notice-id').textContent = noticeId;
        document.getElementById('reply-notice-subject').textContent = noticeSubject;
        document.getElementById('notice-reply-text').value = '';
        block.scrollIntoView({ behavior: 'smooth' });
    };

    function handleNoticeReplySubmit() {
        const noticeId = document.getElementById('reply-notice-id').textContent;
        const text = document.getElementById('notice-reply-text').value.trim();

        if (!text) {
            alert("Please enter a reply description statement.");
            return;
        }

        // Find notice in state and update status
        const notice = portalState.notices.find(n => n.id === noticeId);
        if (notice) {
            notice.status = "Resolved";
        }

        // Add tracking entry
        const rplArn = 'ARN-2026-RPL-' + Math.floor(1000 + Math.random() * 9000);
        const today = new Date().toISOString().split('T')[0];
        portalState.applications.push({
            arn: rplArn,
            type: `Reply to Notice (${noticeId})`,
            date: today,
            status: "Submitted"
        });

        document.getElementById('notice-reply-block').classList.add('hidden');
        renderDashboardData();
        alert(`Clarification Statement filed successfully under Reference Code: ${rplArn}`);
    }

    // 12. Certificate Rendering & Printing
    function renderCertificateView() {
        document.getElementById('cert-legal-name').textContent = portalState.taxpayer.legalName;
        document.getElementById('cert-trade-name').textContent = portalState.taxpayer.tradeName || '-';
        document.getElementById('cert-constitution').textContent = portalState.taxpayer.constitution;
        document.getElementById('cert-address').textContent = portalState.taxpayer.address;
        document.getElementById('cert-effective-date').textContent = portalState.taxpayer.effectiveDate;
        document.getElementById('cert-gstin').textContent = portalState.taxpayer.gstin;
    }

    window.printPortalCertificate = function () {
        window.print();
    };

    window.downloadPortalAck = function (arn, type, date) {
        alert(`Downloading Acknowledgement Receipt PDF for ${arn} (${type})...\nStatus: Verified.`);
    };

    // 13. Indian Rupee Formatter Utility
    function formatINR(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    }
})();
