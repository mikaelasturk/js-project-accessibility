document.addEventListener('DOMContentLoaded', () => {
  // get access to the elements/hamburger and navmenu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const linkButton = document.querySelector(".button");

  // move to form on button click
  linkButton.addEventListener("click", () => {
    window.location.href = "form.html";
  });

  // toggle hamburger/menu
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
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

  openDialog.forEach((button) => {
    button.addEventListener("click", () => {
      dialog.showModal();
      document.body.classList.add("modal-open");
    });
  });

  closeDialog.addEventListener("click", () => {
    dialog.close();
    document.body.classList.remove("modal-open");
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
});

