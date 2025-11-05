// get access to the elements/hamburger and navmenu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const motionToggle = document.getElementById("motion-toggle");
const body = document.body;

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
})();

//checks to see if the user made a selection (then save in local storage)
const reducedMotion = localStorage.getItem("reducedMotion") === "true";

//the user clicks on disable animations
if (reducedMotion) {
  body.classList.add("reduce-motion");
  motionToggle.textContent = "Enable Animations";
} else {
  motionToggle.textContent = "Disable Animations";
}

//The toggle function
motionToggle.addEventListener("click", () => {
  console.log('Toggle clicked!'); //checking
  
  body.classList.toggle("reduce-motion"); 
  
  console.log('Classes after toggle:', document.body.className); //checking

  //saving the user choice in the local storage
  const isReduced = body.classList.contains("reduce-motion");
  console.log('Is reduced:', isReduced); //checking
  
  localStorage.setItem("reducedMotion", isReduced.toString());

  //Uppdating the button text
  motionToggle.textContent = isReduced ? "Enable Animations" : "Disable Animations";
  console.log('Button text:', motionToggle.textContent); //checking
});