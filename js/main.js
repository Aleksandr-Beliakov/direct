function abFaqToggle(btn) {
  var item = btn.closest('.ab-faq-item');
  var isOpen = item.classList.contains('is-open');
  document.querySelectorAll('.ab-faq-item').forEach(function (el) { el.classList.remove('is-open'); });
  if (!isOpen) item.classList.add('is-open');
}

function abAuditIntroToggle(btn) {
  var h2 = btn.closest('h2');
  var wrap = h2 && h2.parentElement;
  var text = wrap && wrap.querySelector('.ab-audit-intro-text');
  if (text) text.classList.add('is-open');
  btn.style.display = 'none';
}

function abAuditCardToggle(btn) {
  var card = btn.closest('.ab-audit-card');
  if (card) card.classList.toggle('is-open');
}

function abToggleMobileNav(btn) {
  var nav = document.querySelector('.ab-header-nav-mobile') || document.querySelector('.ab-header-nav');
  if (!nav) return;
  var menu = document.querySelector('.ab-header-contact-menu.is-open');
  if (menu) menu.classList.remove('is-open');
  var isOpen = nav.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function abToggleContactMenu(btn) {
  var menu = document.querySelector('.ab-header-contact-menu');
  if (!menu) return;
  var nav = document.querySelector('.ab-header-nav-mobile.is-open') || document.querySelector('.ab-header-nav.is-open');
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

  var openNav = document.querySelector('.ab-header-nav-mobile.is-open, .ab-header-nav.is-open');
  if (openNav && !e.target.closest('.ab-header-nav-mobile') && !e.target.closest('.ab-header-nav') && !e.target.closest('.ab-header-burger')) {
    openNav.classList.remove('is-open');
  } else if (openNav && e.target.closest('.ab-header-nav-mobile a, .ab-header-nav a')) {
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
    var openNav = document.querySelector('.ab-header-nav-mobile.is-open, .ab-header-nav.is-open');
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
    if (e.pointerType !== 'mouse') return;
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

  function abSyncSolutionRowHeights() {
    cards.forEach(function (c) {
      c.querySelectorAll('.ab-solution-row-item').forEach(function (el) { el.style.minHeight = ''; });
    });
    var maxRows = 0;
    cards.forEach(function (c) { maxRows = Math.max(maxRows, c.querySelectorAll('.ab-solution-row-item').length); });
    for (var i = 0; i < maxRows; i++) {
      var maxH = 0;
      cards.forEach(function (c) {
        var item = c.querySelectorAll('.ab-solution-row-item')[i];
        if (item) maxH = Math.max(maxH, item.offsetHeight);
      });
      cards.forEach(function (c) {
        var item = c.querySelectorAll('.ab-solution-row-item')[i];
        if (item) item.style.minHeight = maxH + 'px';
      });
    }
  }

  if (cards.length) {
    abSyncSolutionRowHeights();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(abSyncSolutionRowHeights);
    }
    window.addEventListener('resize', abSyncSolutionRowHeights);
  }
})();

(function () {
  var row = document.querySelector('.ab-process-row');
  if (!row) return;

  var isDown = false, startX = 0, startScroll = 0;
  row.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') return;
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

function abCasesSlide(dir) {
  var track = document.getElementById('ab-cases-track');
  if (!track) return;
  var card = track.querySelector('.ab-cases-card');
  var gap = parseFloat(getComputedStyle(track).columnGap) || 20;
  var step = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
  track.scrollBy({ left: dir * step, behavior: 'smooth' });
}

(function () {
  var track = document.getElementById('ab-cases-track');
  var cases = window.AB_CASES;
  if (!track || !cases || !cases.length) return;

  track.innerHTML = cases.map(function (item) {
    var tag = item.url ? 'a' : 'div';
    var hrefAttr = item.url ? ' href="' + item.url + '"' : '';

    var shot = item.screenshot
      ? '<div class="ab-cases-card-shot-frame">'
        + '<div class="ab-cases-card-shot-dots"><span></span><span></span><span></span></div>'
        + '<img src="' + item.screenshot + '" alt="Первый экран сайта клиента" loading="lazy">'
        + '</div>'
      : '<div class="ab-cases-card-shot-frame"><div class="ab-cases-card-shot-empty">Скриншот сайта клиента</div></div>';

    var metricRow = item.metricWas
      ? '<span class="ab-cases-metric-was">' + item.metricWas + '</span>'
        + '<span class="ab-cases-metric-arrow">→</span>'
        + '<span class="ab-cases-metric-now">' + item.metricNow + '</span>'
      : '<span class="ab-cases-metric-now">' + item.metricNow + '</span>';

    var footLink = item.url ? '<span class="ab-cases-card-link">Читать кейс →</span>' : '';

    return '<' + tag + ' class="ab-cases-card"' + hrefAttr + '>'
      + '<div class="ab-cases-card-shot">' + shot + '</div>'
      + '<div class="ab-cases-card-body">'
      + '<div class="ab-cases-tags-full"><span class="ab-cases-tag">' + item.place + '</span><span class="ab-cases-tag">' + item.period + '</span></div>'
      + '<div class="ab-cases-tags-compact">' + item.place + ' · ' + item.period + '</div>'
      + '<h3 class="ab-cases-card-title">' + item.title + '</h3>'
      + '<div class="ab-cases-metric"><div class="ab-cases-metric-label">' + item.metricLabel + '</div><div class="ab-cases-metric-row">' + metricRow + '</div></div>'
      + '<div class="ab-cases-card-foot"><span class="ab-cases-card-channels">' + item.channels + '</span>' + footLink + '</div>'
      + '</div>'
      + '</' + tag + '>';
  }).join('');

  track.style.setProperty('--ab-cases-count', cases.length);

  var arrowsWrap = document.querySelector('.ab-cases-arrows');
  var prevBtn = document.querySelector('.ab-cases-arrow-prev');
  var nextBtn = document.querySelector('.ab-cases-arrow-next');

  if (cases.length <= 3) {
    track.classList.add('is-compact');
    if (arrowsWrap) arrowsWrap.style.display = 'none';
  } else if (prevBtn && nextBtn) {
    function updateArrows() {
      prevBtn.disabled = track.scrollLeft <= 2;
      nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    }
    updateArrows();
    track.addEventListener('scroll', function () {
      clearTimeout(track._abArrowsTimer);
      track._abArrowsTimer = setTimeout(updateArrows, 100);
    });
    window.addEventListener('resize', updateArrows);
  }

  var isDown = false, startX = 0, startScroll = 0;
  track.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') return;
    isDown = true;
    startX = e.clientX;
    startScroll = track.scrollLeft;
  });
  window.addEventListener('pointermove', function (e) {
    if (!isDown) return;
    track.scrollLeft = startScroll - (e.clientX - startX);
  });
  window.addEventListener('pointerup', function () { isDown = false; });

  var dotsWrap = document.getElementById('ab-cases-dots');
  var cards = track.querySelectorAll('.ab-cases-card');
  if (dotsWrap && cards.length && 'IntersectionObserver' in window) {
    cards.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'ab-cases-dot' + (i === 0 ? ' is-active' : '');
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll('.ab-cases-dot');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = Array.prototype.indexOf.call(cards, entry.target);
        dots.forEach(function (d) { d.classList.remove('is-active'); });
        if (dots[idx]) dots[idx].classList.add('is-active');
      });
    }, { root: track, threshold: 0.6 });
    cards.forEach(function (c) { observer.observe(c); });
  }
})();
