(function () {
  "use strict";

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Subtle scroll reveal
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".pillar-card, .pack-card, .shadow-steps li, .trust-grid li, .demo-panel, .stack-diagram, .hitl-banner"
    );
    targets.forEach(function (el) {
      el.classList.add("reveal");
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    targets.forEach(function (el) {
      io.observe(el);
    });
  }

  // Draft contact form → mailto (no backend)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var org = (data.get("org") || "").toString().trim();
      var interest = (data.get("interest") || "").toString();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !email) {
        window.alert("Please add your name and work email. (Draft form — wire to CRM later.)");
        return;
      }

      var subject = "Clinic OS design partner";
      if (interest === "demo") subject = "Clinic OS unit ledger demo";
      if (interest === "shadow") subject = "Clinic OS shadow / claims review";

      var body = [
        "Name: " + name,
        "Email: " + email,
        "Organization: " + (org || "(not provided)"),
        "Interest: " + interest,
        "",
        message || "(no message)"
      ].join("\n");

      var mailto =
        "mailto:tech@platypustechdesign.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      window.location.href = mailto;
    });
  }
})();
