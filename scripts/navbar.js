// const header = document.getElementById("header");

// function getNavigation() {
//   const title = document.createElement("h1");
//   title.id = "case-title"; 
//   title.textContent = "CASE FILES";
//   header.appendChild(title);
// }

// getNavigation();


// // Get the header element
// const header = document.getElementById("header");
// function getNavigation() {
//   // Create element
//   const navigation = document.createElement("nav");
//   // Set the element
//   navigation.innerHTML = `<nav class="navbar bg-light">
//   <div class="container-fluid">
//     <a class="navbar-brand" href="#">
//       Hotel Levvie
//     </a>
//   </div>
// </nav>`;
//   // Append it to the parent
//   header.appendChild(navigation);
// }

// // Call the function
// getNavigation();


const header = document.getElementById("header");

function getNavigation() {
  const navContainer = document.createElement("div");
  navContainer.classList.add("nav-container");

  // Left - Title
  const title = document.createElement("h1");
  title.id = "case-title";
  title.textContent = "CASE FILES";

  // Right - Navigation Links
  const navLinks = document.createElement("div");
  navLinks.id = "nav-links";

  const homeLink = document.createElement("a");
  homeLink.href = "#";
  homeLink.textContent = "HOME";

  const aboutLink = document.createElement("a");
  aboutLink.href = "#";
  aboutLink.textContent = "ABOUT";

  navLinks.appendChild(homeLink);
  navLinks.appendChild(aboutLink);

  // Append both to nav container
  navContainer.appendChild(title);
  navContainer.appendChild(navLinks);

  // Append to header
  header.appendChild(navContainer);
}

getNavigation();
