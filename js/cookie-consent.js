(function () {
  var STORAGE_KEY = 'cookie_consent';

  function loadAnalytics() {
    if (window.__abAnalyticsLoaded) return;
    window.__abAnalyticsLoaded = true;

    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=111606163', 'ym');

    ym(111606163, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});

    // Google Ads / Google Analytics: подключить здесь так же, когда появится код счётчика.
  }

  function showBanner() {
    var el = document.createElement('div');
    el.className = 'ab-cookie-banner';
    el.innerHTML =
      '<p class="ab-cookie-banner-text">Этот сайт использует файлы cookie для корректной работы, улучшения пользовательского опыта и анализа посещаемости. Нажимая кнопку «Принять» или продолжая пользоваться сайтом, вы соглашаетесь с использованием файлов cookie. <a href="/privacy.html#cookies" target="_blank" rel="noopener noreferrer" class="ab-cookie-banner-link">Подробнее.</a></p>' +
      '<button type="button" class="ab-cookie-banner-accept">Принять</button>';
    document.body.appendChild(el);

    el.querySelector('.ab-cookie-banner-accept').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      el.remove();
      loadAnalytics();
    });
  }

  function init() {
    var consent = localStorage.getItem(STORAGE_KEY);
    if (consent === 'accepted') {
      loadAnalytics();
    } else {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
