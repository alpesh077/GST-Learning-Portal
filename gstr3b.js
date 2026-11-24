// GSTR-3B page UI — delegates all calculations to app.js
(function () {
    function updateGstr3bDisplay() {
        const outputTaxEl = document.getElementById('outputTax');
        const inputTaxEl = document.getElementById('inputTax');
        const netTaxEl = document.getElementById('netTax');
        const carryForwardMsg = document.getElementById('carryForwardMsg');

        if (!outputTaxEl || !inputTaxEl || !netTaxEl) return;

        const result = app.calculateNetTax(
            parseFloat(outputTaxEl.value) || 0,
            parseFloat(inputTaxEl.value) || 0,
            { validate: false }
        );

        if (result.net > 0) {
            netTaxEl.value = app.formatNumber(result.net);
            if (carryForwardMsg) carryForwardMsg.classList.add('hidden');
        } else {
            netTaxEl.value = '0.00';
            if (carryForwardMsg) carryForwardMsg.classList.remove('hidden');
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const outputTaxEl = document.getElementById('outputTax');
        const inputTaxEl = document.getElementById('inputTax');
        if (outputTaxEl) outputTaxEl.addEventListener('input', updateGstr3bDisplay);
        if (inputTaxEl) inputTaxEl.addEventListener('input', updateGstr3bDisplay);
        updateGstr3bDisplay();
    });
})();
