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
      var email = form.querySelector('#c-email');
      var product = form.querySelector('#c-product');
      var message = form.querySelector('#c-msg');
      if (!name.value.trim() || !phone.value.trim() || !email.value.trim()) {
        if (!name.value.trim()) name.focus();
        else if (!phone.value.trim()) phone.focus();
        else email.focus();
        return;
      }
      var cfg = window.STUDIO_CONFIG || {};
      var endpoint = cfg.formEndpoint;
      var payload = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        product: product.options[product.selectedIndex].text,
        message: message.value.trim(),
      };
      var done = function () {
        success.hidden = false;
        form.reset();
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };
      if (!endpoint) {
        done();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      }).then(done).catch(done).finally(function () {
        btn.disabled = false;
      });
    });
  }
})();
