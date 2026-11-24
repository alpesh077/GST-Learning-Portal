// js/income_tax.js
(function () {
    // Current Active Case data
    const CASES = {
        C1: {
            name: "Riya Sharma",
            pan: "BPRS8840A",
            aadhaar: "584739201049",
            basic: 600000,
            hra: 180000,
            specialAllowance: 60000,
            rentPaid: 120000,
            isMetro: true,
            otherIncome: 12000,
            sec80c: 40000, // LIC
            sec80d: 15000, // Mediclaim
            description: "Riya is a software developer in Mumbai. She receives Rs. 6,00,000 Basic Salary, Rs. 1,80,000 HRA, and Rs. 60,000 Special Allowance. She pays Rs. 10,000 monthly rent (Rs. 1,20,000 annually) for an apartment in Mumbai. She also has Rs. 12,000 interest from savings bank accounts, and has invested Rs. 40,000 in LIC policies and Rs. 15,000 in health insurance."
        },
        C2: {
            name: "Amit Patel",
            pan: "CPRA9214B",
            aadhaar: "837492018473",
            basic: 900000,
            hra: 240000,
            specialAllowance: 110000,
            rentPaid: 216000,
            isMetro: false, // Pune
            otherIncome: 8500,
            sec80c: 150000, // PPF
            sec80d: 25000, // Health
            description: "Amit works in Pune. He receives Rs. 9,00,000 Basic Salary, Rs. 2,40,000 HRA, and Rs. 1,10,000 Special Allowance. He pays Rs. 18,000 monthly rent (Rs. 2,16,000 annually). He earned Rs. 8,500 bank interest. He invested Rs. 1,500,000 in PPF (maximum limit) and paid Rs. 25,000 for parents' medical policy."
        }
    };

    let activeCaseKey = "C1";
    let activeCase = Object.assign({}, CASES[activeCaseKey]);

    let wizardState = {
        currentTab: "general",
        pan: "",
        aadhaar: "",
        name: "",
        basic: 0,
        hra: 0,
        special: 0,
        rentPaid: 0,
        isMetro: true,
        hraExemptResult: 0,
        otherIncome: 0,
        sec80c: 0,
        sec80d: 0,
        sec80tta: 0,
        filingRegime: "new", // default new regime
        filed: false
    };

    function loadCase(key) {
        activeCaseKey = key;
        activeCase = Object.assign({}, CASES[key]);
        
        // Populate inputs
        wizardState.pan = activeCase.pan;
        wizardState.aadhaar = activeCase.aadhaar;
        wizardState.name = activeCase.name;
        wizardState.basic = activeCase.basic;
        wizardState.hra = activeCase.hra;
        wizardState.special = activeCase.specialAllowance;
        wizardState.rentPaid = activeCase.rentPaid;
        wizardState.isMetro = activeCase.isMetro;
        wizardState.otherIncome = activeCase.otherIncome;
        wizardState.sec80c = activeCase.sec80c;
        wizardState.sec80d = activeCase.sec80d;
        wizardState.filed = false;
        
        updateFormFields();
        calculateEverything();
    }

    function updateFormFields() {
        document.getElementById('itPan').value = wizardState.pan;
        document.getElementById('itAadhaar').value = wizardState.aadhaar;
        document.getElementById('itName').value = wizardState.name;
        
        document.getElementById('itBasic').value = wizardState.basic;
        document.getElementById('itHra').value = wizardState.hra;
        document.getElementById('itSpecial').value = wizardState.special;
        document.getElementById('itRentPaid').value = wizardState.rentPaid;
        document.getElementById('itIsMetro').checked = wizardState.isMetro;
        
        document.getElementById('itOtherIncome').value = wizardState.otherIncome;
        document.getElementById('itSec80C').value = wizardState.sec80c;
        document.getElementById('itSec80D').value = wizardState.sec80d;

        document.getElementById('caseDescription').textContent = CASES[activeCaseKey].description;
    }

    function readInputs() {
        wizardState.pan = document.getElementById('itPan').value.toUpperCase().trim();
        wizardState.aadhaar = document.getElementById('itAadhaar').value.trim();
        wizardState.name = document.getElementById('itName').value.trim();
        
        wizardState.basic = parseFloat(document.getElementById('itBasic').value) || 0;
        wizardState.hra = parseFloat(document.getElementById('itHra').value) || 0;
        wizardState.special = parseFloat(document.getElementById('itSpecial').value) || 0;
        wizardState.rentPaid = parseFloat(document.getElementById('itRentPaid').value) || 0;
        wizardState.isMetro = document.getElementById('itIsMetro').checked;
        
        wizardState.otherIncome = parseFloat(document.getElementById('itOtherIncome').value) || 0;
        
        wizardState.sec80c = parseFloat(document.getElementById('itSec80C').value) || 0;
        wizardState.sec80d = parseFloat(document.getElementById('itSec80D').value) || 0;
        
        // Auto compute 80TTA (Savings Interest deduction, cap at 10000 under Old Regime)
        wizardState.sec80tta = Math.min(wizardState.otherIncome, 10000);
    }

    // Direct Tax computations
    function computeHraExemption() {
        if (wizardState.basic === 0) return 0;
        
        // Rule: least of
        // 1. Actual HRA received
        // 2. Rent paid minus 10% of Basic
        // 3. 40% (non-metro) or 50% (metro) of Basic
        const actualHra = wizardState.hra;
        const excessRent = Math.max(0, wizardState.rentPaid - (0.10 * wizardState.basic));
        const metroRatio = wizardState.isMetro ? 0.50 : 0.40;
        const capBasic = wizardState.basic * metroRatio;

        const exempt = Math.min(actualHra, excessRent, capBasic);
        
        // Display intermediate calculations in wizard helper
        document.getElementById('hraCalc1').textContent = app.formatINR(actualHra);
        document.getElementById('hraCalc2').textContent = `Rent Paid (${app.formatINR(wizardState.rentPaid)}) - 10% of Basic (${app.formatINR(wizardState.basic * 0.1)}) = ${app.formatINR(excessRent)}`;
        document.getElementById('hraCalc3').textContent = `${wizardState.isMetro ? '50%' : '40%'} of Basic = ${app.formatINR(capBasic)}`;
        document.getElementById('hraExemptSpan').textContent = app.formatINR(exempt);

        return exempt;
    }

    function calculateOldRegime(grossSalary, hraExempt, otherIncome) {
        // Gross income
        const grossSalaryTaxable = Math.max(0, grossSalary - hraExempt);
        const standardDeduction = 50000;
        const salaryIncome = Math.max(0, grossSalaryTaxable - standardDeduction);
        
        const grossTotalIncome = salaryIncome + otherIncome;
        
        // Deductions (capped)
        const capped80c = Math.min(wizardState.sec80c, 150000);
        const capped80d = Math.min(wizardState.sec80d, 25000);
        const deductions = capped80c + capped80d + wizardState.sec80tta;
        
        const netTaxableIncome = Math.max(0, grossTotalIncome - deductions);
        
        // Calculate Slabs (Old Slabs)
        // Up to 2,50,000: Nil
        // 2,50,001 to 5,00,000: 5%
        // 5,00,001 to 10,00,000: 20%
        // Above 10,00,000: 30%
        let baseTax = 0;
        let tempIncome = netTaxableIncome;
        
        if (tempIncome > 1000000) {
            baseTax += (tempIncome - 1000000) * 0.30;
            tempIncome = 1000000;
        }
        if (tempIncome > 500000) {
            baseTax += (tempIncome - 500000) * 0.20;
            tempIncome = 500000;
        }
        if (tempIncome > 250000) {
            baseTax += (tempIncome - 250000) * 0.05;
        }
        
        // Rebate under 87A (Old Regime: Net Income <= 5,00,000 gets up to Rs. 12,500 rebate)
        let rebate = 0;
        if (netTaxableIncome <= 500000) {
            rebate = Math.min(baseTax, 12500);
        }
        
        const taxAfterRebate = Math.max(0, baseTax - rebate);
        const cess = taxAfterRebate * 0.04;
        const totalTax = taxAfterRebate + cess;
        
        return {
            standardDeduction,
            salaryIncome,
            gti: grossTotalIncome,
            deductions,
            netIncome: netTaxableIncome,
            baseTax,
            rebate,
            cess,
            totalTax
        };
    }

    function calculateNewRegime(grossSalary, otherIncome) {
        // New Regime: No HRA exemption, no Chapter VI-A deductions (except standard deduction)
        const grossSalaryTaxable = grossSalary;
        // Standard Deduction in New Regime under FA 2024 is Rs. 75,000
        const standardDeduction = 75000;
        const salaryIncome = Math.max(0, grossSalaryTaxable - standardDeduction);
        
        const netTaxableIncome = salaryIncome + otherIncome; // GTI is Net income (no deductions)
        
        // Calculate Slabs (New Slabs FY 2024-25 / AY 2025-26 & AY 2026-27):
        // Up to 3,00,000: Nil
        // 3,00,001 to 6,00,000: 5%
        // 6,00,001 to 9,00,000: 10%
        // 9,00,001 to 12,00,000: 15%
        // 12,00,001 to 15,00,000: 20%
        // Above 15,00,000: 30%
        let baseTax = 0;
        let tempIncome = netTaxableIncome;
        
        if (tempIncome > 1500000) {
            baseTax += (tempIncome - 1500000) * 0.30;
            tempIncome = 1500000;
        }
        if (tempIncome > 1200000) {
            baseTax += (tempIncome - 1200000) * 0.20;
            tempIncome = 1200000;
        }
        if (tempIncome > 900000) {
            baseTax += (tempIncome - 900000) * 0.15;
            tempIncome = 900000;
        }
        if (tempIncome > 600000) {
            baseTax += (tempIncome - 600000) * 0.10;
            tempIncome = 600000;
        }
        if (tempIncome > 300000) {
            baseTax += (tempIncome - 300000) * 0.05;
        }
        
        // Rebate under 87A (New Regime: Net Income <= 7,00,000 gets up to Rs. 20,000 rebate)
        let rebate = 0;
        if (netTaxableIncome <= 700000) {
            rebate = Math.min(baseTax, 20000);
        }
        
        const taxAfterRebate = Math.max(0, baseTax - rebate);
        const cess = taxAfterRebate * 0.04;
        const totalTax = taxAfterRebate + cess;
        
        return {
            standardDeduction,
            salaryIncome,
            gti: netTaxableIncome,
            deductions: 0,
            netIncome: netTaxableIncome,
            baseTax,
            rebate,
            cess,
            totalTax
        };
    }

    function calculateEverything() {
        readInputs();
        
        const grossSalary = wizardState.basic + wizardState.hra + wizardState.special;
        const hraExempt = computeHraExemption();
        wizardState.hraExemptResult = hraExempt;
        
        const oldResult = calculateOldRegime(grossSalary, hraExempt, wizardState.otherIncome);
        const newResult = calculateNewRegime(grossSalary, wizardState.otherIncome);
        
        // Render comparison table
        document.getElementById('compGrossSalaryOld').textContent = app.formatNumber(grossSalary);
        document.getElementById('compGrossSalaryNew').textContent = app.formatNumber(grossSalary);
        
        document.getElementById('compExemptOld').textContent = app.formatNumber(hraExempt);
        document.getElementById('compExemptNew').textContent = '0.00';
        
        document.getElementById('compStdDeductOld').textContent = app.formatNumber(oldResult.standardDeduction);
        document.getElementById('compStdDeductNew').textContent = app.formatNumber(newResult.standardDeduction);
        
        document.getElementById('compGtiOld').textContent = app.formatNumber(oldResult.gti);
        document.getElementById('compGtiNew').textContent = app.formatNumber(newResult.gti);
        
        document.getElementById('compDeductOld').textContent = app.formatNumber(oldResult.deductions);
        document.getElementById('compDeductNew').textContent = '0.00';
        
        document.getElementById('compNetIncomeOld').textContent = app.formatNumber(oldResult.netIncome);
        document.getElementById('compNetIncomeNew').textContent = app.formatNumber(newResult.netIncome);
        
        document.getElementById('compBaseTaxOld').textContent = app.formatNumber(oldResult.baseTax);
        document.getElementById('compBaseTaxNew').textContent = app.formatNumber(newResult.baseTax);
        
        document.getElementById('compRebateOld').textContent = app.formatNumber(oldResult.rebate);
        document.getElementById('compRebateNew').textContent = app.formatNumber(newResult.rebate);
        
        document.getElementById('compCessOld').textContent = app.formatNumber(oldResult.cess);
        document.getElementById('compCessNew').textContent = app.formatNumber(newResult.cess);
        
        document.getElementById('compFinalTaxOld').textContent = app.formatINR(oldResult.totalTax);
        document.getElementById('compFinalTaxNew').textContent = app.formatINR(newResult.totalTax);
        
        // Suggest best regime
        const diff = Math.abs(oldResult.totalTax - newResult.totalTax);
        const bestBadge = document.getElementById('regimeSuggestion');
        if (oldResult.totalTax < newResult.totalTax) {
            bestBadge.className = "p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-semibold text-sm";
            bestBadge.innerHTML = `🌟 <strong>Recommendation:</strong> Old Tax Regime saves you <strong>${app.formatINR(diff)}</strong> this year!`;
        } else if (newResult.totalTax < oldResult.totalTax) {
            bestBadge.className = "p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-semibold text-sm";
            bestBadge.innerHTML = `🌟 <strong>Recommendation:</strong> New Tax Regime (Section 115BAC) saves you <strong>${app.formatINR(diff)}</strong> this year!`;
        } else {
            bestBadge.className = "p-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-lg font-semibold text-sm";
            bestBadge.innerHTML = `⚖️ <strong>Recommendation:</strong> Both tax regimes result in the identical tax liability.`;
        }

        // Show active calculations under final tab
        const activeResult = wizardState.filingRegime === 'new' ? newResult : oldResult;
        document.getElementById('finalTaxableIncome').textContent = app.formatINR(activeResult.netIncome);
        document.getElementById('finalBaseTax').textContent = app.formatINR(activeResult.baseTax);
        document.getElementById('finalRebate').textContent = app.formatINR(activeResult.rebate);
        document.getElementById('finalCess').textContent = app.formatINR(activeResult.cess);
        document.getElementById('finalTaxPayable').textContent = app.formatINR(activeResult.totalTax);
        
        // Re-validate details to unlock filing
        validateFilingWizard();
    }

    function validateFilingWizard() {
        const panResult = app.validatePAN(wizardState.pan);
        const isNameValid = wizardState.name.length >= 3;
        const isAadhaarValid = /^[0-9]{12}$/.test(wizardState.aadhaar);

        const check1 = document.getElementById('checkPanValid');
        const check2 = document.getElementById('checkAadhaarValid');
        const check3 = document.getElementById('checkNameValid');

        const buildStatus = (isValid) => isValid 
            ? `<span class="text-emerald-600 font-bold">✅ Ready</span>`
            : `<span class="text-red-500 font-bold">❌ Error</span>`;

        if (check1) check1.innerHTML = buildStatus(panResult.valid);
        if (check2) check2.innerHTML = buildStatus(isAadhaarValid);
        if (check3) check3.innerHTML = buildStatus(isNameValid);

        const fileBtn = document.getElementById('btnSubmitITR');
        if (panResult.valid && isNameValid && isAadhaarValid && !wizardState.filed) {
            fileBtn.removeAttribute('disabled');
            fileBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
            fileBtn.classList.add('bg-blue-600', 'hover:bg-blue-700', 'text-white');
        } else {
            fileBtn.setAttribute('disabled', 'true');
            fileBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'text-white');
            fileBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
        }
    }

    function handleTabClick(viewId) {
        document.querySelectorAll('.wizard-tab').forEach(btn => {
            btn.classList.remove('border-blue-600', 'text-blue-600');
            btn.classList.add('border-transparent', 'text-gray-500');
        });
        
        const activeTabBtn = document.querySelector(`.wizard-tab[data-tab="${viewId}"]`);
        if (activeTabBtn) {
            activeTabBtn.classList.add('border-blue-600', 'text-blue-600');
            activeTabBtn.classList.remove('border-transparent', 'text-gray-500');
        }

        document.querySelectorAll('.wizard-panel').forEach(pane => pane.classList.add('hidden'));
        const activePane = document.getElementById(`it-pane-${viewId}`);
        if (activePane) activePane.classList.remove('hidden');

        wizardState.currentTab = viewId;
        calculateEverything();
    }

    function submitITR() {
        document.getElementById('otpModal').classList.remove('hidden');
    }

    function verifyOtp() {
        const otpInput = document.getElementById('otpInput').value.trim();
        if (otpInput === "123456" || otpInput.length === 6) {
            document.getElementById('otpModal').classList.add('hidden');
            wizardState.filed = true;
            
            // Show receipt block
            document.getElementById('submissionReceipt').classList.remove('hidden');
            
            // Populate receipt details
            document.getElementById('recName').textContent = wizardState.name;
            document.getElementById('recPan').textContent = wizardState.pan;
            document.getElementById('recAadhaar').textContent = `XXXX-XXXX-${wizardState.aadhaar.substring(8)}`;
            document.getElementById('recRegime').textContent = wizardState.filingRegime === 'new' ? 'New Tax Regime (115BAC)' : 'Old Tax Regime';
            
            const activeResult = wizardState.filingRegime === 'new' 
                ? calculateNewRegime(wizardState.basic + wizardState.hra + wizardState.special, wizardState.otherIncome)
                : calculateOldRegime(wizardState.basic + wizardState.hra + wizardState.special, wizardState.hraExemptResult, wizardState.otherIncome);
            
            document.getElementById('recGti').textContent = app.formatINR(activeResult.gti);
            document.getElementById('recTax').textContent = app.formatINR(activeResult.totalTax);
            
            const randomAck = Math.floor(1000000000 + Math.random() * 9000000000);
            document.getElementById('recAckNo').textContent = randomAck;
            document.getElementById('recDate').textContent = app.formatDate(new Date());

            document.getElementById('btnSubmitITR').textContent = "✅ Return Filed Successfully";
            document.getElementById('btnSubmitITR').className = "w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-bold text-center cursor-default";
            document.getElementById('btnSubmitITR').setAttribute('disabled', 'true');
        } else {
            alert("Invalid verification code! Enter standard demo OTP: 123456");
        }
    }

    function printReceipt() {
        const receiptContent = document.getElementById('submissionReceipt').innerHTML;
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(`
            <html>
            <head>
                <title>ITR Acknowledgement Receipt - ITR-V</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    body { background: #fff; padding: 30px; font-family: Inter, sans-serif; }
                    .border { border: 1px solid #cbd5e1 !important; }
                </style>
            </head>
            <body>
                <div class="max-w-2xl mx-auto border p-6 bg-white rounded-lg">
                    <div class="text-center pb-4 border-b">
                        <h2 class="text-base font-bold uppercase text-gray-900">Income Tax Department</h2>
                        <p class="text-xs text-gray-500">Government of India</p>
                        <h3 class="text-sm font-semibold mt-2 bg-slate-100 py-1 rounded">ITR-V (ACKNOWLEDGEMENT RECEIPT)</h3>
                    </div>
                    ${receiptContent}
                    <div class="text-center mt-6 text-[10px] text-gray-400 border-t pt-4">
                        * This is an academically simulated computer-generated acknowledgement receipt. No physical signature is required.
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function () {
        // Load Case 1 by default
        loadCase("C1");

        // Presets
        document.querySelectorAll('.case-tab-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.case-tab-btn').forEach(b => {
                    b.classList.remove('bg-blue-600', 'text-white');
                    b.classList.add('bg-white', 'text-slate-700');
                });
                this.classList.remove('bg-white', 'text-slate-700');
                this.classList.add('bg-blue-600', 'text-white');
                loadCase(this.dataset.case);
            });
        });

        // Tab selection events
        document.querySelectorAll('.wizard-tab').forEach(tab => {
            tab.addEventListener('click', function () {
                handleTabClick(this.dataset.tab);
            });
        });

        // Regime toggle
        document.querySelectorAll('.regime-radio').forEach(radio => {
            radio.addEventListener('change', function () {
                wizardState.filingRegime = this.value;
                calculateEverything();
            });
        });

        // OTP controls
        document.getElementById('btnSubmitITR').addEventListener('click', submitITR);
        document.getElementById('btnVerifyOtp').addEventListener('click', verifyOtp);
        document.getElementById('btnCancelOtp').addEventListener('click', () => {
            document.getElementById('otpModal').classList.add('hidden');
        });
        document.getElementById('btnPrintReceipt').addEventListener('click', printReceipt);

        // Bind standard triggers
        const formInputs = document.querySelectorAll('#itFilingWizard input, #itFilingWizard select');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                calculateEverything();
            });
        });
    });
})();
