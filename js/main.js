document.addEventListener('DOMContentLoaded', () => {
  // get access to the elements/hamburger and navmenu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const motionToggle = document.getElementById("motion-toggle");
  const body = document.body;

  const heroButtons = document.querySelectorAll(".button:not(.modal-button)");
  heroButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "form.html";
  });
});

 // --- Hamburger toggle (mus + Enter + Space) ---
if (hamburger && navMenu) {
  // rekommenderat: koppla ARIA
  if (!navMenu.id) navMenu.id = 'primary-menu';
  hamburger.setAttribute('aria-controls', navMenu.id);

  const toggleMenu = () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  };

  // Mus
  hamburger.addEventListener('click', toggleMenu);

  // Tangentbord: Enter på keydown, Space på keyup (WAI-ARIA praxis)
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      toggleMenu();
    }
  });

  hamburger.addEventListener('keyup', (e) => {
    // Space kan rapporteras som ' ' eller 'Spacebar'; code är stabilt
    if (e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
      e.preventDefault();
      toggleMenu();
    }
  });
}

  // close menu on link click
  document.querySelectorAll(".nav-links, .nav-menu a").forEach((n) =>
    n.addEventListener("click", () => {
      if (hamburger) hamburger.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
    })
  );

  // Makes the focus styling only apply when using keybord navigation
  const tabOrClick = () => {
    const onFirstTab = (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("tab-user");
        window.removeEventListener("keydown", onFirstTab);
        window.addEventListener("mousedown", onMouseClick);
      }
    };

    const onMouseClick = () => {
      document.body.classList.remove("tab-user");
      window.removeEventListener("mousedown", onMouseClick);
      window.addEventListener("keydown", onFirstTab);
    };

    window.addEventListener("keydown", onFirstTab);
  };

  // Makes checkbox 2-minimum active
  // Make sure errormessage is alerted loud
  const minimumTwoGenreOptions = () => {
    const form = document.getElementById("user-info-form");
    const genreQ = document.getElementById("checkboxAlternatives");
    const error = document.getElementById("error");

    if (!form || !genreQ) return;

    if (error) error.setAttribute("role", "alert");

    const checkboxes = genreQ.querySelectorAll(
      'input[type="checkbox"][name="genre"]'
    );
    if (!checkboxes || !checkboxes.length) return;

    form.addEventListener("submit", (e) => {
      const checkedCount = [...checkboxes].filter((box) => box.checked).length;
      if (checkedCount < 2) {
        e.preventDefault();
        if (error) error.textContent = "Please select at least two options.";
      } else {
        if (error) error.textContent = "";
      }
    });
  };

  tabOrClick();
  minimumTwoGenreOptions();

  // Modal dialog functionality

  const dialog = document.getElementById("modal");
  const openDialog = document.querySelectorAll(".modal-button");
  const closeDialog = document.getElementById("close-modal");

  if (dialog && closeDialog && openDialog.length > 0) {
  openDialog.forEach((button) => {
    button.addEventListener("click", () => {
      dialog.showModal();
      document.body.classList.add("modal-open");
      // När modal öppnas
      const closeButton = dialog.querySelector('.close-modal');
      closeButton.focus(); // Move focus to the closeButton 
    });
  });

  closeDialog.addEventListener("click", () => {
    dialog.close();
    document.body.classList.remove("modal-open");
    // When modal closes 
    button.focus(); // Move focus back to the button that opened it 
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
      document.body.classList.remove("modal-open");
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialog.open) {
      dialog.close();
      document.body.classList.remove("modal-open");
    }
  });
}


  //Toggle always starts OFF when page loads
  if (motionToggle) {
    // Always start with toggle OFF
    motionToggle.checked = false;
    body.classList.remove("reduce-motion");

    //The toggle function - when user clicks
    motionToggle.addEventListener("change", () => {
      
      if (motionToggle.checked) {
        body.classList.add("reduce-motion");
      } else {
        body.classList.remove("reduce-motion");
      }

      //saving the user choice in the local storage
      localStorage.setItem("reducedMotion", motionToggle.checked.toString());
    });
  }
});

