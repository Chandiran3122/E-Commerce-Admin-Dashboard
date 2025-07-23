document.addEventListener('DOMContentLoaded', () => {
  const settingsForm = document.getElementById('settingsForm');
  const formMessage = document.getElementById('formMessage');

  // Utility to show error on form control
  function showError(input, message) {
    const errorMsg = input.nextElementSibling;
    errorMsg.textContent = message;
    input.classList.add('input-error');
  }

  // Utility to clear error on form control
  function clearError(input) {
    const errorMsg = input.nextElementSibling;
    errorMsg.textContent = '';
    input.classList.remove('input-error');
  }

  // Validate form fields
  function validate() {
    let isValid = true;

    const nameInput = settingsForm.adminName;
    const emailInput = settingsForm.adminEmail;
    const pwdInput = settingsForm.adminPassword;

    // Name required
    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Name is required');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Email required and valid
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'Email is required');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Email is not valid');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Password optional but if filled min length 6
    if (pwdInput.value.trim() !== '' && pwdInput.value.trim().length < 6) {
      showError(pwdInput, 'Password must be at least 6 characters');
      isValid = false;
    } else {
      clearError(pwdInput);
    }

    return isValid;
  }

  // Simple email format validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // Handle form submit
  settingsForm.addEventListener('submit', e => {
    e.preventDefault();
    formMessage.textContent = '';
    formMessage.style.color = 'green';

    if (validate()) {
      // Simulate saving process
      formMessage.textContent = 'Saving changes...';

      setTimeout(() => {
        formMessage.textContent = 'Settings saved successfully!';
        settingsForm.reset();
      }, 1000);
    } else {
      formMessage.textContent = 'Please fix errors before saving.';
      formMessage.style.color = 'crimson';
    }
  });

  // Optional: Filter/Search in settings (can be extended if you want)
});
