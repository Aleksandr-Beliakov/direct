function abFaqToggle(btn) {
  var item = btn.closest('.ab-faq-item');
  var isOpen = item.classList.contains('is-open');
  document.querySelectorAll('.ab-faq-item').forEach(function (el) { el.classList.remove('is-open'); });
  if (!isOpen) item.classList.add('is-open');
}

function abOpenPopup(name) {
  var el = document.getElementById('popup-' + name);
  if (el) el.classList.add('is-open');
}

function abClosePopup(name) {
  var el = document.getElementById('popup-' + name);
  if (el) el.classList.remove('is-open');
}

document.addEventListener('click', function (e) {
  var trigger = e.target.closest('[data-popup]');
  if (trigger) {
    e.preventDefault();
    abOpenPopup(trigger.getAttribute('data-popup'));
    return;
  }
  if (e.target.classList.contains('ab-popup-overlay')) {
    e.target.classList.remove('is-open');
  }
});

function abOpenLightbox(imgEl) {
  var src = imgEl.currentSrc || imgEl.src;
  if (!src) return;
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(23,21,18,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:40px;';
  var big = document.createElement('img');
  big.src = src;
  big.style.cssText = 'max-width:100%;max-height:100%;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.4);';
  overlay.appendChild(big);
  overlay.addEventListener('click', function () { overlay.remove(); });
  document.body.appendChild(overlay);
}
