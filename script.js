/* ============================================================
   Massage 4 Beauty — interactions
   · Language switch (CZ / EN / RU) with localStorage memory
   · Price-list rendering from content.js
   · Contact form (front-end confirmation only)
   ============================================================ */
(function () {
  "use strict";

  var SUPPORTED = ["cs", "en", "ru"];

  /* ---- pick initial language: saved → browser → en ---- */
  function initialLang() {
    var saved = localStorage.getItem("m4b-lang");
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : "en";
  }

  /* ---- build one price row ---- */
  function priceRow(item, locale) {
    var row = document.createElement("div");
    row.className = "price-row";

    var left = document.createElement("div");
    left.style.flex = "1";
    var name = document.createElement("div");
    name.className = "price-name";
    name.textContent = item.name;
    var desc = document.createElement("div");
    desc.className = "price-desc";
    desc.textContent = item.desc;
    left.appendChild(name);
    left.appendChild(desc);

    var meta = document.createElement("div");
    meta.className = "price-meta";
    var val = document.createElement("div");
    val.className = "price-val";
    val.textContent = locale.currency(item.price);
    meta.appendChild(val);
    if (item.min) {
      var min = document.createElement("div");
      min.className = "price-min";
      min.textContent = item.min + " " + locale.minLabel;
      meta.appendChild(min);
    }

    row.appendChild(left);
    row.appendChild(meta);
    return row;
  }

  function renderList(targetId, items, locale) {
    var box = document.getElementById(targetId);
    if (!box) return;
    box.textContent = "";
    items.forEach(function (item) { box.appendChild(priceRow(item, locale)); });
  }

  /* ---- apply a language across the whole page ---- */
  function applyLang(lang) {
    var data = window.CONTENT[lang];
    if (!data) return;
    var s = data.strings;

    document.documentElement.lang = lang;

    // text nodes
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (s[key] != null) el.textContent = s[key];
    });

    // placeholders
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (s[key] != null) el.setAttribute("placeholder", s[key]);
    });

    // contact details (shared, not translated)
    var addr = document.getElementById("infoAddress");
    if (addr) addr.textContent = window.CONTENT.contact.address;

    // price lists
    renderList("faceList", data.facial, data);
    renderList("bodyList", data.body, data);

    // active state on both switchers
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    localStorage.setItem("m4b-lang", lang);
  }

  /* ---- wire up ---- */
  document.addEventListener("DOMContentLoaded", function () {
    applyLang(initialLang());

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });

    // contact form — front-end confirmation (no backend wired yet)
    var form = document.getElementById("bookingForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var lang = localStorage.getItem("m4b-lang") || "en";
        var thanks = document.getElementById("formThanks");
        Array.prototype.forEach.call(form.querySelectorAll(".field, .btn-solid"), function (el) {
          el.style.display = "none";
        });
        thanks.textContent = window.CONTENT[lang].strings.formThanks;
        thanks.hidden = false;
      });
    }
  });
})();
