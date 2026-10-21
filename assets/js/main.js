/* Golden Palace — скрипты */
(function () {
  'use strict';

  // Номер для заявок из формы (WhatsApp), без «+»
  var WHATSAPP = '79668877298';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // ---------- Фото по залам ----------
  var HALLS = {
    zolotoy: { name: 'Зал «Золотой»', count: 14 },
    sfera: { name: 'Зал «Сфера»', count: 7 },
    antichny: { name: 'Зал «Античный»', count: 5 },
    kino: { name: 'Банкетный зал «Кинотеатр»', count: 4 },
    vyezd: { name: 'Выездная регистрация', count: 1 }
  };
  var PHOTOS = [];
  Object.keys(HALLS).forEach(function (key) {
    for (var i = 1; i <= HALLS[key].count; i++) {
      PHOTOS.push({ hall: key, src: 'assets/img/halls/' + key + '-' + (i < 10 ? '0' : '') + i + '.webp', cap: HALLS[key].name });
    }
  });

  // ---------- Появление при скролле ----------
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          el.classList.add('is-in');
          io.unobserve(el);
          // когда появление закончилось (1 с + задержка) — включаем быстрые переходы для наведения
          var delay = parseFloat(getComputedStyle(el).transitionDelay) || 0;
          setTimeout(function () { el.classList.add('is-done'); }, 1100 + delay * 1000);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---------- Шапка, мобильная панель, параллакс ----------
  var header = $('#header');
  var mbar = $('.mbar');
  var processImg = $('.process__media');
  var booking = $('#booking');
  var ticking = false;

  // Высота плашки и шапки — чтобы первый экран занимал ровно окно
  var topbar = $('.topbar');
  function setTop() {
    document.documentElement.style.setProperty('--top', (topbar.offsetHeight + header.offsetHeight) + 'px');
  }
  setTop();
  window.addEventListener('resize', setTop);

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (mbar) {
      var b = booking.getBoundingClientRect();
      var formVisible = b.top < window.innerHeight && b.bottom > 0;
      mbar.classList.toggle('is-on', y > 600 && !formVisible);
    }
    if (processImg) {
      var r = processImg.parentNode.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        var p = (r.top + r.height) / (window.innerHeight + r.height);
        processImg.style.transform = 'translateY(' + (-p * 22) + '%)';
      }
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  // ---------- Мобильное меню ----------
  var burger = $('#burger');
  var mnav = $('#mobileNav');
  function closeMenu() { mnav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = mnav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $$('a', mnav).forEach(function (a) { a.addEventListener('click', closeMenu); });

  // ---------- Сгенерированные картинки подхватываются, если файлы есть ----------
  $$('img[data-gen]').forEach(function (img) {
    var probe = new Image();
    probe.onload = function () { img.src = img.getAttribute('data-gen'); };
    probe.src = img.getAttribute('data-gen');
  });
  $$('img[data-optional]').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) img.remove();
    else img.addEventListener('error', function () { img.remove(); });
  });
  // ---------- Видео в блоке «Как мы работаем»: грузится, только когда до него долистали ----------
  var pVideo = $('.process__video');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  if (pVideo && 'IntersectionObserver' in window && !reduceMotion && !saveData) {
    var pStarted = false;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (!pStarted) {
            pStarted = true;
            pVideo.addEventListener('playing', function () { pVideo.classList.add('is-playing'); }, { once: true });
            pVideo.src = window.innerWidth < 900 ? pVideo.getAttribute('data-src-mobile') : pVideo.getAttribute('data-src');
          }
          var pr = pVideo.play();
          if (pr) pr.catch(function () {});
        } else if (pStarted) {
          pVideo.pause();
        }
      });
    }, { rootMargin: '300px 0px' }).observe(pVideo);
  }

  // ---------- Плавное раскрытие вопросов ----------
  $$('.faq details').forEach(function (d) {
    var summary = d.querySelector('summary');
    var body = d.querySelector('p');
    summary.addEventListener('click', function (e) {
      if (reduceMotion || !body.animate) return; // без анимации — обычное поведение
      e.preventDefault();
      if (d.classList.contains('is-animating')) return;
      d.classList.add('is-animating');
      var done = function () { d.classList.remove('is-animating'); };
      if (!d.open) {
        d.open = true;
        var h = body.offsetHeight;
        body.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }],
          { duration: 450, easing: 'cubic-bezier(.2, .7, .2, 1)' }).onfinish = done;
      } else {
        d.classList.add('is-closing');
        body.animate([{ height: body.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
          { duration: 350, easing: 'cubic-bezier(.4, 0, .2, 1)' }).onfinish = function () { d.open = false; d.classList.remove('is-closing'); done(); };
      }
    });
  });

  // ---------- Галерея-слайдер ----------
  var track = $('#galTrack');
  var current = [];
  function renderGallery(filter) {
    current = PHOTOS.filter(function (p) { return filter === 'all' || p.hall === filter; });
    track.innerHTML = '';
    current.forEach(function (p, i) {
      var b = document.createElement('button');
      b.className = 'slide';
      b.setAttribute('aria-label', 'Открыть фото: ' + p.cap);
      b.innerHTML = '<img src="' + p.src + '" alt="' + p.cap + '" loading="lazy">';
      b.addEventListener('click', function () { openLightbox(current, i); });
      track.appendChild(b);
    });
    track.scrollLeft = 0;
  }
  $$('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      $$('.chip').forEach(function (c) { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      renderGallery(chip.getAttribute('data-filter'));
    });
  });
  renderGallery('all');
  function step() { var s = track.querySelector('.slide'); return s ? s.offsetWidth + 20 : 300; }
  $('#galPrev').addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  $('#galNext').addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  $('#galAll').addEventListener('click', function () { openLightbox(current, 0); });

  // «Все фото» у карточек залов
  $$('[data-gallery]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-gallery');
      openLightbox(PHOTOS.filter(function (p) { return p.hall === key; }), 0);
    });
  });

  // ---------- Лайтбокс ----------
  var lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  var lbList = [], lbIdx = 0, lastFocus = null;
  function showLb() {
    var p = lbList[lbIdx];
    lbImg.src = p.src;
    lbImg.alt = p.cap;
    lbCap.textContent = p.cap + ' · ' + (lbIdx + 1) + ' / ' + lbList.length;
    var multi = lbList.length > 1;
    $('#lbPrev').hidden = !multi;
    $('#lbNext').hidden = !multi;
  }
  function openLightbox(list, i) {
    if (!list.length) return;
    lastFocus = document.activeElement;
    lbList = list; lbIdx = i;
    showLb();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function move(d) { lbIdx = (lbIdx + d + lbList.length) % lbList.length; showLb(); }
  $('#lbClose').addEventListener('click', closeLightbox);
  $('#lbPrev').addEventListener('click', function () { move(-1); });
  $('#lbNext').addEventListener('click', function () { move(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
  });
  var tx = null;
  lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
    tx = null;
  });

  // ---------- Калькулятор ----------
  // Минимальная аренда и вместимость из условий площадки
  var CALC_HALLS = [
    { name: 'Кинотеатр', max: 100, rent: 70000 },
    { name: 'Сфера', max: 300, rent: 100000 },
    { name: 'Золотой', max: 650, rent: 200000 }
  ];
  var MENU = 5000;
  var range = $('#guests'), out = $('#guestsOut');
  var fmt = function (n) { return n.toLocaleString('ru-RU').replace(/,/g, ' ') + ' ₽'; };
  function calc() {
    var g = +range.value;
    out.textContent = g;
    range.style.setProperty('--p', ((g - range.min) / (range.max - range.min) * 100) + '%');
    var fit = CALC_HALLS.filter(function (h) { return g <= h.max; });
    $('#calcHalls').innerHTML = fit.map(function (h) {
      return '<li>«' + h.name + '»<small>до ' + h.max + '</small></li>';
    }).join('');
    var best = fit[0];
    $('#calcPrice').textContent = fmt(best.rent + g * MENU);
    $('#calcHint').textContent = 'зал «' + best.name + '» + меню на ' + g + ' гостей';
  }
  range.addEventListener('input', calc);
  calc();
  $('#calcBtn').addEventListener('click', function () {
    $('#fGuests').value = range.value;
    var best = CALC_HALLS.filter(function (h) { return +range.value <= h.max; })[0];
    $('#fHall').value = best.name;
  });

  // Кнопки «Узнать даты» выбирают зал в форме
  $$('[data-hall]').forEach(function (a) {
    a.addEventListener('click', function () { $('#fHall').value = a.getAttribute('data-hall'); });
  });

  // ---------- Форма → WhatsApp ----------
  var dateInput = $('#fDate');
  dateInput.min = new Date().toISOString().slice(0, 10);
  $('#bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#fName'), phone = $('#fPhone'), agree = $('#fAgree'), err = $('#formErr');
    var bad = [];
    [name, phone].forEach(function (f) { f.classList.remove('is-invalid'); });
    if (!name.value.trim()) bad.push(name);
    if (phone.value.replace(/\D/g, '').length < 10) bad.push(phone);
    bad.forEach(function (f) { f.classList.add('is-invalid'); });
    if (bad.length) { err.textContent = 'Укажите имя и телефон, чтобы мы могли связаться с вами.'; bad[0].focus(); return; }
    if (!agree.checked) { err.textContent = 'Подтвердите согласие на обработку персональных данных.'; agree.focus(); return; }
    err.textContent = '';

    var d = dateInput.value ? dateInput.value.split('-').reverse().join('.') : 'пока не выбрана';
    var lines = [
      'Здравствуйте! Заявка с сайта Golden Palace',
      'Имя: ' + name.value.trim(),
      'Телефон: ' + phone.value.trim(),
      'Дата: ' + d,
      'Гостей: ' + ($('#fGuests').value || 'не указано'),
      'Зал: ' + ($('#fHall').value || 'помогите выбрать'),
      'Формат: ' + $('#fFormat').value
    ];
    var msg = $('#fMsg').value.trim();
    if (msg) lines.push('Комментарий: ' + msg);
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  });

  // Маска телефона: только цифры, +, пробелы, скобки, дефисы
  $('#fPhone').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\d+()\-\s]/g, '');
  });

  $('#year').textContent = new Date().getFullYear();
})();
