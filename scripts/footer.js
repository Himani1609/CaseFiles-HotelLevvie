// Get the header element
const footer = document.getElementById("footer");
function getFooter() {
  // Create element
  const element = document.createElement("div");
  // Set the element
  element.innerHTML = `
  <div class="container-fluid bg-light p-2">
    <a class="navbar-brand" href="#">
      © copyright 2025
    </a>
  </div>`;
  // Append it to the parent
  footer.appendChild(element);
}

// Call the function
getFooter();
