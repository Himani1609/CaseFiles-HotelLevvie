const header = document.getElementById("header");

function getNavigation() {
  const title = document.createElement("h1");
  title.id = "case-title"; 
  title.textContent = "CASE FILES";
  header.appendChild(title);
}

getNavigation();


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