// form.js
document.addEventListener('DOMContentLoaded', () => {
  // --- DOM refs för anmälningsformuläret ---
  const userInfoForm = document.getElementById('user-info-form');

  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const cityInput = document.getElementById('place');
  const emailInput = document.getElementById('email');

  const firstNameError = document.getElementById('first-name-error');
  const lastNameError = document.getElementById('last-name-error');
  const cityError = document.getElementById('city-error');
  const emailError = document.getElementById('email-error');

  const resultsSection = document.getElementById('results');
  const resultsContent = document.getElementById('results-content');

  let userName = '';

  // --- Hjälpare ---
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showError = (input, errorEl, message) => {
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
    errorEl.hidden = false;
  };

  const clearError = (input, errorEl) => {
    input.removeAttribute('aria-invalid');
    errorEl.textContent = '';
    errorEl.hidden = true;
  };

  // Live-validering
  [firstNameInput, lastNameInput, cityInput, emailInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (input.value.trim()) clearError(input, errorEl);
      });
    }
  });

  // --- Submit anmälningsformulär ---
  if (userInfoForm) {
    userInfoForm.addEventListener('submit', (e) => {
      e.preventDefault(); // hindra standard-beteendet alltid
      let isValid = true;

      // Förnamn
      if (!firstNameInput.value.trim()) {
        showError(firstNameInput, firstNameError, 'Please enter your first name');
        isValid = false;
      } else {
        clearError(firstNameInput, firstNameError);
      }

      // Efternamn
      if (!lastNameInput.value.trim()) {
        showError(lastNameInput, lastNameError, 'Please enter your last name');
        isValid = false;
      } else {
        clearError(lastNameInput, lastNameError);
      }

      // Stad
      if (!cityInput.value.trim()) {
        showError(cityInput, cityError, 'Please enter your city');
        isValid = false;
      } else {
        clearError(cityInput, cityError);
      }

      // E-post
      if (!emailInput.value.trim()) {
        showError(emailInput, emailError, 'Please enter your email address');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(emailInput, emailError);
      }

      // Visa tackmeddelande endast om allt är giltigt
      if (isValid) {
        userName = firstNameInput.value.trim();
        if (resultsSection && resultsContent) {
          resultsContent.textContent = `Thank you for joining${userName ? ', ' + userName : ''}!`;
          resultsSection.hidden = false;

          // Lägg till "card"-klass på tacksektionen
          resultsSection.classList.add('card');

          resultsSection.scrollIntoView({ behavior: 'smooth' });
          resultsSection.setAttribute('tabindex', '-1');
          resultsSection.focus();
        }
      }
    });
  }

  // --- Frivillig: feedback-form om den finns ---
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm && resultsSection && resultsContent) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(feedbackForm);
      const userAnswers = Object.fromEntries(formData);

      let feedback =
        userName
          ? `Thank you for your feedback\n\n${userName}!`
          : 'Thank you for your feedback!\n\n';

      if (userAnswers.navigation === 'easy') {
        feedback += " We're glad you found the site easy to navigate.";
      } else if (userAnswers.navigation === 'difficult') {
        feedback += " We'll work on improving our navigation.";
      }

      if (userAnswers.readability === 'clear') {
        feedback += " It's great to hear our content is clear and readable.";
      } else if (userAnswers.readability === 'unclear') {
        feedback += " We'll focus on making our content better.";
      }

      resultsSection.hidden = false;
      resultsContent.textContent = feedback;

      // Säkerställ att tacksektionen också får samma "card"-utseende
      resultsSection.classList.add('card');

      resultsSection.setAttribute('tabindex', '-1');
      resultsSection.focus();
    });
  }

  // --- Access-kontroll: animations-toggle ---
  const motionToggle = document.getElementById('motion-toggle');
  if (motionToggle) {
    motionToggle.addEventListener('change', () => {
      document.documentElement.style.setProperty(
        '--prefers-reduced-motion',
        motionToggle.checked ? 'reduce' : 'no-preference'
      );
    });
  }
});
