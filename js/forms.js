var AB_WEB3FORMS_ACCESS_KEY = 'c0f9589b-17fa-40d7-adff-84f53ee8996a';
var AB_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function abInitWeb3Form(form) {
  var redirectUrl = form.getAttribute('data-redirect');
  var consentBox = form.querySelector('.ab-consent-checkbox');
  var consentHint = form.querySelector('.ab-consent-hint');
  var requiredHint = form.querySelector('.ab-required-hint');
  var requiredHintDefaultText = requiredHint ? requiredHint.textContent : '';
  var errorBox = form.querySelector('.ab-form-error');
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn ? submitBtn.textContent : '';
  var requiredFields = form.querySelectorAll('input[required], textarea[required]');

  function firstInvalidRequiredField() {
    for (var i = 0; i < requiredFields.length; i++) {
      var field = requiredFields[i];
      var value = field.value.trim();
      if (!value) return { field: field, reason: 'empty' };
      if (field.type === 'email' && !AB_EMAIL_REGEX.test(value)) return { field: field, reason: 'format' };
    }
    return null;
  }

  requiredFields.forEach(function (field) {
    field.addEventListener('input', function () {
      if (requiredHint && !firstInvalidRequiredField()) requiredHint.style.display = 'none';
    });
  });

  if (consentBox) {
    consentBox.addEventListener('change', function () {
      if (consentBox.checked && consentHint) consentHint.style.display = 'none';
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (errorBox) errorBox.style.display = 'none';

    var invalid = firstInvalidRequiredField();
    if (invalid) {
      if (requiredHint) {
        requiredHint.textContent = invalid.reason === 'format'
          ? 'Введите настоящий email, например name@mail.ru'
          : requiredHintDefaultText;
        requiredHint.style.display = 'block';
      }
      invalid.field.focus();
      return;
    }
    if (requiredHint) {
      requiredHint.textContent = requiredHintDefaultText;
      requiredHint.style.display = 'none';
    }

    if (consentBox && !consentBox.checked) {
      if (consentHint) consentHint.style.display = 'block';
      return;
    }
    if (consentHint) consentHint.style.display = 'none';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправка...';
    }

    var formData = new FormData(form);
    formData.append('access_key', AB_WEB3FORMS_ACCESS_KEY);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.success) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'form_sent', form_id: form.id });
          window.location.href = redirectUrl;
        } else {
          throw new Error('web3forms error');
        }
      })
      .catch(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
        }
        if (errorBox) errorBox.style.display = 'block';
      });
  });
}

document.querySelectorAll('form[data-redirect]').forEach(abInitWeb3Form);
