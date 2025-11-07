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

 // toggle hamburger/menu
  if (hamburger && navMenu) {
    const toggleMenu = () => {
      const isExpanded = hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      // Update aria-expanded for screen readers
      hamburger.setAttribute("aria-expanded", isExpanded);

      // FOCUS MANAGEMENT: Move focus when menu opens/closes
      if (isExpanded) {
        // Menu just opened - move focus to first link
        const firstLink = navMenu.querySelector('.nav-links');
        if (firstLink) {
          // Small delay to ensure menu is visible
          setTimeout(() => firstLink.focus(), 50);
        }
      } else {
        // Menu just closed - move focus back to hamburger
        hamburger.focus();
      }
    };

    // Click support
    hamburger.addEventListener("click", toggleMenu);

    // Keyboard support (Enter and Space)
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); // Prevent page scroll on Space
        toggleMenu();
      }
      // Escape key to close menu
      if (e.key === "Escape" && hamburger.classList.contains("active")) {
        toggleMenu();
      }
    });

    // Close menu with Escape key (works from anywhere when menu is open)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
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

