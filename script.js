document.addEventListener('DOMContentLoaded', function() {
    const tipSelect = document.getElementById('tipSelect');
    const customTipContainer = document.getElementById('customTipContainer');
    const billInput = document.getElementById('bill');
    const customTipInput = document.getElementById('customTip');

    tipSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customTipContainer.classList.remove('hidden');
        } else {
            customTipContainer.classList.add('hidden');
        }
    });

    billInput.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });

    customTipInput.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        } else if (this.value > 100) {
            this.value = 100;
        }
    });
});

function calculateTip() {
    const bill = parseFloat(document.getElementById('bill').value);
    const tipSelect = document.getElementById('tipSelect');
    const customTip = parseFloat(document.getElementById('customTip').value);
    
    let tipPercentage;
    if (tipSelect.value === 'custom') {
        tipPercentage = customTip;
    } else {
        tipPercentage = parseFloat(tipSelect.value);
    }

    clearErrors();

    if (isNaN(bill) || bill < 0) {
        showError('bill', 'Please enter a valid bill amount (0 or greater).');
        return;
    }

    if (tipSelect.value === 'custom') {
        if (isNaN(customTip) || customTip < 0 || customTip > 100) {
            showError('customTip', 'Please enter a valid tip percentage (0-100).');
            return;
        }
    }

    const tipAmount = bill * (tipPercentage / 100);
    const total = bill + tipAmount;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Initial amount: $${bill.toFixed(2)}</p>
        <p>Tip (${tipPercentage}%): $${tipAmount.toFixed(2)}</p>
        <p><strong>Total: $${total.toFixed(2)}</strong></p>
    `;
}

function reset() {
    document.getElementById('bill').value = '';
    document.getElementById('tipSelect').value = '0';
    document.getElementById('customTip').value = '';
    document.getElementById('customTipContainer').classList.add('hidden');
    document.getElementById('result').innerHTML = '';
    clearErrors();
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());
}