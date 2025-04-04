// const chapter1Content = document.getElementById("chapter-1-content");
// const chapter1Solve = document.getElementById("chapter-1-solve");

// // Display the Listening content for chapter
// function displayListenContent() {
//   chapter1Content.classList.add("center-card");;
//   chapter1Solve.style.display = "none";
// }

// function displayChapter1Solve() {
 
// }

const fragmentImages = [
  './images/TEST_ONLY.jpeg',
  './images/TEST_ONLY.jpeg',
  './images/TEST_ONLY.jpeg',
  './images/TEST_ONLY.jpeg',
  './images/TEST_ONLY.jpeg',
  './images/TEST_ONLY.jpeg',
]

function openTab(event, tabChosen) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabChosen).style.display = "block";
    event.currentTarget.className += " active";
}

function generateFragments(){
  for(let i=0; i<fragmentImages.length; i++){
    const element = document.getElementById(`fragment-card-${i+1}`)
    const img = document.createElement("img");
    img.setAttribute("src", fragmentImages[i]);
    element.appendChild(img);
  }
}

