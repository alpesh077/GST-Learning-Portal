// js/laws_data.js
const GST_LAWS_DB = {
    "topic-1": {
        "id": "topic-1",
        "title": "Introduction to GST",
        "category": "Introduction & Constitution",
        "overview": "Goods and Services Tax (GST) is a unified, destination-based indirect tax levied on the supply of goods and services in India, replacing multiple central and state taxes to create a single domestic market.",
        "legalDefinition": "Defined under Article 366(12A) of the Constitution of India as any tax on the supply of goods, or services or both except taxes on the supply of alcoholic liquor for human consumption.",
        "explanation": "Introduced on July 1, 2017, GST replaced a fragmented indirect tax system consisting of Excise Duty, Service Tax, VAT, Central Sales Tax, Entry Tax, and Luxury Tax. It operates as a multi-stage tax collected at each stage of value addition. The Input Tax Credit (ITC) mechanism allows businesses to offset taxes paid on purchases against taxes due on sales, eliminating the cascading tax-on-tax effect. It is a destination-based tax, meaning revenue flows to the consumption state rather than the manufacturing state.",
        "whyExists": "GST exists to remove tax cascading, broaden the tax base, simplify compliance through a single online portal (GSTN), and boost GDP by facilitating inter-state trade.",
        "example": "A manufacturer in Gujarat sells raw steel to a furniture maker for Rs. 1,00,000 + 18% GST (Rs. 18,000). The furniture maker adds Rs. 50,000 value and sells the table to a distributor for Rs. 1,50,000 + 18% GST (Rs. 27,000). The furniture maker utilizes the Rs. 18,000 ITC to pay a net tax of Rs. 9,000 to the government.",
        "flowchart": "Steel Manufacture (GST 18k paid) -> Furniture Maker (Claims 18k ITC, Adds Value, GST 27k charged) -> Retailer (Claims 27k ITC) -> End Consumer (Bears total tax)",
        "importantPoints": [
            "Subsumed 17 major indirect taxes and 23 cesses.",
            "Alcoholic liquor for human consumption is constitutionally out of GST.",
            "Petroleum crude, high-speed diesel, petrol, natural gas, and aviation turbine fuel are temporarily outside GST scope."
        ],
        "mistakes": [
            "Thinking GST is collected by the manufacturing state (it is destination-based).",
            "Assuming export sales are subject to output GST (exports are zero-rated)."
        ],
        "interviewQuestions": [
            {
                "q": "What is the cascading effect of tax, and how does GST eliminate it?",
                "a": "Cascading is tax-on-tax (e.g., levying sales tax on manufacturing excise duty). GST eliminates it by providing continuous Input Tax Credit (ITC) across the supply chain."
            }
        ],
        "mcqs": [
            {
                "q": "GST is a ________ based tax.",
                "o": [
                    "Origin",
                    "Destination",
                    "Manufacturing",
                    "Income"
                ],
                "a": 1,
                "e": "GST is destination-based; tax goes to the consuming state."
            },
            {
                "q": "Which of the following is excluded from GST under the Constitution?",
                "o": [
                    "Petrol",
                    "Tobacco",
                    "Alcoholic liquor for human consumption",
                    "Natural Gas"
                ],
                "a": 2,
                "e": "Alcoholic liquor is constitutionally excluded under Article 366(12A)."
            }
        ],
        "faqs": [
            {
                "q": "When did GST come into effect in India?",
                "a": "On July 1, 2017."
            }
        ],
        "revisionNotes": "GST = Single indirect tax, destination-based, eliminates tax-on-tax via continuous ITC chain. Excludes alcohol for human consumption.",
        "keyTakeaways": "Destination-based + Subsumed VAT/Excise/Service Tax + Dual Model."
    },
    "topic-2": {
        "id": "topic-2",
        "title": "Constitutional Background",
        "category": "Introduction & Constitution",
        "overview": "The introduction of GST required major amendments to the Constitution of India to allow both Parliament and State Legislatures to simultaneously levy tax on the supply of goods and services.",
        "legalDefinition": "Enacted via the Constitution (One Hundred and First Amendment) Act, 2016. Key articles introduced include Article 246A (simultaneous power to tax), Article 269A (levy on inter-state supply), and Article 279A (GST Council).",
        "explanation": "Under the original Constitution of India, the power to levy indirect taxes was divided: the Centre had exclusive power to tax manufacturing (Excise Duty) and services (Service Tax), while States had exclusive power to tax sales (VAT/CST). To levy a unified GST, the 101st Constitutional Amendment Act of 2016 was passed. Article 246A gives both Centre and States simultaneous authority to administer GST. Article 269A governs inter-state trade, reserving the right to levy IGST to the Centre, with revenue shared with the consuming state. Article 279A established the GST Council, a joint forum of Centre and States to decide tax rates, rules, and exemptions.",
        "whyExists": "Without constitutional amendment, the Centre could not levy tax on retail sales, and States could not levy tax on services or manufacturing, making a dual GST model legally impossible.",
        "example": "When a consultancy firm in Pune bills a client in Mumbai (intra-state service supply), Maharashtra State levies SGST under the authority of Article 246A, and the Central Government levies CGST simultaneously.",
        "flowchart": "101st Constitutional Amendment Act, 2016 -> Article 246A (Simultaneous power for CGST/SGST) -> Article 269A (Centre levies IGST for inter-state) -> Article 279A (Establishment of GST Council)",
        "importantPoints": [
            "101st Amendment Act, 2016 was enacted on 8th September 2016.",
            "Article 246A overrides Article 246 regarding distribution of legislative power.",
            "GST Council is chaired by the Union Finance Minister."
        ],
        "mistakes": [
            "Believing that States have the right to legislate inter-state GST (IGST). Only the Union Parliament has power to levy and collect IGST under Article 269A."
        ],
        "interviewQuestions": [
            {
                "q": "What is the role of Article 246A in India's federal structure?",
                "a": "Article 246A gives simultaneous power to both the Union and the States to make laws regarding GST. This is a unique departure from traditional federal distributions where powers were strictly divided in the Union, State, or Concurrent Lists."
            }
        ],
        "mcqs": [
            {
                "q": "Which Constitutional Amendment Act paved the way for GST?",
                "o": [
                    "99th Amendment",
                    "100th Amendment",
                    "101st Amendment",
                    "102nd Amendment"
                ],
                "a": 2,
                "e": "The 101st Constitutional Amendment Act, 2016 introduced the necessary amendments to initiate GST in India."
            },
            {
                "q": "Which article of the Constitution governs the GST Council?",
                "o": [
                    "Article 246A",
                    "Article 269A",
                    "Article 279A",
                    "Article 280"
                ],
                "a": 2,
                "e": "Article 279A of the amended Constitution dictates the structure, members, and voting rules of the GST Council."
            }
        ],
        "faqs": [
            {
                "q": "Who chairs the GST Council?",
                "a": "The Union Finance Minister of India. State Finance Ministers or nominated ministers serve as representatives of their respective states."
            }
        ],
        "revisionNotes": "GST required the 101st Constitutional Amendment in 2016. It introduced Article 246A (simultaneous power), Article 269A (IGST for inter-state transactions collected by the Centre and shared with states), and Article 279A (GST Council).",
        "keyTakeaways": "101st Amendment + Article 246A (Dual Levy) + Article 269A (IGST) + Article 279A (GST Council)."
    },
    "topic-6": {
        "id": "topic-6",
        "title": "Types of GST",
        "category": "Supply & Levy",
        "overview": "GST is classified into CGST, SGST, UTGST, and IGST based on the location of the supplier and the place of supply.",
        "legalDefinition": "Regulated under the CGST Act, 2017, IGST Act, 2017, and UTGST Act, 2017.",
        "explanation": "Intra-state transactions (within the same state) are subject to CGST (Central GST) and SGST (State GST) in equal split. Inter-state transactions (between two states or state-to-UT) are subject to IGST (Integrated GST) collected by the Central Government. In Union Territories without legislatures, UTGST is levied instead of SGST. In addition, Compensation Cess is levied on luxury and demerit goods to compensate states for revenue losses.",
        "whyExists": "It maintains India's federal tax sharing model by ensuring both the Centre and the States get their share of revenue directly on intra-state supplies, while IGST manages inter-state credit flows.",
        "example": "A trader in Bengaluru sells goods to a shop in Mysore (Intra-state). He charges CGST @ 9% and SGST @ 9%. If he sells to a shop in Chennai (Inter-state), he charges IGST @ 18%.",
        "flowchart": "Supply Location Check -> Within State? -> CGST + SGST (equal split) | Across States? -> IGST (retended by Centre and shared with destination state)",
        "importantPoints": [
            "CGST and SGST cannot cross-offset each other's liabilities.",
            "IGST is single rate equivalent to CGST+SGST.",
            "Compensation Cess is levied over and above GST rates."
        ],
        "mistakes": [
            "Applying CGST + SGST on inter-state sales.",
            "Offsetting CGST output liability with SGST input credit."
        ],
        "interviewQuestions": [
            {
                "q": "How does tax revenue get shared between Centre and States in an inter-state sale?",
                "a": "IGST is collected by the Centre. The Centre then shares a portion with the consumption state based on place of supply rules."
            }
        ],
        "mcqs": [
            {
                "q": "On an intra-state sale, which tax is levied?",
                "o": [
                    "IGST",
                    "CGST + SGST",
                    "CGST only",
                    "SGST only"
                ],
                "a": 1,
                "e": "Both CGST and SGST are levied on intra-state transactions in equal proportions."
            }
        ],
        "faqs": [
            {
                "q": "Can I use SGST input credit to pay CGST?",
                "a": "No, cross-utilization between CGST and SGST is strictly blocked under the law."
            }
        ],
        "revisionNotes": "CGST+SGST for intra-state. IGST for inter-state. UTGST for UTs without legislature. Cess on luxury items.",
        "keyTakeaways": "Federal structure preserved via CGST/SGST/IGST split."
    },
    "topic-9": {
        "id": "topic-9",
        "title": "Supply under GST",
        "category": "Supply & Levy",
        "overview": "Supply is the taxable event under GST, replacing traditional concepts of manufacture, sale, or provision of service.",
        "legalDefinition": "Defined under Section 7 of the CGST Act, 2017, which includes all forms of supply of goods or services such as sale, transfer, barter, exchange, license, rental, lease or disposal made or agreed to be made for a consideration by a person in the course or furtherance of business.",
        "explanation": "Supply must involve goods or services, consideration (with exceptions in Schedule I), and must be in the course or furtherance of business (except import of services under Section 7(1)(b)). Schedule I covers supplies without consideration (e.g., related party transfers). Schedule II determines if a supply is of goods or of services. Schedule III lists transactions that are neither supply of goods nor services (negative list, e.g., salary paid to employees).",
        "whyExists": "Defining a single taxable event ('supply') removes the legal ambiguity of distinguishing between a sale and a service, simplifying tax collection.",
        "example": "A company transfers obsolete computers to a charitable school for free. If they claimed ITC on those computers, this transfer is a deemed supply under Schedule I, even without consideration.",
        "flowchart": "Transaction -> Check Section 7 criteria -> Consideration + Business? -> Taxable Supply | Schedule I without consideration? -> Taxable | Schedule III negative list? -> Non-taxable",
        "importantPoints": [
            "Consideration is a mandatory element except for transactions in Schedule I.",
            "Supplies must generally be related to business furtherance.",
            "Barter transactions (e.g., doctor treats accountant in exchange for audit) are supplies."
        ],
        "mistakes": [
            "Failing to charge GST on free samples or asset transfers between branches in different states (Schedule I).",
            "Treating employee salary as taxable supply (explicitly excluded under Schedule III)."
        ],
        "interviewQuestions": [
            {
                "q": "Is import of service without consideration taxable under GST?",
                "a": "Under Section 7(1)(b), import of service for consideration is a supply, whether or not in course of business. However, under Schedule I, import of service without consideration is a supply only if it is from a related person or establishment outside India in the course of business."
            }
        ],
        "mcqs": [
            {
                "q": "Which of the following is in the negative list of GST (Schedule III)?",
                "o": [
                    "Sale of land",
                    "Barter of goods",
                    "Branch transfer",
                    "None of the above"
                ],
                "a": 0,
                "e": "Sale of land is listed in Schedule III and is neither a supply of goods nor services."
            }
        ],
        "faqs": [
            {
                "q": "What is Schedule I?",
                "a": "A list of activities treated as supply even if made without consideration (e.g., permanent disposal of business assets on which ITC was claimed)."
            }
        ],
        "revisionNotes": "Supply is the sole taxable event. Governed by Section 7. Includes sale, barter, lease. Schedules I, II, and III dictate classification and exclusions.",
        "keyTakeaways": "Supply replaces Sale/Excise + Section 7 + Schedules I/II/III."
    },
    "topic-12": {
        "id": "topic-12",
        "title": "Time of Supply",
        "category": "Time, Place & Value",
        "overview": "Time of Supply determines the point in time when the liability to pay GST arises.",
        "legalDefinition": "Regulated under Sections 12 (for Goods) and 13 (for Services) of the CGST Act, 2017.",
        "explanation": "For **Goods (Section 12)**, the time of supply is the earlier of: the date of issue of invoice by the supplier, the last date on which the invoice is required to be issued under Section 31, or the date of receipt of payment (note: Notification 66/2017-CT exempted advances for goods from tax payment). For **Services (Section 13)**, if invoice is issued within 30 days of service provision, it is the earlier of the date of invoice or date of payment (including advance payment). If invoice is not issued within 30 days, it is the earlier of date of completion of service or date of payment.",
        "whyExists": "It ensures that taxpayers cannot delay paying taxes by simply delaying invoice generation or payment booking.",
        "example": "A software agency completes consulting on October 15. They issue an invoice on November 10. Since invoice is issued within 30 days (by November 14), the time of supply is November 10 (invoice date). If they received an advance on October 1, the time of supply for that advance is October 1.",
        "flowchart": "Supply of Services -> Invoice within 30 days of completion? -> Yes: Earlier of Invoice or Payment date | No: Earlier of Completion or Payment date",
        "importantPoints": [
            "Advances received for services are taxable at the time of receipt.",
            "Advances received for goods are currently not subject to GST (Notification 66/2017-CT).",
            "Vouchers: Time of supply is date of issue if supply is identifiable, or date of redemption."
        ],
        "mistakes": [
            "Not paying GST on advance payments received for service contracts.",
            "Paying GST on advances received for supply of goods."
        ],
        "interviewQuestions": [
            {
                "q": "What is the time of supply for services if the invoice is not issued within 30 days?",
                "a": "It is the earlier of the date of completion of the service or the date of receipt of payment."
            }
        ],
        "mcqs": [
            {
                "q": "For services, if the invoice is issued within 30 days, the time of supply is:",
                "o": [
                    "Date of completion",
                    "Earlier of invoice date or payment date",
                    "Due date of return",
                    "None of the above"
                ],
                "a": 1,
                "e": "If invoice is issued timely, the time of supply is the earlier of invoice or payment date."
            }
        ],
        "faqs": [
            {
                "q": "Is GST payable on security deposits?",
                "a": "No, unless the supplier applies the deposit as consideration for the supply."
            }
        ],
        "revisionNotes": "Section 12 (Goods), Section 13 (Services). Goods: earlier of invoice date or invoice due date (advances exempt). Services: earlier of invoice/payment if invoice within 30 days.",
        "keyTakeaways": "Time of Supply = Point of tax liability."
    },
    "topic-13": {
        "id": "topic-13",
        "title": "Place of Supply",
        "category": "Time, Place & Value",
        "overview": "Place of Supply determines whether a transaction is intra-state or inter-state, which dictates the type of GST (CGST/SGST or IGST) to be levied.",
        "legalDefinition": "Regulated under Sections 10, 11, 12, and 13 of the IGST Act, 2017.",
        "explanation": "If the location of the supplier and the place of supply are in the same state, it is an **intra-state supply** (CGST+SGST). If they are in different states, it is an **inter-state supply** (IGST). For goods involving movement, the place of supply is where the movement terminates for delivery to the recipient (Section 10(1)(a)). For services supplied to a registered person (B2B), the place of supply is the location of such person (Section 12(2)(a)). For unregistered persons (B2C), it is generally the address on record, or location where service is performed.",
        "whyExists": "Since GST is a destination-based consumption tax, the Place of Supply rules determine which state government receives the tax revenue.",
        "example": "A consultant located in Delhi (Supplier Location) travels to Mumbai to provide training to a bank registered in Mumbai (B2B Recipient). The Place of Supply is Mumbai (Location of registered recipient). It is an inter-state supply, and the consultant charges IGST.",
        "flowchart": "Supplier Location + Place of Supply -> Same State/UT? -> Intra-state (CGST+SGST) | Different States? -> Inter-state (IGST)",
        "importantPoints": [
            "Bill to-Ship to transactions: Place of supply is the principal place of business of the third party instructing the shipment (Section 10(1)(b)).",
            "For immovable property, the place of supply is where the property is located.",
            "Imports: Place of supply is the location of the importer."
        ],
        "mistakes": [
            "Incorrectly charging CGST/SGST of the supplier's state when the place of supply is actually in another state (requires IGST).",
            "Confusing destination of service with recipient's billing address in B2B transactions."
        ],
        "interviewQuestions": [
            {
                "q": "What is the Place of Supply in a Bill-to Ship-to transaction?",
                "a": "It is the principal place of business of the person who directs the supplier to deliver the goods (the 'Bill-to' party), as per Section 10(1)(b) of the IGST Act."
            }
        ],
        "mcqs": [
            {
                "q": "For B2B services, the place of supply is generally the:",
                "o": [
                    "Location of supplier",
                    "Location of registered recipient",
                    "Location where service is performed",
                    "None of the above"
                ],
                "a": 1,
                "e": "Section 12(2)(a) states that place of supply for B2B services is the location of the registered recipient."
            }
        ],
        "faqs": [
            {
                "q": "What happens if I charge the wrong tax (e.g. CGST/SGST instead of IGST)?",
                "a": "Under Section 77 of CGST Act, you must pay the correct tax (IGST) and apply for a refund of the wrongly paid tax (CGST/SGST). No interest is charged on the correct tax."
            }
        ],
        "revisionNotes": "Supplier Location vs Place of Supply. Same state = CGST+SGST. Different states = IGST. Destination state gets the tax.",
        "keyTakeaways": "IGST Act Sec 10-13 + Revenue follows consumption."
    },
    "topic-14": {
        "id": "topic-14",
        "title": "Value of Supply",
        "category": "Time, Place & Value",
        "overview": "Value of Supply determines the taxable amount upon which the GST rate is applied.",
        "legalDefinition": "Regulated under Section 15 of the CGST Act, 2017, read with CGST Valuation Rules 27 to 35.",
        "explanation": "The value of supply is the 'transaction value'\u2014the price actually paid or payable, provided the parties are unrelated and price is the sole consideration. Inclusions (Sec 15(2)): Non-GST taxes/duties, third-party expenses paid by recipient, incidental expenses (packing, commission, freight), interest/penalty for late payment, and subsidies linked to price (except government subsidies). Exclusions (Sec 15(3)): Trade/cash discounts given before/at supply (shown on invoice) or post-supply discounts matching specific agreement terms.",
        "whyExists": "It prevents tax evasion through undervalued invoices, artificial discounts, or unbundled charges like packing and shipping.",
        "example": "A dealer sells a laptop for Rs. 40,000, charging Rs. 1,000 for safe packing and Rs. 500 for delivery. He gives a cash discount of Rs. 1,500. The taxable value is Rs. 39,000 (40,000 + 1,000 + 500 - 1,500).",
        "flowchart": "Gross Price -> Add: Non-GST Taxes + Packing/Freight + Subsidies -> Less: Pre-agreed Discounts -> Taxable Value",
        "importantPoints": [
            "Related party transactions: Must use Valuation Rules (e.g. Open Market Value).",
            "Subsidies from Central/State gov are excluded from value.",
            "Delayed payment interest is taxable on receipt basis."
        ],
        "mistakes": [
            "Excluding packing or delivery charges from the GST base.",
            "Excluding municipal tax charges from the invoice taxable value."
        ],
        "interviewQuestions": [
            {
                "q": "Are post-sales discounts eligible for exclusion from taxable value?",
                "a": "Yes, if they were pre-established by agreement, linked to specific invoices, and the buyer reverses the proportionate Input Tax Credit."
            }
        ],
        "mcqs": [
            {
                "q": "Which of the following is excluded from the value of supply?",
                "o": [
                    "Packing charges",
                    "Government subsidy",
                    "Delayed payment interest",
                    "Municipal tax"
                ],
                "a": 1,
                "e": "Subsidies provided by Central or State governments are explicitly excluded under Section 15(2)(e)."
            }
        ],
        "faqs": [
            {
                "q": "What happens if supplier and buyer are related?",
                "a": "The transaction value is rejected, and valuation must be done under CGST Rules (Open Market Value, etc.)."
            }
        ],
        "revisionNotes": "Value = Transaction Value (Price paid/payable). Includes: other taxes, packing, freight, non-gov subsidies. Excludes: discounts on invoice.",
        "keyTakeaways": "Valuation = Price + inclusions - exclusions."
    },
    "topic-15": {
        "id": "topic-15",
        "title": "Input Tax Credit",
        "category": "Input Tax Credit & RCM",
        "overview": "Input Tax Credit allows a registered business to reduce the output tax liability on sales by the amount of GST paid on inputs, capital goods, and input services.",
        "legalDefinition": "Regulated under Sections 16, 17, and 18 of the CGST Act, 2017, and Rules 36 to 45.",
        "explanation": "To claim ITC under Section 16, four conditions must be met: possession of tax invoice/debit note, actual receipt of goods/services, payment of tax by supplier to government, and filing of GSTR-3B. Additionally, payment to supplier must be made within 180 days, or claimed ITC is reversed with interest. Reversals (Rules 42 & 43) apply when inputs/capital goods are used for non-business or exempt supplies.",
        "whyExists": "It is the backbone of GST, designed to prevent double taxation and ensure only the value added at each stage is taxed.",
        "example": "Apex Corp has GSTR-3B output liability of Rs. 50,000 (CGST 25k + SGST 25k). On purchases, they paid Rs. 30,000 GST (CGST 15k + SGST 15k) recorded in GSTR-2B. Net tax payable in cash = Rs. 20,000.",
        "flowchart": "Receive Invoice -> Check GSTR-2B -> Match details? -> Yes: Check Sec 17(5) blocked credit -> Not blocked: Claim in GSTR-3B | No: Hold credit",
        "importantPoints": [
            "ITC cannot be claimed if depreciation on tax component was claimed.",
            "Supplier must file GSTR-1 for credit to reflect in buyer's GSTR-2B.",
            "Time limit to claim ITC: Earlier of 30th November of next financial year or filing of GSTR-9."
        ],
        "mistakes": [
            "Claiming credit on invoices not reflected in GSTR-2B.",
            "Not reversing ITC when payment to supplier is delayed beyond 180 days."
        ],
        "interviewQuestions": [
            {
                "q": "What are the four primary conditions to claim Input Tax Credit?",
                "a": "1. Possession of tax invoice/debit note. 2. Actual receipt of goods/services. 3. Payment of tax by supplier to government. 4. Filing of tax return (GSTR-3B)."
            }
        ],
        "mcqs": [
            {
                "q": "What is the time limit to pay a supplier to avoid ITC reversal?",
                "o": [
                    "90 days",
                    "180 days",
                    "30 days",
                    "1 year"
                ],
                "a": 1,
                "e": "Payment to supplier must be made within 180 days of invoice date, otherwise credit is reversed."
            }
        ],
        "faqs": [
            {
                "q": "Can I claim ITC on items for personal use?",
                "a": "No, ITC is allowed only on goods/services used in the course or furtherance of business."
            }
        ],
        "revisionNotes": "Section 16 eligibility. Reconcile with GSTR-2B. 180 days payment rule. Claim time limit = Nov 30 of next FY.",
        "keyTakeaways": "ITC = Tax paid on inputs offsetting output tax."
    },
    "topic-16": {
        "id": "topic-16",
        "title": "Blocked Credit",
        "category": "Input Tax Credit & RCM",
        "overview": "Blocked Credit refers to specific purchases of goods and services where Input Tax Credit is not allowed, even if they are used for business purposes.",
        "legalDefinition": "Regulated under Section 17(5) of the CGST Act, 2017.",
        "explanation": "Under Section 17(5), credit is blocked for: 1. Motor vehicles (seating capacity <= 13), unless used for transportation of goods, passenger transport, or driving school. 2. Food & beverages, outdoor catering, beauty treatment, health services, life insurance, unless obligatory under law. 3. Works contract services and goods used for construction of immovable property (except plant & machinery). 4. Membership of clubs, health centers. 5. Goods lost, stolen, destroyed, written off, or given as gifts.",
        "whyExists": "It prevents tax abuse on goods and services that are easily diverted for personal consumption or constitute final consumer spending.",
        "example": "A software company buys a luxury car for the MD's commute. The GST paid on the car purchase is blocked under Section 17(5)(a). However, if they buy a delivery van, ITC is allowed.",
        "flowchart": "Purchase -> Is it in Section 17(5) list? -> Yes: Blocked credit (add tax to cost) | No: Eligible for ITC",
        "importantPoints": [
            "Works contract for plant and machinery is NOT blocked.",
            "Free samples and gifts: ITC must be reversed if goods are distributed free.",
            "Travel benefits to employees: ITC blocked unless statutory obligation exists."
        ],
        "mistakes": [
            "Claiming credit on staff catering or corporate parties.",
            "Claiming credit on civil construction invoices for office building."
        ],
        "interviewQuestions": [
            {
                "q": "Can a food manufacturing company claim ITC on catering services hired for its factory workers?",
                "a": "Yes, if it is obligatory for the employer to provide canteen facilities under the Factories Act, 1948."
            }
        ],
        "mcqs": [
            {
                "q": "ITC on which of the following is blocked under Section 17(5)?",
                "o": [
                    "Delivery truck",
                    "Corporate gym membership",
                    "Computers for office",
                    "Valves for plant"
                ],
                "a": 1,
                "e": "Club and gym memberships are blocked credits under Section 17(5)(b)."
            }
        ],
        "faqs": [
            {
                "q": "Can I claim ITC on office repair expenses?",
                "a": "Yes, if the expense is charged to profit & loss and not capitalized as immovable property construction."
            }
        ],
        "revisionNotes": "Section 17(5) list: Motor vehicles (<13 seats), food/catering, life insurance, works contract for building, free samples, gifts, personal use items.",
        "keyTakeaways": "Section 17(5) blocks credit on personal consumption & civil work."
    },
    "topic-17": {
        "id": "topic-17",
        "title": "Reverse Charge Mechanism",
        "category": "Input Tax Credit & RCM",
        "overview": "RCM is a mechanism where the recipient of goods or services is liable to pay tax instead of the supplier.",
        "legalDefinition": "Regulated under Sections 9(3) and 9(4) of the CGST Act, 2017.",
        "explanation": "Usually, the supplier collects tax and pays it to the government. In RCM, the supplier doesn't charge tax. The buyer must pay tax directly to the government. Under Section 9(3), specific goods (e.g. cashew nuts, tobacco leaves) and services (e.g. GTAs, legal services by advocates, director services, security services) are notified. Under Section 9(4), purchases from unregistered suppliers by specified classes of registered persons are covered. Recipients must issue self-invoices and payment vouchers.",
        "whyExists": "It helps the government collect tax on sectors that are highly unorganized or where the supplier is non-resident.",
        "example": "A company hires a Goods Transport Agency (GTA) to ship inventory, paying Rs. 10,000. Under RCM, the company pays the GTA Rs. 10,000 and pays Rs. 500 (5% GST) directly to the government cash ledger. They then claim Rs. 500 as ITC in the same month.",
        "flowchart": "Transaction -> Covered under Section 9(3)/9(4) RCM? -> Yes: Recipient pays tax via cash ledger, claims ITC next -> No: Supplier charges tax",
        "importantPoints": [
            "RCM liability must be paid in cash only (cannot use ITC balance to pay RCM).",
            "Self-invoicing is mandatory for RCM purchases from unregistered persons.",
            "Recipient must issue a payment voucher to the supplier."
        ],
        "mistakes": [
            "Paying RCM using credit ledger instead of cash ledger.",
            "Failing to raise a self-invoice for security services hired from an unregistered proprietor."
        ],
        "interviewQuestions": [
            {
                "q": "Can a taxpayer pay reverse charge liability using input tax credit?",
                "a": "No, Section 49(4) dictates that input tax credit can only be used to pay output tax liability. Since RCM is a liability of the recipient, it must be paid by cash ledger."
            }
        ],
        "mcqs": [
            {
                "q": "RCM liability must be paid using which ledger?",
                "o": [
                    "Credit Ledger",
                    "Cash Ledger",
                    "Liability Ledger",
                    "Any of the above"
                ],
                "a": 1,
                "e": "RCM must be paid in cash through the electronic cash ledger."
            }
        ],
        "faqs": [
            {
                "q": "What is self-invoicing?",
                "a": "A document raised by a registered buyer when purchasing taxable goods/services from an unregistered seller, showing the RCM tax calculation."
            }
        ],
        "revisionNotes": "Section 9(3) notified list: GTAs, lawyers, directors, import of services. Section 9(4) unregistered purchases. Must pay in cash. Eligible for ITC.",
        "keyTakeaways": "RCM = Recipient pays + paid in cash + self-invoice required."
    },
    "topic-18": {
        "id": "topic-18",
        "title": "Composition Scheme",
        "category": "Registration & Compliance Schemes",
        "overview": "The Composition Scheme is a simplified tax scheme for small taxpayers to reduce compliance burden, paying a fixed percentage of turnover.",
        "legalDefinition": "Regulated under Section 10 of the CGST Act, 2017, and Rules 3 to 7.",
        "explanation": "Available to manufacturers and traders with aggregate turnover up to Rs. 1.5 Crore (Rs. 75 Lakhs in North Eastern states). Tax rates: Manufacturers/Traders pay 1% of turnover; Restaurants pay 5%. Under Section 10(2A), service providers with turnover up to Rs. 50 Lakhs can pay 6%. Composition taxpayers cannot claim ITC, cannot collect tax from customers, and must issue a 'Bill of Supply' instead of a Tax Invoice.",
        "whyExists": "It reduces bookkeeping and invoice compliance costs for small shopkeepers, startups, and local service providers.",
        "example": "A local grocery store has a quarterly turnover of Rs. 10 Lakhs. Being a composition trader, they pay Rs. 10,000 (1%) tax directly using Form CMP-08, without maintaining complex purchase tax records.",
        "flowchart": "Turnover < 1.5 Crore -> Apply Section 10 -> Issue Bill of Supply (No GST collection) -> Pay flat tax quarterly via CMP-08",
        "importantPoints": [
            "Cannot make inter-state outward sales.",
            "Must display 'composition taxable person' on all bills and signboards.",
            "Annual return GSTR-4 is filed by 30th April of next financial year."
        ],
        "mistakes": [
            "Issuing a tax invoice showing GST rates instead of a Bill of Supply.",
            "Claiming input tax credit on purchases."
        ],
        "interviewQuestions": [
            {
                "q": "What are the returns filed by a composition dealer?",
                "a": "A quarterly statement-cum-challan in Form CMP-08 (by 18th of next month of quarter) and an annual return in Form GSTR-4 (by 30th April of next financial year)."
            }
        ],
        "mcqs": [
            {
                "q": "What is the tax rate for restaurants under Composition Scheme?",
                "o": [
                    "1%",
                    "5%",
                    "6%",
                    "18%"
                ],
                "a": 1,
                "e": "Restaurants not serving alcohol pay 5% tax on turnover under Section 10."
            }
        ],
        "faqs": [
            {
                "q": "Can a composition dealer buy goods from another state?",
                "a": "Yes, inward inter-state supplies are allowed, but outward inter-state supplies are blocked."
            }
        ],
        "revisionNotes": "Section 10. Turnover limit = 1.5Cr (50L for services). Flat rates: 1% (mfg/traders), 5% (rest), 6% (services). No ITC. Bill of Supply.",
        "keyTakeaways": "Low tax rate + simplified compliance - no ITC."
    },
    "topic-19": {
        "id": "topic-19",
        "title": "GST Registration",
        "category": "Registration & Compliance Schemes",
        "overview": "GST Registration is the process by which a business gets registered under the GST laws and obtains a unique 15-digit GSTIN.",
        "legalDefinition": "Regulated under Sections 22 to 30 of the CGST Act, 2017, and Rules 8 to 26.",
        "explanation": "Registration is mandatory if aggregate turnover exceeds the threshold: Rs. 40 Lakhs for supplier of goods (Rs. 20 Lakhs in hill/special states), and Rs. 20 Lakhs for services (Rs. 10 Lakhs in special states). Under Section 24, certain categories need **compulsory registration** regardless of turnover (e.g. inter-state suppliers, casual taxable persons, e-commerce operators, those paying RCM). Registration is applied via GST REG-01.",
        "whyExists": "It establishes the legal status of the taxpayer, giving them the authority to collect GST and pass on Input Tax Credit to customers.",
        "example": "A freelancer in Mumbai starts offering coding services. When their billing crosses Rs. 20 Lakhs, they must register for GST within 30 days and obtain a GSTIN starting with state code 27.",
        "flowchart": "Cross Threshold or Sec 24 category? -> Yes: Apply REG-01 on portal within 30 days -> Get TRN -> Verify OTP -> Get ARN -> Officer approval -> GSTIN",
        "importantPoints": [
            "GSTIN is PAN-based and state-specific.",
            "First two digits of GSTIN represent the State Code (e.g. 27 for Maharashtra).",
            "Voluntary registration is allowed under Section 25(3)."
        ],
        "mistakes": [
            "Failing to register within 30 days of crossing the threshold.",
            "Supplying goods to another state (inter-state) without compulsory registration."
        ],
        "interviewQuestions": [
            {
                "q": "Who needs compulsory registration under Section 24?",
                "a": "Inter-state outward suppliers, casual taxable persons, non-resident taxable persons, agents of suppliers, those liable to pay tax under reverse charge, and e-commerce operators."
            }
        ],
        "mcqs": [
            {
                "q": "What is the threshold limit for registration of service providers in Maharashtra?",
                "o": [
                    "Rs. 10 Lakhs",
                    "Rs. 20 Lakhs",
                    "Rs. 40 Lakhs",
                    "Rs. 1.5 Crore"
                ],
                "a": 1,
                "e": "Service providers need registration once aggregate turnover exceeds Rs. 20 Lakhs."
            }
        ],
        "faqs": [
            {
                "q": "What is TRN and ARN?",
                "a": "TRN is Temporary Reference Number generated during Part A of REG-01. ARN is Application Reference Number generated after final form submission."
            }
        ],
        "revisionNotes": "Sections 22 (limits), 24 (compulsory), 25 (procedure). Goods limit = 40L, Services = 20L. 15-digit GSTIN.",
        "keyTakeaways": "Threshold base + PAN linked + State specific."
    },
    "topic-20": {
        "id": "topic-20",
        "title": "Cancellation of Registration",
        "category": "Registration & Compliance Schemes",
        "overview": "Cancellation of registration means the taxpayer's GSTIN is deactivated and they can no longer collect GST or claim ITC.",
        "legalDefinition": "Regulated under Section 29 of the CGST Act, 2017, and Rules 20 to 22.",
        "explanation": "Cancellation can be initiated by the taxpayer (due to business closure, change in constitution, or turnover falling below threshold) or **suo-motu** by the tax officer. Officer cancellation triggers: failure to file returns for continuous 6 months (or 3 tax periods for composition), obtaining registration by fraud, or violating GST rules. Taxpayer can file for revocation of cancellation in REG-21.",
        "whyExists": "It allows inactive businesses to exit the tax net cleanly while giving authorities the power to shut down non-compliant or fraudulent tax filers.",
        "example": "A proprietor shuts down their retail shop. They apply for cancellation in Form REG-16, reverse ITC on closing stock, and file the final return GSTR-10.",
        "flowchart": "Business Discontinued -> Apply cancellation (REG-16) -> Pay tax on closing stock -> Final Return GSTR-10",
        "importantPoints": [
            "Must file GSTR-10 (Final Return) within 3 months of cancellation order.",
            "Must reverse/pay tax on closing stock or capital goods (calculated under Sec 29(5)).",
            "Revocation application must be filed within 30 days of cancellation order (extendable)."
        ],
        "mistakes": [
            "Failing to reverse ITC on closing stock at the time of cancellation.",
            "Collecting GST from customers after applying for cancellation."
        ],
        "interviewQuestions": [
            {
                "q": "Under what circumstances can a tax officer cancel a registration suo-motu?",
                "a": "Violations of GST Act rules, non-filing of returns (6 months for normal, 3 quarters for composition), registration obtained by fraud, or not commencing business within 6 months of voluntary registration."
            }
        ],
        "mcqs": [
            {
                "q": "Which form is used for final return after GST cancellation?",
                "o": [
                    "GSTR-9",
                    "GSTR-10",
                    "REG-16",
                    "GSTR-3B"
                ],
                "a": 1,
                "e": "GSTR-10 is the Final Return required within 3 months of cancellation."
            }
        ],
        "faqs": [
            {
                "q": "Can I reactivate a cancelled GST registration?",
                "a": "Yes, by filing an application for revocation in Form GST REG-21 within the statutory timelines."
            }
        ],
        "revisionNotes": "Section 29. Cancellation by taxpayer (REG-16) or officer suo-motu (non-filing, fraud). Final return GSTR-10. Stock tax payment.",
        "keyTakeaways": "Deactivation + Stock tax adjustment + GSTR-10."
    },
    "topic-21": {
        "id": "topic-21",
        "title": "Amendment of Registration",
        "category": "Registration & Compliance Schemes",
        "overview": "Amendment of registration allows taxpayers to update their registration details on the GST portal without canceling their GSTIN.",
        "legalDefinition": "Regulated under Section 28 of the CGST Act, 2017, and Rule 19.",
        "explanation": "Amendments are classified into two types: 1. **Core Fields:** Legal name of business, principal place of business, additional place of business, and addition/deletion of partners/directors. Requires officer approval via Form REG-14 within 15 days. 2. **Non-Core Fields:** Mobile numbers, email IDs, minor business descriptions. Auto-approved on portal via verification without officer intervention.",
        "whyExists": "It ensures that the taxpayer database remains accurate, and businesses do not have to apply for new GSTINs for minor operational changes.",
        "example": "A company relocates its office from Andheri to Bandra. They must file an amendment application in Form REG-14 with proof of new address (electricity bill/rent agreement) within 15 days of the shift.",
        "flowchart": "Business Details Change -> Select Core or Non-Core -> Core: Upload docs (REG-14) -> Officer approval -> Updated registration cert (REG-06)",
        "importantPoints": [
            "Changes in PAN cannot be amended (requires new registration).",
            "Changes in state jurisdiction cannot be amended (requires new registration).",
            "Must apply for amendment within 15 days of the change."
        ],
        "mistakes": [
            "Failing to update address change on the portal, leading to delivery of notices to the old address.",
            "Attempting to amend the PAN on the existing registration."
        ],
        "interviewQuestions": [
            {
                "q": "What is the difference between core and non-core amendments?",
                "a": "Core amendments (e.g., name, partners, address) require approval from the tax officer with supporting documents. Non-core amendments (e.g. contact info) are auto-saved on the portal immediately."
            }
        ],
        "mcqs": [
            {
                "q": "Which of the following is a core field amendment?",
                "o": [
                    "Change in mobile number",
                    "Change in legal name of business",
                    "Change in email address",
                    "None of the above"
                ],
                "a": 1,
                "e": "Legal name of business is a core field requiring officer approval."
            }
        ],
        "faqs": [
            {
                "q": "How long does it take for a core amendment to get approved?",
                "a": "Within 15 working days from submission of the application."
            }
        ],
        "revisionNotes": "Section 28, Rule 19. Apply within 15 days of change. Core (approvals: address, directors) vs Non-core (auto-save). State/PAN changes require new GSTIN.",
        "keyTakeaways": "Core vs Non-Core + 15 days limit."
    },
    "topic-22": {
        "id": "topic-22",
        "title": "GST Returns Overview",
        "category": "Billing & Returns",
        "overview": "GST returns are self-declared forms filed by taxpayers detailing sales, purchases, and tax payments, enabling tax reconciliation.",
        "legalDefinition": "Regulated under Sections 37 to 48 of the CGST Act, 2017, and Rules 59 to 84.",
        "explanation": "Primary returns: 1. **GSTR-1:** Details of outward supplies (sales), filed by 11th of succeeding month (or quarterly under QRMP). 2. **GSTR-3B:** Monthly self-assessed summary return showing output tax liability, ITC claimed, and net tax paid (due by 20th of succeeding month). 3. **GSTR-2B:** Static auto-drafted ITC statement generated on 14th of month for buyers. 4. **GSTR-9/9C:** Annual return and reconciliation statement.",
        "whyExists": "It serves as the formal reporting interface between the taxpayer and the tax administration to record tax payments.",
        "example": "A service provider in Chennai files GSTR-1 on the 10th of November detailing all invoices sent in October. On the 20th of November, they verify their eligible credit in GSTR-2B and file GSTR-3B to pay the net tax.",
        "flowchart": "File GSTR-1 (sales details) -> Buyer checks GSTR-2B (ITC balance) -> Buyer files GSTR-3B (offsets liability & pays cash)",
        "importantPoints": [
            "Filing GSTR-1 is mandatory before filing GSTR-3B.",
            "Amendments can only be done in the return of subsequent periods (no revised return concept).",
            "Filing 'Nil' returns is compulsory even if there are no business transactions."
        ],
        "mistakes": [
            "Failing to reconcile GSTR-3B purchases with the GSTR-2B statement, resulting in excess ITC claims.",
            "Delaying Nil return filings, attracting daily late fees."
        ],
        "interviewQuestions": [
            {
                "q": "What is GSTR-2B, and how does it differ from GSTR-2A?",
                "a": "GSTR-2B is a static statement generated once a month (on the 14th) showing eligible ITC. GSTR-2A is a dynamic, real-time read-only statement that updates constantly as suppliers file returns."
            }
        ],
        "mcqs": [
            {
                "q": "What is the standard due date for filing GSTR-3B monthly?",
                "o": [
                    "10th of next month",
                    "11th of next month",
                    "20th of next month",
                    "30th of next month"
                ],
                "a": 2,
                "e": "Monthly GSTR-3B returns are due by the 20th of the succeeding month."
            }
        ],
        "faqs": [
            {
                "q": "Can I revise a filed GST return?",
                "a": "No, GST returns cannot be revised. Corrective adjustments must be reported in the return of the subsequent month."
            }
        ],
        "revisionNotes": "GSTR-1 (sales, 11th). GSTR-3B (payment, 20th). GSTR-2B (static ITC, 14th). QRMP scheme for small taxpayers (quarterly returns, monthly pay).",
        "keyTakeaways": "GSTR-1 (Sales) + GSTR-3B (Payment) + Static GSTR-2B."
    },
    "topic-23": {
        "id": "topic-23",
        "title": "E-Way Bill",
        "category": "Billing & Returns",
        "overview": "An E-Way Bill is an electronic document generated on the portal to track the movement of goods exceeding Rs. 50,000 in value.",
        "legalDefinition": "Regulated under Section 68 of the CGST Act, 2017, and Rule 138 of CGST Rules.",
        "explanation": "Required for any movement of goods in a vehicle/conveyance where consignments exceed Rs. 50,000 (limit is higher in some states for intra-state movement). It has two parts: **Part A:** Details of consignor, consignee, HSN code, value of goods, and invoice number. **Part B:** Vehicle number or transporter details. An E-way bill is valid for 1 day per 200 km (20 km for over-dimensional cargo).",
        "whyExists": "It prevents tax evasion by ensuring goods are not transported without a valid invoice or tax record.",
        "example": "A supplier in Mumbai sends a truck of steel to Pune worth Rs. 2,00,000. Before the truck leaves, the shipper logs onto the E-way bill portal, enters invoice details and truck number (MH-12-XX-XXXX), and prints the EWC document.",
        "flowchart": "Goods Value > 50,000 -> Generate Part A (invoice details) -> Add Part B (vehicle/transporter info) -> Generate E-Way Bill -> Print & Hand to Driver",
        "importantPoints": [
            "E-way bill is mandatory for inter-state movement of handicraft goods or job work regardless of value.",
            "Validity can be extended within 8 hours of expiry.",
            "Verification: Tax officers can intercept vehicles to verify e-way bills."
        ],
        "mistakes": [
            "Transporting goods with Part B incomplete (makes the e-way bill invalid, attracting 100% tax penalty).",
            "Not extending validity when the transport vehicle breaks down and delays delivery."
        ],
        "interviewQuestions": [
            {
                "q": "What is the validity of an E-Way Bill?",
                "a": "For regular cargo, 1 day for distances up to 200 km, and 1 additional day for every additional 200 km (or part thereof)."
            }
        ],
        "mcqs": [
            {
                "q": "What is the threshold value for compulsory generation of E-Way Bill?",
                "o": [
                    "Rs. 20,000",
                    "Rs. 50,000",
                    "Rs. 1,00,000",
                    "Rs. 10,000"
                ],
                "a": 1,
                "e": "An E-way bill is compulsory when consignment value of goods exceeds Rs. 50,000."
            }
        ],
        "faqs": [
            {
                "q": "Who is responsible for generating the E-way bill?",
                "a": "The consignor (sender), consignee (receiver), or the transporter carrying the goods."
            }
        ],
        "revisionNotes": "Rule 138. Threshold: >Rs. 50,000. Part A (invoice) + Part B (vehicle). Validity: 1 day per 200 km. Penalty for transport without bill = 100% of tax/goods value.",
        "keyTakeaways": "Transit tracking + Invoice matching + Heavy penalty for non-compliance."
    },
    "topic-24": {
        "id": "topic-24",
        "title": "E-Invoice",
        "category": "Billing & Returns",
        "overview": "E-Invoicing is a system where B2B invoices are uploaded and authenticated by the government's Invoice Registration Portal (IRP), generating an Invoice Reference Number (IRN) and QR code.",
        "legalDefinition": "Regulated under Rule 48(4) of the CGST Rules.",
        "explanation": "Currently mandatory for businesses with aggregate turnover exceeding **Rs. 5 Crore** in any preceding financial year from 2017-18 onwards. The seller generates a standard JSON invoice from their ERP and uploads it to the IRP. The portal returns a signed invoice with a 64-character hex **IRN** and a **QR Code**. A B2B invoice printed without the IRN/QR code is legally invalid under the law.",
        "whyExists": "It ensures real-time reporting of sales invoices, preventing back-dated invoice creation and reducing mismatched ITC in GSTR-2B.",
        "example": "A wholesaler with Rs. 10 Crore turnover bills a corporate client. Their ERP automatically calls the government API, registers the invoice, receives the QR code, and prints it on the invoice. The sales details auto-populate the wholesaler's GSTR-1.",
        "flowchart": "ERP generates invoice JSON -> Uploads to IRP portal -> IRP validates -> Generates IRN + QR -> Returns to ERP -> Invoice printed -> Auto-populates GSTR-1",
        "importantPoints": [
            "Applies to B2B invoices, export invoices, and credit/debit notes.",
            "B2C invoices are currently exempt from e-invoicing.",
            "An e-invoice cannot be modified/edited on the IRP; it can only be cancelled within 24 hours of generation."
        ],
        "mistakes": [
            "Failing to generate an e-invoice when turnover exceeds Rs. 5 Crore, resulting in buyer losing their ITC.",
            "Trying to generate an e-invoice for B2C transactions."
        ],
        "interviewQuestions": [
            {
                "q": "What is the consequence of not generating an e-invoice when applicable?",
                "a": "The invoice is not treated as a valid tax invoice in the eyes of the law. The recipient cannot claim Input Tax Credit based on it, and the supplier is liable to penalty for non-issuance of invoice."
            }
        ],
        "mcqs": [
            {
                "q": "What is the current turnover threshold for compulsory E-Invoicing?",
                "o": [
                    "Rs. 100 Crore",
                    "Rs. 20 Crore",
                    "Rs. 5 Crore",
                    "Rs. 10 Crore"
                ],
                "a": 2,
                "e": "E-invoicing is compulsory for businesses with aggregate turnover exceeding Rs. 5 Crore."
            }
        ],
        "faqs": [
            {
                "q": "Can I cancel an e-invoice after 24 hours?",
                "a": "No, IRP cancellation is blocked after 24 hours. You must issue a credit note to nullify the invoice."
            }
        ],
        "revisionNotes": "Rule 48(4). Limit >5Cr. Generates 64-character IRN and QR code. Real-time GSTR-1 populating. Cancel within 24 hours. B2B only.",
        "keyTakeaways": "Authenticated B2B billing + IRN + QR + Prevent tax manipulation."
    },
    "topic-25": {
        "id": "topic-25",
        "title": "Refund under GST",
        "category": "Billing & Returns",
        "overview": "Refund refers to the repayment of any tax, interest, or penalty paid in excess or unutilized credit returned to the taxpayer.",
        "legalDefinition": "Regulated under Section 54 of the CGST Act, 2017, and Rules 89 to 97A.",
        "explanation": "Refunds can be claimed in Form GST RFD-01. Common scenarios include: exports of goods/services under LUT (refund of input credit), inverted duty structure (inputs have higher tax rate than outputs), and excess balance in electronic cash ledger. The application must be filed within 2 years of the relevant date. Refund orders are issued in Form RFD-06.",
        "whyExists": "It maintains cash flow for exporters and businesses facing tax accumulation due to inverted tariff structures.",
        "example": "A software company exports services to a US client without paying output tax under an LUT. They paid Rs. 1,00,000 GST on laptops and servers. Since they cannot use this credit internally, they apply for a refund in RFD-01 and get Rs. 1,00,000 credited to their bank account.",
        "flowchart": "Unutilized ITC / Excess Tax paid -> File RFD-01 online within 2 years -> Acknowledgment (RFD-02) -> Verification -> Refund sanction order (RFD-06)",
        "importantPoints": [
            "Provisional refund of 90% is sanctioned within 7 days for exporters (Section 54(6)).",
            "If refund is delayed beyond 60 days of application, interest @ 6% is paid.",
            "Unutilized ITC refund is not allowed if goods are subject to export duty."
        ],
        "mistakes": [
            "Failing to apply for refund within the 2-year limitation window.",
            "Claiming refund of input credit on capital goods under inverted duty structure (blocked under rules)."
        ],
        "interviewQuestions": [
            {
                "q": "What is the inverted duty structure under GST refunds?",
                "a": "It is a scenario where the rate of tax on inputs is higher than the rate of tax on output supplies, leading to accumulation of credit."
            }
        ],
        "mcqs": [
            {
                "q": "What is the interest rate paid by the department on delayed refunds?",
                "o": [
                    "18% per annum",
                    "6% per annum",
                    "24% per annum",
                    "12% per annum"
                ],
                "a": 1,
                "e": "If refund is not paid within 60 days, interest is paid at 6% p.a. under Section 56."
            }
        ],
        "faqs": [
            {
                "q": "Can I get a refund of CGST/SGST if I make an inter-state sale?",
                "a": "No, inter-state sales use IGST. Refund rules are specific to exports, inverted duty, or cash ledger excess."
            }
        ],
        "revisionNotes": "Section 54. 2 years time limit. Form RFD-01. Exporters get 90% provisional refund. 6% interest on delayed payouts.",
        "keyTakeaways": "Export support + 2 years limit + cash ledger refund."
    },
    "topic-26": {
        "id": "topic-26",
        "title": "Assessment under GST",
        "category": "Audit & Disputes",
        "overview": "Assessment is the process of determining tax liability under the GST Acts.",
        "legalDefinition": "Regulated under Sections 59 to 64 of the CGST Act, 2017.",
        "explanation": "GST relies on Self-Assessment (Sec 59). In case of doubt, a taxpayer can apply for Provisional Assessment (Sec 60) to pay tax at a provisional rate. Scrutiny of Returns (Sec 61) involves officers checking returns for discrepancies and issuing ASMT-10. Best Judgment Assessment applies to non-filers (Sec 62) and unregistered persons (Sec 63). Summary Assessment (Sec 64) is a protective assessment to safeguard revenue.",
        "whyExists": "It establishes tax officer powers to verify declarations, detect tax evasion, and compute liability when taxpayers default.",
        "example": "A taxpayer fails to file GSTR-3B for three months. The officer issues a notice, and if the taxpayer still defaults, the officer issues a Best Judgment Assessment order in Form ASMT-13.",
        "flowchart": "Taxpayer declaration -> Scrutiny (Sec 61) -> Discrepancy found? -> Yes: Notice ASMT-10 -> Accept/Clarify -> Close case",
        "importantPoints": [
            "ASMT-10 must be responded to within 30 days.",
            "Provisional assessment must be finalized within 6 months (extendable).",
            "Best judgment order is withdrawn if taxpayer files valid returns within 30 days of service."
        ],
        "mistakes": [
            "Ignoring ASMT-10 discrepancy notices, which leads to demand under Section 73/74.",
            "Assuming best judgment assessments cannot be challenged."
        ],
        "interviewQuestions": [
            {
                "q": "What happens if a taxpayer fails to respond to an ASMT-10 scrutiny notice?",
                "a": "The tax officer can initiate audit, special audit, or direct demand proceedings under Section 73 or 74."
            }
        ],
        "mcqs": [
            {
                "q": "Which section governs Best Judgment Assessment for non-filers?",
                "o": [
                    "Section 61",
                    "Section 62",
                    "Section 63",
                    "Section 64"
                ],
                "a": 1,
                "e": "Section 62 governs assessment of registered persons who fail to file returns."
            }
        ],
        "faqs": [
            {
                "q": "What is ASMT-10?",
                "a": "A notice issued by an officer under Section 61 pointing out return differences (e.g. GSTR-1 vs 3B) and requesting explanation."
            }
        ],
        "revisionNotes": "Sec 59 Self. Sec 60 Provisional. Sec 61 Scrutiny (ASMT-10). Sec 62 Non-filers (Best Judgment). Sec 63 Unregistered. Sec 64 Summary.",
        "keyTakeaways": "Self compliance + Officer validation powers."
    },
    "topic-27": {
        "id": "topic-27",
        "title": "Audit under GST",
        "category": "Audit & Disputes",
        "overview": "Audit involves the detailed examination of accounting records, returns, and compliance documents of a registered business under GST.",
        "legalDefinition": "Regulated under Sections 65 and 66 of the CGST Act, 2017, and Rules 101 to 102.",
        "explanation": "Audits are: 1. **Audit by Tax Authorities (Section 65):** Conducted by tax officers at the place of business or office. The taxpayer gets 15 days notice (ADT-01). Must finish within 3 months (extendable). 2. **Special Audit (Section 66):** Ordered by Assistant Commissioner in complex cases. Conducted by a nominated CA/Cost Accountant. Requires ADT-03.",
        "whyExists": "It verifies the accuracy of turnover, tax paid, refund claims, and input tax credit claimed to ensure tax compliance.",
        "example": "A large manufacturing unit is selected for audit. The CGST officers send Form ADT-01, visit the factory, reconcile purchase registers with GSTR-2B, and verify physical stock matches books.",
        "flowchart": "Audit selection -> Issue ADT-01 (15 days notice) -> Conduct Audit -> Findings draft -> Taxpayer reply -> Final ADT-02 report",
        "importantPoints": [
            "Audit findings must be shared with the taxpayer within 30 days of completion.",
            "Taxpayers must provide all ledger access and support during audit.",
            "Special audit expenses/fees are paid by the government."
        ],
        "mistakes": [
            "Failing to reconcile books of accounts with GST portals before audit.",
            "Refusing to provide invoices or records to auditing tax officers."
        ],
        "interviewQuestions": [
            {
                "q": "What is a Special Audit under Section 66, and when is it ordered?",
                "a": "A Special Audit is ordered when an officer believes value has not been declared correctly or credit claimed is excess. It is conducted by a department-nominated CA."
            }
        ],
        "mcqs": [
            {
                "q": "How many days notice must be given before starting a general audit under Section 65?",
                "o": [
                    "7 days",
                    "15 days",
                    "30 days",
                    "10 days"
                ],
                "a": 1,
                "e": "A minimum of 15 working days prior notice in Form ADT-01 is required."
            }
        ],
        "faqs": [
            {
                "q": "Is taxpayer audit by a CA mandatory now?",
                "a": "No, CA GST audit (GSTR-9B) was abolished. GSTR-9C is now self-certified by the taxpayer."
            }
        ],
        "revisionNotes": "Sec 65 Dept Audit (ADT-01, 3 months limit). Sec 66 Special Audit (ADT-03, nominated CA). Findings lead to demand SCN if unpaid.",
        "keyTakeaways": "Dept Audit (Section 65) + Special Audit (Section 66)."
    },
    "topic-28": {
        "id": "topic-28",
        "title": "Demand under GST",
        "category": "Audit & Disputes",
        "overview": "Demand refers to the formal notice issued by tax authorities demanding unpaid or short-paid tax, interest, and penalties.",
        "legalDefinition": "Regulated under Sections 73 and 74 of the CGST Act, 2017.",
        "explanation": "If tax is unpaid, short-paid, or ITC is wrongly claimed, the department issues a Show Cause Notice (SCN). **Section 73** applies in normal cases (no fraud/suppression). Penalty is 10% of tax or Rs. 10,000 (whichever is higher). **Section 74** applies in fraud/willful misstatement cases. Penalty is 100% of tax. Adjudication order is passed in DRC-07.",
        "whyExists": "It provides a legal structure for the recovery of tax dues while guaranteeing the taxpayer a right to be heard.",
        "example": "An auditor finds a company claimed ITC on personal hotel bookings. The officer issues an SCN under Section 74, demanding the reversal of Rs. 50,000 credit, interest under Section 50, and 100% penalty.",
        "flowchart": "Tax short-paid -> Issue SCN (DRC-01) -> Taxpayer representation -> Adjudication hearing -> Final Order (DRC-07)",
        "importantPoints": [
            "Normal case SCN must be issued at least 3 months before the 3-year limit.",
            "Fraud case SCN must be issued at least 6 months before the 5-year limit.",
            "Voluntary payment: Paying tax + interest before SCN drops penalty to zero (Sec 73)."
        ],
        "mistakes": [
            "Not responding to DRC-01 SCN, leading to ex-parte orders.",
            "Assuming all short-payments attract 100% fraud penalties."
        ],
        "interviewQuestions": [
            {
                "q": "What is the primary difference between Section 73 and Section 74?",
                "a": "Section 73 applies to cases without fraud or suppression. Section 74 is triggered when there is intention of fraud or suppression of facts to evade tax, attracting higher penalties."
            }
        ],
        "mcqs": [
            {
                "q": "What is the limitation period for passing an order in fraud cases (Section 74)?",
                "o": [
                    "3 years",
                    "5 years",
                    "2 years",
                    "1 year"
                ],
                "a": 1,
                "e": "The order must be passed within 5 years from the due date of the annual return."
            }
        ],
        "faqs": [
            {
                "q": "What is Form DRC-01?",
                "a": "The digital Show Cause Notice issued on the portal detailing the demand grounds."
            }
        ],
        "revisionNotes": "Sec 73 (Normal): 3 years limit, 10% penalty. Sec 74 (Fraud): 5 years limit, 100% penalty. Voluntary payments reduce penalty costs.",
        "keyTakeaways": "Section 73 (non-fraud) vs Section 74 (fraud)."
    },
    "topic-29": {
        "id": "topic-29",
        "title": "Recovery of Tax",
        "category": "Audit & Disputes",
        "overview": "Recovery refers to the legal actions taken by the tax department to collect tax dues when a taxpayer fails to pay after a final order.",
        "legalDefinition": "Regulated under Section 79 of the CGST Act, 2017.",
        "explanation": "If tax dues are not cleared within 3 months of an adjudication order, the officer can start recovery under Section 79. Recovery methods include: deducting from money owed to the taxpayer by the department, detaining and selling goods of the taxpayer, issuing garnishee notices to bank/debtors to pay directly to the government, or attaching movable/immovable property.",
        "whyExists": "It ensures the government can enforce tax collection when non-compliant taxpayers refuse to pay assessed tax liabilities.",
        "example": "A company defaults on a Rs. 5 Lakhs GST liability. The tax officer issues a garnishee notice (DRC-13) to the company's bank, directing the bank manager to freeze the account and transfer Rs. 5 Lakhs to the GST treasury.",
        "flowchart": "Final Order DRC-07 -> No payment within 3 months -> Initiate Sec 79 -> Garnishee bank notice / Property attachment -> Realize tax dues",
        "importantPoints": [
            "Recovery can be stayed only if the taxpayer files an appeal and pays the mandatory pre-deposit.",
            "Arrears of tax can also be recovered by magistrate as land revenue arrears.",
            "Garnishee orders can be sent to debtors of the taxpayer."
        ],
        "mistakes": [
            "Ignoring DRC-07 thinking the department cannot access bank accounts directly.",
            "Delaying appeals, which allows recovery action to begin."
        ],
        "interviewQuestions": [
            {
                "q": "What is a garnishee order under Section 79?",
                "a": "It is a notice issued to a third party (like a bank or debtor) who holds money for the taxpayer, directing them to pay that money to the tax department."
            }
        ],
        "mcqs": [
            {
                "q": "Recovery proceedings can start if tax is not paid within ________ of the service of order.",
                "o": [
                    "1 month",
                    "30 days",
                    "3 months",
                    "6 months"
                ],
                "a": 2,
                "e": "Recovery starts if tax remains unpaid for 3 months from service of the final order (Section 78)."
            }
        ],
        "faqs": [
            {
                "q": "Can the department attach my home for GST dues?",
                "a": "Yes, Section 79 permits the attachment and sale of immovable property to recover outstanding tax dues."
            }
        ],
        "revisionNotes": "Section 79 recovery tools: Bank freeze, debtor recovery, goods sale, land revenue recovery. Blocked by filing appeal + pre-deposit.",
        "keyTakeaways": "Garnishee notices + bank freezes + property seizure."
    },
    "topic-30": {
        "id": "topic-30",
        "title": "Appeals and Revision",
        "category": "Audit & Disputes",
        "overview": "Appeals under GST provide a legal mechanism for taxpayers to challenge orders passed by tax authorities.",
        "legalDefinition": "Regulated under Sections 107 to 121 of the CGST Act, 2017, and Rules 108 to 116.",
        "explanation": "If a taxpayer is aggrieved by an order of an adjudicating officer, they file the first appeal to the **Appellate Authority [Commissioner (Appeals)]** under Section 107. Second appeal lies to the **Appellate Tribunal (GSTAT)**. Third appeal goes to the **High Court** (only on substantial question of law), and final appeal to the **Supreme Court**. Pre-deposit is 10% of disputed tax for the first appeal (DRC-01 to APL-01).",
        "whyExists": "It ensures justice and prevents arbitrary tax assessments by providing a fair, multi-tiered judicial review process.",
        "example": "A taxpayer gets an adverse order in DRC-07 for Rs. 2 Lakhs. They file an appeal in Form APL-01 within 3 months, paying a pre-deposit of Rs. 20,000 (10% of Rs. 2 Lakhs), which stays the recovery of the remaining Rs. 1.8 Lakhs.",
        "flowchart": "Adjudication Order -> Commissioner (Appeals) [10% pre-deposit, 3 months limit] -> GSTAT [20% pre-deposit] -> High Court -> Supreme Court",
        "importantPoints": [
            "Taxpayers must file appeals to Commissioner (Appeals) within 3 months of order service.",
            "Department can also file appeals (represented by officer) within 6 months.",
            "Pre-deposit acts as automatic stay on recovery of the remaining balance."
        ],
        "mistakes": [
            "Failing to file the appeal within the 3-month limitation period.",
            "Not paying the mandatory 10% pre-deposit, which makes the appeal invalid."
        ],
        "interviewQuestions": [
            {
                "q": "What is the pre-deposit requirement for filing a first appeal under Section 107?",
                "a": "The taxpayer must pay 100% of the admitted tax liability and 10% of the disputed tax amount, capped at Rs. 25 Crore."
            }
        ],
        "mcqs": [
            {
                "q": "What is the time limit for a taxpayer to file an appeal to the Commissioner (Appeals)?",
                "o": [
                    "1 month",
                    "3 months",
                    "6 months",
                    "30 days"
                ],
                "a": 1,
                "e": "Appeals to the first appellate authority must be filed within 3 months of the order."
            }
        ],
        "faqs": [
            {
                "q": "Does filing an appeal stop tax recovery?",
                "a": "Yes, payment of the pre-deposit automatically stays the recovery of the remaining disputed tax amount."
            }
        ],
        "revisionNotes": "Section 107. Timeline: 3 months (taxpayer), 6 months (dept). Pre-deposit: 10% (APL-01). Tribunal pre-deposit: 20%.",
        "keyTakeaways": "Multi-tier appeal + 3 months limit + 10% pre-deposit."
    },
    "topic-34": {
        "id": "topic-34",
        "title": "Penalties and Prosecution",
        "category": "Penalties & Offences",
        "overview": "Penalties are financial levies imposed for non-compliance or tax offences, while prosecution represents criminal charges.",
        "legalDefinition": "Regulated under Sections 122 to 138 of the CGST Act, 2017.",
        "explanation": "Section 122 lists 21 offences (e.g. issuing invoice without supply, claiming ITC without invoice, tax evasion). The penalty is Rs. 10,000 or the tax evaded/unpaid (whichever is higher) for normal cases, and 100% of tax for fraud. Section 125 provides a general penalty up to Rs. 25,000 for any offence where no specific penalty is defined. Prosecution (imprisonment) can occur for tax evasion exceeding Rs. 1 Crore (up to 5 years for evasion >5 Crore).",
        "whyExists": "It acts as a strong deterrent against tax evasion, fraudulent invoices, and circular trading.",
        "example": "A shell company is caught issuing fake invoices of Rs. 10 Crore without supply. Under Section 122, they face 100% tax penalty. Under Section 132, the promoters are liable for criminal arrest and prosecution.",
        "flowchart": "Detect Offence -> Assess nature (Fraud vs Non-Fraud) -> Non-Fraud: 10% of tax / 10k | Fraud: 100% of tax -> Evaded > 1Cr? -> Initiate Prosecution",
        "importantPoints": [
            "Late fees for GSTR filings are capped at standard statutory ceilings.",
            "General interest rate on late payments is 18% per annum.",
            "Compounding of offences is permitted under Section 138 against payment."
        ],
        "mistakes": [
            "Failing to report transactions, leading to 100% fraud penalties.",
            "Assuming late fee waivers apply automatically to interest liabilities."
        ],
        "interviewQuestions": [
            {
                "q": "What is the maximum penalty for a non-fraud tax default under Section 73?",
                "a": "10% of the tax amount or Rs. 10,000, whichever is higher."
            }
        ],
        "mcqs": [
            {
                "q": "What is the maximum general penalty under Section 125?",
                "o": [
                    "Rs. 5,000",
                    "Rs. 10,000",
                    "Rs. 25,000",
                    "Rs. 50,000"
                ],
                "a": 2,
                "e": "Section 125 provides a general penalty up to Rs. 25,000 where no specific penalty is defined."
            }
        ],
        "faqs": [
            {
                "q": "Is interest mandatory on late filing?",
                "a": "Yes, interest under Section 50 is a statutory charge and must be paid on late payments, even if late fees are waived."
            }
        ],
        "revisionNotes": "Section 122 (21 offences). Penalty = 10% / 10k (normal), 100% (fraud). General penalty Section 125 (25k). Interest = 18% p.a.",
        "keyTakeaways": "Section 122 + 100% fraud penalty + Interest 18%."
    },
    "topic-46": {
        "id": "topic-46",
        "title": "Annual Return",
        "category": "Annual Filings & Portal",
        "overview": "The Annual Return is a comprehensive annual compilation of all monthly/quarterly returns filed during a financial year.",
        "legalDefinition": "Regulated under Section 44 of the CGST Act, 2017, read with Rule 80.",
        "explanation": "Every registered person (except ISD, non-resident, casual taxable person) must file an Annual Return in **Form GSTR-9** on or before 31st December of the succeeding financial year. Taxpayers with aggregate turnover up to Rs. 2 Crore are currently exempt from filing GSTR-9. Taxpayers with turnover exceeding Rs. 5 Crore must also file **GSTR-9C**, a self-certified reconciliation statement matching GSTR-9 values with audited financial statements.",
        "whyExists": "It allows businesses to correct minor differences made during monthly filings, providing a final reconciled tax record for the year.",
        "example": "A company with Rs. 6 Crore turnover files monthly GSTR-1 and GSTR-3B. At year-end, their accountant compiles GSTR-9, checks it against the audited balance sheet, generates the GSTR-9C reconciliation file, and submits both by December 31.",
        "flowchart": "Compile GSTR-1 & 3B values -> Match with Audited Financials -> Fill GSTR-9 -> Cross threshold > 5Cr? -> Yes: File GSTR-9C -> Submit",
        "importantPoints": [
            "GSTR-9 cannot be revised after filing.",
            "Turnover <= 2 Crore: GSTR-9 filing is voluntary/exempted.",
            "Late fees for GSTR-9 are Rs. 200 per day (Rs. 100 CGST + Rs. 100 SGST) capped at 0.5% of turnover."
        ],
        "mistakes": [
            "Failing to reconcile GSTR-9 with audited balance sheet sales and ITC registers.",
            "Filing GSTR-9 without uploading GSTR-9C when turnover is above Rs. 5 Crore."
        ],
        "interviewQuestions": [
            {
                "q": "What is the difference between GSTR-9 and GSTR-9C?",
                "a": "GSTR-9 is the annual return containing compiled values of all returns filed during the year. GSTR-9C is a reconciliation statement comparing GSTR-9 with the audited financial statements."
            }
        ],
        "mcqs": [
            {
                "q": "What is the turnover threshold above which GSTR-9C is mandatory?",
                "o": [
                    "Rs. 1.5 Crore",
                    "Rs. 2 Crore",
                    "Rs. 5 Crore",
                    "Rs. 10 Crore"
                ],
                "a": 2,
                "e": "GSTR-9C is mandatory for registered taxpayers with aggregate turnover exceeding Rs. 5 Crore."
            }
        ],
        "faqs": [
            {
                "q": "Can I claim new ITC in GSTR-9?",
                "a": "No, new ITC cannot be claimed in GSTR-9. It can only be reported if claimed in GSTR-3B of that year or up to the November return of the next year."
            }
        ],
        "revisionNotes": "Section 44. Due date Dec 31. GSTR-9 (Annual Return). Exempt <= 2Cr. GSTR-9C (Reconciliation) mandatory > 5Cr. No revision allowed.",
        "keyTakeaways": "Year-end reconciliation + GSTR-9 + GSTR-9C (>5Cr)."
    },
    "topic-3": {
        "id": "topic-3",
        "title": "GST Law Topic: 3",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-4": {
        "id": "topic-4",
        "title": "GST Law Topic: 4",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-5": {
        "id": "topic-5",
        "title": "GST Law Topic: 5",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-7": {
        "id": "topic-7",
        "title": "GST Law Topic: 7",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-8": {
        "id": "topic-8",
        "title": "GST Law Topic: 8",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-10": {
        "id": "topic-10",
        "title": "GST Law Topic: 10",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-11": {
        "id": "topic-11",
        "title": "GST Law Topic: 11",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-31": {
        "id": "topic-31",
        "title": "GST Law Topic: 31",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-32": {
        "id": "topic-32",
        "title": "GST Law Topic: 32",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-33": {
        "id": "topic-33",
        "title": "GST Law Topic: 33",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-35": {
        "id": "topic-35",
        "title": "GST Law Topic: 35",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-36": {
        "id": "topic-36",
        "title": "GST Law Topic: 36",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-37": {
        "id": "topic-37",
        "title": "GST Law Topic: 37",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-38": {
        "id": "topic-38",
        "title": "GST Law Topic: 38",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-39": {
        "id": "topic-39",
        "title": "GST Law Topic: 39",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-40": {
        "id": "topic-40",
        "title": "GST Law Topic: 40",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-41": {
        "id": "topic-41",
        "title": "GST Law Topic: 41",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-42": {
        "id": "topic-42",
        "title": "GST Law Topic: 42",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-43": {
        "id": "topic-43",
        "title": "GST Law Topic: 43",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-44": {
        "id": "topic-44",
        "title": "GST Law Topic: 44",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-45": {
        "id": "topic-45",
        "title": "GST Law Topic: 45",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-47": {
        "id": "topic-47",
        "title": "GST Law Topic: 47",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-48": {
        "id": "topic-48",
        "title": "GST Law Topic: 48",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-49": {
        "id": "topic-49",
        "title": "GST Law Topic: 49",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    },
    "topic-50": {
        "id": "topic-50",
        "title": "GST Law Topic: 50",
        "category": "Basics & Constitution",
        "overview": "A comprehensive legal guide and practical analysis of the provisions governing this topic under Indian Goods and Services Tax law.",
        "legalDefinition": "Governed under the relevant sections of the CGST Act, 2017, and associated rules and notifications.",
        "explanation": "Detailed academic and practical explanation. Under the GST regime, this provision dictates the statutory compliance workflow, liability boundaries, and procedural rules for taxpayers.",
        "whyExists": "This provision exists to ensure transparency, prevent tax evasion, and harmonize business accounting practices.",
        "example": "An Indian business enterprise processes transactions involving this provision, posts accounting ledger entries, and files returns.",
        "flowchart": "Transaction -> Assessment -> Invoice -> Ledger posting -> GST Return Filing",
        "importantPoints": [
            "Standard HSN code mapping.",
            "ITC ledger reconciliation."
        ],
        "mistakes": [
            "Incorrect ledger postings.",
            "Failing to verify place of supply."
        ],
        "interviewQuestions": [
            {
                "q": "How to ensure compliance?",
                "a": "Reconcile registers with GSTN portal."
            }
        ],
        "mcqs": [
            {
                "q": "Which Act governs GST?",
                "o": [
                    "CGST Act",
                    "Customs Act",
                    "Income Tax Act",
                    "Companies Act"
                ],
                "a": 0,
                "e": "CGST Act, 2017."
            }
        ],
        "faqs": [
            {
                "q": "Is compliance mandatory?",
                "a": "Yes, once registered."
            }
        ],
        "revisionNotes": "Key summary: statutory framework and return reporting timeline.",
        "keyTakeaways": "Timely reporting + regular reconciliation."
    }
};
