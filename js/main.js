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
