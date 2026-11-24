// js/practice_labs.js
// Industry Practice Labs Database & Workspace Controller

(function () {
    // 1. Core Industry Datasets
    const LABS_DB = {
        "manufacturing": {
            title: "Manufacturing Lab",
            overview: "Simulate tax accounting for a production unit, handling raw material purchases, job work charges, finished goods valuation, scrap sales, and capital machinery ITC.",
            objectives: [
                "Compute input tax credits on raw material consignments.",
                "Process job work invoices under Section 143 of the CGST Act.",
                "Record manufacturing scrap sales at correct GST rates."
            ],
            profile: {
                name: "Astra Manufacturing Ltd",
                type: "Manufacturer of Electronic Goods",
                gstin: "27AAACA9999M1Z1",
                state: "Maharashtra (27)",
                constitution: "Private Limited Company",
                opBal: 1200000.00
            },
            hsnList: [
                { code: "8517", desc: "Mobile Phone Components (Raw)", rate: "12%", type: "Input Goods" },
                { code: "8528", desc: "Smart LED TVs (Finished)", rate: "18%", type: "Output Goods" },
                { code: "7204", desc: "Metal Scrap", rate: "18%", type: "Output Scrap" },
                { code: "9988", desc: "Job Work Charges", rate: "12%", type: "Service" }
            ],
            transactions: [
                { id: "T1", type: "purchase", date: "2026-09-01", desc: "Purchase mobile phone raw components from Intellect Sources (MH).", qty: 1000, rate: 500, total: 500000, gstRate: 12, mode: "Credit", party: "Intellect Sources" },
                { id: "T2", type: "expense", date: "2026-09-05", desc: "Received job work bill from Tech Welders (MH) for component assembly.", qty: 1, rate: 40000, total: 40000, gstRate: 12, mode: "Credit", party: "Tech Welders" },
                { id: "T3", type: "sales", date: "2026-09-12", desc: "Sold Smart LED TVs to retailer Electrohub (MH).", qty: 50, rate: 20000, total: 1000000, gstRate: 18, mode: "Credit", party: "Electrohub" },
                { id: "T4", type: "sales", date: "2026-09-20", desc: "Sold manufacturing metal scrap in factory yard to local dealer.", qty: 1, rate: 25000, total: 25000, gstRate: 18, mode: "Cash", party: "Cash Customer" }
            ],
            errors: [
                "Mischarging job work charges as general labor without claiming 12% SAC 9988 credit.",
                "Failing to report scrap metal sales in GSTR-1 (requires 18% GST output tax)."
            ],
            mcqs: [
                { q: "What is the standard GST rate for job work services on electronic goods (SAC 9988)?", o: ["5%", "12%", "18%", "28%"], a: 1 },
                { q: "Is input tax credit allowed on capital goods used inside a factory?", o: ["Yes, fully", "No, blocked", "Only 50% allowed", "Allowed only if export company"], a: 0 }
            ]
        },
        "trading": {
            title: "Trading Lab",
            overview: "Manage wholesale and retail business logistics, inter-state credit purchases, local cash sales, cash discounts, and purchase returns.",
            objectives: [
                "Distinguish between intra-state (CGST+SGST) and inter-state (IGST) trades.",
                "Reconcile credit values post cash-discount adjustments.",
                "Manage purchase returns and issue Debit Notes."
            ],
            profile: {
                name: "Vasco Trading Corp",
                type: "Wholesale Distributor of Hardware",
                gstin: "27AAAPV4444T1Z2",
                state: "Maharashtra (27)",
                constitution: "Partnership Firm",
                opBal: 800000.00
            },
            hsnList: [
                { code: "7318", desc: "Stainless Steel Screws/Nuts", rate: "18%", type: "Goods" },
                { code: "8205", desc: "Hand Tools", rate: "18%", type: "Goods" }
            ],
            transactions: [
                { id: "T1", type: "purchase", date: "2026-09-02", desc: "Purchase Hand Tools from Tools India (Karnataka) - Interstate.", qty: 100, rate: 1200, total: 120000, gstRate: 18, mode: "Credit", party: "Tools India" },
                { id: "T2", type: "sales", date: "2026-09-08", desc: "Sold Steel Screws to builder Metro Infra (MH) - Local.", qty: 500, rate: 300, total: 150000, gstRate: 18, mode: "Credit", party: "Metro Infra" },
                { id: "T3", type: "debit_note", date: "2026-09-15", desc: "Returned defective tools to Tools India (Karnataka) - Purchase Return.", qty: 10, rate: 1200, total: 12000, gstRate: 18, mode: "Credit", party: "Tools India" }
            ],
            errors: [
                "Applying CGST+SGST on purchase from Karnataka (must be IGST).",
                "Not reversing ITC matching the Debit Note return value."
            ],
            mcqs: [
                { q: "For an inter-state purchase from Karnataka to Maharashtra, which tax is debited as input?", o: ["CGST", "SGST", "IGST", "UTGST"], a: 2 }
            ]
        },
        "retail": {
            title: "Retail Shop Lab",
            overview: "Practice high-volume point-of-sale (POS) cash billing, card/UPI payments, mixed GST tax rate invoices, and daily reconciliation sheets.",
            objectives: [
                "Build daily consolidated cash sales records.",
                "Structure mixed-tax rate billing lines on a single sales slip.",
                "Perform card/UPI payment fee ledger reconciliations."
            ],
            profile: {
                name: "SuperMart Retail",
                type: "Multi-Product Retail Outlet",
                gstin: "27AAAPS5555R1Z3",
                state: "Maharashtra (27)",
                constitution: "Proprietorship",
                opBal: 400000.00
            },
            hsnList: [
                { code: "3304", desc: "Cosmetics", rate: "28%", type: "Goods" },
                { code: "1905", desc: "Bakery Products", rate: "5%", type: "Goods" },
                { code: "2202", desc: "Mineral Water", rate: "18%", type: "Goods" }
            ],
            transactions: [
                { id: "T1", type: "sales", date: "2026-09-03", desc: "Daily consolidated B2C cash sales of Bakery Products.", qty: 200, rate: 150, total: 30000, gstRate: 5, mode: "Cash", party: "B2C Consumer" },
                { id: "T2", type: "sales", date: "2026-09-10", desc: "Daily B2C sales of Cosmetics paid via UPI.", qty: 10, rate: 2500, total: 25000, gstRate: 28, mode: "UPI", party: "B2C Consumer" }
            ],
            errors: [
                "Mismating 5% and 28% tax lines on daily sales sheets.",
                "Not keeping proper daily cash book tally records."
            ],
            mcqs: [
                { q: "B2C retail sales are reported in GSTR-1 under which category?", o: ["Table 4 (B2B)", "Table 7 (B2C Small)", "Table 6 (Exports)", "Table 9 (Amendments)"],  a: 1 }
            ]
        },
        "restaurant": {
            title: "Restaurant Lab",
            overview: "Compute tax rates for dine-in, takeaway, and E-commerce operator (Swiggy/Zomato) sales, and compare Regular vs Composition schemes.",
            objectives: [
                "Differentiate between dine-in food tax rates and online app deliveries.",
                "Apply Section 9(5) E-commerce operator rules for restaurant supplies.",
                "Perform GSTR-3B filings for food services."
            ],
            profile: {
                name: "Culinary Bites",
                type: "Fine Dine & Takeaway Restaurant",
                gstin: "27AAAPC6666F1Z4",
                state: "Maharashtra (27)",
                constitution: "Partnership",
                opBal: 300000.00
            },
            hsnList: [
                { code: "9963", desc: "Restaurant Service", rate: "5%", type: "Service (No ITC)" }
            ],
            transactions: [
                { id: "T1", type: "sales", date: "2026-09-04", desc: "Dine-in restaurant sales (CGST 2.5%, SGST 2.5%).", qty: 1, rate: 85000, total: 85000, gstRate: 5, mode: "UPI", party: "Walk-in Diner" },
                { id: "T2", type: "sales", date: "2026-09-11", desc: "Online orders dispatched through Swiggy (Sec 9(5) supply).", qty: 1, rate: 45000, total: 45000, gstRate: 5, mode: "UPI", party: "Swiggy Portal" }
            ],
            errors: [
                "Claiming input tax credit on kitchen equipment (regular 5% restaurants are strictly blocked from claiming ITC).",
                "Charging 18% GST instead of 5% on restaurant dining."
            ],
            mcqs: [
                { q: "What is the GST rate for a standalone restaurant (dine-in/takeaway) without AC rooms above Rs 7,500 tariff?", o: ["5% without ITC", "12% with ITC", "18% with ITC", "Exempted"], a: 0 }
            ]
        },
        "construction": {
            title: "Construction / Real Estate Lab",
            overview: "Record Works Contract services, material plus labor invoicing, running bills, retention money allocations, and RCM on cargo transport.",
            objectives: [
                "Book works contract sales adjusting material and labor values.",
                "Manage GTA (Goods Transport Agency) transport bills under RCM.",
                "Verify blocked credits on construction inputs under Section 17(5)."
            ],
            profile: {
                name: "Civic Builders Ltd",
                type: "Infrastructure Contractor",
                gstin: "27AAACC7777C1Z5",
                state: "Maharashtra (27)",
                constitution: "Public Limited Company",
                opBal: 5000000.00
            },
            hsnList: [
                { code: "9954", desc: "Works Contract Service", rate: "18%", type: "Service" },
                { code: "9965", desc: "Road Transport Services (GTA)", rate: "5%", type: "RCM Service" }
            ],
            transactions: [
                { id: "T1", type: "sales", date: "2026-09-05", desc: "First running bill raised for commercial complex construction.", qty: 1, rate: 1200000, total: 1200000, gstRate: 18, mode: "Credit", party: "HDFC Commercial" },
                { id: "T2", type: "purchase", date: "2026-09-15", desc: "Freight bill received from Shiv Roadways (GTA) under RCM.", qty: 1, rate: 30000, total: 30000, gstRate: 5, mode: "Credit", party: "Shiv Roadways" }
            ],
            errors: [
                "Claiming input tax credit on cement and steel used for office construction (blocked under Section 17(5)(d)).",
                "Failing to pay 5% RCM on GTA bills using Cash Ledger."
            ],
            mcqs: [
                { q: "Under which Section is ITC on goods used for construction of immovable property blocked?", o: ["Section 16(2)", "Section 17(5)(c) & (d)", "Section 18(1)", "Section 20"], a: 1 }
            ]
        },
        "service_provider": {
            title: "Service Provider Lab",
            overview: "Account for consultancy and IT service invoices, AMC agreements, billing advances, and inter-state professional service codes.",
            objectives: [
                "Apply 18% GST rate on professional fees.",
                "File return reports for IT services.",
                "Track advance payments and compute time of supply."
            ],
            profile: {
                name: "Pixel Tech Consulting",
                type: "IT Consultancy Services",
                gstin: "27AAAPP8888P1Z6",
                state: "Maharashtra (27)",
                constitution: "Proprietorship",
                opBal: 600000.00
            },
            hsnList: [
                { code: "9983", desc: "IT Consulting Services", rate: "18%", type: "Service" }
            ],
            transactions: [
                { id: "T1", type: "sales", date: "2026-09-06", desc: "Consultancy invoice sent to client TechStart (Karnataka) - Interstate.", qty: 1, rate: 180000, total: 180000, gstRate: 18, mode: "Credit", party: "TechStart Corp" },
                { id: "T2", type: "sales", date: "2026-09-18", desc: "Advance payment received for software development (taxable advance).", qty: 1, rate: 50000, total: 50000, gstRate: 18, mode: "Bank", party: "TechStart Corp" }
            ],
            errors: [
                "Not paying GST on advance service payments (advances for services remain taxable on receipt)."
            ],
            mcqs: [
                { q: "Are advance payments received for services liable to GST?", o: ["Yes, always", "No, exempted", "Only if above 10 Lakhs", "Only B2C is taxable"], a: 0 }
            ]
        },
        "freelancer": {
            title: "Freelancer Lab",
            overview: "Structure zero-rated foreign invoices, establish Letter of Undertaking (LUT) codes, and reconcile digital bank transfer receipts.",
            objectives: [
                "Draft zero-rated invoices for export of services.",
                "Validate export of service status (foreign currency receipt requirements).",
                "Apply LUT reference codes in GSTR-1."
            ],
            profile: {
                name: "DesignKraft Studio",
                type: "Freelance Graphic Designer",
                gstin: "27AAAPD9999D1Z7",
                state: "Maharashtra (27)",
                constitution: "Proprietorship",
                opBal: 200000.00
            },
            hsnList: [
                { code: "9983", desc: "Design Services", rate: "18%", type: "Service" }
            ],
            transactions: [
                { id: "T1", type: "sales", date: "2026-09-07", desc: "Export of UI design layout to Silicon Ventures (US) under LUT.", qty: 1, rate: 150000, total: 150000, gstRate: 0, mode: "Credit", party: "Silicon Ventures" }
            ],
            errors: [
                "Mischarging CGST/SGST to foreign clients, making the services uncompetitive."
            ],
            mcqs: [
                { q: "To qualify as an export of service under GST, the payment must be received in:", o: ["Indian Rupees", "Convertible Foreign Exchange", "Cryptocurrency", "Any mode"], a: 1 }
            ]
        },
        "ecommerce": {
            title: "E-Commerce Seller Lab",
            overview: "Analyze Amazon/Flipkart sales registers, manage 1% TCS tax deductions, account for marketplace fees, and reconcile returns.",
            objectives: [
                "Report e-commerce sales net of returns in GSTR-1.",
                "Calculate and claim 1% TCS credit (Table 14/15 portal updates).",
                "Reconcile warehouse delivery commissions and claim ITC."
            ],
            profile: {
                name: "OmniSell Retail",
                type: "E-commerce Retail Seller",
                gstin: "27AAAPO1010O1Z8",
                state: "Maharashtra (27)",
                constitution: "Proprietorship",
                opBal: 500000.00
            },
            hsnList: [
                { code: "6109", desc: "Apparels / T-shirts", rate: "12%", type: "Goods" }
            ],
            transactions: [
                { id: "T1", type: "sales", date: "2026-09-08", desc: "Consolidated sales dispatched via Amazon portal (1% TCS deducted).", qty: 1, rate: 200000, total: 200000, gstRate: 12, mode: "Credit", party: "Amazon Customer" },
                { id: "T2", type: "expense", date: "2026-09-18", desc: "Marketplace commission invoice received from Amazon Services.", qty: 1, rate: 25000, total: 25000, gstRate: 18, mode: "Credit", party: "Amazon Services" }
            ],
            errors: [
                "Forgetting to claim the 1% TCS credit from the GST portal, leading to cash flow blockage."
            ],
            mcqs: [
                { q: "What is the rate of TCS (Tax Collected at Source) under GST for e-commerce operator sales?", o: ["0.5%", "1% (0.5% CGST + 0.5% SGST)", "2%", "5%"], a: 1 }
            ]
        },
        "exporter": {
            title: "Exporter Lab",
            overview: "Prepare export invoices, specify LUT bonds, enter Shipping Bill metadata, and file refund claims for unutilized input tax credits.",
            objectives: [
                "Execute zero-rated export transactions under LUT.",
                "Reconcile export entries with Shipping Bill dates.",
                "Prepare Form RFD-01 computation sheets for ITC refunds."
            ],
            profile: {
                name: "Bharat Exotics Ltd",
                type: "Export House of Spices",
                gstin: "27AAACB2222E1Z9",
                state: "Maharashtra (27)",
                constitution: "Private Limited Company",
                opBal: 2500000.00
            },
            hsnList: [
                { code: "0904", desc: "Spices for Export", rate: "5%", type: "Goods" }
            ],
            transactions: [
                { id: "T1", type: "sales", date: "2026-09-09", desc: "Export of Spices consignment to Dubai spices merchant under LUT.", qty: 1, rate: 800000, total: 800000, gstRate: 0, mode: "Credit", party: "Dubai Merchant" }
            ],
            errors: [
                "Entering wrong Shipping Bill dates in GSTR-1, causing delays in ICEGATE validation."
            ],
            mcqs: [
                { q: "Under which form is a refund of unutilized ITC on zero-rated exports claimed?", o: ["Form GSTR-1", "Form GST RFD-01", "Form GSTR-10", "Form GST REG-16"], a: 1 }
            ]
        },
        "importer": {
            title: "Importer Lab",
            overview: "Record goods imports, calculate Basic Customs Duty (BCD), compute Integrated GST (IGST) base, and manage ICEGATE GSTR-2B credit claims.",
            objectives: [
                "Calculate Basic Customs Duty (10%) and add it to the IGST base.",
                "File Bill of Entry details in accounting ledgers.",
                "Reconcile import credit entries appearing in GSTR-2B."
            ],
            profile: {
                name: "Global Importers Ltd",
                type: "Importer of Engineering Components",
                gstin: "27AAACG3333I1ZA",
                state: "Maharashtra (27)",
                constitution: "Private Limited Company",
                opBal: 3000000.00
            },
            hsnList: [
                { code: "8413", desc: "Machinery Components", rate: "18%", type: "Imported Goods" }
            ],
            transactions: [
                { id: "T1", type: "purchase", date: "2026-09-10", desc: "Import of Components from Shanghai Parts (China). BCD 10%.", qty: 1, rate: 600000, total: 600000, gstRate: 18, mode: "Credit", party: "Shanghai Parts" }
            ],
            errors: [
                "Failing to add BCD (Basic Customs Duty) to the invoice value before applying the 18% IGST rate."
            ],
            mcqs: [
                { q: "What is the tax base value for computing IGST on imported goods?", o: ["Transaction value of invoice only", "Transaction value + Basic Customs Duty (BCD)", "BCD only", "Exempted"], a: 1 }
            ]
        }
    };

    // 2. Active State
    let activeLabKey = "manufacturing";
    let labState = {
        vouchers: [],
        quizScore: 0
    };

    // 3. Setup UI & Event bindings
    document.addEventListener('DOMContentLoaded', () => {
        initLabsDashboard();
    });

    function initLabsDashboard() {
        const select = document.getElementById('lab-industry-select');
        if (!select) return;

        // Populate dropdown
        select.innerHTML = '';
        Object.keys(LABS_DB).forEach(key => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = LABS_DB[key].title;
            select.appendChild(opt);
        });

        select.addEventListener('change', (e) => {
            loadLab(e.target.value);
        });

        // Load default
        loadLab("manufacturing");

        // Action bindings
        document.getElementById('lab-calculate-btn')?.addEventListener('click', handleLabCalculations);
        document.getElementById('lab-submit-btn')?.addEventListener('click', handleLabTransactionSubmit);
    }

    window.loadLab = function (labKey) {
        activeLabKey = labKey;
        const lab = LABS_DB[labKey];

        // Clear active session voucher list
        labState.vouchers = [];

        // Title and Overview
        document.getElementById('lab-title').textContent = lab.title;
        document.getElementById('lab-overview').textContent = lab.overview;

        // Profile Cards
        document.getElementById('profile-name').textContent = lab.profile.name;
        document.getElementById('profile-type').textContent = lab.profile.type;
        document.getElementById('profile-gstin').textContent = lab.profile.gstin;
        document.getElementById('profile-state').textContent = lab.profile.state;
        document.getElementById('profile-constitution').textContent = lab.profile.constitution;
        document.getElementById('profile-op-bal').textContent = formatINR(lab.profile.opBal);

        // Learning Objectives list
        const objList = document.getElementById('lab-objectives-list');
        objList.innerHTML = lab.objectives.map(o => `<li>- ${o}</li>`).join('');

        // HSN List table
        const hsnBody = document.getElementById('lab-hsn-table-body');
        hsnBody.innerHTML = lab.hsnList.map(h => `
            <tr class="border-b">
                <td class="p-2 font-mono font-bold">${h.code}</td>
                <td class="p-2">${h.desc}</td>
                <td class="p-2 font-mono text-blue-700 font-semibold">${h.rate}</td>
                <td class="p-2 text-slate-500 font-medium">${h.type}</td>
            </tr>
        `).join('');

        // Transactions workflow
        const txBody = document.getElementById('lab-tx-table-body');
        txBody.innerHTML = lab.transactions.map(t => {
            let badge = `<span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">${t.type.toUpperCase()}</span>`;
            if (t.type === 'sales') badge = `<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">${t.type.toUpperCase()}</span>`;
            if (t.type === 'debit_note') badge = `<span class="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">${t.type.toUpperCase()}</span>`;

            return `
                <tr class="border-b font-mono">
                    <td class="p-3 font-bold text-slate-600">${t.id}</td>
                    <td class="p-3 text-slate-500">${t.date}</td>
                    <td class="p-3">${badge}</td>
                    <td class="p-3 text-slate-700 text-left font-sans font-medium">${t.desc}</td>
                    <td class="p-3 font-bold">${formatINR(t.total)}</td>
                </tr>
            `;
        }).join('');

        // Common errors
        const errList = document.getElementById('lab-errors-list');
        errList.innerHTML = lab.errors.map(e => `<li>❌ ${e}</li>`).join('');

        // Populate Form Selects based on lab context
        populateFormSelects(lab);

        // Render Assessment Quiz
        renderLabQuiz(lab);

        // Compile Statements
        compileLabReports();
    };

    function populateFormSelects(lab) {
        const typeSelect = document.getElementById('form-tx-type');
        typeSelect.innerHTML = '<option value="">-- Select type --</option>';
        
        // Find unique types in transaction lists
        const types = [...new Set(lab.transactions.map(t => t.type))];
        types.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t;
            opt.textContent = t.toUpperCase();
            typeSelect.appendChild(opt);
        });

        // Parties
        const partySelect = document.getElementById('form-tx-party');
        partySelect.innerHTML = '<option value="">-- Choose party --</option>';
        const parties = [...new Set(lab.transactions.map(t => t.party))];
        parties.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p;
            opt.textContent = p;
            partySelect.appendChild(opt);
        });

        // Items/HSNs
        const itemSelect = document.getElementById('form-tx-item');
        itemSelect.innerHTML = '<option value="">-- Select commodity --</option>';
        lab.hsnList.forEach(h => {
            const opt = document.createElement('option');
            opt.value = h.code;
            opt.textContent = `${h.code} - ${h.desc} (${h.rate})`;
            itemSelect.appendChild(opt);
        });

        // Clear values
        document.getElementById('form-tx-qty').value = '';
        document.getElementById('form-tx-rate').value = '';
        document.getElementById('calc-summary-block').classList.add('hidden');
    }

    function handleLabCalculations() {
        const qty = Number(document.getElementById('form-tx-qty').value) || 0;
        const rate = Number(document.getElementById('form-tx-rate').value) || 0;
        const hsnCode = document.getElementById('form-tx-item').value;

        if (!qty || !rate || !hsnCode) {
            alert("Please select Commodity, Enter Quantity and Rate.");
            return;
        }

        const lab = LABS_DB[activeLabKey];
        const hsn = lab.hsnList.find(h => h.code === hsnCode);
        const gstRate = hsn ? Number(hsn.rate.replace('%', '')) : 18;

        const taxable = qty * rate;
        const cgst = (taxable * gstRate) / 200;
        const sgst = (taxable * gstRate) / 200;
        const igst = 0; // standard local for default calculations
        const total = taxable + cgst + sgst;

        document.getElementById('calc-taxable').textContent = formatINR(taxable);
        document.getElementById('calc-cgst').textContent = formatINR(cgst);
        document.getElementById('calc-sgst').textContent = formatINR(sgst);
        document.getElementById('calc-total').textContent = formatINR(total);

        // Store calculations
        const block = document.getElementById('calc-summary-block');
        block.classList.remove('hidden');
        block.dataset.taxable = taxable;
        block.dataset.cgst = cgst;
        block.dataset.sgst = sgst;
        block.dataset.igst = igst;
        block.dataset.total = total;
        block.dataset.gstRate = gstRate;
    }

    function handleLabTransactionSubmit() {
        const type = document.getElementById('form-tx-type').value;
        const party = document.getElementById('form-tx-party').value;
        const itemCode = document.getElementById('form-tx-item').value;
        const block = document.getElementById('calc-summary-block');

        if (!type || !party || !itemCode || block.classList.contains('hidden')) {
            alert("Please calculate the transaction liability before posting.");
            return;
        }

        // Add to vouchers
        labState.vouchers.push({
            type: type,
            party: party,
            itemCode: itemCode,
            taxable: Number(block.dataset.taxable),
            cgst: Number(block.dataset.cgst),
            sgst: Number(block.dataset.sgst),
            igst: Number(block.dataset.igst),
            total: Number(block.dataset.total),
            gstRate: Number(block.dataset.gstRate)
        });

        // Clear forms
        populateFormSelects(LABS_DB[activeLabKey]);
        compileLabReports();
        alert("Transaction posted successfully to the ledger accounts!");
    }

    // 14. Compile Financial Statements & Returns
    function compileLabReports() {
        const lab = LABS_DB[activeLabKey];
        let cashBank = lab.profile.opBal;
        let capital = cashBank;
        let sales = 0;
        let purchase = 0;
        let inputGst = 0;
        let outputGst = 0;

        // Process posted vouchers
        labState.vouchers.forEach(v => {
            if (v.type === 'purchase' || v.type === 'expense') {
                purchase += v.taxable;
                inputGst += (v.cgst + v.sgst + v.igst);
                cashBank -= v.total;
            } else if (v.type === 'sales') {
                sales += v.taxable;
                outputGst += (v.cgst + v.sgst + v.igst);
                cashBank += v.total;
            } else if (v.type === 'debit_note') {
                purchase -= v.taxable;
                inputGst -= (v.cgst + v.sgst + v.igst);
                cashBank += v.total;
            }
        });

        // Reports Rendering
        document.getElementById('lbl-trial-sales').textContent = formatINR(sales);
        document.getElementById('lbl-trial-purchases').textContent = formatINR(purchase);
        document.getElementById('lbl-trial-cash').textContent = formatINR(cashBank);
        document.getElementById('lbl-trial-capital').textContent = formatINR(capital);
        
        // P&L
        document.getElementById('lbl-pl-revenue').textContent = formatINR(sales);
        document.getElementById('lbl-pl-cogs').textContent = formatINR(purchase);
        const grossProfit = sales - purchase;
        const gpEl = document.getElementById('lbl-pl-gross');
        gpEl.textContent = formatINR(grossProfit);
        gpEl.className = grossProfit >= 0 ? "font-bold text-emerald-700" : "font-bold text-rose-700";

        // Returns
        document.getElementById('lbl-ret-sales-val').textContent = formatINR(sales);
        document.getElementById('lbl-ret-sales-tax').textContent = formatINR(outputGst);
        document.getElementById('lbl-ret-itc-val').textContent = formatINR(inputGst);
        const netPayable = Math.max(0, outputGst - inputGst);
        document.getElementById('lbl-ret-net-payable').textContent = formatINR(netPayable);
    }

    // 15. Assessment Quiz Renderer
    function renderLabQuiz(lab) {
        const block = document.getElementById('lab-assessment-block');
        if (!block) return;

        block.innerHTML = '';
        lab.mcqs.forEach((m, mIdx) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = "p-4 border rounded-xl bg-slate-50 space-y-3";
            questionDiv.innerHTML = `
                <p class="text-xs font-extrabold text-slate-800">${mIdx+1}. ${m.q}</p>
                <div class="space-y-2">
                    ${m.o.map((opt, oIdx) => `
                        <label class="flex items-center gap-2 p-2 border rounded-lg bg-white hover:bg-slate-50 transition cursor-pointer text-xs">
                            <input type="radio" name="q-${mIdx}" value="${oIdx}" onclick="gradeLabQuizQuestion(${mIdx}, ${oIdx}, ${m.a})">
                            <span>${opt}</span>
                        </label>
                    `).join('')}
                </div>
                <div id="quiz-feed-${mIdx}" class="hidden p-2 rounded text-[10px] font-bold"></div>
            `;
            block.appendChild(questionDiv);
        });
    }

    window.gradeLabQuizQuestion = function (mIdx, selectedIdx, correctIdx) {
        const feedback = document.getElementById(`quiz-feed-${mIdx}`);
        feedback.classList.remove('hidden');
        if (selectedIdx === correctIdx) {
            feedback.textContent = "Correct! Well reasoned.";
            feedback.className = "p-2 rounded text-[10px] font-bold bg-emerald-550/20 text-emerald-700 block mt-2";
        } else {
            feedback.textContent = "Incorrect. Please review the industry compliance points.";
            feedback.className = "p-2 rounded text-[10px] font-bold bg-rose-50 text-rose-700 block mt-2";
        }
    };

    // 16. Utility INR formatter
    function formatINR(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    }
})();
