(function () {
  var DATA = {
    "root": "Баня-бочка",
    "groups": [
      {
        "name": "С печью",
        "items": [
          "бани бочка купить под ключ с печью",
          "бани бочки под ключ с печкой",
          "баня бочка с печкой купить",
          "баня бочка с печкой цена"
        ]
      },
      {
        "name": "Купить под ключ",
        "items": [
          "баня бочка купить под ключ",
          "баня бочка под ключ цена",
          "купить баню бочку от производителя",
          "бани бочки под ключ недорого",
          "бани бочки москва под ключ",
          "бани бочки от производителя под ключ",
          "баня бочка под ключ недорого москва",
          "купить готовую баню бочку под ключ",
          "баня бочка под ключ цены от производителя",
          "сколько стоит баня бочка под ключ",
          "бани бочки под ключ недорого цены",
          "купить баню бочку недорого под ключ",
          "купить баню бочку под ключ москва"
        ]
      },
      {
        "name": "Недорого",
        "items": [
          "баня бочка недорого",
          "баня бочка цена недорого",
          "купить баню бочку недорого",
          "бани бочки дешево",
          "купить дешевую баню бочку",
          "баня бочка недорого от производителя",
          "бани бочки цены недорого москва",
          "баня бочка купить недорого москва",
          "баня бочка недорого цена москва",
          "бани бочки дешево цены",
          "бани бочки недорого москва официальный сайт",
          "бани бочки от производителя недорого москва",
          "купить баню бочку дешево москва"
        ]
      },
      {
        "name": "Доставка и монтаж",
        "items": [
          "бани бочки с доставкой",
          "баня бочка с доставкой и установкой",
          "баня бочка сборка на участке",
          "баня бочка сборка",
          "баня бочка с установкой",
          "баня бочка с установкой цена",
          "купить баню бочку с установкой",
          "баня бочка с доставкой москва",
          "баня бочка сборка на участке москва",
          "купить баню бочку с установкой и доставкой"
        ]
      },
      {
        "name": "Цена и стоимость",
        "items": [
          "баня бочка цена",
          "бани бочки официальный сайт цены",
          "бани бочки цены от производителя",
          "сколько стоит баня бочка",
          "баня бочка стоимость",
          "бани бочки каталог и цены",
          "баня бочка цена москва",
          "купить баню бочку каталог и цены",
          "сколько стоит баня бочка от производителя",
          "бани бочки официальный сайт цены от производителя",
          "баня бочка прайс",
          "купить баню бочку официальный сайт цены",
          "баня бочка цена под ключ каталог",
          "сколько стоит баня бочка под ключ цена",
          "бани бочки стоимость от производителя"
        ]
      },
      {
        "name": "Готовая баня-бочка",
        "items": [
          "готовая баня бочка",
          "купить готовую баню бочку",
          "готовая баня бочка цена",
          "готовые бани бочки от производителя",
          "готовые бани бочки москва"
        ]
      },
      {
        "name": "Модель Квадро",
        "items": [
          "баня бочка квадро",
          "квадро баня под ключ",
          "баня бочка квадро цена",
          "купить баню бочку квадро",
          "квадро баня купить под ключ",
          "квадро баня москва",
          "бани бочки квадро от производителя",
          "баня бочка квадро цена под ключ",
          "квадро баня цена москва"
        ]
      },
      {
        "name": "Для дачи",
        "items": [
          "баня бочка для дачи",
          "баня бочка для дачи купить",
          "баня бочка для дачи цена",
          "баня бочка для дачи недорого",
          "баня бочка для дачи под ключ"
        ]
      },
      {
        "name": "От производителя",
        "items": [
          "баня бочка от производителя",
          "бани бочки официальный сайт производитель",
          "бани бочки от производителя москва",
          "баня бочка купить от производителя москва",
          "бани бочки от производителя каталог"
        ]
      }
    ]
  };
  var COLORS = ['#FF5A1F', '#229ED9', '#2FAE5E', '#8B5CF6', '#E8A317', '#D6336C', '#0EA5A4', '#7A6F63', '#C2410C'];

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function groupKid(g, i) {
    var kid = el('div', 'st-kid');
    kid.style.setProperty('--line', COLORS[i % COLORS.length]);
    var item = el('div', 'st-item');
    var node = el('div', 'st-node st-group');
    node.appendChild(el('span', 'st-dot'));
    node.appendChild(document.createTextNode(g.name + ' '));
    node.appendChild(el('b', '', String(g.items.length)));
    item.appendChild(node);
    var leaves = el('div', 'st-kids');
    g.items.forEach(function (t) {
      var k = el('div', 'st-kid');
      k.appendChild(el('div', 'st-leaf', t));
      leaves.appendChild(k);
    });
    item.appendChild(leaves);
    kid.appendChild(item);
    return kid;
  }

  function buildTree() {
    var total = 0;
    DATA.groups.forEach(function (g) { total += g.items.length; });
    var tree = el('div', 'st-tree');
    var right = el('div', 'st-kids');
    var left = el('div', 'st-kids st-rev');
    var acc = 0;
    DATA.groups.forEach(function (g, i) {
      var kid = groupKid(g, i);
      if (acc < total / 2) right.appendChild(kid);
      else left.appendChild(kid);
      acc += g.items.length;
    });
    if (left.children.length) tree.appendChild(left);
    tree.appendChild(el('div', 'st-node st-root', DATA.root));
    tree.appendChild(right);
    return tree;
  }

  var preview, previewStage, modal, viewport, stage;
  var st = { x: 0, y: 0, k: 1 };

  function layoutPreview() {
    if (!preview || !previewStage) return;
    var tree = previewStage.firstChild;
    var w = tree.offsetWidth, h = tree.offsetHeight;
    var bw = preview.clientWidth, bh = preview.clientHeight;
    var k = Math.min(bw / w, bh / h) * 0.97;
    previewStage.style.transform = 'scale(' + k + ')';
    previewStage.style.left = (bw - w * k) / 2 + 'px';
    previewStage.style.top = (bh - h * k) / 2 + 'px';
  }

  function apply() {
    stage.style.transform = 'translate(' + st.x + 'px,' + st.y + 'px) scale(' + st.k + ')';
  }

  function fitAll() {
    var w = stage.offsetWidth, h = stage.offsetHeight;
    var vw = viewport.clientWidth, vh = viewport.clientHeight;
    var k = Math.min(vw / w, vh / h) * 0.94;
    st.k = k;
    st.x = (vw - w * k) / 2;
    st.y = (vh - h * k) / 2;
    apply();
  }

  function fitCenter() {
    var w = stage.offsetWidth, h = stage.offsetHeight;
    var k = 0.8;
    st.k = k;
    st.x = (viewport.clientWidth - w * k) / 2;
    st.y = (viewport.clientHeight - h * k) / 2;
    apply();
  }

  function zoomAt(factor, cx, cy) {
    var nk = Math.max(0.15, Math.min(3, st.k * factor));
    var f = nk / st.k;
    st.x = cx - (cx - st.x) * f;
    st.y = cy - (cy - st.y) * f;
    st.k = nk;
    apply();
  }

  function initViewer() {
    var pointers = {};
    var lastDist = 0;

    viewport.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.st-tools')) return;
      viewport.setPointerCapture(e.pointerId);
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      viewport.classList.add('is-drag');
      lastDist = 0;
    });

    viewport.addEventListener('pointermove', function (e) {
      var p = pointers[e.pointerId];
      if (!p) return;
      var ids = Object.keys(pointers);
      if (ids.length === 1) {
        st.x += e.clientX - p.x;
        st.y += e.clientY - p.y;
        apply();
      } else if (ids.length === 2) {
            pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
        var a2 = pointers[ids[0]], b2 = pointers[ids[1]];
        var dist = Math.hypot(a2.x - b2.x, a2.y - b2.y);
        if (lastDist) {
          var r = viewport.getBoundingClientRect();
          zoomAt(dist / lastDist, (a2.x + b2.x) / 2 - r.left, (a2.y + b2.y) / 2 - r.top);
        }
        lastDist = dist;
        return;
      }
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    });

    function endPointer(e) {
      delete pointers[e.pointerId];
      lastDist = 0;
      if (!Object.keys(pointers).length) viewport.classList.remove('is-drag');
    }
    viewport.addEventListener('pointerup', endPointer);
    viewport.addEventListener('pointercancel', endPointer);

    viewport.addEventListener('wheel', function (e) {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        var r = viewport.getBoundingClientRect();
        zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
      } else {
        st.x -= e.deltaX;
        st.y -= e.deltaY;
        apply();
      }
    }, { passive: false });

    modal.querySelector('[data-st="in"]').addEventListener('click', function () {
      zoomAt(1.25, viewport.clientWidth / 2, viewport.clientHeight / 2);
    });
    modal.querySelector('[data-st="out"]').addEventListener('click', function () {
      zoomAt(0.8, viewport.clientWidth / 2, viewport.clientHeight / 2);
    });
    modal.querySelector('[data-st="fit"]').addEventListener('click', fitAll);
  }

  window.abOpenMap = function () {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (viewport.clientWidth < 700) fitCenter(); else fitAll();
  };

  window.abCloseMap = function () {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  function init() {
    preview = document.getElementById('st-preview');
    previewStage = document.getElementById('st-preview-stage');
    modal = document.getElementById('map-modal');
    viewport = document.getElementById('st-viewport');
    stage = document.getElementById('st-stage');
    if (!preview || !modal) return;

    previewStage.appendChild(buildTree());
    stage.appendChild(buildTree());
    layoutPreview();
    window.addEventListener('resize', layoutPreview);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutPreview);
    initViewer();

    modal.addEventListener('click', function (e) {
      if (e.target === modal) window.abCloseMap();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.abCloseMap();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
