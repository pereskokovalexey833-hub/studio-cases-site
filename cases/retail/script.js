(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var form = document.getElementById("reserve-form");
  var status = document.getElementById("form-status");
  var tabs = document.querySelectorAll(".menu-tab");
  var items = document.querySelectorAll(".menu-item");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      siteNav.classList.toggle("is-open", !open);
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
      });
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var category = tab.getAttribute("data-category");

      tabs.forEach(function (btn) {
        var active = btn === tab;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", String(active));
      });

      items.forEach(function (item) {
        var match = category === "all" || item.getAttribute("data-category") === category;
        item.classList.toggle("is-hidden", !match);
      });
    });
  });

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      status.hidden = false;
      status.classList.add("is-visible");
      form.reset();

      window.setTimeout(function () {
        status.classList.remove("is-visible");
        status.hidden = true;
      }, 5000);
    });
  }
})();
