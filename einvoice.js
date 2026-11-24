// js/einvoice.js
(function () {
    // Pure JS SHA-256 implementation for local file:// capability
    function sha256(ascii) {
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }
        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = 'length';
        var i, j; 
        var result = '';
        var words = [];
        var asciiLength = ascii[lengthProperty] * 8;
        var hash = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
        var k = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];
        
        ascii += '\x80'; 
        while (ascii[lengthProperty] % 64 - 56) ascii += '\x00'; 
        for (i = 0; i < ascii[lengthProperty]; i++) {
            j = ascii.charCodeAt(i);
            words[i >> 2] |= j << (24 - (i % 4) * 8);
        }
        words[words[lengthProperty]] = ((asciiLength / maxWord) | 0);
        words[words[lengthProperty]] = (asciiLength | 0);
        
        for (j = 0; j < words[lengthProperty];) {
            var w = words.slice(j, j += 16); 
            var oldHash = hash.slice(0);
            
            for (i = 0; i < 64; i++) {
                var wItem = w[i];
                if (i >= 16) {
                    var s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
                    var s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
                    wItem = w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
                }
                
                var ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
                var maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
                var temp1 = (hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + wItem) | 0;
                var temp2 = ((rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj) | 0;
                
                hash = [(temp1 + temp2) | 0].concat(hash);
                hash[4] = (hash[4] + temp1) | 0;
                hash.length = 8;
            }
            
            for (i = 0; i < 8; i++) {
                hash[i] = (hash[i] + oldHash[i]) | 0;
            }
        }
        
        for (i = 0; i < 8; i++) {
            var s = hash[i] >>> 0;
            result += ((s >> 24) & 0xff).toString(16).padStart(2, '0') +
                      ((s >> 16) & 0xff).toString(16).padStart(2, '0') +
                      ((s >> 8) & 0xff).toString(16).padStart(2, '0') +
                      (s & 0xff).toString(16).padStart(2, '0');
        }
        return result;
    }

    // Canvas QR code painter
    function drawMockQrCode(canvasId, textString) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        
        // Draw the outer finder patterns (3 corner squares)
        ctx.fillStyle = '#0f172a'; // Deep Slate
        
        function drawFinder(x, y) {
            ctx.fillRect(x, y, 35, 35);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 5, y + 5, 25, 25);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(x + 10, y + 10, 15, 15);
        }
        
        drawFinder(10, 10); // Top-Left
        drawFinder(size - 45, 10); // Top-Right
        drawFinder(10, size - 45); // Bottom-Left
        
        // Draw a simulated pixel mesh based on characters in textString
        let hashOffset = 0;
        const squareSize = 4;
        const padding = 10;
        
        for (let y = padding; y < size - padding; y += squareSize) {
            for (let x = padding; x < size - padding; x += squareSize) {
                // Avoid finder pattern zones
                if ((x < 50 && y < 50) || (x > size - 50 && y < 50) || (x < 50 && y > size - 50)) {
                    continue;
                }
                
                // Deterministic pseudorandom draw based on the string values
                const charCode = textString.charCodeAt(hashOffset % textString.length) || 0;
                hashOffset++;
                
                const fillRatio = (charCode + x + y) % 5;
                if (fillRatio === 0 || fillRatio === 2) {
                    ctx.fillRect(x, y, squareSize - 0.5, squareSize - 0.5);
                }
            }
        }
    }

    // Default presets
    const PRESETS = {
        supplier: {
            "S1": { name: "Aditya Enterprise Ltd", gstin: "27AAAAA1111A1Z1", state: "Maharashtra (27)", address: "401, Tech Park, Andheri, Mumbai, 400069", code: "27" },
            "S2": { name: "Bharat Electricals Pvt Ltd", gstin: "07BBBBB2222B2Z2", state: "Delhi (07)", address: "88, Connaught Place, New Delhi, 110001", code: "07" }
        },
        buyer: {
            "B1": { name: "Comnet Retail Distribution", gstin: "27CCCCC3333C3Z3", state: "Maharashtra (27)", address: "Sector 15, Vashi, Navi Mumbai, 400703", code: "27" },
            "B2": { name: "Vardhaman IT Hub", gstin: "29DDDDD4444D4Z4", state: "Karnataka (29)", address: "Brigade Road, Bengaluru, 560001", code: "29" }
        }
    };

    let activeState = {
        supplier: PRESETS.supplier["S1"],
        buyer: PRESETS.buyer["B2"],
        docType: "INV",
        docNum: "INV/2026/102",
        docDate: new Date().toISOString().substring(0, 10),
        items: [
            { desc: "Commercial Router G12", hsn: "85176290", qty: 2, price: 12500, rate: 18 }
        ],
        irnGenerated: false,
        irnHash: "",
        signedQrText: ""
    };

    function selectPreset(type, key) {
        if (PRESETS[type] && PRESETS[type][key]) {
            activeState[type] = PRESETS[type][key];
            updateFormFieldsFromState();
            recalculateState();
        }
    }

    function updateFormFieldsFromState() {
        // Supplier DOM
        document.getElementById('supName').value = activeState.supplier.name;
        document.getElementById('supGstin').value = activeState.supplier.gstin;
        document.getElementById('supState').value = activeState.supplier.code;
        document.getElementById('supAddr').value = activeState.supplier.address;

        // Buyer DOM
        document.getElementById('buyName').value = activeState.buyer.name;
        document.getElementById('buyGstin').value = activeState.buyer.gstin;
        document.getElementById('buyState').value = activeState.buyer.code;
        document.getElementById('buyAddr').value = activeState.buyer.address;
    }

    function readStateFromForm() {
        activeState.supplier = {
            name: document.getElementById('supName').value,
            gstin: document.getElementById('supGstin').value.toUpperCase(),
            code: document.getElementById('supState').value,
            address: document.getElementById('supAddr').value
        };

        activeState.buyer = {
            name: document.getElementById('buyName').value,
            gstin: document.getElementById('buyGstin').value.toUpperCase(),
            code: document.getElementById('buyState').value,
            address: document.getElementById('buyAddr').value
        };

        activeState.docType = document.getElementById('docType').value;
        activeState.docNum = document.getElementById('docNum').value.trim();
        activeState.docDate = document.getElementById('docDate').value;
        
        // Read items
        const itemRows = document.querySelectorAll('.item-row');
        activeState.items = [];
        itemRows.forEach(row => {
            const desc = row.querySelector('.item-desc').value;
            const hsn = row.querySelector('.item-hsn').value;
            const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            const rate = parseInt(row.querySelector('.item-rate').value) || 18;
            activeState.items.push({ desc, hsn, qty, price, rate });
        });
    }

    function addItemRow() {
        const tableBody = document.getElementById('itemsTableBody');
        const tr = document.createElement('tr');
        tr.className = 'item-row border-b';
        tr.innerHTML = `
            <td class="p-2"><input type="text" class="item-desc w-full p-1 border text-sm" value="New Line Item" required></td>
            <td class="p-2"><input type="text" class="item-hsn w-full p-1 border text-sm" value="998311" maxlength="8" required></td>
            <td class="p-2"><input type="number" class="item-qty w-full p-1 border text-sm text-right" value="1" min="1" required></td>
            <td class="p-2"><input type="number" class="item-price w-full p-1 border text-sm text-right" value="1000" min="0" required></td>
            <td class="p-2">
                <select class="item-rate w-full p-1 border text-sm">
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18" selected>18%</option>
                    <option value="28">28%</option>
                </select>
            </td>
            <td class="p-2 text-center"><button type="button" class="btn-remove-item text-red-500 hover:text-red-700 font-bold">×</button></td>
        `;
        tableBody.appendChild(tr);

        // Bind events
        tr.querySelector('.btn-remove-item').addEventListener('click', function () {
            tr.remove();
            recalculateState();
        });

        tr.querySelectorAll('input, select').forEach(el => {
            el.addEventListener('input', recalculateState);
        });

        recalculateState();
    }

    function calculateTaxes() {
        let totalTaxable = 0;
        let totalCGST = 0;
        let totalSGST = 0;
        let totalIGST = 0;
        let totalTax = 0;

        const isIntraState = activeState.supplier.code === activeState.buyer.code;

        activeState.items.forEach(item => {
            const lineVal = item.qty * item.price;
            totalTaxable += lineVal;
            const lineTax = (lineVal * item.rate) / 100;
            totalTax += lineTax;
            if (isIntraState) {
                totalCGST += lineTax / 2;
                totalSGST += lineTax / 2;
            } else {
                totalIGST += lineTax;
            }
        });

        return {
            taxable: totalTaxable,
            cgst: totalCGST,
            sgst: totalSGST,
            igst: totalIGST,
            tax: totalTax,
            grand: totalTaxable + totalTax
        };
    }

    function validateSchema() {
        const rules = {
            supplierGstinValid: app.validateGSTIN(activeState.supplier.gstin).valid,
            buyerGstinValid: app.validateGSTIN(activeState.buyer.gstin).valid,
            supplierStateMatch: activeState.supplier.gstin.substring(0, 2) === activeState.supplier.code,
            buyerStateMatch: activeState.buyer.gstin.substring(0, 2) === activeState.buyer.code,
            docNumValid: activeState.docNum.length > 0 && activeState.docNum.length <= 16 && /^[a-zA-Z0-9\/-]+$/.test(activeState.docNum),
            hsnValid: activeState.items.length > 0 && activeState.items.every(i => /^[0-9]{4,8}$/.test(i.hsn)),
            taxMatchingPOS: true
        };

        // Validate place of supply vs tax type
        const isIntraState = activeState.supplier.code === activeState.buyer.code;
        const hasCgstSgst = activeState.items.every(i => {
            const taxes = app.calculateInvoiceTaxes({ seller: activeState.supplier.code, customer: activeState.buyer.code, taxable: i.qty * i.price, rate: i.rate });
            return isIntraState ? (taxes.cgst > 0 && taxes.sgst > 0) : (taxes.igst > 0);
        });
        rules.taxMatchingPOS = hasCgstSgst;

        return rules;
    }

    function renderRulesChecklist(rules) {
        const buildStatus = (isValid) => isValid 
            ? `<span class="text-emerald-600 font-bold flex items-center gap-1">✅ Pass</span>`
            : `<span class="text-red-500 font-bold flex items-center gap-1">❌ Fail</span>`;

        document.getElementById('checkSupGstin').innerHTML = buildStatus(rules.supplierGstinValid);
        document.getElementById('checkBuyGstin').innerHTML = buildStatus(rules.buyerGstinValid);
        document.getElementById('checkSupState').innerHTML = buildStatus(rules.supplierStateMatch);
        document.getElementById('checkBuyState').innerHTML = buildStatus(rules.buyerStateMatch);
        document.getElementById('checkDocNum').innerHTML = buildStatus(rules.docNumValid);
        document.getElementById('checkHsn').innerHTML = buildStatus(rules.hsnValid);
        document.getElementById('checkPosTax').innerHTML = buildStatus(rules.taxMatchingPOS);

        // Highlight generate button based on overall validity
        const allPass = Object.values(rules).every(r => r === true);
        const genBtn = document.getElementById('btnGenerateIRN');
        if (allPass) {
            genBtn.removeAttribute('disabled');
            genBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
            genBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700', 'text-white');
            document.getElementById('validationHint').classList.add('hidden');
        } else {
            genBtn.setAttribute('disabled', 'true');
            genBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700', 'text-white');
            genBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
            document.getElementById('validationHint').classList.remove('hidden');
        }
    }

    function buildInvoiceJson(totals) {
        return {
            "Version": "1.1",
            "TranDtls": {
                "TaxSch": "GST",
                "SupTyp": "B2B",
                "RegRev": "N"
            },
            "DocDtls": {
                "Typ": activeState.docType,
                "No": activeState.docNum,
                "Dt": activeState.docDate.split('-').reverse().join('/')
            },
            "SellerDtls": {
                "Gstin": activeState.supplier.gstin,
                "LglNm": activeState.supplier.name,
                "Addr1": activeState.supplier.address,
                "Loc": activeState.supplier.address.split(',').pop().trim(),
                "Stcd": activeState.supplier.code
            },
            "BuyerDtls": {
                "Gstin": activeState.buyer.gstin,
                "LglNm": activeState.buyer.name,
                "Addr1": activeState.buyer.address,
                "Loc": activeState.buyer.address.split(',').pop().trim(),
                "Pos": activeState.buyer.code
            },
            "ItemList": activeState.items.map((item, idx) => ({
                "SlNo": (idx + 1).toString(),
                "PrdDesc": item.desc,
                "HsnCd": item.hsn,
                "Qty": item.qty,
                "UnitPrice": item.price,
                "TotAmt": item.qty * item.price,
                "GstRt": item.rate,
                "CgstAmt": activeState.supplier.code === activeState.buyer.code ? ((item.qty * item.price * item.rate) / 200) : 0,
                "SgstAmt": activeState.supplier.code === activeState.buyer.code ? ((item.qty * item.price * item.rate) / 200) : 0,
                "IgstAmt": activeState.supplier.code !== activeState.buyer.code ? ((item.qty * item.price * item.rate) / 100) : 0,
                "TotItemVal": item.qty * item.price + ((item.qty * item.price * item.rate) / 100)
            })),
            "ValDtls": {
                "AssVal": totals.taxable,
                "CgstVal": totals.cgst,
                "SgstVal": totals.sgst,
                "IgstVal": totals.igst,
                "TotInvVal": totals.grand
            }
        };
    }

    function renderJsonView(jsonObj) {
        document.getElementById('schemaJsonCode').textContent = JSON.stringify(jsonObj, null, 4);
    }

    function updateIrnHashingBlock() {
        const fy = activeState.docDate ? getFinancialYear(activeState.docDate) : "2026-27";
        const rawString = `${activeState.supplier.gstin}${activeState.docNum}${activeState.docType}${fy}`;
        document.getElementById('hashConcatString').value = rawString;
        
        if (activeState.irnGenerated) {
            document.getElementById('irnHashingResult').classList.remove('hidden');
            document.getElementById('irnHashVal').textContent = activeState.irnHash;
        } else {
            document.getElementById('irnHashingResult').classList.add('hidden');
        }
    }

    function getFinancialYear(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth(); // 0-indexed, so 3 is April
        if (month >= 3) {
            return `${year}-${(year + 1).toString().substring(2)}`;
        } else {
            return `${year - 1}-${year.toString().substring(2)}`;
        }
    }

    function generateIRN() {
        readStateFromForm();
        const fy = getFinancialYear(activeState.docDate);
        const rawString = `${activeState.supplier.gstin}${activeState.docNum}${activeState.docType}${fy}`;
        
        // Hash computation
        const hash = sha256(rawString);
        activeState.irnHash = hash.toUpperCase();
        activeState.irnGenerated = true;
        
        // Create mock signed QR payload
        activeState.signedQrText = JSON.stringify({
            "irn": activeState.irnHash,
            "seller": activeState.supplier.gstin,
            "buyer": activeState.buyer.gstin,
            "docNo": activeState.docNum,
            "docDt": activeState.docDate,
            "totVal": calculateTaxes().grand,
            "sig": "MOCKED_GOVT_CRYPTOGRAPHIC_SIGNATURE_KEY"
        });

        // Update displays
        recalculateState();
        
        // Draw the QR Code on canvas
        setTimeout(() => {
            drawMockQrCode('einvoiceQrCanvas', activeState.signedQrText);
            drawMockQrCode('previewQrCanvas', activeState.signedQrText);
        }, 100);

        // Switch to the e-Invoice Preview tab
        document.getElementById('tabPreview').click();
    }

    function renderPrintablePreview(totals) {
        if (!activeState.irnGenerated) {
            document.getElementById('previewNotGenerated').classList.remove('hidden');
            document.getElementById('previewContainer').classList.add('hidden');
            return;
        }

        document.getElementById('previewNotGenerated').classList.add('hidden');
        document.getElementById('previewContainer').classList.remove('hidden');

        // Render variables
        document.getElementById('prevIrn').textContent = activeState.irnHash;
        document.getElementById('prevDocType').textContent = activeState.docType === 'INV' ? 'TAX INVOICE' : activeState.docType;
        document.getElementById('prevDocNo').textContent = activeState.docNum;
        document.getElementById('prevDocDate').textContent = activeState.docDate.split('-').reverse().join('/');
        
        // Supplier
        document.getElementById('prevSupName').textContent = activeState.supplier.name;
        document.getElementById('prevSupGstin').textContent = activeState.supplier.gstin;
        document.getElementById('prevSupState').textContent = activeState.supplier.code;
        document.getElementById('prevSupAddr').textContent = activeState.supplier.address;

        // Buyer
        document.getElementById('prevBuyName').textContent = activeState.buyer.name;
        document.getElementById('prevBuyGstin').textContent = activeState.buyer.gstin;
        document.getElementById('prevBuyState').textContent = activeState.buyer.code;
        document.getElementById('prevBuyAddr').textContent = activeState.buyer.address;

        // Table
        const prevTableBody = document.getElementById('prevTableBody');
        prevTableBody.innerHTML = '';
        activeState.items.forEach((item, idx) => {
            const taxableVal = item.qty * item.price;
            const cgst = activeState.supplier.code === activeState.buyer.code ? ((taxableVal * item.rate) / 200) : 0;
            const sgst = activeState.supplier.code === activeState.buyer.code ? ((taxableVal * item.rate) / 200) : 0;
            const igst = activeState.supplier.code !== activeState.buyer.code ? ((taxableVal * item.rate) / 100) : 0;

            const tr = document.createElement('tr');
            tr.className = 'border-b text-xs text-gray-700';
            tr.innerHTML = `
                <td class="p-2 border-r">${idx + 1}</td>
                <td class="p-2 border-r font-medium">${item.desc}</td>
                <td class="p-2 border-r text-center">${item.hsn}</td>
                <td class="p-2 border-r text-right">${item.qty}</td>
                <td class="p-2 border-r text-right">${app.formatNumber(item.price)}</td>
                <td class="p-2 border-r text-right">${app.formatNumber(taxableVal)}</td>
                <td class="p-2 border-r text-center">${item.rate}%</td>
                <td class="p-2 border-r text-right">${app.formatNumber(cgst)}</td>
                <td class="p-2 border-r text-right">${app.formatNumber(sgst)}</td>
                <td class="p-2 text-right">${app.formatNumber(igst)}</td>
            `;
            prevTableBody.appendChild(tr);
        });

        // Totals
        document.getElementById('prevTotalTaxable').textContent = app.formatNumber(totals.taxable);
        document.getElementById('prevTotalCGST').textContent = app.formatNumber(totals.cgst);
        document.getElementById('prevTotalSGST').textContent = app.formatNumber(totals.sgst);
        document.getElementById('prevTotalIGST').textContent = app.formatNumber(totals.igst);
        document.getElementById('prevGrandTotal').textContent = app.formatNumber(totals.grand);
    }

    function recalculateState() {
        readStateFromForm();
        const totals = calculateTaxes();
        const rules = validateSchema();
        renderRulesChecklist(rules);
        
        const jsonObj = buildInvoiceJson(totals);
        renderJsonView(jsonObj);
        updateIrnHashingBlock();
        renderPrintablePreview(totals);
    }

    function printInvoice() {
        const printContent = document.getElementById('previewContainer').innerHTML;
        
        const printWindow = window.open('', '_blank', 'width=900,height=800');
        printWindow.document.write(`
            <html>
            <head>
                <title>Printed e-Invoice - #${activeState.docNum}</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    body { background: #fff; padding: 20px; font-family: Inter, sans-serif; }
                    .border { border: 1px solid #cbd5e1 !important; }
                    .border-b { border-bottom: 1px solid #cbd5e1 !important; }
                    .border-r { border-right: 1px solid #cbd5e1 !important; }
                </style>
            </head>
            <body>
                <div class="max-w-4xl mx-auto border p-6 bg-white">
                    ${printContent}
                </div>
                <script>
                    window.onload = function() {
                        const originalCanvas = window.opener.document.getElementById('previewQrCanvas');
                        const printedCanvas = document.getElementById('previewQrCanvas');
                        if (originalCanvas && printedCanvas) {
                            const ctx = printedCanvas.getContext('2d');
                            ctx.drawImage(originalCanvas, 0, 0);
                        }
                        window.print();
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    // Initializer
    document.addEventListener('DOMContentLoaded', function () {
        updateFormFieldsFromState();
        recalculateState();

        // Preset event listeners
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const target = this.dataset.type;
                const presetKey = this.dataset.preset;
                selectPreset(target, presetKey);
            });
        });

        // Form listeners
        document.getElementById('invoiceForm').addEventListener('submit', function (e) {
            e.preventDefault();
            generateIRN();
        });

        document.getElementById('btnAddItem').addEventListener('click', addItemRow);
        document.getElementById('btnGenerateIRN').addEventListener('click', generateIRN);
        document.getElementById('btnPrintInvoice').addEventListener('click', printInvoice);

        // Bind standard triggers
        const triggerInputs = document.querySelectorAll('#invoiceForm input, #invoiceForm select, #invoiceForm textarea');
        triggerInputs.forEach(input => {
            input.addEventListener('input', recalculateState);
        });

        // Tab selection logic
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                tabs.forEach(t => {
                    t.classList.remove('border-blue-600', 'text-blue-600');
                    t.classList.add('border-transparent', 'text-gray-500');
                });
                this.classList.add('border-blue-600', 'text-blue-600');
                this.classList.remove('border-transparent', 'text-gray-500');

                // Content hide/show
                const view = this.dataset.view;
                document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
                document.getElementById(`view-${view}`).classList.remove('hidden');
                
                // Redraw QR if visible
                if (view === 'preview' && activeState.irnGenerated) {
                    setTimeout(() => drawMockQrCode('previewQrCanvas', activeState.signedQrText), 50);
                } else if (view === 'hashing') {
                    setTimeout(() => drawMockQrCode('einvoiceQrCanvas', activeState.signedQrText), 50);
                }
            });
        });
    });
})();
