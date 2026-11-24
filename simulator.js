// js/simulator.js
// GST Practical Simulator Controller: Handles 18 steps of billing, accounting and GST returns

(function () {
    // -------------------------------------------------------------------------
    // 1. Simulation State
    // -------------------------------------------------------------------------
    let state = {
        currentStep: 1,
        company: null,
        ledgers: [],
        masters: [],
        vouchers: [],
        stepStatus: {} // stepIndex -> 'completed' or 'pending'
    };

    // Indian State Codes Mapping for GSTIN validation
    const STATE_CODES = {
        "27": "Maharashtra",
        "07": "Delhi",
        "29": "Karnataka",
        "33": "Tamil Nadu"
    };

    // -------------------------------------------------------------------------
    // 2. 18-Step Educational Data & Scenarios
    // -------------------------------------------------------------------------
    const stepsData = {
        1: {
            title: "Create Company",
            day: "DAY 1",
            objective: "Set up a new company profile with structural accounting configurations mirroring Tally Prime.",
            theory: "Company creation is the foundation of any accounting system. The constitution determines tax rates and liability, the principal state determines the GSTIN jurisdiction, and TAN/PAN are required for tax deductions.",
            scenario: "You are starting a new business venture. Create the company profiles to begin accounting operations.",
            sampleData: "Business Name: 'Apex Trading Corp'\nConstitution: 'Proprietorship'\nState: 'Maharashtra' (State Code 27)\nPAN: 'AAAPC1018J'\nTAN: 'MUMA12345B'\nFY: '2026-27'\nBusiness Type: 'Retail Trader'\nOpening Balance: 'Rs. 5,00,000'\nBank: 'HDFC Bank', A/c: '501002030405', IFSC: 'HDFC0000001'",
            mistakes: "Choosing the wrong state code (prevents correct GSTIN registration); mismatched Financial Year.",
            tips: "Ensure business PAN corresponds to the constitution type. (e.g. 'P' in fourth place for proprietorship).",
            quiz: {
                question: "Which character in a 10-character PAN signifies the status of the holder as an Individual (Proprietor)?",
                options: ["C (Company)", "P (Individual/Person)", "F (Firm)", "A (Association)"],
                answer: 1,
                explanation: "The fourth character of the PAN indicates the status of the cardholder. 'P' stands for Individual (Proprietor)."
            }
        },
        2: {
            title: "Add GST Details",
            day: "DAY 2",
            objective: "Configure GSTIN profile, choose registration schemes, and establish tax rates and invoicing modes.",
            theory: "A GSTIN consists of 15 characters, starting with the 2-digit state code. Regular taxpayers claim ITC and file monthly returns; Composition taxpayers pay tax at a flat rate (e.g., 1%) but cannot claim ITC or charge tax.",
            scenario: "Now that the company is created, register the company's official GSTIN on the portal.",
            sampleData: "GSTIN: '27AAAPC1018J1ZR' (Must match Maharashtra 27 code + PAN)\nRegistration Type: 'Regular'\nComposition Scheme: 'No'\nLUT Reference: 'LUT/2026-27/001' (Optional)\nE-Invoice Enabled: 'Yes'",
            mistakes: "Registering with a GSTIN state code that mismatch the company's state.",
            tips: "Composition taxpayers cannot issue tax invoices; they must issue a 'Bill of Supply'.",
            quiz: {
                question: "What do the first two digits of a GSTIN represent?",
                options: ["Year of registration", "Pan card numbers", "State code of business", "Business sector code"],
                answer: 2,
                explanation: "The first two digits of a GSTIN denote the state code as per the 2011 Census (e.g., 27 for Maharashtra, 07 for Delhi)."
            }
        },
        3: {
            title: "Create Ledgers",
            day: "DAY 3",
            objective: "Build Tally-style ledger accounts classified under correct accounting groups.",
            theory: "Ledgers categorize transactions. Standard GST accounting requires distinct ledgers for Sales, Purchases, Cash, Bank, and Duties & Taxes (CGST, SGST, IGST).",
            scenario: "Set up the core accounts ledgers in your ERP/accounting system.",
            sampleData: "1. Ledger Name: 'Capital Account', Group: 'Capital Account'\n2. Ledger Name: 'Sales Account', Group: 'Sales Accounts'\n3. Ledger Name: 'Purchase Account', Group: 'Purchase Accounts'\n4. Ledger Name: 'CGST Ledger', Group: 'Duties & Taxes'\n5. Ledger Name: 'SGST Ledger', Group: 'Duties & Taxes'\n6. Ledger Name: 'IGST Ledger', Group: 'Duties & Taxes'",
            mistakes: "Grouping duties and taxes ledgers under expenses instead of Duties & Taxes.",
            tips: "Create separate CGST, SGST, and IGST ledgers to simplify return filing and tax set-off.",
            quiz: {
                question: "Under which group should CGST, SGST, and IGST ledgers be categorized in accounting software?",
                options: ["Indirect Expenses", "Direct Expenses", "Duties & Taxes", "Current Liabilities"],
                answer: 2,
                explanation: "Tax ledgers are categorized under 'Duties & Taxes', which is a sub-group of Current Liabilities in standard accounting."
            }
        },
        4: {
            title: "Create HSN Master",
            day: "DAY 4",
            objective: "Configure HSN (Harmonized System of Nomenclature) masters with tax rates and units.",
            theory: "HSN codes classify goods for tax applications. Under GST, 4-digit codes are mandatory for turnover up to Rs. 5 Crore, and 6-digit codes for turnover above Rs. 5 Crore.",
            scenario: "Register your trading merchandise inventory details in the HSN master database.",
            sampleData: "HSN Code: '84713010' (Computers)\nDescription: 'Laptop Computers'\nGST Rate: '18%'\nUnit of Quantity (UQC): 'PCS' (Pieces)\nClassification: 'Taxable Goods'",
            mistakes: "Entering incorrect tax rate, resulting in legal disputes and audit assessments.",
            tips: "Search HSN rates from the official CBIC website to ensure accuracy.",
            quiz: {
                question: "How many digits are mandatory in HSN codes for taxpayers with turnover exceeding Rs. 5 Crore?",
                options: ["2 digits", "4 digits", "6 digits", "8 digits"],
                answer: 2,
                explanation: "Taxpayers with an aggregate turnover of more than Rs. 5 Crore must mention a 6-digit HSN code on tax invoices."
            }
        },
        5: {
            title: "Create SAC Master",
            day: "DAY 5",
            objective: "Set up Service Accounting Codes (SAC) for taxable business services.",
            theory: "Services are classified under 6-digit SAC codes, all beginning with '99'. Typical services include consulting, professional, rent, and maintenance.",
            scenario: "Register the service profiles if your business charges for logistics or maintenance support.",
            sampleData: "SAC Code: '998311' (IT Consulting Services)\nDescription: 'Software Integration Consulting'\nGST Rate: '18%'\nService Category: 'Information Technology Services'",
            mistakes: "Using HSN codes instead of SAC codes for services.",
            tips: "Verify if your service qualifies for RCM or exemptions (like health/education).",
            quiz: {
                question: "All SAC codes in India begin with which two digits?",
                options: ["84", "99", "27", "18"],
                answer: 1,
                explanation: "Under GST, all Service Accounting Codes (SAC) are prefixed with the number 99."
            }
        },
        6: {
            title: "Customer Master",
            day: "DAY 6",
            objective: "Add customer profiles with verified address and tax details.",
            theory: "Customer state determines whether sales are Intra-state (CGST+SGST) or Inter-state (IGST). GSTIN validation prevents rejection in GSTR-1.",
            scenario: "Create a customer record for an corporate buyer in your state.",
            sampleData: "Customer Name: 'Apex Enterprises'\nGSTIN: '27AAACA1111A1Z1' (State: Maharashtra)\nAddress: '101 Corporate Park, Bandra, Mumbai - 400051'\nCredit Limit: 'Rs. 2,00,000'\nOpening Balance: 'Rs. 0.00'",
            mistakes: "Selecting the wrong state for a customer, causing wrong tax mapping (e.g. IGST instead of CGST/SGST).",
            tips: "Always check a customer's GSTIN status using the search utility on the portal.",
            quiz: {
                question: "If a Maharashtra company sells to a customer with GSTIN starting with '27', what taxes apply?",
                options: ["IGST", "CGST + SGST", "CGST only", "No tax applies"],
                answer: 1,
                explanation: "State code '27' represents Maharashtra. Since both supplier and buyer are in Maharashtra, it is an Intra-state transaction liable to CGST + SGST."
            }
        },
        7: {
            title: "Supplier Master",
            day: "DAY 7",
            objective: "Add vendor accounts containing verified GST and banking parameters.",
            theory: "Supplier state code determines if input tax credit (ITC) is IGST or CGST/SGST. ITC can only be claimed if the supplier uploads invoices in their GSTR-1.",
            scenario: "Set up the vendor profile from whom you purchase bulk stock.",
            sampleData: "Supplier Name: 'Zenith Supplies'\nGSTIN: '27AAAPA2222B1Z2' (State: Maharashtra)\nAddress: '55 Industrial Area, Pune, Maharashtra - 411001'\nCredit Limit: 'Rs. 5,00,000'\nOpening Balance: 'Rs. 0.00'",
            mistakes: "Failing to verify supplier's GSTIN, leading to blocked input tax credits.",
            tips: "Enable monthly reconciliation of supplier invoices against GSTR-2B details.",
            quiz: {
                question: "Which document auto-populates the input tax credit details available to a buyer?",
                options: ["GSTR-1", "GSTR-3B", "GSTR-2B", "Form GST REG-06"],
                answer: 2,
                explanation: "GSTR-2B is a static auto-drafted ITC statement generated monthly for taxpayers based on supplier filings."
            }
        },
        8: {
            title: "Purchase Entry",
            day: "DAY 8",
            objective: "Record a purchase invoice, compute taxes, and update supplier payable balances.",
            theory: "Purchase journal entry: Debit Purchases (Taxable Value), Debit CGST/SGST/IGST Inputs (Tax Amount), Credit Supplier (Invoice Amount). Purchases must be supported by a tax invoice.",
            scenario: "Record the purchase of computer inventory from Zenith Supplies on credit.",
            sampleData: "Supplier: 'Zenith Supplies' (MH)\nInvoice Date: '2026-08-01'\nInvoice No: 'PUR/2026/001'\nItem Name: 'Laptop Computers' (HSN 84713010)\nQuantity: '10'\nRate: 'Rs. 30,000'\nTaxable Value: 'Rs. 3,000,000' -> Wait, sample data says 10 * 30000 = 3,00,000.\nCGST: 'Rs. 27,000' (9%)\nSGST: 'Rs. 27,000' (9%)\nTotal Invoice: 'Rs. 3,54,000'",
            mistakes: "Entering the wrong invoice number, which leads to reconciliation mismatch in GSTR-2B.",
            tips: "Always enter the tax amount matching the vendor's physical invoice.",
            quiz: {
                question: "What is the journal entry for credit purchase of goods subject to CGST & SGST?",
                options: [
                    "Dr Purchase Account, Cr Supplier Account",
                    "Dr Purchase, Dr CGST Input, Dr SGST Input, Cr Supplier Account",
                    "Dr Supplier Account, Cr Purchase Account",
                    "Dr Purchase, Cr Cash Account"
                ],
                answer: 1,
                explanation: "The correct purchase entry debits the Purchase Account (net value) and Tax Ledgers, and credits the Supplier's account."
            }
        },
        9: {
            title: "Sales Entry",
            day: "DAY 9",
            objective: "Generate a B2B sales invoice, calculate output taxes, and post journal ledger effects.",
            theory: "Sales journal: Debit Customer (Invoice Value), Credit Sales Account (Taxable Value), Credit CGST/SGST/IGST Output (Taxes). Outward supplies must populate in GSTR-1.",
            scenario: "Record a B2B sales transaction on credit to customer Apex Enterprises.",
            sampleData: "Customer: 'Apex Enterprises' (MH)\nInvoice Date: '2026-08-05'\nInvoice No: 'INV/2026/001'\nItem Name: 'Laptop Computers' (HSN 84713010)\nQuantity: '5'\nRate: 'Rs. 45,000'\nTaxable Value: 'Rs. 2,25,000'\nCGST: 'Rs. 20,250' (9%)\nSGST: 'Rs. 20,250' (9%)\nTotal Invoice: 'Rs. 2,65,500'",
            mistakes: "Omitting the customer's GSTIN, which treats it as B2C and prevents the customer from claiming ITC.",
            tips: "Generate e-invoice JSON on the ERP and upload it to the IRP portal if aggregate turnover is above threshold.",
            quiz: {
                question: "To enable a buyer to claim Input Tax Credit, under which table must the sale be reported in GSTR-1?",
                options: ["Table 5 (B2C Large)", "Table 4 (B2B Invoices)", "Table 7 (B2C Small)", "Table 11 (Advances)"],
                answer: 1,
                explanation: "B2B sales reported in Table 4 of GSTR-1 are mapped to the buyer's GSTR-2A/2B, enabling them to claim ITC."
            }
        },
        10: {
            title: "Debit Note",
            day: "DAY 10",
            objective: "Issue a debit note for post-sale price increases or sales returns (accounting debit note to vendor).",
            theory: "Under GST, a Debit Note is issued by the supplier to increase tax liability. In internal accounts, a buyer issues a Debit Note to the supplier to record purchase returns, reducing purchase value and ITC.",
            scenario: "Record a purchase return to supplier Zenith Supplies.",
            sampleData: "Supplier: 'Zenith Supplies'\nOriginal Invoice No: 'PUR/2026/001'\nDebit Note No: 'DN/2026/001'\nTaxable Value: 'Rs. 30,000' (1 Computer returned)\nCGST: 'Rs. 2,700'\nSGST: 'Rs. 2,700'\nTotal Amount: 'Rs. 35,400'",
            mistakes: "Not linking the original purchase invoice reference number in the debit note record.",
            tips: "A debit note issued by a supplier increases output liability; a debit note sent to a supplier reduces ITC.",
            quiz: {
                question: "In what case does a buyer issue a Debit Note to a supplier?",
                options: ["When goods are returned to the supplier", "When goods are sold to customers", "When supplier decreases the item price", "When cash is received from clients"],
                answer: 0,
                explanation: "A buyer issues a Debit Note to a supplier for purchase returns to adjust and decrease the account payable balance."
            }
        },
        11: {
            title: "Credit Note",
            day: "DAY 11",
            objective: "Issue a Credit Note to customer for sales return, reducing output tax liability.",
            theory: "A supplier issues a Credit Note under Section 34 of the CGST Act to reduce taxable value or tax amount for sales returns or discounts.",
            scenario: "Issue a credit note to Apex Enterprises for a laptop returned due to transit scratch.",
            sampleData: "Customer: 'Apex Enterprises'\nOriginal Invoice No: 'INV/2026/001'\nCredit Note No: 'CN/2026/001'\nTaxable Value: 'Rs. 45,000' (1 Computer returned)\nCGST: 'Rs. 4,050'\nSGST: 'Rs. 4,050'\nTotal Amount: 'Rs. 53,100'",
            mistakes: "Issuing credit notes without tax adjustment, missing the chance to claim refund of excess output tax.",
            tips: "Declare credit notes in Table 9B of GSTR-1 to reduce output tax liabilities.",
            quiz: {
                question: "What is the maximum time limit to declare a Credit Note in GST returns to reduce tax liability?",
                options: ["Within 30 days", "By 30th November of the next Financial Year", "No time limit", "Before filing GSTR-9 annual return"],
                answer: 1,
                explanation: "A credit note must be declared by 30th November of the following FY or filing of the annual return, whichever is earlier."
            }
        },
        12: {
            title: "Journal Voucher",
            day: "DAY 12",
            objective: "Execute adjustment entries in the General Journal (such as tax liability set-offs).",
            theory: "Journal vouchers record non-cash adjustments. Standard GST offset entry: Debit CGST Output, Debit SGST Output, Credit CGST Input, Credit SGST Input.",
            scenario: "Perform the monthly tax ledger adjustment entry to offset Output CGST & SGST liability against available Input Credit.",
            sampleData: "Debit Ledger: 'CGST Output Ledger' (Rs. 16,200)\nDebit Ledger 2: 'SGST Output Ledger' (Rs. 16,200)\nCredit Ledger: 'CGST Input Ledger' (Rs. 16,200)\nCredit Ledger 2: 'SGST Input Ledger' (Rs. 16,200)\n(Since Input was Rs. 24,300, we offset output fully, leaving Rs. 8,100 ITC carried forward. Net GST payable = Rs. 0)",
            mistakes: "Setting off CGST credit against SGST liability (prohibited by Section 49).",
            tips: "Always utilize IGST credit fully before utilizing CGST and SGST credit.",
            quiz: {
                question: "Which of the following Input Tax Credit (ITC) utilization rules is strictly prohibited?",
                options: ["IGST credit used to offset SGST", "CGST credit used to offset CGST", "CGST credit used to offset SGST", "SGST credit used to offset IGST"],
                answer: 2,
                explanation: "Cross-utilization of CGST credit against SGST liability (and vice versa) is strictly prohibited under the GST Act."
            }
        },
        13: {
            title: "Payment Voucher",
            day: "DAY 13",
            objective: "Record cash/bank cash payments to vendors or government challan payments.",
            theory: "Payment vouchers record cash or bank outflows. Entry: Debit Supplier/Duties & Taxes, Credit Bank/Cash. Payment mode must be specified (Cheque/NEFT/UPI).",
            scenario: "Pay the net outstanding balance to Zenith Supplies via HDFC Bank NEFT.",
            sampleData: "Paid To: 'Zenith Supplies'\nAmount: 'Rs. 3,18,600' (Purchase Invoice Rs. 3,54,000 less return Debit Note Rs. 35,400)\nPaid From: 'HDFC Bank'\nPayment Mode: 'NEFT'\nReference No: 'NEFT987654321'",
            mistakes: "Recording payment from Cash ledger when paying high amounts (Section 40A(3) of Income Tax disallows cash payments above Rs. 10,000).",
            tips: "Maintain the bank statement reconciliation daily to avoid discrepancies.",
            quiz: {
                question: "What is the general limit for cash payments in a single day under tax regulations?",
                options: ["Rs. 5,000", "Rs. 10,000", "Rs. 50,000", "Rs. 2,00,000"],
                answer: 1,
                explanation: "Cash payments to a person in a single day exceeding Rs. 10,000 are disallowed as expenses under Section 40A(3) of the Income Tax Act."
            }
        },
        14: {
            title: "Receipt Voucher",
            day: "DAY 14",
            objective: "Record invoice collection transactions updating customer balances and bank ledgers.",
            theory: "Receipt vouchers record asset inflows. Entry: Debit Bank/Cash, Credit Customer. Advances received are liable to GST for services but exempt for goods.",
            scenario: "Record collection from Apex Enterprises against outstanding sales invoice.",
            sampleData: "Collected From: 'Apex Enterprises'\nAmount: 'Rs. 2,12,400' (Sales Invoice Rs. 2,65,500 less Credit Note Rs. 53,100)\nDeposit To: 'HDFC Bank'\nPayment Mode: 'UPI'\nReference No: 'UPI1122334455'",
            mistakes: "Failing to adjust receipts against specific invoices, leaving records open.",
            tips: "For B2B customers, verify that they receive their invoice copy prior to payment matching.",
            quiz: {
                question: "Under GST, is GST applicable on advance payments received for the supply of goods?",
                options: ["Yes, always", "No, exempted by notification", "Only if invoice exceeds 1 Lakh", "Only if it is an inter-state sale"],
                answer: 1,
                explanation: "GST on advances received for the supply of goods has been exempted by Notification No. 66/2017-Central Tax. However, it is still applicable on services advances."
            }
        },
        15: {
            title: "Expense Entry",
            day: "DAY 15",
            objective: "Record indirect operating expenses (e.g. rent) and claim eligible Input Tax Credit.",
            theory: "Expenses like rent, internet, and consultancy are eligible for ITC if they are used in the course of business and backed by a valid invoice from a registered supplier.",
            scenario: "Book monthly office rent expense paid to commercial landlord Mumbai Realty.",
            sampleData: "Expense Ledger: 'Office Rent'\nSupplier: 'Mumbai Realty' (MH, GSTIN: '27AAAPM3333C1Z3')\nTaxable Value: 'Rs. 20,000'\nCGST: 'Rs. 1,800' (9%)\nSGST: 'Rs. 1,800' (9%)\nPaid From: 'HDFC Bank'\nTotal Amount: 'Rs. 23,600'",
            mistakes: "Claiming ITC on residential accommodation rent (exempted/blocked).",
            tips: "Ensure commercial lease agreements clearly state the landlord's GSTIN details.",
            quiz: {
                question: "Which of the following business expenses is generally ELIGIBLE for claiming Input Tax Credit?",
                options: ["Food and beverages for office party", "Commercial office rent", "Employee life insurance premium", "Membership of a fitness club"],
                answer: 1,
                explanation: "Commercial office rent is an eligible business expense. ITC on food, beverages, insurance, and club memberships is blocked under Section 17(5)."
            }
        },
        16: {
            title: "Asset Purchase",
            day: "DAY 16",
            objective: "Record capitalization of fixed assets and manage Capital Goods Input Tax Credit.",
            theory: "Fixed assets purchases are eligible for ITC. However, if depreciation is claimed on the tax component under the Income Tax Act, ITC cannot be claimed.",
            scenario: "Purchase office computers for business use and claim capital goods ITC.",
            sampleData: "Asset Name: 'Office Computers'\nGroup: 'Fixed Assets'\nSupplier: 'Zenith Supplies'\nInvoice Date: '2026-08-15'\nTaxable Value: 'Rs. 40,000'\nCGST: 'Rs. 3,600' (9%)\nSGST: 'Rs. 3,600' (9%)\nPaid From: 'HDFC Bank'\nTotal Amount: 'Rs. 47,200'",
            mistakes: "Claiming both Income Tax depreciation on GST portion and GST Input Tax Credit concurrently.",
            tips: "Capital goods ITC must be reversed proportionally if the asset is used for both taxable and exempt supplies.",
            quiz: {
                question: "Under Section 16(3), what happens if a taxpayer claims depreciation on the GST amount of a capital asset?",
                options: ["ITC is allowed normally", "ITC is not allowed", "Double ITC is granted", "Late fee is levied"],
                answer: 1,
                explanation: "If depreciation is claimed on the GST component under Income Tax, Input Tax Credit on the said GST component is disallowed."
            }
        },
        17: {
            title: "Import Purchase",
            day: "DAY 17",
            objective: "Record import transactions, compute Customs Duty, and apply Integrated GST (IGST).",
            theory: "Imports are treated as inter-state supplies (IGST). The importer must pay IGST under RCM and pay Customs Duty. The Bill of Entry acts as the tax document for claiming ITC.",
            scenario: "Record import of IT equipment from a US vendor.",
            sampleData: "Supplier: 'US Tech Inc' (Foreign)\nBill of Entry No: 'BE/2026/888'\nInvoice Value: 'Rs. 1,00,000'\nBasic Customs Duty (BCD): 'Rs. 10,000' (10%)\nTaxable Value (for IGST): 'Rs. 1,10,000' (Invoice + BCD)\nIGST: 'Rs. 19,800' (18% on 1,10,000)\nPaid From: 'HDFC Bank'\nTotal Cost Capitalized: 'Rs. 1,10,000' (Taxes claimed as ITC are not capitalized)",
            mistakes: "Computing IGST only on the purchase invoice value without adding Basic Customs Duty (BCD) to the tax base.",
            tips: "Ensure ICEGATE portal is synced to auto-populate Bill of Entry details in GSTR-2B.",
            quiz: {
                question: "Which document serves as the basis for claiming Input Tax Credit on imports of goods?",
                options: ["Commercial Invoice", "Shipping Bill", "Bill of Entry", "Form GSTR-3B"],
                answer: 2,
                explanation: "The Bill of Entry (BoE) filed with Customs is the official tax document used to claim ITC on imported goods."
            }
        },
        18: {
            title: "Export Sale",
            day: "DAY 18",
            objective: "Execute zero-rated exports, complete LUT details, and prepare shipping data.",
            theory: "Exports are 'zero-rated'. Importers can export without tax under a Letter of Undertaking (LUT) or with payment of IGST and claim refund of tax later.",
            scenario: "Record an export sale of software consulting to US client, operating under Letter of Undertaking (LUT).",
            sampleData: "Customer: 'Global Solutions LLC' (US)\nInvoice Date: '2026-08-20'\nInvoice No: 'EXP/2026/001'\nLUT Reference: 'LUT/2026-27/001'\nShipping Bill No: 'SB/99988'\nTaxable Value: 'Rs. 2,00,000'\nIGST Rate: '0%' (LUT Export)\nTotal Invoice: 'Rs. 2,00,000'",
            mistakes: "Charging SGST/CGST on export sales, or exporting without filing LUT first.",
            tips: "LUT must be filed online in Form GST RFD-11 before initiating exports.",
            quiz: {
                question: "Under which form/ref must a taxpayer apply to export goods or services without paying tax?",
                options: ["Form GST REG-01", "Letter of Undertaking (LUT) in RFD-11", "Shipping Bill", "GSTR-1 Table 6"],
                answer: 1,
                explanation: "To export without payment of integrated tax, the exporter must file a Letter of Undertaking (LUT) in Form GST RFD-11."
            }
        }
    };

    // -------------------------------------------------------------------------
    // 3. UI Template Generators
    // -------------------------------------------------------------------------
    function renderStepForm(stepIndex) {
        const container = document.getElementById('dynamicFormContainer');
        if (!container) return;

        let html = '';
        const step = stepsData[stepIndex];

        // Retrieve values if already saved
        const data = loadSavedStepData(stepIndex);

        switch (Number(stepIndex)) {
            case 1: // Create Company
                html = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Company / Business Name *</label>
                            <input type="text" id="biz_name" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.business_name || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Constitution of Business *</label>
                            <select id="biz_constitution" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="">-- Select Constitution --</option>
                                <option value="Proprietorship" ${data.constitution === 'Proprietorship' ? 'selected' : ''}>Proprietorship</option>
                                <option value="Partnership" ${data.constitution === 'Partnership' ? 'selected' : ''}>Partnership</option>
                                <option value="Private Limited Company" ${data.constitution === 'Private Limited Company' ? 'selected' : ''}>Private Limited Company</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">State / Union Territory *</label>
                            <select id="biz_state" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="">-- Select State --</option>
                                <option value="27" ${data.state_code === '27' ? 'selected' : ''}>Maharashtra (27)</option>
                                <option value="07" ${data.state_code === '07' ? 'selected' : ''}>Delhi (07)</option>
                                <option value="29" ${data.state_code === '29' ? 'selected' : ''}>Karnataka (29)</option>
                                <option value="33" ${data.state_code === '33' ? 'selected' : ''}>Tamil Nadu (33)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Permanent Account Number (PAN) *</label>
                            <input type="text" id="biz_pan" maxlength="10" placeholder="e.g. AAAPC1018J" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.pan || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Tax Deduction Account Number (TAN)</label>
                            <input type="text" id="biz_tan" maxlength="10" placeholder="e.g. MUMA12345B" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.tan || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Financial Year (FY) *</label>
                            <input type="text" id="biz_fy" placeholder="2026-27" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.financial_year || '2026-27'}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Business Type *</label>
                            <input type="text" id="biz_type" placeholder="e.g. Retail Trader" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.business_type || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Opening Cash/Bank Balance *</label>
                            <input type="number" id="biz_op_bal" placeholder="500000" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.opening_balance || ''}">
                        </div>
                        <div class="col-span-1 md:col-span-2 border-t pt-3 mt-2">
                            <h4 class="text-xs font-bold text-slate-700 mb-2">Banking Details</h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-[10px] text-slate-500 mb-1">Bank Name</label>
                                    <input type="text" id="biz_bank" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.bank_name || ''}">
                                </div>
                                <div>
                                    <label class="block text-[10px] text-slate-500 mb-1">Account Number</label>
                                    <input type="text" id="biz_ac_no" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.account_no || ''}">
                                </div>
                                <div>
                                    <label class="block text-[10px] text-slate-500 mb-1">IFSC Code</label>
                                    <input type="text" id="biz_ifsc" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.ifsc || ''}">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 2: // Add GST Details
                html = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Company GSTIN *</label>
                            <input type="text" id="gstin" maxlength="15" placeholder="e.g. 27AAAPC1018J1ZR" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.gstin || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Registration Type *</label>
                            <select id="gst_reg_type" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="Regular" ${data.reg_type === 'Regular' ? 'selected' : ''}>Regular Scheme</option>
                                <option value="Composition" ${data.reg_type === 'Composition' ? 'selected' : ''}>Composition Scheme</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Letter of Undertaking (LUT) Reference (If Exporting)</label>
                            <input type="text" id="gst_lut" placeholder="e.g. LUT/2026-27/001" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.lut || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">E-Invoice System Enabled *</label>
                            <select id="gst_einvoice" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="Yes" ${data.einvoice === 'Yes' ? 'selected' : ''}>Yes (API Integration Active)</option>
                                <option value="No" ${data.einvoice === 'No' ? 'selected' : ''}>No</option>
                            </select>
                        </div>
                    </div>
                `;
                break;

            case 3: // Create Ledgers (Form allows multi-adding or guided step list)
                html = `
                    <div class="space-y-4">
                        <p class="text-xs text-slate-500">Create the required Ledgers sequentially. They will appear in the Ledger Balances database list.</p>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 border p-4 bg-slate-50 rounded-lg">
                            <div>
                                <label class="block text-[10px] font-semibold text-slate-600 mb-1">Ledger Name *</label>
                                <input type="text" id="led_name" placeholder="e.g. Capital Account" class="w-full border rounded p-1.5 text-xs outline-none">
                            </div>
                            <div>
                                <label class="block text-[10px] font-semibold text-slate-600 mb-1">Under Account Group *</label>
                                <select id="led_group" class="w-full border rounded p-1.5 text-xs outline-none">
                                    <option value="">-- Select Group --</option>
                                    <option value="Capital Account">Capital Account</option>
                                    <option value="Sales Accounts">Sales Accounts</option>
                                    <option value="Purchase Accounts">Purchase Accounts</option>
                                    <option value="Duties & Taxes">Duties & Taxes</option>
                                    <option value="Direct Expenses">Direct Expenses</option>
                                    <option value="Indirect Expenses">Indirect Expenses</option>
                                    <option value="Fixed Assets">Fixed Assets</option>
                                    <option value="Bank Accounts">Bank Accounts</option>
                                    <option value="Cash-in-hand">Cash-in-hand</option>
                                </select>
                            </div>
                            <div class="flex items-end">
                                <button type="button" onclick="addSimulatorLedger()" class="bg-blue-600 text-white text-xs px-4 py-2 rounded w-full font-bold">Add Ledger</button>
                            </div>
                        </div>
                        <div class="border rounded overflow-hidden">
                            <table class="w-full text-left text-xs border-collapse">
                                <thead class="bg-slate-200">
                                    <tr>
                                        <th class="p-2">Ledger Name</th>
                                        <th class="p-2">Group</th>
                                        <th class="p-2 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="createdLedgersList">
                                    <!-- Rendered dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
                break;

            case 4: // HSN Master
                html = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">HSN Classification Code *</label>
                            <input type="text" id="hsn_code" maxlength="8" placeholder="e.g. 84713010" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.name_or_code || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Item Description *</label>
                            <input type="text" id="hsn_desc" placeholder="e.g. Laptop Computers" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.description || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">GST Tax Rate *</label>
                            <select id="hsn_rate" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="">-- Select Rate --</option>
                                <option value="5" ${data.rate == 5 ? 'selected' : ''}>5%</option>
                                <option value="12" ${data.rate == 12 ? 'selected' : ''}>12%</option>
                                <option value="18" ${data.rate == 18 ? 'selected' : ''}>18%</option>
                                <option value="28" ${data.rate == 28 ? 'selected' : ''}>28%</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Unit Quantity Code (UQC) *</label>
                            <select id="hsn_uqc" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="PCS" ${data.uqc === 'PCS' ? 'selected' : ''}>PCS (Pieces)</option>
                                <option value="KGS" ${data.uqc === 'KGS' ? 'selected' : ''}>KGS (Kilograms)</option>
                                <option value="NOS" ${data.uqc === 'NOS' ? 'selected' : ''}>NOS (Numbers)</option>
                            </select>
                        </div>
                    </div>
                `;
                break;

            case 5: // SAC Master
                html = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">SAC Code *</label>
                            <input type="text" id="sac_code" maxlength="6" placeholder="e.g. 998311" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.name_or_code || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Service Description *</label>
                            <input type="text" id="sac_desc" placeholder="e.g. Software Integration Consulting" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.description || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">GST Tax Rate *</label>
                            <select id="sac_rate" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="">-- Select Rate --</option>
                                <option value="5" ${data.rate == 5 ? 'selected' : ''}>5%</option>
                                <option value="12" ${data.rate == 12 ? 'selected' : ''}>12%</option>
                                <option value="18" ${data.rate == 18 ? 'selected' : ''}>18%</option>
                                <option value="28" ${data.rate == 28 ? 'selected' : ''}>28%</option>
                            </select>
                        </div>
                    </div>
                `;
                break;

            case 6: // Customer Master
                html = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Customer / Debtor Name *</label>
                            <input type="text" id="cust_name" placeholder="e.g. Apex Enterprises" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.name_or_code || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">GSTIN *</label>
                            <input type="text" id="cust_gstin" maxlength="15" placeholder="e.g. 27AAACA1111A1Z1" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.gstin || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Customer State Code *</label>
                            <select id="cust_state" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="">-- Select State --</option>
                                <option value="27" ${data.state_code === '27' ? 'selected' : ''}>Maharashtra (27)</option>
                                <option value="07" ${data.state_code === '07' ? 'selected' : ''}>Delhi (07)</option>
                                <option value="29" ${data.state_code === '29' ? 'selected' : ''}>Karnataka (29)</option>
                                <option value="33" ${data.state_code === '33' ? 'selected' : ''}>Tamil Nadu (33)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Credit Limit (INR)</label>
                            <input type="number" id="cust_credit" placeholder="200000" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.credit_limit || ''}">
                        </div>
                        <div class="col-span-1 md:col-span-2">
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Registered Address *</label>
                            <textarea id="cust_addr" rows="2" placeholder="Corporate address" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">${data.address || ''}</textarea>
                        </div>
                    </div>
                `;
                break;

            case 7: // Supplier Master
                html = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Supplier / Creditor Name *</label>
                            <input type="text" id="supp_name" placeholder="e.g. Zenith Supplies" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.name_or_code || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">GSTIN *</label>
                            <input type="text" id="supp_gstin" maxlength="15" placeholder="e.g. 27AAAPA2222B1Z2" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.gstin || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Supplier State Code *</label>
                            <select id="supp_state" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="">-- Select State --</option>
                                <option value="27" ${data.state_code === '27' ? 'selected' : ''}>Maharashtra (27)</option>
                                <option value="07" ${data.state_code === '07' ? 'selected' : ''}>Delhi (07)</option>
                                <option value="29" ${data.state_code === '29' ? 'selected' : ''}>Karnataka (29)</option>
                                <option value="33" ${data.state_code === '33' ? 'selected' : ''}>Tamil Nadu (33)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Credit Limit (INR)</label>
                            <input type="number" id="supp_credit" placeholder="500000" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.credit_limit || ''}">
                        </div>
                        <div class="col-span-1 md:col-span-2">
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Registered Address *</label>
                            <textarea id="supp_addr" rows="2" placeholder="Factory / Office address" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">${data.address || ''}</textarea>
                        </div>
                    </div>
                `;
                break;

            case 8: // Purchase Entry
            case 9: // Sales Entry
            case 10: // Debit Note
            case 11: // Credit Note
            case 15: // Expense Entry
            case 16: // Asset Purchase
            case 17: // Import Purchase
            case 18: // Export Sale
                html = renderVoucherForm(stepIndex, data);
                break;

            case 12: // Journal Voucher (GST Offset Entry)
                html = `
                    <div class="space-y-4">
                        <p class="text-xs text-slate-500 font-mono">Create manual journal entries to offset Output GST liability against Input Tax Credit (ITC).</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 bg-slate-50 rounded-lg">
                            <div>
                                <h4 class="text-xs font-bold text-slate-700 mb-2 border-b pb-1">1. Debit Adjustment (Dr)</h4>
                                <div class="space-y-2">
                                    <div>
                                        <label class="block text-[10px] text-slate-500">CGST Output Account *</label>
                                        <input type="number" id="jv_dr_cgst" placeholder="16200" class="w-full border rounded p-1.5 text-xs outline-none">
                                    </div>
                                    <div>
                                        <label class="block text-[10px] text-slate-500">SGST Output Account *</label>
                                        <input type="number" id="jv_dr_sgst" placeholder="16200" class="w-full border rounded p-1.5 text-xs outline-none">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 class="text-xs font-bold text-slate-700 mb-2 border-b pb-1">2. Credit Adjustment (Cr)</h4>
                                <div class="space-y-2">
                                    <div>
                                        <label class="block text-[10px] text-slate-500">CGST Input Account *</label>
                                        <input type="number" id="jv_cr_cgst" placeholder="16200" class="w-full border rounded p-1.5 text-xs outline-none">
                                    </div>
                                    <div>
                                        <label class="block text-[10px] text-slate-500">SGST Input Account *</label>
                                        <input type="number" id="jv_cr_sgst" placeholder="16200" class="w-full border rounded p-1.5 text-xs outline-none">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 13: // Payment Voucher
                html = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Paid To / Debited Account *</label>
                            <select id="pay_party" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="">-- Select Party --</option>
                                <option value="Zenith Supplies" ${data.party === 'Zenith Supplies' ? 'selected' : ''}>Zenith Supplies</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Amount Paid (Rs.) *</label>
                            <input type="number" id="pay_amount" placeholder="318600" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.amount || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Paid From / Asset Account *</label>
                            <select id="pay_from" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="HDFC Bank" ${data.pay_from === 'HDFC Bank' ? 'selected' : ''}>HDFC Bank Ledger</option>
                                <option value="Cash Account" ${data.pay_from === 'Cash Account' ? 'selected' : ''}>Cash Ledger</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Payment Mode *</label>
                            <select id="pay_mode" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="NEFT" ${data.pay_mode === 'NEFT' ? 'selected' : ''}>NEFT / RTGS</option>
                                <option value="Cheque" ${data.pay_mode === 'Cheque' ? 'selected' : ''}>Cheque</option>
                                <option value="UPI" ${data.pay_mode === 'UPI' ? 'selected' : ''}>UPI / Netbanking</option>
                                <option value="Cash" ${data.pay_mode === 'Cash' ? 'selected' : ''}>Cash Payment</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Reference / UTR Number *</label>
                            <input type="text" id="pay_ref" placeholder="NEFT987654321" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.ref_no || ''}">
                        </div>
                    </div>
                `;
                break;

            case 14: // Receipt Voucher
                html = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Received From / Credited Account *</label>
                            <select id="rec_party" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="">-- Select Party --</option>
                                <option value="Apex Enterprises" ${data.party === 'Apex Enterprises' ? 'selected' : ''}>Apex Enterprises</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Amount Received (Rs.) *</label>
                            <input type="number" id="rec_amount" placeholder="212400" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.amount || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Deposit To / Asset Account *</label>
                            <select id="rec_to" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="HDFC Bank" ${data.rec_to === 'HDFC Bank' ? 'selected' : ''}>HDFC Bank Ledger</option>
                                <option value="Cash Account" ${data.rec_to === 'Cash Account' ? 'selected' : ''}>Cash Ledger</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Receipt Mode *</label>
                            <select id="rec_mode" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                                <option value="UPI" ${data.rec_mode === 'UPI' ? 'selected' : ''}>UPI / QR Code</option>
                                <option value="Cheque" ${data.rec_mode === 'Cheque' ? 'selected' : ''}>Cheque</option>
                                <option value="NEFT" ${data.rec_mode === 'NEFT' ? 'selected' : ''}>NEFT Transfer</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Reference / Transaction ID *</label>
                            <input type="text" id="rec_ref" placeholder="UPI1122334455" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.ref_no || ''}">
                        </div>
                    </div>
                `;
                break;
        }

        container.innerHTML = html;
        attachFormChangeListeners(stepIndex);
        updateJournalPreview(stepIndex);
    }

    // Modular generic voucher form renderer
    function renderVoucherForm(stepIndex, data) {
        const step = stepsData[stepIndex];
        const isSales = stepIndex === 9 || stepIndex === 11 || stepIndex === 18;
        const isNote = stepIndex === 10 || stepIndex === 11;
        const isAsset = stepIndex === 16;
        const isImport = stepIndex === 17;
        const isExport = stepIndex === 18;
        const isExpense = stepIndex === 15;

        // Custom selects
        let partyLabel = isSales ? "Customer / Debtor" : "Supplier / Creditor";
        let partyOptionHtml = '';
        if (isSales) {
            partyOptionHtml = `<option value="Apex Enterprises" ${data.party === 'Apex Enterprises' ? 'selected' : ''}>Apex Enterprises (MH)</option>`;
            if (isExport) {
                partyOptionHtml += `<option value="Global Solutions LLC" ${data.party === 'Global Solutions LLC' ? 'selected' : ''}>Global Solutions LLC (US Export)</option>`;
            }
        } else {
            partyOptionHtml = `<option value="Zenith Supplies" ${data.party === 'Zenith Supplies' ? 'selected' : ''}>Zenith Supplies (MH)</option>`;
            if (isImport) {
                partyOptionHtml += `<option value="US Tech Inc" ${data.party === 'US Tech Inc' ? 'selected' : ''}>US Tech Inc (US Import)</option>`;
            }
            if (isExpense) {
                partyOptionHtml = `<option value="Mumbai Realty" ${data.party === 'Mumbai Realty' ? 'selected' : ''}>Mumbai Realty (Landlord)</option>`;
            }
        }

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">${partyLabel} *</label>
                    <select id="v_party" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                        <option value="">-- Select Party --</option>
                        ${partyOptionHtml}
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Voucher Date *</label>
                    <input type="date" id="v_date" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.date || '2026-08-01'}">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Voucher / Invoice No *</label>
                    <input type="text" id="v_no" placeholder="e.g. INV/2026/001" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.invoice_no || ''}">
                </div>
                ${isNote ? `
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Original Invoice Reference *</label>
                    <input type="text" id="v_orig_ref" placeholder="Original Invoice No" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.orig_invoice_no || ''}">
                </div>
                ` : ''}
                ${isImport ? `
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Bill of Entry Number *</label>
                    <input type="text" id="v_boe_no" placeholder="e.g. BE/2026/888" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.boe_no || ''}">
                </div>
                ` : ''}
                ${isExport ? `
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Shipping Bill Number *</label>
                    <input type="text" id="v_sb_no" placeholder="e.g. SB/99988" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.sb_no || ''}">
                </div>
                ` : ''}
                
                <div class="col-span-1 md:col-span-2 border-t pt-3 mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Taxable Value / Cost (INR) *</label>
                        <input type="number" id="v_taxable" placeholder="e.g. 225000" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.taxable_value || ''}">
                    </div>
                    ${isImport ? `
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Basic Customs Duty (INR) *</label>
                        <input type="number" id="v_bcd" placeholder="10000" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value="${data.bcd || ''}">
                    </div>
                    ` : ''}
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">GST Tax Rate *</label>
                        <select id="v_rate" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                            <option value="18" ${data.gst_rate == 18 ? 'selected' : ''}>18%</option>
                            <option value="12" ${data.gst_rate == 12 ? 'selected' : ''}>12%</option>
                            <option value="5" ${data.gst_rate == 5 ? 'selected' : ''}>5%</option>
                            <option value="0" ${data.gst_rate == 0 ? 'selected' : ''}>0% (LUT / Exempt)</option>
                        </select>
                    </div>
                    ${isAsset ? `
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Claim Input Credit (ITC)? *</label>
                        <select id="v_itc_eligible" class="w-full border rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                            <option value="Yes" ${data.itc_eligible === 'Yes' ? 'selected' : ''}>Yes, Claim ITC</option>
                            <option value="No" ${data.itc_eligible === 'No' ? 'selected' : ''}>No (Capitalize fully)</option>
                        </select>
                    </div>
                    ` : ''}
                </div>

                <div class="col-span-1 md:col-span-2 bg-slate-50 border p-3 rounded-lg flex justify-between items-center text-xs font-mono">
                    <div>
                        <span class="font-bold text-slate-600">Calculated GST:</span>
                        <span id="v_calc_gst" class="text-blue-700 font-bold ml-1">Rs. 0.00</span>
                    </div>
                    <div>
                        <span class="font-bold text-slate-600">Total Invoice Amount:</span>
                        <span id="v_calc_total" class="text-slate-900 font-bold ml-1">Rs. 0.00</span>
                    </div>
                </div>
            </div>
        `;
    }

    // -------------------------------------------------------------------------
    // 4. Validation Engine & Live Journal Generator
    // -------------------------------------------------------------------------
    function attachFormChangeListeners(stepIndex) {
        const taxableEl = document.getElementById('v_taxable');
        const bcdEl = document.getElementById('v_bcd');
        const rateEl = document.getElementById('v_rate');
        const partyEl = document.getElementById('v_party');

        const callback = () => {
            updateLiveCalculations(stepIndex);
            updateJournalPreview(stepIndex);
        };

        if (taxableEl) taxableEl.addEventListener('input', callback);
        if (bcdEl) bcdEl.addEventListener('input', callback);
        if (rateEl) rateEl.addEventListener('change', callback);
        if (partyEl) partyEl.addEventListener('change', callback);

        // Simple forms
        const bizNameEl = document.getElementById('biz_name');
        if (bizNameEl) {
            document.querySelectorAll('input, select').forEach(el => {
                el.addEventListener('input', () => updateJournalPreview(stepIndex));
                el.addEventListener('change', () => updateJournalPreview(stepIndex));
            });
        }
    }

    function updateLiveCalculations(stepIndex) {
        const taxableVal = Number(document.getElementById('v_taxable')?.value) || 0;
        const bcdVal = Number(document.getElementById('v_bcd')?.value) || 0;
        const rateVal = Number(document.getElementById('v_rate')?.value) || 0;

        const totalTaxable = taxableVal + bcdVal;
        const gstAmount = (totalTaxable * rateVal) / 100;
        const totalInvoice = totalTaxable + gstAmount;

        const gstEl = document.getElementById('v_calc_gst');
        const totalEl = document.getElementById('v_calc_total');

        if (gstEl) gstEl.textContent = app.formatINR(gstAmount);
        if (totalEl) totalEl.textContent = app.formatINR(totalInvoice);
    }

    function getFormValues(stepIndex) {
        switch (Number(stepIndex)) {
            case 1:
                return {
                    business_name: document.getElementById('biz_name')?.value.trim(),
                    constitution: document.getElementById('biz_constitution')?.value,
                    state_code: document.getElementById('biz_state')?.value,
                    pan: document.getElementById('biz_pan')?.value.trim().toUpperCase(),
                    tan: document.getElementById('biz_tan')?.value.trim().toUpperCase(),
                    financial_year: document.getElementById('biz_fy')?.value.trim(),
                    business_type: document.getElementById('biz_type')?.value.trim(),
                    opening_balance: Number(document.getElementById('biz_op_bal')?.value) || 0,
                    bank_name: document.getElementById('biz_bank')?.value.trim(),
                    account_no: document.getElementById('biz_ac_no')?.value.trim(),
                    ifsc: document.getElementById('biz_ifsc')?.value.trim().toUpperCase()
                };
            case 2:
                return {
                    gstin: document.getElementById('gstin')?.value.trim().toUpperCase(),
                    reg_type: document.getElementById('gst_reg_type')?.value,
                    lut: document.getElementById('gst_lut')?.value.trim(),
                    einvoice: document.getElementById('gst_einvoice')?.value
                };
            case 4:
                return {
                    name_or_code: document.getElementById('hsn_code')?.value.trim(),
                    description: document.getElementById('hsn_desc')?.value.trim(),
                    rate: Number(document.getElementById('hsn_rate')?.value) || 0,
                    uqc: document.getElementById('hsn_uqc')?.value
                };
            case 5:
                return {
                    name_or_code: document.getElementById('sac_code')?.value.trim(),
                    description: document.getElementById('sac_desc')?.value.trim(),
                    rate: Number(document.getElementById('sac_rate')?.value) || 0
                };
            case 6:
                return {
                    name_or_code: document.getElementById('cust_name')?.value.trim(),
                    gstin: document.getElementById('cust_gstin')?.value.trim().toUpperCase(),
                    state_code: document.getElementById('cust_state')?.value,
                    credit_limit: Number(document.getElementById('cust_credit')?.value) || 0,
                    address: document.getElementById('cust_addr')?.value.trim()
                };
            case 7:
                return {
                    name_or_code: document.getElementById('supp_name')?.value.trim(),
                    gstin: document.getElementById('supp_gstin')?.value.trim().toUpperCase(),
                    state_code: document.getElementById('supp_state')?.value,
                    credit_limit: Number(document.getElementById('supp_credit')?.value) || 0,
                    address: document.getElementById('supp_addr')?.value.trim()
                };
            case 8:
            case 9:
            case 10:
            case 11:
            case 15:
            case 16:
            case 17:
            case 18:
                const tax = Number(document.getElementById('v_taxable')?.value) || 0;
                const bcd = Number(document.getElementById('v_bcd')?.value) || 0;
                const rate = Number(document.getElementById('v_rate')?.value) || 0;
                return {
                    party: document.getElementById('v_party')?.value,
                    date: document.getElementById('v_date')?.value,
                    invoice_no: document.getElementById('v_no')?.value.trim(),
                    orig_invoice_no: document.getElementById('v_orig_ref')?.value?.trim(),
                    boe_no: document.getElementById('v_boe_no')?.value?.trim(),
                    sb_no: document.getElementById('v_sb_no')?.value?.trim(),
                    taxable_value: tax,
                    bcd: bcd,
                    gst_rate: rate,
                    itc_eligible: document.getElementById('v_itc_eligible')?.value
                };
            case 12:
                return {
                    dr_cgst: Number(document.getElementById('jv_dr_cgst')?.value) || 0,
                    dr_sgst: Number(document.getElementById('jv_dr_sgst')?.value) || 0,
                    cr_cgst: Number(document.getElementById('jv_cr_cgst')?.value) || 0,
                    cr_sgst: Number(document.getElementById('jv_cr_sgst')?.value) || 0
                };
            case 13:
                return {
                    party: document.getElementById('pay_party')?.value,
                    amount: Number(document.getElementById('pay_amount')?.value) || 0,
                    pay_from: document.getElementById('pay_from')?.value,
                    pay_mode: document.getElementById('pay_mode')?.value,
                    ref_no: document.getElementById('pay_ref')?.value.trim()
                };
            case 14:
                return {
                    party: document.getElementById('rec_party')?.value,
                    amount: Number(document.getElementById('rec_amount')?.value) || 0,
                    rec_to: document.getElementById('rec_to')?.value,
                    rec_mode: document.getElementById('rec_mode')?.value,
                    ref_no: document.getElementById('rec_ref')?.value.trim()
                };
        }
        return {};
    }

    function updateJournalPreview(stepIndex) {
        const jList = document.getElementById('journalEntriesList');
        if (!jList) return;

        const val = getFormValues(stepIndex);
        let entries = [];

        switch (Number(stepIndex)) {
            case 1: // Create Company
                if (val.business_name && val.opening_balance) {
                    entries.push({ acc: `Bank/Cash Account (${val.bank_name || 'Cash'})`, dr: val.opening_balance, cr: 0, tax: '' });
                    entries.push({ acc: "Partner's Capital Account", dr: 0, cr: val.opening_balance, tax: '' });
                }
                break;
            case 8: // Purchase
                if (val.party && val.taxable_value) {
                    const gst = (val.taxable_value * val.gst_rate) / 100;
                    entries.push({ acc: "Purchase Account", dr: val.taxable_value, cr: 0, tax: '' });
                    entries.push({ acc: "CGST Input Tax Ledger", dr: gst / 2, cr: 0, tax: '9%' });
                    entries.push({ acc: "SGST Input Tax Ledger", dr: gst / 2, cr: 0, tax: '9%' });
                    entries.push({ acc: `Sundry Creditor (${val.party})`, dr: 0, cr: val.taxable_value + gst, tax: '' });
                }
                break;
            case 9: // Sales
                if (val.party && val.taxable_value) {
                    const gst = (val.taxable_value * val.gst_rate) / 100;
                    entries.push({ acc: `Sundry Debtor (${val.party})`, dr: val.taxable_value + gst, cr: 0, tax: '' });
                    entries.push({ acc: "Sales Account", dr: 0, cr: val.taxable_value, tax: '' });
                    entries.push({ acc: "CGST Output Tax Ledger", dr: 0, cr: gst / 2, tax: '9%' });
                    entries.push({ acc: "SGST Output Tax Ledger", dr: 0, cr: gst / 2, tax: '9%' });
                }
                break;
            case 10: // Debit Note
                if (val.party && val.taxable_value) {
                    const gst = (val.taxable_value * val.gst_rate) / 100;
                    entries.push({ acc: `Sundry Creditor (${val.party})`, dr: val.taxable_value + gst, cr: 0, tax: '' });
                    entries.push({ acc: "Purchase Return Account", dr: 0, cr: val.taxable_value, tax: '' });
                    entries.push({ acc: "CGST Input Tax Ledger (Reversed)", dr: 0, cr: gst / 2, tax: '9%' });
                    entries.push({ acc: "SGST Input Tax Ledger (Reversed)", dr: 0, cr: gst / 2, tax: '9%' });
                }
                break;
            case 11: // Credit Note
                if (val.party && val.taxable_value) {
                    const gst = (val.taxable_value * val.gst_rate) / 100;
                    entries.push({ acc: "Sales Return Account", dr: val.taxable_value, cr: 0, tax: '' });
                    entries.push({ acc: "CGST Output Tax Ledger (Reduced)", dr: gst / 2, cr: 0, tax: '9%' });
                    entries.push({ acc: "SGST Output Tax Ledger (Reduced)", dr: gst / 2, cr: 0, tax: '9%' });
                    entries.push({ acc: `Sundry Debtor (${val.party})`, dr: 0, cr: val.taxable_value + gst, tax: '' });
                }
                break;
            case 12: // JV GST Offset
                if (val.dr_cgst || val.dr_sgst) {
                    entries.push({ acc: "CGST Output Tax Ledger", dr: val.dr_cgst, cr: 0, tax: '' });
                    entries.push({ acc: "SGST Output Tax Ledger", dr: val.dr_sgst, cr: 0, tax: '' });
                    entries.push({ acc: "CGST Input Tax Ledger", dr: 0, cr: val.cr_cgst, tax: '' });
                    entries.push({ acc: "SGST Input Tax Ledger", dr: 0, cr: val.cr_sgst, tax: '' });
                }
                break;
            case 13: // Payment
                if (val.party && val.amount) {
                    entries.push({ acc: `Sundry Creditor / Liability (${val.party})`, dr: val.amount, cr: 0, tax: '' });
                    entries.push({ acc: `Bank/Cash Ledger (${val.pay_from})`, dr: 0, cr: val.amount, tax: '' });
                }
                break;
            case 14: // Receipt
                if (val.party && val.amount) {
                    entries.push({ acc: `Bank/Cash Ledger (${val.rec_to})`, dr: val.amount, cr: 0, tax: '' });
                    entries.push({ acc: `Sundry Debtor (${val.party})`, dr: 0, cr: val.amount, tax: '' });
                }
                break;
            case 15: // Expense rent
                if (val.party && val.taxable_value) {
                    const gst = (val.taxable_value * val.gst_rate) / 100;
                    entries.push({ acc: "Office Rent Expense Account", dr: val.taxable_value, cr: 0, tax: '' });
                    entries.push({ acc: "CGST Input Tax Ledger", dr: gst / 2, cr: 0, tax: '9%' });
                    entries.push({ acc: "SGST Input Tax Ledger", dr: gst / 2, cr: 0, tax: '9%' });
                    entries.push({ acc: `Bank Ledger (${val.itc_eligible || 'HDFC Bank'})`, dr: 0, cr: val.taxable_value + gst, tax: '' });
                }
                break;
            case 16: // Asset Computers
                if (val.party && val.taxable_value) {
                    const gst = (val.taxable_value * val.gst_rate) / 100;
                    entries.push({ acc: "Office Computers (Fixed Asset)", dr: val.taxable_value, cr: 0, tax: '' });
                    if (val.itc_eligible === 'Yes') {
                        entries.push({ acc: "CGST Input Tax Ledger", dr: gst / 2, cr: 0, tax: '9%' });
                        entries.push({ acc: "SGST Input Tax Ledger", dr: gst / 2, cr: 0, tax: '9%' });
                        entries.push({ acc: "Bank Account (HDFC)", dr: 0, cr: val.taxable_value + gst, tax: '' });
                    } else {
                        entries.push({ acc: "Bank Account (HDFC)", dr: 0, cr: val.taxable_value, tax: '' });
                    }
                }
                break;
            case 17: // Import Purchase
                if (val.party && val.taxable_value) {
                    const total_tax_val = val.taxable_value + val.bcd;
                    const igst = (total_tax_val * val.gst_rate) / 100;
                    entries.push({ acc: "IT Equipment / Purchases", dr: val.taxable_value, cr: 0, tax: '' });
                    entries.push({ acc: "Basic Customs Duty Expenses", dr: val.bcd, cr: 0, tax: '' });
                    entries.push({ acc: "IGST Input Tax Ledger (RCM)", dr: igst, cr: 0, tax: '18%' });
                    entries.push({ acc: "Bank Account (HDFC) / Creditor", dr: 0, cr: val.taxable_value + val.bcd + igst, tax: '' });
                }
                break;
            case 18: // Export LUT
                if (val.party && val.taxable_value) {
                    entries.push({ acc: `Foreign Sundry Debtor (${val.party})`, dr: val.taxable_value, cr: 0, tax: '' });
                    entries.push({ acc: "Sales Account (Exports Zero-Rated)", dr: 0, cr: val.taxable_value, tax: '' });
                }
                break;
        }

        if (entries.length === 0) {
            jList.innerHTML = `<span class="text-slate-500 text-center italic">No transaction data entered yet.</span>`;
            return;
        }

        jList.innerHTML = entries.map(ent => `
            <div class="grid grid-cols-12 ${ent.dr > 0 ? '' : 'text-slate-300 pl-4'} border-b border-slate-800/40 py-1">
                <div class="col-span-6 font-semibold">${ent.acc}</div>
                <div class="col-span-2 text-right text-emerald-400">${ent.dr > 0 ? app.formatINR(ent.dr) : '-'}</div>
                <div class="col-span-2 text-right text-amber-400">${ent.cr > 0 ? app.formatINR(ent.cr) : '-'}</div>
                <div class="col-span-2 text-right text-slate-500">${ent.tax || '-'}</div>
            </div>
        `).join('');
    }

    // -------------------------------------------------------------------------
    // 5. Scenario Matching & Step Completion Logic
    // -------------------------------------------------------------------------
    function validateStepInput(stepIndex) {
        const val = getFormValues(stepIndex);
        let error = '';

        switch (Number(stepIndex)) {
            case 1:
                if (!val.business_name || val.business_name.toLowerCase() !== 'apex trading corp') {
                    error = "Validation Error: Business Name must match the sample scenario ('Apex Trading Corp').";
                } else if (val.constitution !== 'Proprietorship') {
                    error = "Validation Error: Please select 'Proprietorship' as constitution.";
                } else if (val.state_code !== '27') {
                    error = "Validation Error: Principal State must be Maharashtra (Code 27).";
                } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.pan)) {
                    error = "Validation Error: Invalid PAN format. Expected: AAAAA9999A (e.g. AAAPC1018J).";
                } else if (val.pan !== 'AAAPC1018J') {
                    error = "Validation Error: PAN must be 'AAAPC1018J' as per scenario.";
                } else if (val.opening_balance !== 500000) {
                    error = "Validation Error: Opening cash balance must be exactly 5,00,000.";
                }
                break;
            case 2:
                if (val.gstin !== '27AAAPC1018J1ZR') {
                    error = "Validation Error: GSTIN must be exactly '27AAAPC1018J1ZR' (Maharashtra state code + PAN + entity digits).";
                } else if (val.reg_type !== 'Regular') {
                    error = "Validation Error: Select 'Regular' registration type.";
                }
                break;
            case 3:
                // Ledgers must contain Capital, Sales, Purchase, CGST/SGST/IGST
                const hasCapital = state.ledgers.some(l => l.group_name === 'Capital Account');
                const hasSales = state.ledgers.some(l => l.group_name === 'Sales Accounts');
                const hasPurchase = state.ledgers.some(l => l.group_name === 'Purchase Accounts');
                const hasDuties = state.ledgers.some(l => l.group_name === 'Duties & Taxes');
                if (!hasCapital || !hasSales || !hasPurchase || !hasDuties) {
                    error = "Validation Error: Please configure all ledgers as per the sample dataset list (Capital, Sales, Purchase, and Duties ledgers).";
                }
                break;
            case 4:
                if (val.name_or_code !== '84713010') {
                    error = "Validation Error: HSN Code must be '84713010'.";
                } else if (val.rate !== 18) {
                    error = "Validation Error: GST Rate for computers must be 18%.";
                }
                break;
            case 5:
                if (val.name_or_code !== '998311') {
                    error = "Validation Error: SAC Code must be '998311' for IT Consulting.";
                } else if (val.rate !== 18) {
                    error = "Validation Error: Service tax rate must be 18%.";
                }
                break;
            case 6:
                if (val.name_or_code.toLowerCase() !== 'apex enterprises') {
                    error = "Validation Error: Customer Name must be 'Apex Enterprises'.";
                } else if (val.gstin !== '27AAACA1111A1Z1') {
                    error = "Validation Error: Customer GSTIN must be '27AAACA1111A1Z1'.";
                } else if (val.state_code !== '27') {
                    error = "Validation Error: Customer State must be Maharashtra.";
                }
                break;
            case 7:
                if (val.name_or_code.toLowerCase() !== 'zenith supplies') {
                    error = "Validation Error: Supplier Name must be 'Zenith Supplies'.";
                } else if (val.gstin !== '27AAAPA2222B1Z2') {
                    error = "Validation Error: Supplier GSTIN must be '27AAAPA2222B1Z2'.";
                } else if (val.state_code !== '27') {
                    error = "Validation Error: Supplier State must be Maharashtra.";
                }
                break;
            case 8: // Purchase
                if (val.party !== 'Zenith Supplies') {
                    error = "Validation Error: Select vendor 'Zenith Supplies'.";
                } else if (val.taxable_value !== 300000) {
                    error = "Validation Error: Taxable value must be 3,00,000 (10 computers * Rs. 30,000).";
                } else if (val.gst_rate !== 18) {
                    error = "Validation Error: Select HSN 18% GST rate.";
                }
                break;
            case 9: // Sales
                if (val.party !== 'Apex Enterprises') {
                    error = "Validation Error: Select customer 'Apex Enterprises'.";
                } else if (val.taxable_value !== 225000) {
                    error = "Validation Error: Taxable value must be 2,25,000 (5 computers * Rs. 45,000).";
                } else if (val.gst_rate !== 18) {
                    error = "Validation Error: Select HSN 18% GST rate.";
                }
                break;
            case 10: // Debit Note
                if (val.party !== 'Zenith Supplies') {
                    error = "Validation Error: Select Supplier 'Zenith Supplies'.";
                } else if (val.taxable_value !== 30000) {
                    error = "Validation Error: Taxable value must be 30,000 (1 computer returned).";
                }
                break;
            case 11: // Credit Note
                if (val.party !== 'Apex Enterprises') {
                    error = "Validation Error: Select Customer 'Apex Enterprises'.";
                } else if (val.taxable_value !== 45000) {
                    error = "Validation Error: Taxable value must be 45,000 (1 computer returned).";
                }
                break;
            case 12: // JV offset
                if (val.dr_cgst !== 16200 || val.dr_sgst !== 16200 || val.cr_cgst !== 16200 || val.cr_sgst !== 16200) {
                    error = "Validation Error: Adjust liability fully. CGST/SGST offset value must be exactly 16,200.";
                }
                break;
            case 13: // Payment
                if (val.party !== 'Zenith Supplies') {
                    error = "Validation Error: Select party 'Zenith Supplies'.";
                } else if (val.amount !== 318600) {
                    error = "Validation Error: Amount must be exactly 3,18,600 (Net outstanding).";
                }
                break;
            case 14: // Receipt
                if (val.party !== 'Apex Enterprises') {
                    error = "Validation Error: Select Customer 'Apex Enterprises'.";
                } else if (val.amount !== 212400) {
                    error = "Validation Error: Receipt amount must be exactly 2,12,400 (Net collection).";
                }
                break;
            case 15: // Expense Rent
                if (val.party !== 'Mumbai Realty') {
                    error = "Validation Error: Select landlord 'Mumbai Realty'.";
                } else if (val.taxable_value !== 20000) {
                    error = "Validation Error: Taxable rent value must be 20,000.";
                }
                break;
            case 16: // Asset computers
                if (val.taxable_value !== 40000) {
                    error = "Validation Error: Taxable equipment purchase cost must be 40,000.";
                } else if (val.itc_eligible !== 'Yes') {
                    error = "Validation Error: Claim ITC under Capital Goods ('Yes').";
                }
                break;
            case 17: // Import purchase
                if (val.party !== 'US Tech Inc') {
                    error = "Validation Error: Select foreign supplier 'US Tech Inc'.";
                } else if (val.taxable_value !== 100000) {
                    error = "Validation Error: Import purchase cost must be 1,00,000.";
                } else if (val.bcd !== 10000) {
                    error = "Validation Error: Basic Customs Duty must be 10,000 (10%).";
                }
                break;
            case 18: // Export
                if (val.party !== 'Global Solutions LLC') {
                    error = "Validation Error: Select customer 'Global Solutions LLC'.";
                } else if (val.taxable_value !== 200000) {
                    error = "Validation Error: Export invoice value must be 2,00,000.";
                } else if (val.gst_rate !== 0) {
                    error = "Validation Error: LUT export rate must be 0%.";
                }
                break;
        }

        if (error) {
            alert(error);
            return false;
        }

        // Validate quiz first
        if (!validateQuizSelection()) {
            alert("Topic Assessment Required: Please select the correct MCQ answer in the assessment card first!");
            return false;
        }

        return true;
    }

    function validateQuizSelection() {
        const selected = document.querySelector('input[name="quizOpt"]:checked');
        if (!selected) return false;

        const qIdx = Number(selected.value);
        const correct = stepsData[state.currentStep].quiz.answer;
        const feedback = document.getElementById('quizFeedback');

        if (qIdx === correct) {
            if (feedback) {
                feedback.textContent = `Correct! ${stepsData[state.currentStep].quiz.explanation}`;
                feedback.className = "p-3 rounded text-xs font-medium bg-green-150 text-green-800 block";
            }
            return true;
        } else {
            if (feedback) {
                feedback.textContent = `Incorrect: Please review the tip and try again.`;
                feedback.className = "p-3 rounded text-xs font-medium bg-red-150 text-red-800 block";
            }
            return false;
        }
    }

    // -------------------------------------------------------------------------
    // 6. DB / API Sync & Local Storage fallbacks
    // -------------------------------------------------------------------------
    function loadSavedStepData(stepIndex) {
        if (stepIndex === 1 && state.company) return state.company;
        if (stepIndex === 2 && state.company) return state.company;

        if (stepIndex === 3) return state.ledgers;
        if (stepIndex === 4) return state.masters.find(m => m.type === 'hsn') || {};
        if (stepIndex === 5) return state.masters.find(m => m.type === 'sac') || {};
        if (stepIndex === 6) return state.masters.find(m => m.type === 'customer') || {};
        if (stepIndex === 7) return state.masters.find(m => m.type === 'supplier') || {};

        // Find vouchers
        const vTypes = {
            8: 'purchase', 9: 'sales', 10: 'debit_note', 11: 'credit_note',
            13: 'payment', 14: 'receipt', 15: 'expense', 16: 'asset_purchase',
            17: 'import_purchase', 18: 'export_sale'
        };
        const type = vTypes[stepIndex];
        return state.vouchers.find(v => v.voucher_type === type) || {};
    }

    async function saveStepToBackend(stepIndex, payload) {
        const token = localStorage.getItem('gst_token');
        let endpoint = '';
        let action = '';

        if (stepIndex == 1) {
            action = 'save_company';
            endpoint = `../../backend/api/simulator.php?action=save_company`;
        } else if (stepIndex == 2) {
            action = 'save_company'; // Updates company row
            endpoint = `../../backend/api/simulator.php?action=save_company`;
        } else if (stepIndex == 3) {
            action = 'save_ledger';
            endpoint = `../../backend/api/simulator.php?action=save_ledger`;
        } else if (stepIndex == 4 || stepIndex == 5 || stepIndex == 6 || stepIndex == 7) {
            action = 'save_master';
            endpoint = `../../backend/api/simulator.php?action=save_master`;
        } else {
            action = 'save_voucher';
            endpoint = `../../backend/api/simulator.php?action=save_voucher`;
        }

        // Offline storage fallback
        localStorage.setItem(`gst_sim_step_${stepIndex}`, JSON.stringify(payload));

        if (token) {
            try {
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (!data.success) {
                    console.error("API error while saving step:", data.error);
                }
            } catch (err) {
                console.warn("Unable to connect to server. Saved offline in local storage.");
            }
        }
    }

    async function loadAllData() {
        const token = localStorage.getItem('gst_token');
        if (token) {
            try {
                const response = await fetch('../../backend/api/simulator.php?action=load_all', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await response.json();
                if (data.success && data.company) {
                    state.company = data.company;
                    state.ledgers = data.ledgers;
                    state.masters = data.masters;
                    state.vouchers = data.vouchers;
                    rebuildStateFromDB();
                    return;
                }
            } catch (e) {
                console.warn("Database fetching failed, loading from local storage.");
            }
        }

        // Local storage fallback
        loadAllOfflineData();
    }

    function rebuildStateFromDB() {
        // Mark completed steps based on database loads
        if (state.company) state.stepStatus[1] = 'completed';
        if (state.company && state.company.gstin) state.stepStatus[2] = 'completed';
        if (state.ledgers.length > 0) state.stepStatus[3] = 'completed';
        if (state.masters.some(m => m.type === 'hsn')) state.stepStatus[4] = 'completed';
        if (state.masters.some(m => m.type === 'sac')) state.stepStatus[5] = 'completed';
        if (state.masters.some(m => m.type === 'customer')) state.stepStatus[6] = 'completed';
        if (state.masters.some(m => m.type === 'supplier')) state.stepStatus[7] = 'completed';

        const types = ['purchase', 'sales', 'debit_note', 'credit_note', 'journal', 'payment', 'receipt'];
        state.vouchers.forEach(v => {
            const stepMapping = {
                'purchase': 8, 'sales': 9, 'debit_note': 10, 'credit_note': 11,
                'payment': 13, 'receipt': 14
            };
            const step = stepMapping[v.voucher_type];
            if (step) state.stepStatus[step] = 'completed';
        });
    }

    function loadAllOfflineData() {
        try {
            const comp = localStorage.getItem('gst_sim_step_1');
            if (comp) state.company = JSON.parse(comp);

            const ledg = localStorage.getItem('gst_sim_step_3_list');
            if (ledg) state.ledgers = JSON.parse(ledg);

            // Reconstruct masters and vouchers
            for (let i = 1; i <= 18; i++) {
                const saved = localStorage.getItem(`gst_sim_step_${i}`);
                if (saved) {
                    state.stepStatus[i] = 'completed';
                    const parsed = JSON.parse(saved);
                    if (i === 4 || i === 5 || i === 6 || i === 7) {
                        state.masters.push(parsed);
                    } else if (i >= 8) {
                        state.vouchers.push(parsed);
                    }
                }
            }
        } catch (e) {
            console.error("Error loading offline local storage data", e);
        }
    }

    // -------------------------------------------------------------------------
    // 7. Ledger Posting & Reports compiler (Dynamic Live P&L and Balance Sheet)
    // -------------------------------------------------------------------------
    function compileFinancials() {
        // Start from company opening balance
        let bankCash = state.company ? Number(state.company.opening_balance) || 0 : 0;
        let capital = bankCash;
        let sales = 0;
        let purchase = 0;
        let expense = 0;
        let debtors = 0;
        let creditors = 0;
        let fixedAssets = 0;
        let inputGst = 0;
        let outputGst = 0;

        // Process all vouchers
        state.vouchers.forEach(v => {
            const type = v.voucher_type;
            const taxable = Number(v.taxable_value) || 0;
            const gst = (taxable * (Number(v.gst_rate) || 0)) / 100;
            const total = taxable + gst;

            switch (type) {
                case 'purchase':
                    purchase += taxable;
                    inputGst += gst;
                    creditors += total;
                    break;
                case 'sales':
                    sales += taxable;
                    outputGst += gst;
                    debtors += total;
                    break;
                case 'debit_note': // Return to vendor
                    purchase -= taxable;
                    inputGst -= gst;
                    creditors -= total;
                    break;
                case 'credit_note': // Return from customer
                    sales -= taxable;
                    outputGst -= gst;
                    debtors -= total;
                    break;
                case 'expense':
                    expense += taxable;
                    inputGst += gst;
                    bankCash -= total;
                    break;
                case 'asset_purchase':
                    fixedAssets += taxable;
                    if (v.itc_eligible === 'Yes') {
                        inputGst += gst;
                        bankCash -= total;
                    } else {
                        fixedAssets += gst; // Capitalize taxes
                        bankCash -= total;
                    }
                    break;
                case 'import_purchase':
                    const bcd = Number(v.bcd) || 0;
                    purchase += taxable;
                    expense += bcd;
                    inputGst += gst; // RCM Credit claimed
                    bankCash -= (taxable + bcd + gst);
                    break;
                case 'export_sale':
                    sales += taxable;
                    debtors += total;
                    break;
                case 'payment':
                    const payAmt = Number(v.amount) || 0;
                    creditors -= payAmt;
                    bankCash -= payAmt;
                    break;
                case 'receipt':
                    const recAmt = Number(v.amount) || 0;
                    debtors -= recAmt;
                    bankCash += recAmt;
                    break;
            }
        });

        // Net GST Payable
        const netGst = outputGst - inputGst;

        // Update UI
        const ledTable = document.getElementById('ledgerReportBody');
        if (ledTable) {
            let rowHtml = `
                <tr class="border-b">
                    <td class="p-2.5">Capital Account</td>
                    <td class="p-2.5">Capital Account</td>
                    <td class="p-2.5 text-right">-</td>
                    <td class="p-2.5 text-right">${app.formatINR(capital)}</td>
                </tr>
                <tr class="border-b">
                    <td class="p-2.5">Bank / Cash Ledger</td>
                    <td class="p-2.5">Bank Accounts</td>
                    <td class="p-2.5 text-right">${bankCash >= 0 ? app.formatINR(bankCash) : '-'}</td>
                    <td class="p-2.5 text-right">${bankCash < 0 ? app.formatINR(Math.abs(bankCash)) : '-'}</td>
                </tr>
                <tr class="border-b">
                    <td class="p-2.5">Sales Account</td>
                    <td class="p-2.5">Sales Accounts</td>
                    <td class="p-2.5 text-right">-</td>
                    <td class="p-2.5 text-right">${app.formatINR(sales)}</td>
                </tr>
                <tr class="border-b">
                    <td class="p-2.5">Purchase Account</td>
                    <td class="p-2.5">Purchase Accounts</td>
                    <td class="p-2.5 text-right">${app.formatINR(purchase)}</td>
                    <td class="p-2.5 text-right">-</td>
                </tr>
                <tr class="border-b">
                    <td class="p-2.5">Office Rent Expense</td>
                    <td class="p-2.5">Indirect Expenses</td>
                    <td class="p-2.5 text-right">${app.formatINR(expense)}</td>
                    <td class="p-2.5 text-right">-</td>
                </tr>
            `;
            ledTable.innerHTML = rowHtml;
        }

        // P&L Statement Values
        document.getElementById('plSalesVal') && (document.getElementById('plSalesVal').textContent = app.formatINR(sales));
        document.getElementById('plPurchaseVal') && (document.getElementById('plPurchaseVal').textContent = app.formatINR(purchase));
        document.getElementById('plExpenseVal') && (document.getElementById('plExpenseVal').textContent = app.formatINR(expense));
        const profit = sales - purchase - expense;
        const profitEl = document.getElementById('plNetProfitVal');
        if (profitEl) {
            profitEl.textContent = app.formatINR(profit);
            profitEl.className = profit >= 0 ? 'text-emerald-700 font-bold text-sm' : 'text-rose-700 font-bold text-sm';
        }

        // Balance Sheet Values
        document.getElementById('bsCapitalVal') && (document.getElementById('bsCapitalVal').textContent = app.formatINR(capital));
        document.getElementById('bsGstPayableVal') && (document.getElementById('bsGstPayableVal').textContent = app.formatINR(netGst));
        document.getElementById('bsCreditorsVal') && (document.getElementById('bsCreditorsVal').textContent = app.formatINR(creditors));
        document.getElementById('bsAssetsVal') && (document.getElementById('bsAssetsVal').textContent = app.formatINR(fixedAssets));
        document.getElementById('bsDebtorsVal') && (document.getElementById('bsDebtorsVal').textContent = app.formatINR(debtors));
        document.getElementById('bsBankCashVal') && (document.getElementById('bsBankCashVal').textContent = app.formatINR(bankCash));

        const bsTotalEl = document.getElementById('bsTotalVal');
        const assetsTotal = fixedAssets + debtors + bankCash;
        const liabilitiesTotal = capital + netGst + creditors;
        if (bsTotalEl) {
            bsTotalEl.textContent = `Assets: ${app.formatINR(assetsTotal)} | Liab: ${app.formatINR(liabilitiesTotal)}`;
        }

        // GST Return Details
        compileReturns(sales, purchase, inputGst, outputGst);
    }

    function compileReturns(sales, purchase, inputGst, outputGst) {
        // GSTR-1
        let b2bCount = 0;
        let b2bHtml = '';
        let b2cTotal = 0;
        let exportLut = 0;

        state.vouchers.forEach(v => {
            if (v.voucher_type === 'sales') {
                if (v.party === 'Apex Enterprises') {
                    b2bCount++;
                    const tax = (v.taxable_value * v.gst_rate) / 100;
                    b2bHtml += `
                        <tr class="border-b">
                            <td class="p-2">27AAACA1111A1Z1</td>
                            <td class="p-2">${v.invoice_no || 'INV001'}</td>
                            <td class="p-2 text-right">${app.formatINR(v.taxable_value)}</td>
                            <td class="p-2 text-right">${app.formatINR(tax/2)}</td>
                            <td class="p-2 text-right">${app.formatINR(tax/2)}</td>
                            <td class="p-2 text-right">-</td>
                        </tr>
                    `;
                } else {
                    b2cTotal += v.taxable_value;
                }
            } else if (v.voucher_type === 'export_sale') {
                exportLut += v.taxable_value;
            }
        });

        const b2bBody = document.getElementById('gstr1B2BBody');
        if (b2bBody) {
            b2bBody.innerHTML = b2bHtml || '<tr><td colspan="6" class="p-3 text-center text-slate-400 italic">No B2B Invoices generated yet.</td></tr>';
        }
        document.getElementById('gstr1B2BCount') && (document.getElementById('gstr1B2BCount').textContent = `${b2bCount} Bills`);
        document.getElementById('gstr1B2CVal') && (document.getElementById('gstr1B2CVal').textContent = app.formatINR(b2cTotal));
        document.getElementById('gstr1ExportLutVal') && (document.getElementById('gstr1ExportLutVal').textContent = app.formatINR(exportLut));

        // GSTR-3B Summary
        const netGstPayable = Math.max(0, outputGst - inputGst);
        document.getElementById('g3bSalesTaxable') && (document.getElementById('g3bSalesTaxable').textContent = app.formatINR(sales));
        document.getElementById('g3bSalesCgst') && (document.getElementById('g3bSalesCgst').textContent = app.formatINR(outputGst/2));
        document.getElementById('g3bSalesSgst') && (document.getElementById('g3bSalesSgst').textContent = app.formatINR(outputGst/2));
        document.getElementById('g3bSalesIgst') && (document.getElementById('g3bSalesIgst').textContent = '-');

        // ITC Purchases
        document.getElementById('g3bItcPurchaseCgst') && (document.getElementById('g3bItcPurchaseCgst').textContent = app.formatINR(inputGst/2));
        document.getElementById('g3bItcPurchaseSgst') && (document.getElementById('g3bItcPurchaseSgst').textContent = app.formatINR(inputGst/2));

        document.getElementById('g3bNetPayable') && (document.getElementById('g3bNetPayable').textContent = app.formatINR(netGstPayable));
    }

    // -------------------------------------------------------------------------
    // 8. Navigation & UI Switchers
    // -------------------------------------------------------------------------
    function switchTab(tabId) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('bg-white', 'text-blue-700', 'shadow-sm', 'border');
            btn.classList.add('text-slate-600');
        });
        document.getElementById(`tab-${tabId}`).classList.add('bg-white', 'text-blue-700', 'shadow-sm', 'border');

        document.getElementById('panel-simulation').classList.add('hidden');
        document.getElementById('panel-reports').classList.add('hidden');
        document.getElementById('panel-returns').classList.add('hidden');

        document.getElementById(`panel-${tabId}`).classList.remove('hidden');

        if (tabId === 'reports' || tabId === 'returns') {
            compileFinancials();
        }
    }

    function initStepSelector() {
        const select = document.getElementById('stepSelector');
        if (!select) return;

        select.innerHTML = '';
        for (let i = 1; i <= 18; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            const statusStr = state.stepStatus[i] === 'completed' ? ' [✔ Done]' : '';
            opt.textContent = `Day ${i}: ${stepsData[i].title}${statusStr}`;
            select.appendChild(opt);
        }

        select.addEventListener('change', (e) => {
            loadStep(Number(e.target.value));
        });
    }

    function loadStep(stepIndex) {
        state.currentStep = stepIndex;
        const select = document.getElementById('stepSelector');
        if (select) select.value = stepIndex;

        const step = stepsData[stepIndex];
        document.getElementById('lessonTitle').textContent = `${stepIndex}. ${step.title}`;
        document.getElementById('dayLabel').textContent = step.day;
        document.getElementById('lessonObjective').textContent = step.objective;
        document.getElementById('lessonTheory').innerHTML = step.theory;
        document.getElementById('lessonScenario').textContent = step.scenario;
        document.getElementById('lessonSampleData').textContent = step.sampleData;
        document.getElementById('lessonMistakes').textContent = step.mistakes;
        document.getElementById('lessonTips').textContent = step.tips;

        // Render Quiz
        document.getElementById('quizQuestion').textContent = step.quiz.question;
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = step.quiz.options.map((opt, idx) => `
            <label class="flex items-center space-x-2 bg-slate-50 p-2 border rounded cursor-pointer hover:bg-slate-100/50">
                <input type="radio" name="quizOpt" value="${idx}" class="mr-1">
                <span>${opt}</span>
            </label>
        `).join('');

        const feedback = document.getElementById('quizFeedback');
        if (feedback) feedback.classList.add('hidden');

        // Form renderer
        renderStepForm(stepIndex);
        updateProgressUI();

        // Reveal Next button if already validated
        const nextBtn = document.getElementById('nextStepBtn');
        const validateBtn = document.getElementById('validateFormBtn');
        if (state.stepStatus[stepIndex] === 'completed') {
            nextBtn.classList.remove('hidden');
            validateBtn.textContent = 'Re-Validate & Save';
        } else {
            nextBtn.classList.add('hidden');
            validateBtn.textContent = 'Save & Validate Entry';
        }

        document.getElementById('prevStepBtn').disabled = stepIndex === 1;
        document.getElementById('stepProgressText').textContent = `Step ${stepIndex} of 18`;
    }

    function updateProgressUI() {
        const progress = Math.round((Object.keys(state.stepStatus).length / 18) * 100);
        document.getElementById('stepProgressBar').style.width = `${progress}%`;
    }

    // -------------------------------------------------------------------------
    // 9. Page Event Hooks
    // -------------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', async () => {
        // Load existing states
        await loadAllData();

        initStepSelector();
        loadStep(state.currentStep);

        // Buttons
        document.getElementById('validateFormBtn')?.addEventListener('click', async () => {
            if (validateStepInput(state.currentStep)) {
                // Save state
                const payload = getFormValues(state.currentStep);
                state.stepStatus[state.currentStep] = 'completed';

                if (state.currentStep === 1) state.company = payload;
                if (state.currentStep === 3) {
                    // Custom ledgers list saving
                    localStorage.setItem('gst_sim_step_3_list', JSON.stringify(state.ledgers));
                }

                // Add to vouchers array if transactional
                const transactionalSteps = [8, 9, 10, 11, 13, 14, 15, 16, 17, 18];
                if (transactionalSteps.includes(state.currentStep)) {
                    const vTypes = {
                        8: 'purchase', 9: 'sales', 10: 'debit_note', 11: 'credit_note',
                        13: 'payment', 14: 'receipt', 15: 'expense', 16: 'asset_purchase',
                        17: 'import_purchase', 18: 'export_sale'
                    };
                    const record = {
                        voucher_type: vTypes[state.currentStep],
                        voucher_date: payload.date || '2026-08-01',
                        voucher_no: payload.invoice_no || payload.ref_no || `VOUCH-${state.currentStep}`,
                        party_id: null,
                        party: payload.party,
                        taxable_value: payload.taxable_value || payload.amount || 0,
                        gst_rate: payload.gst_rate || 0,
                        itc_eligible: payload.itc_eligible || 'Yes',
                        bcd: payload.bcd || 0,
                        amount: payload.amount || 0
                    };
                    // Remove existing to overwrite
                    state.vouchers = state.vouchers.filter(v => v.voucher_type !== record.voucher_type);
                    state.vouchers.push(record);
                }

                // Save to server
                await saveStepToBackend(state.currentStep, payload);

                // Update UI state
                initStepSelector();
                document.getElementById('nextStepBtn').classList.remove('hidden');
                updateProgressUI();
                alert(`Success: Step ${state.currentStep} validated and saved successfully!`);
            }
        });

        document.getElementById('nextStepBtn')?.addEventListener('click', () => {
            if (state.currentStep < 18) {
                loadStep(state.currentStep + 1);
            } else {
                alert("Congratulations! You have completed all 18 steps of the GST Practical Simulator.");
            }
        });

        document.getElementById('prevStepBtn')?.addEventListener('click', () => {
            if (state.currentStep > 1) {
                loadStep(state.currentStep - 1);
            }
        });

        document.getElementById('resetSimulatorBtn')?.addEventListener('click', async () => {
            if (confirm("Are you sure you want to reset all simulation progress? This will delete all companies, ledgers, and transaction records!")) {
                localStorage.clear();
                const token = localStorage.getItem('gst_token');
                if (token) {
                    await fetch('../../backend/api/simulator.php?action=reset_simulation', {
                        method: 'POST',
                        headers: { 'Authorization': 'Bearer ' + token }
                    });
                }
                location.reload();
            }
        });
    });

    // Globally expose UI helper triggers
    window.switchTab = switchTab;
    window.addSimulatorLedger = function () {
        const name = document.getElementById('led_name')?.value.trim();
        const group = document.getElementById('led_group')?.value;
        if (!name || !group) {
            alert("Ledger Name and Account Group are required.");
            return;
        }

        const newLedger = { name, group_name: group, opening_balance: 0.00 };
        state.ledgers.push(newLedger);

        // Save
        saveStepToBackend(3, newLedger);

        // Update list
        renderLedgersList();
    };

    window.deleteLedger = function (idx) {
        state.ledgers.splice(idx, 1);
        localStorage.setItem('gst_sim_step_3_list', JSON.stringify(state.ledgers));
        renderLedgersList();
    };

    function renderLedgersList() {
        const body = document.getElementById('createdLedgersList');
        if (!body) return;

        if (state.ledgers.length === 0) {
            body.innerHTML = '<tr><td colspan="3" class="p-3 text-center text-slate-400 italic">No ledgers configured yet.</td></tr>';
            return;
        }

        body.innerHTML = state.ledgers.map((l, idx) => `
            <tr class="border-b">
                <td class="p-2 font-semibold">${l.name}</td>
                <td class="p-2 font-mono text-slate-500">${l.group_name}</td>
                <td class="p-2 text-center">
                    <button onclick="deleteLedger(${idx})" class="text-red-600 text-[11px] font-bold hover:underline">Remove</button>
                </td>
            </tr>
        `).join('');
    }

})();
