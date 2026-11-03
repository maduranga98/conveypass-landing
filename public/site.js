(function () {
  "use strict";

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var header = document.querySelector(".site-header");
  function setMenu(open) {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
  }
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 24); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.matchMedia("(min-width: 821px)").addEventListener("change", function () {
      setMenu(false);
    });
  }

  /* Booking form */
  var form = document.getElementById("booking-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var btn = form.querySelector("button[type=submit]");
  var date = form.elements.date;
  var today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  date.min = today.toISOString().slice(0, 10);

  function say(msg, ok) {
    status.textContent = msg;
    status.className = "status " + (ok ? "ok" : "err");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = String(v).trim(); });
    btn.disabled = true;
    btn.textContent = "Sending...";
    say("", true);
    fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (r) {
        if (!r.ok) throw new Error("bad status");
        form.reset();
        say("Thanks! Your demo request is in. We'll confirm by email within one business day.", true);
      })
      .catch(function () {
        say("Something went wrong. Please email info@lumoraventures.com and we'll book you in.", false);
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = "Request demo";
      });
  });
})();
