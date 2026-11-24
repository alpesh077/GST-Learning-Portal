// Invoice page UI — delegates all calculations to app.js
(function () {
    function updateInvoiceDisplay() {
        const taxableValueEl = document.getElementById('taxableValue');
        const gstRateEl = document.getElementById('gstRate');
        const sellerStateEl = document.getElementById('sellerState');
        const customerStateEl = document.getElementById('customerState');
        const cgstEl = document.getElementById('cgst');
        const sgstEl = document.getElementById('sgst');
        const igstEl = document.getElementById('igst');
        const totalValueEl = document.getElementById('totalValue');

        if (!taxableValueEl || !gstRateEl || !sellerStateEl || !customerStateEl) return;

        const result = app.calculateInvoiceTaxes({
            seller: sellerStateEl.value,
            customer: customerStateEl.value,
            taxable: parseFloat(taxableValueEl.value) || 0,
            rate: parseFloat(gstRateEl.value) || 0
        });

        if (cgstEl) cgstEl.value = app.formatNumber(result.cgst);
        if (sgstEl) sgstEl.value = app.formatNumber(result.sgst);
        if (igstEl) igstEl.value = app.formatNumber(result.igst);
        if (totalValueEl) totalValueEl.value = app.formatNumber(result.totalInvoice);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const inputs = ['taxableValue', 'gstRate', 'sellerState', 'customerState'];
        inputs.forEach(function (id) {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('input', updateInvoiceDisplay);
            el.addEventListener('change', updateInvoiceDisplay);
        });
        updateInvoiceDisplay();
    });
})();
