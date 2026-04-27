// ===== Donate Page — donate.js =====

const amountBtns   = document.querySelectorAll('.amount-btn');
const freqTabs     = document.querySelectorAll('.freq-tab');
const donateCta    = document.getElementById('donate-cta');
const customWrap   = document.getElementById('custom-amount-wrap');
const customInput  = document.getElementById('custom-amount');

let selectedAmount = 50;
let selectedFreq   = 'one-time';

function updateCta() {
  if (!donateCta) return;
  const freqLabel = selectedFreq === 'monthly' ? '/month' : '';
  const amtDisplay = selectedAmount === 'custom'
    ? (customInput && customInput.value ? '$' + parseInt(customInput.value).toLocaleString() : 'Custom Amount')
    : '$' + selectedAmount;
  donateCta.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
    Donate ${amtDisplay}${freqLabel}
  `;
}

// Amount button clicks
amountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    amountBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const val = btn.dataset.amount;
    if (val === 'custom') {
      selectedAmount = 'custom';
      if (customWrap) customWrap.style.display = 'block';
    } else {
      selectedAmount = parseInt(val);
      if (customWrap) customWrap.style.display = 'none';
    }
    updateCta();
  });
});

// Custom amount input
if (customInput) {
  customInput.addEventListener('input', updateCta);
}

// Frequency tabs
freqTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    freqTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    selectedFreq = tab.dataset.freq;
    updateCta();
  });
});

// Init
updateCta();
