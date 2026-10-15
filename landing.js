/* snap-scenes: the signature move (the phone is a lens) and the ruler.
   Page-local on purpose: the engine stays untouched. Everything here reads the
   table act's --sc-p and writes transforms/opacity only.

   The phone never moves, tilts or scales: Apple's product-image rules ask for
   the bezel "as is". The table moves under it instead. Scroll and pointer
   slide the bowl under a still camera, the screen shows what the camera sees,
   the shutter fires, and the bowl slides out from under the phone so the
   labels land on the food beside it, never on the device. */
/* The site header is sticky; page.css keeps every pinned stage below it. */
(function () {
  var head = document.querySelector('.site-header');
  function set() { document.documentElement.style.setProperty('--hdr', (head ? head.getBoundingClientRect().height : 0).toFixed(1) + 'px'); }
  set();
  addEventListener('resize', set);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(set);
})();

(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)');

  var act = document.querySelector('.table-act');
  if (!act) return;
  var stage = act.querySelector('.scene');
  var ground = stage.querySelector('.scene__ground');
  var bowl = stage.querySelector('.scene > .bowl');
  var phone = stage.querySelector('.phone');
  var screen = phone.querySelector('.phone__screen');
  var lens = phone.querySelector('.lens');
  var lensBowl = lens.querySelector('.bowl');
  var viewfinder = phone.querySelector('.viewfinder');
  var flash = phone.querySelector('.flash');
  var result = phone.querySelector('.phone__result');
  var callouts = Array.prototype.slice.call(stage.querySelectorAll('.callout'));

  var flow = act.classList.contains('is-flow');   // phones: not pinned, see page.css
  var flowTravel = 300;                             // px of scroll the phone sequence takes on phones
  if (reduce && !flow) act.setAttribute('data-sc-span', '1.25');


  var W, H, hdr = 0, mobile;
  var P = {};   // the phone: box and screen centre, fixed per viewport
  var K;        // bowl keyframes: { p, b: [cx, cy, d], z }

  function Y(f) { return hdr + (H - hdr) * f; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function win(p, a, b) { return clamp((p - a) / (b - a), 0, 1); }

  function layout() {
    W = stage.clientWidth; H = stage.clientHeight;
    hdr = 0; // the stage already sits below the header (page.css, --hdr)
    mobile = W < 761;
    if (flow) return layoutFlow();
    // Centred composition. The phone stands in the middle; the bowl starts
    // large and low behind it and shrinks into the screen until the whole
    // bowl is framed, like the photo the app will take.
    // Centred composition. The phone stands directly under the hero copy,
    // sized into the space the copy leaves; the bowl starts large and low
    // behind it and shrinks into the screen until the whole bowl is framed.
    var copy = stage.querySelector('.hero-copy');
    var cr = copy.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    var copyTop = cr.top - sr.top, copyBottom = cr.bottom - sr.top;
    var ph, cx, cy, big, out;
    if (!mobile) {
      // once pinned the phone sits at its stage position: keep it above the
      // cookie banner (fixed, 1rem from the bottom, about 72px tall) with room to spare
      var aboveBanner = H - 16 - 96 - 16;   // the banner runs taller in some languages
      ph = Math.max(Math.min(H - copyBottom - 10 - 16, aboveBanner - copyBottom - 8, 650), 280); cx = W * 0.5; cy = copyBottom + 8 + ph / 2;
      big = Math.min((H - hdr) * 1.0, W * 0.62);
      out = [W * 0.31, Y(0.58), (H - hdr) * 0.56];      // where the bowl rests at the peak
    } else {
      // phones: the copy is at the top of the scene; the phone takes the room under it
      ph = Math.max(Math.min(H - copyBottom - 20, H * 0.6), 170); cx = W * 0.5; cy = copyBottom + 10 + ph / 2;
      big = Math.min(W * 0.96, ph * 0.9);
      out = null;                                         // phones: the bowl stays in the frame
    }
    var pw = ph * 0.4891; // Apple's iPhone 17 bezel, 1350 x 2760
    P = { w: pw, h: ph, x: cx - pw / 2, y: cy - ph / 2 };
    phone.style.width = pw.toFixed(1) + 'px';
    phone.style.height = ph.toFixed(1) + 'px';
    phone.style.setProperty('--pw', pw.toFixed(1) + 'px');
    phone.style.transform = 'translate(' + P.x.toFixed(1) + 'px,' + P.y.toFixed(1) + 'px)';
    // the screen's centre on the stage (screen slot from the CSS variables)
    var cs = getComputedStyle(phone);
    var sx = parseFloat(cs.getPropertyValue('--sx')), sy = parseFloat(cs.getPropertyValue('--sy'));
    var sw = parseFloat(cs.getPropertyValue('--sw')), sh = parseFloat(cs.getPropertyValue('--sh'));
    P.sw = sw * pw; P.sh = sh * ph;
    P.scx = P.x + (sx + sw / 2) * pw; P.scy = P.y + (sy + sh / 2) * ph;
    lens.style.width = W + 'px'; lens.style.height = H + 'px';

    keyframes(P, out, big, mobile ? [P.scx, P.y + P.h * 0.85, big] : [P.scx, P.y + P.h * 0.2 + big / 2, big]);
  }

  // phones: the phone sits in flow under the copy; the bowl starts centred
  // behind it, wider than the phone, and shrinks into the screen
  function layoutFlow() {
    var pw = Math.min(W * 0.58, 260), ph = pw / 0.4891;
    phone.style.width = pw.toFixed(1) + 'px'; phone.style.height = ph.toFixed(1) + 'px';
    phone.style.setProperty('--pw', pw.toFixed(1) + 'px');
    phone.style.transform = 'none';
    var pr = phone.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    P = { w: pw, h: ph, x: pr.left - sr.left, y: pr.top - sr.top };
    var cs = getComputedStyle(phone);
    var sx = parseFloat(cs.getPropertyValue('--sx')), sy = parseFloat(cs.getPropertyValue('--sy'));
    var sw = parseFloat(cs.getPropertyValue('--sw')), sh = parseFloat(cs.getPropertyValue('--sh'));
    P.sw = sw * pw; P.sh = sh * ph;
    P.scx = P.x + (sx + sw / 2) * pw; P.scy = P.y + (sy + sh / 2) * ph;
    var big = Math.min(W * 0.96, ph * 0.9);
    lens.style.width = W + 'px'; lens.style.height = (P.y + P.h + big).toFixed(0) + 'px';
    // the sequence plays while the phone travels from where it sits on load up to just under the header
    var hdrPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 0;
    flowTravel = Math.max((pr.top + scrollY) - hdrPx - 12, 120);
    keyframes(P, null, big, [P.scx, P.scy, big]);
  }

  function keyframes(P, out, big, start) {
    var fit = [P.scx, P.scy, P.sw * 0.9];               // the whole bowl, framed in the screen
    var rest = out || fit;
    if (reduce) {
      K = [{ p: 0, b: fit.slice(), z: 1 }, { p: 1, b: fit.slice(), z: 1 }];
    } else {
      K = [
        { p: 0.00, b: start, z: 1 },
        { p: 0.34, b: fit, z: 1 },
        { p: 0.48, b: fit, z: 1 },
        { p: 0.64, b: rest, z: 1 },
        { p: 1.00, b: rest, z: 1 }
      ];
    }
    var maxD = Math.max.apply(null, K.map(function (k) { return k.b[2]; }));
    setBase(bowl, maxD);
    setBase(lensBowl, maxD);
    // leader length: from the dot, left to just past the rim of the resting bowl
    var restD = K[K.length - 1].b[2];
    callouts.forEach(function (c) {
      var fx = +c.dataset.x, fy = +c.dataset.y, r = restD / 2, dy = (fy - 0.5) * restD;
      var rimX = -Math.sqrt(Math.max(r * r - dy * dy, 0));
      c.style.setProperty('--len', Math.max((fx - 0.5) * restD - rimX + 28, 40).toFixed(0) + 'px');
    });
    dirty = true;
    act.classList.add('is-laid');   // page.css keeps the table's parts invisible until they are sized and placed
  }

  function at(p) {
    for (var i = 1; i < K.length; i++) {
      if (p <= K[i].p) {
        var A = K[i - 1], B = K[i], t = ease(win(p, A.p, B.p));
        return { b: [lerp(A.b[0], B.b[0], t), lerp(A.b[1], B.b[1], t), lerp(A.b[2], B.b[2], t)], z: lerp(A.z, B.z, t) };
      }
    }
    var L = K[K.length - 1];
    return { b: L.b.slice(), z: L.z };
  }

  function setBase(el, px) { el._base = px; el.style.width = el.style.height = px.toFixed(0) + 'px'; }
  function place(el, cx, cy, d) {
    el.style.transform = 'translate(' + (cx - d / 2).toFixed(1) + 'px,' + (cy - d / 2).toFixed(1) + 'px) scale(' + (d / el._base).toFixed(4) + ')';
  }

  // pointer aim (desktop): you move the plate under the camera
  var aim = { x: 0, y: 0, tx: 0, ty: 0 };
  stage.addEventListener('pointermove', function (e) {
    if (reduce || !fine.matches) return;
    var r = stage.getBoundingClientRect();
    aim.tx = (e.clientX - r.left) / r.width - 0.5;
    aim.ty = (e.clientY - r.top) / r.height - 0.5;
  });
  stage.addEventListener('pointerleave', function () { aim.tx = 0; aim.ty = 0; });

  var frozen = null, dirty = true, lastP = -1;

  function render() {
    var p;
    if (flow) p = clamp(scrollY / flowTravel, 0, 1);   // phones: the camera view is what you see on load
    else p = parseFloat(act.style.getPropertyValue('--sc-p')) || 0;
    var pc = p;
    if (reduce) p = 1;
    aim.x += (aim.tx - aim.x) * 0.08;
    aim.y += (aim.ty - aim.y) * 0.08;
    var moving = Math.abs(aim.tx - aim.x) + Math.abs(aim.ty - aim.y) > 0.0005;
    if (!dirty && !moving && Math.abs(p - lastP) < 0.0002) return;
    dirty = false; lastP = p;

    var s = at(p);
    var aimK = (1 - win(p, 0.20, 0.34)) * (mobile ? 0 : 1); // the plate follows the pointer until it is framed
    var bx = s.b[0] + aim.x * W * 0.09 * aimK;
    var by = s.b[1] + aim.y * H * 0.07 * aimK;
    ground.style.transform = 'translate3d(' + (aim.x * 10 * aimK).toFixed(1) + 'px,' + (-p * H * 0.05).toFixed(1) + 'px,0)';
    place(bowl, bx, by, s.b[2]);

    // the screen: the table under the phone, magnified by z about the screen centre
    var captured = p >= 0.43;
    if (!captured) frozen = null;
    else if (!frozen) frozen = { z: s.z, bx: bx, by: by, bd: s.b[2] };
    var L = frozen || { z: s.z, bx: bx, by: by, bd: s.b[2] };
    lens.style.transform = 'translate(' + (P.sw / 2).toFixed(1) + 'px,' + (P.sh / 2).toFixed(1) + 'px) scale(' + L.z.toFixed(4) + ') translate(' + (-P.scx).toFixed(1) + 'px,' + (-P.scy).toFixed(1) + 'px)';
    place(lensBowl, L.bx, L.by, L.bd);

    flash.style.opacity = (win(p, 0.41, 0.435) * (1 - win(p, 0.435, 0.49))).toFixed(3);
    result.style.opacity = win(p, 0.46, 0.55).toFixed(3);
    viewfinder.style.opacity = (1 - win(p, 0.42, 0.45)).toFixed(3);

    callouts.forEach(function (c, i) {
      var a = 0.62 + i * 0.06;
      var t = (reduce || mobile) ? 0 : win(p, a, a + 0.08);
      var x = bx + (+c.dataset.x - 0.5) * s.b[2], y = by + (+c.dataset.y - 0.5) * s.b[2];
      c.style.opacity = t.toFixed(3);
      c.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      c.style.setProperty('--draw', ease(t).toFixed(3));
    });
  }

  function loop() { render(); requestAnimationFrame(loop); }
  addEventListener('resize', layout);
  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  requestAnimationFrame(loop);

  /* ------------------------------------------------------------ the ruler --
     A real range input under a drawn ruler. kcal per gram comes from the
     app's own estimate for these noodles (200 g, 280 kcal). */
  var ruler = document.querySelector('.ruler');
  if (ruler) {
    var input = ruler.querySelector('input');
    var ticks = ruler.querySelector('.ruler__ticks');
    var gOut = ruler.querySelector('[data-g]');
    var kOut = ruler.querySelector('[data-k]');
    var mOut = ruler.querySelector('[data-meal]');
    var per = parseFloat(ruler.dataset.kcal) / parseFloat(ruler.dataset.grams);
    var mealBase = parseFloat(ruler.dataset.meal) - parseFloat(ruler.dataset.kcal);
    var min = +input.min, max = +input.max, step = 5, px = 10;
    var html = '';
    for (var v = min; v <= max; v += step) {
      html += v % 50 === 0 ? '<i class="major" data-v="' + v + '"></i>' : '<i></i>';
    }
    ticks.innerHTML = html;
    var shown = +input.value, target = shown;
    function paintRuler() {
      shown += (target - shown) * (reduce ? 1 : 0.25);
      if (Math.abs(target - shown) < 0.05) shown = target;
      ticks.style.transform = 'translateX(' + (-(shown - min) / step * px).toFixed(1) + 'px)';
      var g = Math.round(shown);
      gOut.textContent = g;
      kOut.textContent = Math.round(g * per);
      mOut.textContent = Math.round(mealBase + g * per);
      if (shown !== target) requestAnimationFrame(paintRuler);
    }
    input.addEventListener('input', function () { target = +input.value; requestAnimationFrame(paintRuler); });
    paintRuler();
  }
})();

/* ---------------------------------------------- one phone, three screens --
   The phone stays put. Scroll cross-fades its screen (meal, day, every day
   since), lights the matching caption and fills the progress line. Opacity
   only, so it stays the same under reduced motion. */
(function () {
  'use strict';
  var act = document.querySelector('.day-act');
  if (!act) return;
  var screens = Array.prototype.slice.call(act.querySelectorAll('.day-screen'));
  var steps = Array.prototype.slice.call(act.querySelectorAll('.day-step'));
  var list = act.querySelector('.day-steps');
  var last = -1;
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function frame() {
    var p = parseFloat(act.style.getPropertyValue('--sc-p')) || 0;
    if (Math.abs(p - last) > 0.0005) {
      last = p;
      var f = clamp((p - 0.06) / 0.82, 0, 1) * (screens.length - 1);   // 0..2 across the pin
      screens.forEach(function (s, i) {
        var o = i === 0 ? 1 : clamp((f - (i - 0.62)) / 0.24, 0, 1);       // each screen fades in over the one before
        s.style.opacity = o.toFixed(3);
      });
      var on = Math.round(f);
      steps.forEach(function (s, i) { s.classList.toggle('is-on', i === on); });
      list.style.setProperty('--fill', clamp(p / 0.88, 0, 1).toFixed(3));
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* --------------------------------------------------------------- the sky --
   The September sky spreads its 24 emoji over the document (top: 2%..94%).
   This page is about twice as tall, so the same 24 would sit twice as far
   apart: one per screen instead of two or three. Keep the September rhythm
   instead (one emoji per ~400px of page) by cloning the set to fill the extra
   height. The flight itself (styles.css `fly`) is untouched. */
(function () {
  'use strict';
  var sky = document.querySelector('.sky');
  if (!sky) return;
  var base = Array.prototype.slice.call(sky.querySelectorAll('span'));
  if (!base.length) return;
  var PITCH = 9642 / base.length;   // the committed homepage: 9642px tall, 24 emoji
  var timer;
  function fill() {
    sky.querySelectorAll('span[data-clone]').forEach(function (c) { c.remove(); });
    var H = document.documentElement.scrollHeight;
    var n = Math.max(base.length, Math.round(H / PITCH));
    for (var i = 0; i < n; i++) {
      var el = base[i];
      if (!el) {
        el = base[i % base.length].cloneNode(true);
        el.setAttribute('data-clone', '');
        el.style.animationDelay = '-' + ((i * 7.3) % 40).toFixed(1) + 's';   // not in step with its twin
        sky.appendChild(el);
      }
      el.style.top = ((i + 0.5) / n * 100).toFixed(2) + '%';
    }
  }
  fill();
  addEventListener('load', fill);
  addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(fill, 200); });
})();
