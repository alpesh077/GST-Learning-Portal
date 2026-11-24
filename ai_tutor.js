// js/ai_tutor.js
// GST Virtual AI Tutor & Interactive Classroom Engine

(function () {
    // 1. Knowledge Base & Prompt Heuristics
    const AI_KNOWLEDGE = {
        concepts: {
            "supply": {
                title: "Concept of Supply (Section 7)",
                beginner: "Under GST, 'Supply' means selling, transferring, bartering, renting, or licensing goods or services for money in the course of business. No supply = No GST.",
                intermediate: "Section 7(1) defines supply broadly. Schedule I lists supplies made without consideration (like transactions between related persons). Schedule II classifies whether a transaction is a supply of goods or services. Schedule III lists negative items (neither goods nor services, e.g., employee salary, actionable claims).",
                advanced: "Composite supply (Section 2(30)) involves bundled supplies with a principal supply taxed at the principal rate (e.g., laptop with charger). Mixed supply (Section 2(74)) involves unbundled items for a single price, taxed at the highest individual item rate (e.g., gift basket containing chocolates, dry fruits, and canned juice).",
                reference: "CGST Act 2017, Section 7, 8 & Schedules I, II, III"
            },
            "itc": {
                title: "Input Tax Credit (Section 16 & 17)",
                beginner: "ITC is like a discount coupon. When you buy goods for your business, you pay GST. You can reduce that paid GST from the GST you collect on your sales.",
                intermediate: "To claim ITC under Section 16(2), 4 conditions must be met: (1) Possession of tax invoice, (2) Actual receipt of goods/services, (3) Supplier has paid tax to the government (reflected in GSTR-2B), and (4) Buyer has filed GSTR-3B.",
                advanced: "Section 17(5) lists Blocked Credits where ITC is disallowed: motor vehicles for passenger transport (unless used for further supply/training), food & beverages, club memberships, personal consumption, and lost/stolen/destroyed goods. Rule 37 mandates 180-day payment rule with interest for non-payment to suppliers.",
                reference: "CGST Act 2017, Sections 16, 17(5), 49A & Rules 36, 37, 86B"
            },
            "rcm": {
                title: "Reverse Charge Mechanism (Section 9(3) & 9(4))",
                beginner: "Usually, the seller pays GST to the government. In Reverse Charge (RCM), the buyer pays the GST directly to the government instead of the seller.",
                intermediate: "Common RCM services under Notification 13/2017-CT: (1) Goods Transport Agency (GTA) paid by registered entities (5%), (2) Advocate/Legal services to business entities, (3) Sponsorship services, (4) Director remuneration not covered under TDS Section 192, and (5) Import of services.",
                advanced: "Tax payable under RCM must strictly be discharged through the Electronic Cash Ledger; Electronic Credit Ledger balances cannot be used to pay RCM liability. However, once paid in cash, the tax amount becomes eligible as ITC in the same month.",
                reference: "CGST Act 2017, Section 9(3), Notification 13/2017-CTR"
            },
            "e-invoice": {
                title: "E-Invoicing & E-Way Bill (Rule 48(4) & 138)",
                beginner: "E-Invoicing means uploading your B2B sales bill to the government IRP portal to get a unique 64-character IRN number and QR code before handing it to the customer.",
                intermediate: "E-Invoicing is mandatory for businesses with aggregate annual turnover exceeding Rs 5 Crores in any preceding FY. E-Way Bills are mandatory for goods movement when consignment value exceeds Rs 50,000.",
                advanced: "Invoices without IRN where e-invoicing is mandatory are treated as invalid under Rule 48(5). Recipient cannot claim ITC on non-IRN invoices. Validity of E-way bill is 1 day per 200 km for normal cargo and 1 day per 20 km for Over Dimensional Cargo (ODC).",
                reference: "CGST Rules 2017, Rule 48(4), 48(5), 138 & 138A"
            },
            "returns": {
                title: "Return Filing Structure (GSTR-1, 2B, 3B, 9)",
                beginner: "GSTR-1 is your sales list. GSTR-2B is your auto-generated purchase list. GSTR-3B is your monthly summary where you pay tax. GSTR-9 is your annual summary.",
                intermediate: "GSTR-1 is due on the 11th (monthly) or 13th (quarterly under QRMP). GSTR-3B is due on the 20th/22nd/24th. GSTR-2B is a static statement generated on the 14th of each month reflecting eligible and ineligible ITC.",
                advanced: "Rule 88C deals with system-generated notices for discrepancies between GSTR-1 and GSTR-3B exceeding prescribed limits. Rule 88D monitors ITC discrepancies between GSTR-2B and GSTR-3B. Non-compliance results in blocking of subsequent GSTR-1 filing under Rule 59(6).",
                reference: "CGST Act 2017, Sections 37, 38, 39, 44 & Rules 59(6), 88C, 88D"
            }
        },

        commonErrors: [
            {
                category: "Input Tax Credit",
                mistake: "Claiming ITC on GSTR-2A instead of GSTR-2B",
                why: "GSTR-2A is dynamic and changes continuously, whereas GSTR-2B is a static, legally binding monthly statement generated on the 14th of every month.",
                rule: "Section 16(2)(aa) of CGST Act read with Rule 36(4)",
                fix: "Always reconcile purchases strictly with GSTR-2B of the relevant tax period before claiming credit in Table 4 of GSTR-3B."
            },
            {
                category: "Input Tax Credit",
                mistake: "Claiming ITC on food, beverages, or staff welfare expenses",
                why: "Section 17(5)(b)(i) strictly blocks credit on food, beverages, outdoor catering, and beauty treatment unless used in the same category of outward taxable supplies or under statutory obligation.",
                rule: "Section 17(5)(b) of CGST Act",
                fix: "Segregate food and catering bills to non-creditable expense ledger and report as ineligible ITC in Table 4(D)(1) of GSTR-3B."
            },
            {
                category: "Reverse Charge (RCM)",
                mistake: "Paying RCM liability using Input Tax Credit (Credit Ledger)",
                why: "Section 49(4) states credit ledger can only be used for output tax on supplies made by the taxpayer. RCM is a liability as a recipient, not an output tax on own supplies.",
                rule: "Section 49(4) & Section 2(82) of CGST Act",
                fix: "Pay all RCM liabilities strictly using Electronic Cash Ledger through PMT-06 challan. Claim ITC in the same month's GSTR-3B."
            },
            {
                category: "E-Invoicing",
                mistake: "Issuing manual B2B invoice without IRN when turnover > Rs 5 Cr",
                why: "Under Rule 48(5), any invoice issued without an IRN by a taxpayer required to generate e-invoices is legally invalid and treated as non-issued.",
                rule: "Rule 48(4) & 48(5) of CGST Rules",
                fix: "Upload the invoice payload (JSON) to the Invoice Registration Portal (IRP), obtain 64-character IRN and QR code before sharing with recipient."
            },
            {
                category: "Job Work",
                mistake: "Failing to receive back goods sent for job work within statutory time limits",
                why: "Under Section 143, inputs must be received back within 1 year and capital goods within 3 years. If not received, it is deemed as a supply on the date inputs were originally sent.",
                rule: "Section 143(1) of CGST Act",
                fix: "Track Form GST ITC-04 quarterly and ensure job worker returns inputs within 1 year (or seek 1-year extension from Commissioner)."
            }
        ],

        vivaQuestions: [
            {
                q: "What are the 4 fundamental conditions required to claim Input Tax Credit under Section 16(2)?",
                keywords: ["invoice", "receipt of goods", "tax paid by supplier", "return filed", "gstr-2b", "gstr-3b"],
                idealAnswer: "1. Possession of a tax invoice/debit note.\n2. Actual receipt of goods or services.\n3. Tax actually paid to the government by the supplier (reflected in GSTR-2B).\n4. Filing of GSTR-3B return under Section 39.",
                difficulty: "Medium"
            },
            {
                q: "Explain the difference between Zero-Rated Supply and Nil-Rated/Exempted Supply under GST.",
                keywords: ["export", "sez", "itc refund", "zero-rated", "exempt", "no itc", "nil-rated"],
                idealAnswer: "Zero-Rated Supply (Sec 16 IGST Act) applies to exports and supplies to SEZ developers/units. Entire input tax credit is refundable.\nExempt/Nil-Rated Supply has 0% tax but ITC on inputs is blocked and must be reversed under Section 17(2).",
                difficulty: "Hard"
            },
            {
                q: "What is the consequence if a recipient fails to pay the supplier within 180 days from the invoice date?",
                keywords: ["180 days", "reversal of itc", "rule 37", "interest", "re-claim upon payment"],
                idealAnswer: "Under Rule 37, the recipient must reverse the ITC availed along with interest under Section 50. The credit can be reclaimed once payment of value plus tax is made to the supplier.",
                difficulty: "Medium"
            },
            {
                q: "Can a registered person use SGST input credit to pay CGST liability?",
                keywords: ["cross utilization", "sgst to cgst", "section 49a", "not allowed", "igst first"],
                idealAnswer: "No. Cross-utilization between CGST and SGST is strictly prohibited under Section 49A/49B. CGST credit can pay CGST and IGST; SGST credit can pay SGST and IGST.",
                difficulty: "Easy"
            },
            {
                q: "What is the threshold limit for generating an E-Way Bill under Rule 138?",
                keywords: ["50000", "consignment value", "interstate", "handicraft", "job work"],
                idealAnswer: "Consignment value exceeding Rs. 50,000 involving inter-state or intra-state movement of goods. In some cases (e.g. inter-state job work or handicraft goods), e-way bill is mandatory irrespective of consignment value.",
                difficulty: "Easy"
            }
        ],

        practiceQuestions: {
            "easy": [
                {
                    type: "MCQ",
                    q: "What is the maximum rate of CGST that can be levied under Section 9(1) of the CGST Act?",
                    options: ["14%", "20%", "28%", "40%"],
                    answer: 1,
                    explanation: "Section 9(1) caps CGST at 20% (which means maximum combined GST of 40% including SGST/UTGST)."
                },
                {
                    type: "Numerical",
                    q: "ABC Ltd (Mumbai) sells goods to XYZ Ltd (Pune) for Rs. 1,00,000. Applicable GST rate is 18%. Calculate CGST and SGST amounts.",
                    answer: "CGST = Rs. 9,000 (9%) | SGST = Rs. 9,000 (9%) | Total Invoice = Rs. 1,18,000",
                    explanation: "This is an intra-state supply (within Maharashtra), hence CGST (9%) and SGST (9%) apply equally."
                }
            ],
            "medium": [
                {
                    type: "MCQ",
                    q: "Under Section 17(5), ITC is allowed on which of the following passenger motor vehicles?",
                    options: [
                        "Vehicle with seating capacity of 5 persons used by Director",
                        "Vehicle with seating capacity of 7 persons used for client visits",
                        "Vehicle with seating capacity of 15 persons used for employee transport",
                        "Luxury sedan purchased for corporate gifting"
                    ],
                    answer: 2,
                    explanation: "Motor vehicles for transport of persons having approved seating capacity of more than 13 persons (including driver) are eligible for ITC."
                },
                {
                    type: "Numerical",
                    q: "A trader has Output Tax: CGST Rs. 50,000, SGST Rs. 50,000. He has Input Tax Credit: IGST Rs. 80,000, CGST Rs. 20,000, SGST Rs. 15,000. Calculate net cash payable.",
                    answer: "Net Cash Payable = Rs. 0. Remaining ITC Balance = CGST Rs. 10,000, SGST Rs. 5,000.",
                    explanation: "IGST credit Rs. 80,000 is first utilized: Rs. 50,000 against CGST (CGST liability = 0) and Rs. 30,000 against SGST (SGST balance = Rs. 20,000). Then SGST credit Rs. 15,000 is used against SGST. Net SGST cash liability = Rs. 5,000. Unused CGST credit = Rs. 20,000."
                }
            ],
            "hard": [
                {
                    type: "Case Study",
                    q: "Omega Tech receives an invoice of Rs. 10,00,000 + 18% GST on 10th May 2026. Omega pays Rs. 5,00,000 to the supplier on 15th June 2026 and the balance remains unpaid till 15th December 2026. Discuss the ITC reversal under Rule 37.",
                    answer: "180 days expire on 6th November 2026. Since Rs. 5,90,000 (50% value + tax) remains unpaid, proportional ITC of Rs. 90,000 must be reversed in GSTR-3B for November 2026 with interest under Section 50 from the date of availment.",
                    explanation: "Rule 37 mandates proportionate reversal of ITC on unpaid amount after 180 days along with interest."
                }
            ]
        }
    };

    // 2. State Controller
    let tutorState = {
        activeTab: "concept", // concept, chat, invoice, error, viva, questions
        selectedConcept: "supply",
        conceptLevel: "beginner",
        chatHistory: [
            { sender: "ai", text: "Hello! I am your AI GST Tutor and Virtual Law Professor. How can I assist your GST studies today? Ask a question, test your knowledge in Viva, or analyze an invoice." }
        ],
        vivaRound: 0,
        vivaScore: 0,
        currentVivaQ: null,
        generatedQuestions: []
    };

    // 3. Initialization
    document.addEventListener("DOMContentLoaded", () => {
        initTutorView();
        bindTutorEvents();
    });

    function initTutorView() {
        renderConceptView();
        renderChatHistory();
        renderErrorSelector();
    }

    function bindTutorEvents() {
        // Concept Select & Level Toggles
        document.getElementById("concept-select")?.addEventListener("change", (e) => {
            tutorState.selectedConcept = e.target.value;
            renderConceptView();
        });

        document.querySelectorAll(".concept-level-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                document.querySelectorAll(".concept-level-btn").forEach((b) => {
                    b.classList.remove("bg-blue-600", "text-white", "font-bold");
                    b.classList.add("bg-slate-100", "text-slate-700");
                });
                e.target.classList.remove("bg-slate-100", "text-slate-700");
                e.target.classList.add("bg-blue-600", "text-white", "font-bold");
                tutorState.conceptLevel = e.target.dataset.level;
                renderConceptView();
            });
        });

        // Chat send button
        document.getElementById("tutor-chat-send")?.addEventListener("click", handleUserChatSubmit);
        document.getElementById("tutor-chat-input")?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleUserChatSubmit();
        });

        // Invoice Audit Submit
        document.getElementById("invoice-audit-btn")?.addEventListener("click", handleInvoiceAudit);

        // Error Diagnosis Select
        document.getElementById("error-scenario-select")?.addEventListener("change", handleErrorDiagnosis);

        // Viva Controls
        document.getElementById("viva-start-btn")?.addEventListener("click", startVivaSession);
        document.getElementById("viva-submit-btn")?.addEventListener("click", submitVivaAnswer);

        // Practice Question Generator
        document.getElementById("gen-questions-btn")?.addEventListener("click", handleGenerateQuestions);
    }

    // 4. Feature 1: Concept Explainer
    function renderConceptView() {
        const concept = AI_KNOWLEDGE.concepts[tutorState.selectedConcept];
        if (!concept) return;

        document.getElementById("concept-title").textContent = concept.title;
        document.getElementById("concept-ref").textContent = concept.reference;

        let content = concept.beginner;
        if (tutorState.conceptLevel === "intermediate") content = concept.intermediate;
        if (tutorState.conceptLevel === "advanced") content = concept.advanced;

        document.getElementById("concept-explanation").textContent = content;
    }

    // 5. Feature 2: Doubt Solver Chatbot
    function renderChatHistory() {
        const box = document.getElementById("tutor-chat-box");
        if (!box) return;

        box.innerHTML = tutorState.chatHistory
            .map((m) => {
                if (m.sender === "ai") {
                    return `
                    <div class="flex gap-3 items-start">
                        <div class="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow">AI</div>
                        <div class="bg-blue-50 border border-blue-200 rounded-2xl rounded-tl-none p-3 text-xs text-slate-800 leading-relaxed shadow-sm max-w-[85%]">
                            <span class="text-[9px] font-bold text-blue-800 uppercase block mb-1">Virtual GST Professor</span>
                            ${m.text.replace(/\n/g, "<br>")}
                        </div>
                    </div>`;
                } else {
                    return `
                    <div class="flex gap-3 items-start justify-end">
                        <div class="bg-slate-800 text-white rounded-2xl rounded-tr-none p-3 text-xs leading-relaxed shadow-sm max-w-[85%]">
                            <span class="text-[9px] font-bold text-slate-400 uppercase block mb-1">Student Query</span>
                            ${m.text}
                        </div>
                        <div class="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow">You</div>
                    </div>`;
                }
            })
            .join("");

        box.scrollTop = box.scrollHeight;
    }

    function handleUserChatSubmit() {
        const input = document.getElementById("tutor-chat-input");
        const query = input.value.trim();
        if (!query) return;

        tutorState.chatHistory.push({ sender: "user", text: query });
        input.value = "";
        renderChatHistory();

        // Generate AI response
        setTimeout(() => {
            const aiResponse = generateAIAnswer(query);
            tutorState.chatHistory.push({ sender: "ai", text: aiResponse });
            renderChatHistory();
        }, 500);
    }

    function generateAIAnswer(query) {
        const q = query.toLowerCase();
        if (q.includes("itc") || q.includes("credit") || q.includes("input")) {
            return "Input Tax Credit (ITC) is governed by Sections 16, 17, and 18 of the CGST Act. Key rules: Must be reflected in GSTR-2B, actual goods received, and not blocked under Section 17(5). Would you like me to explain blocked credits under Section 17(5)?";
        }
        if (q.includes("rcm") || q.includes("reverse charge")) {
            return "Under Reverse Charge Mechanism (Section 9(3)), the recipient pays GST to the government. Common services: GTA (5%), Legal Services by Advocate, Director Remuneration, and Import of Services. Remember: RCM must always be paid via Cash Ledger, never Credit Ledger.";
        }
        if (q.includes("e-invoice") || q.includes("irn") || q.includes("einvoice")) {
            return "E-Invoicing is mandatory under Rule 48(4) for businesses with aggregate turnover exceeding Rs. 5 Crores. Invoices without an IRN and QR code from the IRP portal are treated as invalid under Rule 48(5).";
        }
        if (q.includes("composition") || q.includes("cmp-08") || q.includes("section 10")) {
            return "Composition Scheme (Section 10) allows eligible small taxpayers (turnover up to Rs 1.5 Cr for goods, Rs 50 Lakhs for services) to pay tax at flat rates (1% traders/mfg, 5% restaurants, 6% service providers) without claiming ITC and without collecting tax from customers.";
        }
        if (q.includes("gstr-1") || q.includes("gstr-3b") || q.includes("return")) {
            return "GST Returns summary: GSTR-1 (Outward sales due 11th monthly), GSTR-2B (Static auto-drafted ITC view available on 14th), GSTR-3B (Monthly summary & tax payment due 20th), and GSTR-9 (Annual reconciliation due 31st Dec).";
        }
        return `Regarding '${query}': In GST law, this falls under statutory compliance provisions. Ensure that your transaction satisfies Section 7 (Supply), possesses a valid Section 31 tax invoice, and matches the correct HSN classification. Let me know if you need a step-by-step numerical breakdown!`;
    }

    window.askQuickChip = function (promptText) {
        document.getElementById("tutor-chat-input").value = promptText;
        handleUserChatSubmit();
    };

    // 6. Feature 3: Invoice Analyzer & Auditor
    function handleInvoiceAudit() {
        const gstin = document.getElementById("inv-gstin").value.trim().toUpperCase();
        const hsn = document.getElementById("inv-hsn").value.trim();
        const taxable = Number(document.getElementById("inv-taxable").value) || 0;
        const rate = Number(document.getElementById("inv-rate").value) || 0;
        const billedCgst = Number(document.getElementById("inv-cgst").value) || 0;
        const billedSgst = Number(document.getElementById("inv-sgst").value) || 0;
        const billedIgst = Number(document.getElementById("inv-igst").value) || 0;
        const isInterstate = document.getElementById("inv-interstate").checked;

        const reportBox = document.getElementById("invoice-audit-result");
        reportBox.classList.remove("hidden");

        const findings = [];
        let score = 100;

        // 1. GSTIN Validation (15 chars regex)
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstin) {
            findings.push("❌ <strong>Missing GSTIN:</strong> Supplier GSTIN is mandatory on all B2B tax invoices under Section 31.");
            score -= 30;
        } else if (!gstinRegex.test(gstin)) {
            findings.push(`⚠️ <strong>Invalid GSTIN Format:</strong> '${gstin}' does not conform to the 15-character statutory format (2-digit state code + 10-digit PAN + entity digit + 'Z' + checksum).`);
            score -= 20;
        } else {
            findings.push(`✅ <strong>Valid GSTIN:</strong> Correct format for State Code: ${gstin.substring(0, 2)}.`);
        }

        // 2. HSN validation
        if (!hsn || hsn.length < 4) {
            findings.push("⚠️ <strong>HSN Warning:</strong> HSN/SAC code must be at least 4 digits (turnover up to 5 Cr) or 6 digits (turnover > 5 Cr) under Notification 78/2020.");
            score -= 15;
        } else {
            findings.push(`✅ <strong>HSN Specified:</strong> Code ${hsn} recorded.`);
        }

        // 3. Tax computation check
        const expectedTax = (taxable * rate) / 100;
        if (isInterstate) {
            if (billedCgst > 0 || billedSgst > 0) {
                findings.push("❌ <strong>Place of Supply Error:</strong> For inter-state supply, CGST & SGST cannot be charged. Only IGST must be levied under Section 5 of IGST Act.");
                score -= 35;
            }
            if (Math.abs(billedIgst - expectedTax) > 1) {
                findings.push(`❌ <strong>Tax Mismatch:</strong> Expected IGST is Rs. ${expectedTax.toFixed(2)}, but billed IGST is Rs. ${billedIgst.toFixed(2)}.`);
                score -= 25;
            } else {
                findings.push(`✅ <strong>Correct IGST:</strong> Rs. ${billedIgst.toFixed(2)} accurately calculated at ${rate}%.`);
            }
        } else {
            const expectedHalf = expectedTax / 2;
            if (billedIgst > 0) {
                findings.push("❌ <strong>Place of Supply Error:</strong> For intra-state supply, IGST cannot be charged. Only CGST & SGST must be levied under Section 9 of CGST Act.");
                score -= 35;
            }
            if (Math.abs(billedCgst - expectedHalf) > 1 || Math.abs(billedSgst - expectedHalf) > 1) {
                findings.push(`❌ <strong>Tax Mismatch:</strong> Expected CGST: Rs. ${expectedHalf.toFixed(2)} & SGST: Rs. ${expectedHalf.toFixed(2)}, but billed CGST: Rs. ${billedCgst} / SGST: Rs. ${billedSgst}.`);
                score -= 25;
            } else {
                findings.push(`✅ <strong>Correct CGST & SGST:</strong> Rs. ${billedCgst.toFixed(2)} + Rs. ${billedSgst.toFixed(2)} accurately calculated at ${rate}%.`);
            }
        }

        score = Math.max(0, score);
        let badge = `<span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">AUDIT PASSED (${score}/100)</span>`;
        if (score < 80) badge = `<span class="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">REQUIRES CORRECTION (${score}/100)</span>`;
        if (score < 50) badge = `<span class="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full">CRITICAL COMPLIANCE FAILURE (${score}/100)</span>`;

        reportBox.innerHTML = `
            <div class="flex justify-between items-center border-b pb-2 mb-3">
                <h4 class="font-extrabold text-slate-800 text-sm">AI Invoice Audit Report</h4>
                ${badge}
            </div>
            <ul class="space-y-2 text-xs text-slate-700 font-sans">
                ${findings.map((f) => `<li class="p-2 rounded bg-white border">${f}</li>`).join("")}
            </ul>
        `;
    }

    // 7. Feature 4: Error Explainer & Diagnosis
    function renderErrorSelector() {
        const select = document.getElementById("error-scenario-select");
        if (!select) return;

        select.innerHTML = '<option value="">-- Choose a common GST error scenario --</option>';
        AI_KNOWLEDGE.commonErrors.forEach((err, idx) => {
            const opt = document.createElement("option");
            opt.value = idx;
            opt.textContent = `[${err.category}] ${err.mistake}`;
            select.appendChild(opt);
        });
    }

    function handleErrorDiagnosis(e) {
        const idx = e.target.value;
        const resultBox = document.getElementById("error-diagnosis-result");
        if (idx === "") {
            resultBox.classList.add("hidden");
            return;
        }

        const item = AI_KNOWLEDGE.commonErrors[idx];
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = `
            <div class="space-y-3 font-sans text-xs">
                <div class="border-b pb-2">
                    <span class="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full uppercase">${item.category}</span>
                    <h4 class="text-sm font-extrabold text-slate-900 mt-2">${item.mistake}</h4>
                </div>
                <div>
                    <strong class="text-slate-800 block mb-1">🔍 Why this error happens:</strong>
                    <p class="text-slate-600 bg-slate-50 p-2.5 rounded-lg border leading-relaxed">${item.why}</p>
                </div>
                <div>
                    <strong class="text-slate-800 block mb-1">⚖️ Statutory GST Provision:</strong>
                    <p class="font-mono text-blue-900 bg-blue-50/50 p-2 rounded border border-blue-100 font-semibold">${item.rule}</p>
                </div>
                <div>
                    <strong class="text-emerald-800 block mb-1">🛠️ Corrective Action Plan:</strong>
                    <p class="text-emerald-900 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 leading-relaxed font-medium">${item.fix}</p>
                </div>
            </div>
        `;
    }

    // 8. Feature 5: Viva / Mock Oral Examiner
    function startVivaSession() {
        tutorState.vivaRound = 0;
        tutorState.vivaScore = 0;
        document.getElementById("viva-setup-panel").classList.add("hidden");
        document.getElementById("viva-active-panel").classList.remove("hidden");
        document.getElementById("viva-report-panel").classList.add("hidden");
        loadNextVivaQuestion();
    }

    function loadNextVivaQuestion() {
        if (tutorState.vivaRound >= AI_KNOWLEDGE.vivaQuestions.length) {
            finishVivaSession();
            return;
        }

        tutorState.currentVivaQ = AI_KNOWLEDGE.vivaQuestions[tutorState.vivaRound];
        document.getElementById("viva-round-lbl").textContent = `Question ${tutorState.vivaRound + 1} of ${AI_KNOWLEDGE.vivaQuestions.length}`;
        document.getElementById("viva-diff-badge").textContent = tutorState.currentVivaQ.difficulty;
        document.getElementById("viva-question-text").textContent = tutorState.currentVivaQ.q;
        document.getElementById("viva-student-answer").value = "";
        document.getElementById("viva-feedback-box").classList.add("hidden");
        document.getElementById("viva-submit-btn").classList.remove("hidden");
        document.getElementById("viva-next-btn").classList.add("hidden");
    }

    function submitVivaAnswer() {
        const studentAns = document.getElementById("viva-student-answer").value.trim().toLowerCase();
        if (!studentAns) {
            alert("Please articulate your answer before submitting.");
            return;
        }

        const currentQ = tutorState.currentVivaQ;
        let matchedKeywords = 0;
        currentQ.keywords.forEach((k) => {
            if (studentAns.includes(k.toLowerCase())) matchedKeywords++;
        });

        const ratio = matchedKeywords / currentQ.keywords.length;
        let points = 0;
        let evaluationText = "";

        if (ratio >= 0.6) {
            points = 20;
            evaluationText = "🌟 <strong>Excellent Answer!</strong> You covered the essential statutory references and legal concepts accurately.";
        } else if (ratio >= 0.3) {
            points = 10;
            evaluationText = "👍 <strong>Partially Correct:</strong> You mentioned some relevant points, but missed key legal provisions.";
        } else {
            points = 0;
            evaluationText = "❌ <strong>Needs Improvement:</strong> Important statutory conditions were omitted.";
        }

        tutorState.vivaScore += points;

        const feedBox = document.getElementById("viva-feedback-box");
        feedBox.classList.remove("hidden");
        feedBox.innerHTML = `
            <div class="space-y-2 text-xs">
                <div class="p-2 rounded ${points >= 10 ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : "bg-rose-50 text-rose-900 border border-rose-200"}">
                    ${evaluationText}
                </div>
                <div class="bg-slate-50 p-3 rounded-lg border">
                    <strong class="text-slate-700 block mb-1">📖 Professor's Benchmark Answer:</strong>
                    <p class="font-mono text-slate-600 text-[11px] leading-relaxed whitespace-pre-line">${currentQ.idealAnswer}</p>
                </div>
            </div>
        `;

        document.getElementById("viva-submit-btn").classList.add("hidden");
        document.getElementById("viva-next-btn").classList.remove("hidden");
    }

    window.nextVivaRound = function () {
        tutorState.vivaRound++;
        loadNextVivaQuestion();
    };

    function finishVivaSession() {
        document.getElementById("viva-active-panel").classList.add("hidden");
        const report = document.getElementById("viva-report-panel");
        report.classList.remove("hidden");

        const totalMax = AI_KNOWLEDGE.vivaQuestions.length * 20;
        const percent = Math.round((tutorState.vivaScore / totalMax) * 100);

        document.getElementById("viva-final-score").textContent = `${tutorState.vivaScore} / ${totalMax} (${percent}%)`;
        let grade = "Grade: B+ (Good Conceptual Understanding)";
        if (percent >= 80) grade = "Grade: A+ (Outstanding - CA Intermediate / Professional Ready)";
        if (percent < 50) grade = "Grade: C (Revise Chapters 2 & 4 thoroughly)";
        document.getElementById("viva-final-grade").textContent = grade;
    }

    window.restartViva = function () {
        document.getElementById("viva-setup-panel").classList.remove("hidden");
        document.getElementById("viva-report-panel").classList.add("hidden");
    };

    // 9. Feature 6: Dynamic Practice Question Generator
    function handleGenerateQuestions() {
        const diff = document.getElementById("gen-diff-select").value;
        const qList = AI_KNOWLEDGE.practiceQuestions[diff] || AI_KNOWLEDGE.practiceQuestions["easy"];

        const container = document.getElementById("generated-questions-container");
        container.innerHTML = qList
            .map((item, idx) => {
                if (item.type === "MCQ") {
                    return `
                    <div class="bg-white p-5 border rounded-2xl shadow-sm space-y-3">
                        <div class="flex justify-between items-center border-b pb-2">
                            <span class="text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase">${item.type}</span>
                            <span class="text-[10px] text-slate-400 font-mono">Difficulty: ${diff.toUpperCase()}</span>
                        </div>
                        <h4 class="text-xs font-bold text-slate-800">${idx + 1}. ${item.q}</h4>
                        <div class="space-y-1.5">
                            ${item.options
                                .map(
                                    (opt, oIdx) => `
                                <label class="flex items-center gap-2 p-2 border rounded-lg hover:bg-slate-50 cursor-pointer text-xs">
                                    <input type="radio" name="gen-q-${idx}" value="${oIdx}" onclick="gradeGenMCQ(${idx}, ${oIdx}, ${item.answer})">
                                    <span>${opt}</span>
                                </label>`
                                )
                                .join("")}
                        </div>
                        <div id="gen-feed-${idx}" class="hidden p-2.5 rounded-lg text-xs font-mono"></div>
                    </div>`;
                } else {
                    return `
                    <div class="bg-white p-5 border rounded-2xl shadow-sm space-y-3 font-sans">
                        <div class="flex justify-between items-center border-b pb-2">
                            <span class="text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 px-2.5 py-0.5 rounded-full uppercase">${item.type}</span>
                            <span class="text-[10px] text-slate-400 font-mono">Difficulty: ${diff.toUpperCase()}</span>
                        </div>
                        <h4 class="text-xs font-bold text-slate-800">${idx + 1}. ${item.q}</h4>
                        <button class="text-xs font-bold text-blue-600 hover:underline" onclick="toggleGenAnswer('ans-${idx}')">💡 Reveal Model Solution</button>
                        <div id="ans-${idx}" class="hidden bg-slate-50 p-3 rounded-lg border space-y-2 text-xs">
                            <p class="font-bold text-slate-900 font-mono">${item.answer}</p>
                            <p class="text-slate-600 text-[11px]">${item.explanation}</p>
                        </div>
                    </div>`;
                }
            })
            .join("");
    }

    window.gradeGenMCQ = function (qIdx, selected, correct) {
        const feed = document.getElementById(`gen-feed-${qIdx}`);
        feed.classList.remove("hidden");
        if (selected === correct) {
            feed.className = "p-2.5 rounded-lg text-xs font-mono bg-emerald-50 text-emerald-900 border border-emerald-200 block";
            feed.innerHTML = "✅ <strong>Correct!</strong> Well analyzed.";
        } else {
            feed.className = "p-2.5 rounded-lg text-xs font-mono bg-rose-50 text-rose-900 border border-rose-200 block";
            feed.innerHTML = "❌ <strong>Incorrect.</strong> Review the statutory provisions and retry.";
        }
    };

    window.toggleGenAnswer = function (elemId) {
        const elem = document.getElementById(elemId);
        if (elem) elem.classList.toggle("hidden");
    };

    // 10. Navigation Tab Switcher
    window.switchTutorTab = function (tabId) {
        tutorState.activeTab = tabId;
        document.querySelectorAll(".tutor-nav-btn").forEach((btn) => {
            btn.classList.remove("bg-white", "text-blue-700", "shadow", "border");
            btn.classList.add("text-slate-600");
        });
        document.getElementById(`tab-btn-${tabId}`).classList.add("bg-white", "text-blue-700", "shadow", "border");

        document.getElementById("pane-tutor-concept").classList.add("hidden");
        document.getElementById("pane-tutor-chat").classList.add("hidden");
        document.getElementById("pane-tutor-invoice").classList.add("hidden");
        document.getElementById("pane-tutor-error").classList.add("hidden");
        document.getElementById("pane-tutor-viva").classList.add("hidden");
        document.getElementById("pane-tutor-questions").classList.add("hidden");

        document.getElementById(`pane-tutor-${tabId}`).classList.remove("hidden");
    };
})();
