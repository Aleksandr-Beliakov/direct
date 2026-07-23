var AB_WEB3FORMS_ACCESS_KEY = 'c0f9589b-17fa-40d7-adff-84f53ee8996a';

function abInitWeb3Form(form) {
  var redirectUrl = form.getAttribute('data-redirect');
  var consentBox = form.querySelector('.ab-consent-checkbox');
  var consentHint = form.querySelector('.ab-consent-hint');
  var requiredHint = form.querySelector('.ab-required-hint');
  var errorBox = form.querySelector('.ab-form-error');
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn ? submitBtn.textContent : '';
  var requiredFields = form.querySelectorAll('input[required], textarea[required]');

  function firstEmptyRequiredField() {
    for (var i = 0; i < requiredFields.length; i++) {
      if (!requiredFields[i].value.trim()) return requiredFields[i];
    }
    return null;
  }

  requiredFields.forEach(function (field) {
    field.addEventListener('input', function () {
      if (requiredHint && !firstEmptyRequiredField()) requiredHint.style.display = 'none';
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

    var emptyField = firstEmptyRequiredField();
    if (emptyField) {
      if (requiredHint) requiredHint.style.display = 'block';
      emptyField.focus();
      return;
    }
    if (requiredHint) requiredHint.style.display = 'none';

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
