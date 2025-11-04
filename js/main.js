// get access to the elements/hamburger and navmenu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// add edventlistner to the hamburger, as soon as you click it we want to activate the class that is going to turn this into an X
// and aslo the class that is going to show the menu, now when we click it appears and disappears
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// when we click on the links the menu should disappears or the menu closes
// we do for each link we add an addEventListener, we remove class from hamburger and for navmenu

document.querySelectorAll(".nav-links").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Makes the focus styling only apply when using tab-blabla
(() => {
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
})();

// Makes checkbox 2-minimum active
// Make sure errormessage is alerted loud
(() => {
  const form = document.getElementById("user-info-form");
  const genreQ = document.getElementById("checkboxAlternatives");
  const checkboxes = genreQ.querySelectorAll(
    'input[type="checkbox"][name="genre"]'
  );
  const error = document.getElementById("error");

  form.addEventListener("submit", (e) => {
    const checkedCount = [...checkboxes].filter((box) => box.checked).length;
    if (checkedCount < 2) {
      e.preventDefault();
      error.textContent = "Please select at least two options.";
    } else {
      error.textContent = "";
    }
  });
});

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