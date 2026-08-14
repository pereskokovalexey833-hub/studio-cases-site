(function () {
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var form = document.getElementById('contact-form');
  var success = document.getElementById('form-success');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#c-name');
      var phone = form.querySelector('#c-phone');
      if (!name.value.trim() || !phone.value.trim()) {
        if (!name.value.trim()) name.focus();
        else phone.focus();
        return;
      }
      success.hidden = false;
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
})();
