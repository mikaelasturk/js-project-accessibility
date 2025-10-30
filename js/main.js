// Makes the focus styling only apply when using tab-blabla
(() => {
  const onFirstTab = (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('tab-user');
      window.removeEventListener('keydown', onFirstTab);
      window.addEventListener('mousedown', onMouseClick);
    }
  };

  const onMouseClick = () => {
    document.body.classList.remove('tab-user');
    window.removeEventListener('mousedown', onMouseClick);
    window.addEventListener('keydown', onFirstTab);
  };

  window.addEventListener('keydown', onFirstTab);
})();

// Makes checkbox 2-minimum active
// Make sure errormessage is alerted loud
(() => {
  const form = document.getElementById('user-info-form');
  const genreQ = document.getElementById('checkboxAlternatives');
  const checkboxes = genreQ.querySelectorAll('input[type="checkbox"][name="genre"]');
  const error = document.getElementById('error');

  form.addEventListener('submit', e => {
    const checkedCount = [...checkboxes].filter(box => box.checked).length;
    if (checkedCount < 2) {
      e.preventDefault();
      error.textContent = 'Please select at least two options.';
    } else {
      error.textContent = '';
    }
  });
})();
