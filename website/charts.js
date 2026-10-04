// Interactive figures powered by Apache ECharts 5 (CDN).
// Secondary figures (F-1..F-6) use fixed report values; survey figures (P-S1..P-S5)
// compute live from window.SURVEY when present. Staggered entry animations,
// rich tooltips and per-figure Save-as-Image toolbox on every chart.
(function () {
  "use strict";

  var FONT = "'IBM Plex Sans',system-ui,sans-serif";
  var INK = "#1a1d1a", GREEN = "#137333", AMBER = "#9a5b00", RED = "#b3261e",
      GREY = "#8a8f8c", TRACK = "#f4f4f1";
  var charts = [];

  function mount(id, h) {
    var el = document.getElementById(id);
    if (!el) return null;
    el.style.height = h + "px";
    var c = echarts.init(el);
    charts.push(c);
    return c;
  }
  window.addEventListener("resize", function () {
    charts.forEach(function (c) { c.resize(); });
  });

  function baseTooltip(trigger) {
    return {
      trigger: trigger || "item",
      backgroundColor: INK,
      borderWidth: 0,
      padding: [9, 13],
      textStyle: { color: "#fff", fontFamily: FONT, fontSize: 12.5 }
    };
  }
  function toolbox() {
    return {
      toolbox: {
        right: 4, top: 0,
        feature: { saveAsImage: { title: "Save figure", name: "figure", pixelRatio: 2 } }
      }
    };
  }
  function entry() {
    return {
      animationDuration: 1300,
      animationEasing: "cubicOut",
      animationDelay: function (idx) { return idx * 110; }
    };
  }
  function barLabel(displays) {
    return {
      show: true, position: "right",
      color: "#5c6160", fontFamily: FONT, fontSize: 11.5,
      formatter: function (p) { return displays[p.dataIndex]; }
    };
  }

  function renderAll() {
  /* ================= F-1 · Sankey: fate of 170,339 TPD ================= */
  (function () {
    var c = mount("c-f1", 440);
    if (!c) return;
    c.setOption(Object.assign({
      tooltip: baseTooltip(),
      series: [{
        type: "sankey",
        left: 8, right: 110, top: 30, bottom: 20,
        nodeWidth: 14, nodeGap: 22,
        label: { color: INK, fontFamily: FONT, fontSize: 12 },
        lineStyle: { color: "gradient", opacity: 0.35, curveness: 0.5 },
        emphasis: { focus: "adjacency" },
        animationEasing: "cubicOut", animationDuration: 1400,
        data: [
          { name: "Generated\n1,70,339 TPD", itemStyle: { color: INK } },
          { name: "Collected\n1,56,449", itemStyle: { color: GREY } },
          { name: "Uncollected\n13,890", itemStyle: { color: GREY } },
          { name: "Treated\n91,511", itemStyle: { color: GREEN } },
          { name: "Landfilled\n41,455", itemStyle: { color: AMBER } },
          { name: "Unaccounted gap\n37,373", itemStyle: { color: RED } }
        ],
        links: [
          { source: "Generated\n1,70,339 TPD", target: "Collected\n1,56,449", value: 156449 },
          { source: "Generated\n1,70,339 TPD", target: "Uncollected\n13,890", value: 13890 },
          { source: "Collected\n1,56,449", target: "Treated\n91,511", value: 91511 },
          { source: "Collected\n1,56,449", target: "Landfilled\n41,455", value: 41455 },
          { source: "Collected\n1,56,449", target: "Unaccounted gap\n37,373", value: 23483 },
          { source: "Uncollected\n13,890", target: "Unaccounted gap\n37,373", value: 13890 }
        ]
      }]
    }, toolbox()));
  })();

  /* ================= F-2 · claimed vs verified ================= */
  (function () {
    var c = mount("c-f2", 360);
    if (!c) return;
    c.setOption(Object.assign({
      tooltip: Object.assign(baseTooltip("axis"), {
        valueFormatter: function (v) { return v.toFixed(1) + "%"; }
      }),
      legend: {
        bottom: 0, textStyle: { fontFamily: FONT, fontSize: 12, color: "#5c6160" },
        itemWidth: 14, itemHeight: 9
      },
      grid: { left: 8, right: 44, top: 44, bottom: 44, containLabel: true },
      xAxis: {
        type: "category",
        data: ["2014", "2019", "2023 claimed", "2023 verified"],
        axisLabel: { fontFamily: FONT, fontSize: 11.5, color: "#5c6160" },
        axisLine: { lineStyle: { color: "#e7e4dc" } }, axisTick: { show: false }
      },
      yAxis: {
        type: "value", max: 100,
        axisLabel: { formatter: "{value}%", fontFamily: FONT, fontSize: 11, color: "#8a8f8c" },
        splitLine: { lineStyle: { color: "#e7e4dc" } }
      },
      series: [
        {
          name: "Segregation", type: "bar", barGap: "25%",
          data: [60.0, 74.8, 90.1, 48.8],
          itemStyle: { color: INK, borderRadius: [6, 6, 0, 0] },
          label: { show: true, position: "top", fontFamily: FONT, fontSize: 11, color: "#5c6160", formatter: "{c}%" }
        },
        {
          name: "Processing", type: "bar",
          data: [18.0, 60.0, 75.0, 53.7],
          itemStyle: { color: GREEN, borderRadius: [6, 6, 0, 0] },
          label: { show: true, position: "top", fontFamily: FONT, fontSize: 11, color: "#5c6160", formatter: "{c}%" }
        }
      ]
    }, entry(), toolbox()));
  })();

  /* ================= F-3 · state contrast ================= */
  (function () {
    var c = mount("c-f3", 400);
    if (!c) return;
    var states = ["West Bengal", "Andhra Pradesh", "Rajasthan", "Punjab", "Karnataka", "Telangana", "Maharashtra", "Gujarat"];
    var vals = [22.2, 22.6, 24.2, 34.8, 41.7, 77.9, 84.9, 86.0];
    var tpd = ["13,709 TPD", "6,890 TPD", "7,973 TPD", "4,222 TPD", "13,034 TPD", "11,057 TPD", "23,531 TPD", "10,095 TPD"];
    c.setOption(Object.assign({
      tooltip: Object.assign(baseTooltip(), {
        formatter: function (p) { return "<strong>" + states[p.dataIndex] + "</strong><br>" + tpd[p.dataIndex] + " · treated " + vals[p.dataIndex].toFixed(1) + "%"; }
      }),
      grid: { left: 8, right: 56, top: 36, bottom: 8, containLabel: true },
      xAxis: {
        type: "value", max: 100,
        axisLabel: { formatter: "{value}%", fontFamily: FONT, fontSize: 11, color: "#8a8f8c" },
        splitLine: { lineStyle: { color: "#e7e4dc" } }
      },
      yAxis: {
        type: "category", inverse: true, data: states,
        axisLabel: { fontFamily: FONT, fontSize: 12, color: INK },
        axisLine: { show: false }, axisTick: { show: false }
      },
      media: [{
        query: { maxWidth: 560 },
        option: {
          grid: { right: 72 },
          yAxis: { axisLabel: { fontSize: 11, width: 88, overflow: "truncate" } }
        }
      }],
      series: [{
        type: "bar",
        data: vals.map(function (v, i) {
          return {
            value: v,
            itemStyle: {
              color: v >= 70 ? GREEN : (v >= 35 ? AMBER : RED),
              borderRadius: [0, 6, 6, 0]
            }
          };
        }),
        showBackground: true, backgroundStyle: { color: TRACK, borderRadius: [0, 6, 6, 0] },
        label: { show: true, position: "right", fontFamily: FONT, fontSize: 11.5, color: "#5c6160", formatter: function (p) { return p.value.toFixed(1) + "%"; } }
      }]
    }, entry(), toolbox()));
  })();

  /* ================= F-4 · Maharashtra ================= */
  (function () {
    var a = mount("c-f4a", 240);
    if (a) a.setOption(Object.assign({
      tooltip: Object.assign(baseTooltip("axis"), { valueFormatter: function (v) { return v.toFixed(1) + "%"; } }),
      grid: { left: 8, right: 52, top: 36, bottom: 8, containLabel: true },
      xAxis: {
        type: "category", data: ["Q4-2020 (23,607 TPD)", "2023 (24,299 TPD)"],
        axisLabel: { fontFamily: FONT, fontSize: 11.5, color: "#5c6160" },
        axisLine: { lineStyle: { color: "#e7e4dc" } }, axisTick: { show: false }
      },
      yAxis: {
        type: "value", max: 100,
        axisLabel: { formatter: "{value}%", fontFamily: FONT, fontSize: 11, color: "#8a8f8c" },
        splitLine: { lineStyle: { color: "#e7e4dc" } }
      },
      series: [{
        name: "Treated share", type: "bar", barWidth: "34%",
        data: [
          { value: 63.0, itemStyle: { color: GREY, borderRadius: [6, 6, 0, 0] } },
          { value: 81.8, itemStyle: { color: GREEN, borderRadius: [6, 6, 0, 0] } }
        ],
        label: { show: true, position: "top", fontFamily: FONT, fontSize: 12, color: INK, formatter: "{c}%" }
      }]
    }, entry(), toolbox()));
    var b = mount("c-f4b", 240);
    if (b) b.setOption(Object.assign({
      tooltip: Object.assign(baseTooltip("axis"), { valueFormatter: function (v) { return v.toLocaleString("en-IN") + " TPD"; } }),
      grid: { left: 8, right: 60, top: 36, bottom: 8, containLabel: true },
      xAxis: {
        type: "category", data: ["Q4-2020", "2023"],
        axisLabel: { fontFamily: FONT, fontSize: 11.5, color: "#5c6160" },
        axisLine: { lineStyle: { color: "#e7e4dc" } }, axisTick: { show: false }
      },
      yAxis: {
        type: "value",
        axisLabel: { fontFamily: FONT, fontSize: 11, color: "#8a8f8c" },
        splitLine: { lineStyle: { color: "#e7e4dc" } }
      },
      series: [{
        name: "Untreated gap", type: "bar", barWidth: "34%",
        data: [
          { value: 6187, itemStyle: { color: RED, borderRadius: [6, 6, 0, 0] } },
          { value: 873, itemStyle: { color: GREEN, borderRadius: [6, 6, 0, 0] } }
        ],
        label: { show: true, position: "top", fontFamily: FONT, fontSize: 12, color: INK, formatter: function (p) { return p.value.toLocaleString("en-IN"); } }
      }]
    }, entry(), toolbox()));
  })();

  /* ================= F-5 · four-stream donut ================= */
  (function () {
    var c = mount("c-f5", 380);
    if (!c) return;
    c.setOption(Object.assign({
      tooltip: Object.assign(baseTooltip(), { formatter: "<strong>{b}</strong><br>{d}% of 286.3 kg/day" }),
      title: {
        text: "286.3", subtext: "kg / day", left: "center", top: "40%",
        textStyle: { fontFamily: FONT, fontSize: 22, fontWeight: 600, color: INK },
        subtextStyle: { fontFamily: FONT, fontSize: 11, color: "#8a8f8c" },
        itemGap: 2
      },
      series: [{
        type: "pie", radius: ["48%", "72%"], center: ["50%", "52%"],
        padAngle: 2,
        itemStyle: { borderRadius: 8, borderColor: "#fff", borderWidth: 2 },
        label: { fontFamily: FONT, fontSize: 12, color: INK, formatter: "{b} {d}%" },
        labelLine: { length: 10, length2: 8 },
        emphasis: { scale: true, scaleSize: 6, focus: "self" },
        animationEasing: "elasticOut", animationDuration: 1600,
        data: [
          { value: 71.5, name: "Wet", itemStyle: { color: GREEN } },
          { value: 16.2, name: "Dry", itemStyle: { color: INK } },
          { value: 8.1, name: "Sanitary", itemStyle: { color: AMBER } },
          { value: 4.2, name: "Hazardous", itemStyle: { color: RED } }
        ]
      }]
    }, toolbox()));
  })();

  /* ================= F-6 · behavioural benchmarks ================= */
  function vbar(id, h, cats, vals, colors, tipExtra) {
    var c = mount(id, h);
    if (!c) return;
    c.setOption(Object.assign({
      tooltip: Object.assign(baseTooltip("axis"), {
        valueFormatter: function (v) { return v + "%"; }
      }),
      grid: { left: 8, right: 64, top: 36, bottom: 8, containLabel: true },
      xAxis: {
        type: "category", data: cats,
        axisLabel: { fontFamily: FONT, fontSize: 11, color: "#5c6160", interval: 0, width: 110, overflow: "break" },
        axisLine: { lineStyle: { color: "#e7e4dc" } }, axisTick: { show: false }
      },
      yAxis: {
        type: "value",
        axisLabel: { formatter: "{value}%", fontFamily: FONT, fontSize: 11, color: "#8a8f8c" },
        splitLine: { lineStyle: { color: "#e7e4dc" } }
      },
      series: [{
        type: "bar", barWidth: "40%",
        data: vals.map(function (v, i) {
          return { value: v, itemStyle: { color: colors[i], borderRadius: [6, 6, 0, 0] } };
        }),
        label: { show: true, position: "top", fontFamily: FONT, fontSize: 11.5, color: INK, formatter: "{c}%" }
      }]
    }, entry(), toolbox()));
  }
  vbar("c-f6", 300,
    ["Delhi baseline", "Delhi: 1 week after bins + nudge", "Delhi: week 5, no follow-up"],
    [3.69, 54.0, 43.0], [GREY, GREEN, AMBER]);
  vbar("c-f6b", 250,
    ["Mulund: aware", "Mulund: willing"],
    [86.36, 90.91], [INK, INK]);
  vbar("c-f6c", 220,
    ["IIT-Mandi gain in 3 days (pts)"],
    [11], [GREEN]);

  /* ================= SURVEY FIGURES (live from dataset) ================= */
  function sdist(qid) {
    var S = window.SURVEY, q = null;
    S.questions.forEach(function (x) { if (x.id === qid) q = x; });
    var pos = parseInt(qid.slice(1), 10) - 1;
    return {
      labels: q.order.map(function (code) { return q.opts[code]; }),
      vals: q.order.map(function (code) {
        return S.rows.filter(function (r) { return r[pos] === code; }).length;
      })
    };
  }
  // asPercent=true when vals are already percentages (stratum shares)
  function sbar(id, h, labels, vals, colors, asPercent) {
    var c = mount(id, h);
    if (!c) return;
    var displays = asPercent
      ? vals.map(function (v) { return v.toFixed(1) + "%"; })
      : vals.map(function (v) { return v + " · " + v.toFixed(0) + "%"; });
    c.setOption(Object.assign({
      tooltip: Object.assign(baseTooltip(), {
        formatter: function (p) {
          return "<strong>" + labels[p.dataIndex] + "</strong><br>" + displays[p.dataIndex] +
            (asPercent ? " within stratum" : " respondents");
        }
      }),
      grid: { left: 8, right: 76, top: 30, bottom: 8, containLabel: true },
      xAxis: {
        type: "value", max: 100,
        axisLabel: { formatter: "{value}%", fontFamily: FONT, fontSize: 11, color: "#8a8f8c" },
        splitLine: { lineStyle: { color: "#e7e4dc" } }
      },
      yAxis: {
        type: "category", inverse: true, data: labels,
        axisLabel: { fontFamily: FONT, fontSize: 12, color: INK },
        axisLine: { show: false }, axisTick: { show: false }
      },
      media: [{
        query: { maxWidth: 560 },
        option: {
          grid: { right: 72 },
          yAxis: { axisLabel: { fontSize: 11, width: 120, overflow: "truncate" } }
        }
      }],
      series: [{
        type: "bar",
        data: vals.map(function (v, i) {
          return { value: v, itemStyle: { color: colors[i % colors.length], borderRadius: [0, 6, 6, 0] } };
        }),
        showBackground: true, backgroundStyle: { color: TRACK, borderRadius: [0, 6, 6, 0] },
        label: barLabel(displays)
      }]
    }, entry(), toolbox()));
  }
  if (window.SURVEY) {
    var d;
    d = sdist("Q1"); sbar("c-s1a", 280, d.labels, d.vals, [INK]);
    d = sdist("Q2"); sbar("c-s1b", 280, d.labels, d.vals, [GREEN, GREY, AMBER]);
    d = sdist("Q3"); sbar("c-s2a", 300, d.labels, d.vals, [INK]);
    d = sdist("Q4"); sbar("c-s2b", 300, d.labels, d.vals, [GREEN, AMBER, AMBER, RED]);
    d = sdist("Q5"); sbar("c-s3a", 280, d.labels, d.vals, [GREEN, RED, GREY]);
    d = sdist("Q6"); sbar("c-s3b", 280, d.labels, d.vals, [RED, AMBER, GREEN]);
    d = sdist("Q7"); sbar("c-s4a", 280, d.labels, d.vals, [GREEN, AMBER, AMBER]);
    sbar("c-s4b", 220,
      ["Aware of municipal fines (Q8)", "Arrival alert would help (Q9)"],
      [56, 60], [INK, GREEN]);
    d = sdist("Q10"); sbar("c-s5a", 300, d.labels, d.vals, [INK]);
    (function () {
      var S = window.SURVEY;
      var strata = [["G", "Gated Society (n=40)"], ["C", "Chawl (n=33)"], ["O", "Other (n=27)"]];
      var singles = strata.map(function (r) {
        var inH = S.rows.filter(function (x) { return x[0] === r[0]; });
        return inH.filter(function (x) { return x[1] === "N"; }).length;
      });
      sbar("c-s5b", 260,
        strata.map(function (r) { return r[1]; }),
        singles.map(function (n, i) {
          var base = [40, 33, 27][i];
          return +(n / base * 100).toFixed(1);
        }),
        [AMBER], true);
    })();
  }
  }

  /* ---------- lazy start: fetch ECharts only when scrolled near ---------- */
  var started = false;
  function start() {
    if (started) return;
    started = true;
    if (window.echarts) { renderAll(); return; }
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js";
    s.onload = renderAll;
    s.onerror = function () {
      document.querySelectorAll(".chart").forEach(function (b) {
        b.innerHTML = '<p class="chart-fallback">Interactive chart could not load (ECharts CDN unreachable). The underlying numbers are listed in the caption and data tables.</p>';
      });
    };
    document.head.appendChild(s);
  }
  (function armLazy() {
    var boxes = document.querySelectorAll(".chart");
    if (!boxes.length) return;
    window.addEventListener("beforeprint", start);
    if (!("IntersectionObserver" in window)) { start(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { start(); io.disconnect(); }
      });
    }, { rootMargin: "600px" });
    boxes.forEach(function (b) { io.observe(b); });
    setTimeout(start, 4000);
  })();
})();
