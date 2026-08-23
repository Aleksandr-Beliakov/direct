function abFaqToggle(btn) {
  var item = btn.closest('.ab-faq-item');
  var isOpen = item.classList.contains('is-open');
  document.querySelectorAll('.ab-faq-item').forEach(function (el) { el.classList.remove('is-open'); });
  if (!isOpen) item.classList.add('is-open');
}

function abAuditIntroToggle(btn) {
  btn.style.display = 'none';
  document.querySelectorAll('.ab-audit-intro-more').forEach(function (el) { el.classList.add('is-open'); });
}

function abAuditCardToggle(btn) {
  var card = btn.closest('.ab-audit-card');
  if (card) card.classList.toggle('is-open');
}

function abToggleMobileNav(btn) {
  var nav = document.querySelector('.ab-header-nav');
  if (!nav) return;
  var menu = document.querySelector('.ab-header-contact-menu.is-open');
  if (menu) menu.classList.remove('is-open');
  var isOpen = nav.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function abToggleContactMenu(btn) {
  var menu = document.querySelector('.ab-header-contact-menu');
  if (!menu) return;
  var nav = document.querySelector('.ab-header-nav.is-open');
  if (nav) nav.classList.remove('is-open');
  var isOpen = menu.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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

  var openNav = document.querySelector('.ab-header-nav.is-open');
  if (openNav && !e.target.closest('.ab-header-nav') && !e.target.closest('.ab-header-burger')) {
    openNav.classList.remove('is-open');
  } else if (openNav && e.target.closest('.ab-header-nav a')) {
    openNav.classList.remove('is-open');
  }

  var openMenu = document.querySelector('.ab-header-contact-menu.is-open');
  if (openMenu && !e.target.closest('.ab-header-mobile-icons')) {
    openMenu.classList.remove('is-open');
  } else if (openMenu && e.target.closest('.ab-header-contact-item')) {
    openMenu.classList.remove('is-open');
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    var open = document.querySelector('.ab-popup-overlay.is-open');
    if (open) open.classList.remove('is-open');
    var openNav = document.querySelector('.ab-header-nav.is-open');
    if (openNav) openNav.classList.remove('is-open');
    var openMenu = document.querySelector('.ab-header-contact-menu.is-open');
    if (openMenu) openMenu.classList.remove('is-open');
  }
});

function abOpenLightboxSrc(src) {
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

function abOpenLightbox(imgEl) {
  abOpenLightboxSrc(imgEl.currentSrc || imgEl.src);
}

var abRevealEls = document.querySelectorAll('.ab-reveal');
if (abRevealEls.length && 'IntersectionObserver' in window) {
  var abRevealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        abRevealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  abRevealEls.forEach(function (el) { abRevealObserver.observe(el); });
} else {
  abRevealEls.forEach(function (el) { el.classList.add('is-visible'); });
}

function abReviewsSlide(btn, dir) {
  var slider = btn.closest('.ab-reviews-slider');
  var row = slider && slider.querySelector('.ab-reviews-row');
  if (!row) return;
  row.scrollBy({ left: dir * row.clientWidth, behavior: 'smooth' });
}

function abProcessSlide(btn, dir) {
  var slider = btn.closest('.ab-process-slider');
  var row = slider && slider.querySelector('.ab-process-row');
  if (!row) return;
  var card = row.querySelector('.ab-reveal');
  var step = card ? card.getBoundingClientRect().width + 20 : row.clientWidth;
  row.scrollBy({ left: dir * step, behavior: 'smooth' });
}

function abSolutionSlide(btn, dir) {
  var slider = btn.closest('.ab-solution-slider');
  var row = slider && slider.querySelector('.ab-solution-row');
  if (!row) return;
  var card = row.querySelector('.ab-solution-card');
  var step = card ? card.getBoundingClientRect().width + 20 : row.clientWidth;
  row.scrollBy({ left: dir * step, behavior: 'smooth' });
}

(function () {
  var row = document.querySelector('.ab-solution-row');
  if (!row) return;

  var isDown = false, startX = 0, startScroll = 0;
  row.addEventListener('pointerdown', function (e) {
    isDown = true;
    row.classList.add('is-dragging');
    startX = e.clientX;
    startScroll = row.scrollLeft;
  });
  window.addEventListener('pointermove', function (e) {
    if (!isDown) return;
    row.scrollLeft = startScroll - (e.clientX - startX);
  });
  window.addEventListener('pointerup', function () {
    isDown = false;
    row.classList.remove('is-dragging');
  });

  var dotsWrap = document.querySelector('.ab-solution-dots');
  var cards = row.querySelectorAll('.ab-solution-card');
  if (dotsWrap && cards.length && 'IntersectionObserver' in window) {
    cards.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'ab-solution-dot' + (i === 0 ? ' is-active' : '');
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll('.ab-solution-dot');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = Array.prototype.indexOf.call(cards, entry.target);
        dots.forEach(function (d) { d.classList.remove('is-active'); });
        if (dots[idx]) dots[idx].classList.add('is-active');
      });
    }, { root: row, threshold: 0.6 });
    cards.forEach(function (c) { observer.observe(c); });
  }
})();

(function () {
  var row = document.querySelector('.ab-process-row');
  if (!row) return;

  var isDown = false, startX = 0, startScroll = 0;
  row.addEventListener('pointerdown', function (e) {
    isDown = true;
    row.classList.add('is-dragging');
    startX = e.clientX;
    startScroll = row.scrollLeft;
  });
  window.addEventListener('pointermove', function (e) {
    if (!isDown) return;
    row.scrollLeft = startScroll - (e.clientX - startX);
  });
  window.addEventListener('pointerup', function () {
    isDown = false;
    row.classList.remove('is-dragging');
  });

  var dotsWrap = document.querySelector('.ab-process-dots');
  var cards = row.querySelectorAll('.ab-reveal');
  if (dotsWrap && cards.length && 'IntersectionObserver' in window) {
    cards.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'ab-process-dot' + (i === 0 ? ' is-active' : '');
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll('.ab-process-dot');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = Array.prototype.indexOf.call(cards, entry.target);
        dots.forEach(function (d) { d.classList.remove('is-active'); });
        if (dots[idx]) dots[idx].classList.add('is-active');
      });
    }, { root: row, threshold: 0.6 });
    cards.forEach(function (c) { observer.observe(c); });
  }
})();

document.querySelectorAll('.ab-compare-tab').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var list = btn.closest('.ab-compare-list');
    if (!list) return;
    var tab = btn.getAttribute('data-tab');
    list.setAttribute('data-active-tab', tab);
    list.querySelectorAll('.ab-compare-tab').forEach(function (b) {
      var active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  });
});
