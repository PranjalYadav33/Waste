// Shared site behaviour: reading progress, reveal on scroll, counters,
// mobile navigation, sortable tables, copy-to-clipboard, theme toggle,
// auto table of contents, skip link, back-to-top, header shadow.
(function () {
  var doc = document.documentElement;

  /* ---------- single light theme (dark mode removed) ---------- */
  doc.removeAttribute("data-theme");

  /* ---------- skip link + main landmark ---------- */
  var main = document.querySelector("main");
  if (main) {
    if (!main.id) main.id = "main";
    if (!document.querySelector(".skip")) {
      var skip = document.createElement("a");
      skip.className = "skip";
      skip.href = "#main";
      skip.textContent = "Skip to content";
      document.body.insertBefore(skip, document.body.firstChild);
    }
  }

  /* ---------- reading progress + header shadow + back-to-top ---------- */
  var bar = document.getElementById("progress");
  var header = document.querySelector(".site-header");
  var toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.textContent = "\u2191";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(toTop);
  var onScroll = function () {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    if (header) header.classList.toggle("scrolled", h.scrollTop > 8);
    toTop.classList.toggle("show", h.scrollTop > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- animated counters ---------- */
  var nums = document.querySelectorAll(".metric-num[data-count]");
  if (nums.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var t = parseFloat(el.getAttribute("data-count"));
        var d = parseInt(el.getAttribute("data-dec") || "0", 10);
        var s = el.getAttribute("data-suffix") || "";
        var t0 = performance.now(), dur = 1100;
        var tick = function (n) {
          var k = Math.min((n - t0) / dur, 1);
          var ez = 1 - Math.pow(1 - k, 3);
          el.textContent = (t * ez).toFixed(d) + s;
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- mobile navigation toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".header-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- auto table of contents (pages with 3+ sections) ---------- */
  (function buildTOC() {
    var art = document.querySelector(".article");
    if (!art || art.querySelector(".toc")) return;
    var heads = art.querySelectorAll("h2");
    if (heads.length < 3) return;
    function slug(t) {
      var s = t.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, "").trim().replace(/\s+/g, "-").slice(0, 60);
      return s || "section";
    }
    var used = {};
    var toc = document.createElement("nav");
    toc.className = "toc";
    toc.setAttribute("aria-label", "On this page");
    var cap = document.createElement("p");
    cap.className = "toc-title";
    cap.textContent = "On this page";
    toc.appendChild(cap);
    var ul = document.createElement("ul");
    heads.forEach(function (h) {
      var s = slug(h.textContent), base = s, i = 2;
      while (used[s]) s = base + "-" + i++;
      used[s] = 1;
      h.id = s;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + s;
      a.textContent = h.textContent;
      li.appendChild(a);
      ul.appendChild(li);
    });
    toc.appendChild(ul);
    heads[0].parentNode.insertBefore(toc, heads[0]);
  })();

  /* ---------- sortable tables ---------- */
  document.querySelectorAll("table.sortable").forEach(function (tbl) {
    var heads = tbl.querySelectorAll("thead th");
    heads.forEach(function (th, idx) {
      th.setAttribute("title", "Sort by this column");
      th.addEventListener("click", function () {
        var body = tbl.querySelector("tbody");
        var rows = Array.prototype.slice.call(body.rows);
        var asc = th.getAttribute("data-asc") !== "1";
        rows.sort(function (a, b) {
          var x = a.cells[idx].textContent.trim();
          var y = b.cells[idx].textContent.trim();
          var nx = parseFloat(x), ny = parseFloat(y);
          if (!isNaN(nx) && !isNaN(ny)) return asc ? nx - ny : ny - nx;
          return asc ? x.localeCompare(y) : y.localeCompare(x);
        });
        rows.forEach(function (r) { body.appendChild(r); });
        heads.forEach(function (h) {
          h.removeAttribute("data-asc");
          var s = h.querySelector(".arr");
          if (s) s.remove();
        });
        th.setAttribute("data-asc", asc ? "1" : "0");
        var arrow = document.createElement("span");
        arrow.className = "arr";
        arrow.textContent = asc ? " \u25B2" : " \u25BC";
        th.appendChild(arrow);
      });
    });
  });

  /* ---------- copy-to-clipboard buttons ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = document.querySelector(btn.getAttribute("data-copy"));
      var text = src ? src.textContent : "";
      var done = function () {
        var original = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = original; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else { done(); }
    });
  });
})();
