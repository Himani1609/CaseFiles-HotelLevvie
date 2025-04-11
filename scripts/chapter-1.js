// const chapter1Content = document.getElementById("chapter-1-content");
const chapter1Solve = document.getElementById("chapter-1-solve");

// // Display the Listening content for chapter
// function displayListenContent() {
//   chapter1Content.classList.add("center-card");;
//   chapter1Solve.style.display = "none";
// }

// function displayChapter1Solve() {
 
// }

const isSolved = JSON.parse(localStorage.getItem('Correct_Chapter_1'));

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

// CHAPTER
const check = document.getElementById("check");
const reset = document.getElementById("reset");
const error = document.getElementById("error_text");

const correct_chapter_1 = JSON.parse(localStorage.getItem('Chapter-1'));
// const correct_chapter_2 = JSON.parse(localStorage.getItem('Chapter-2'));
// const correct_chapter_3 = JSON.parse(localStorage.getItem('Chapter-3'));

reset.onclick = function() {
  window.location.reload();
}

function dragstartHandler(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  console.log("drag start", ev.target.id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
}

let list_of_element = [];
function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const targetElement = ev.target;

  if (targetElement && (targetElement.id === "div2" || targetElement.id === "ans1" || targetElement.id === "ans2" || targetElement.id === "ans3")) {
    const droppedElement = targetElement.appendChild(document.getElementById(data));
    console.log("Dropped element: ", droppedElement.id);
    

    if (targetElement.id === "ans1" || targetElement.id === "ans2" || targetElement.id === "ans3") {

      if (!list_of_element.includes(droppedElement.id)) {
        list_of_element.push(droppedElement.id); 
        console.log(list_of_element);
        togglestatus(); 
      }
    } else {
      const index = list_of_element.indexOf(droppedElement.id);
      if (index !== -1) {
        list_of_element.splice(index, 1); 
        console.log(list_of_element); 
        togglestatus(); 
      }
    }
  }
}

function togglestatus() {
  
  const allCards = document.querySelectorAll("#div2 .fragment");
  if (list_of_element.length >= 3) {
    allCards.forEach(card => card.setAttribute("draggable", "false"));
  } else {
    allCards.forEach(card => card.setAttribute("draggable", "true"));
  }
}

check.onclick = function() {
  const answer_containers = document.getElementsByClassName("answer");
  const placement = document.getElementById("placement");

    const submitted_elements = document.querySelectorAll(".answer_box img");

    const submitted_ids = [];
    
    submitted_elements.forEach((img) => {
      submitted_ids.push(img.id);
    });

  console.log("Correct Chapter 1:", correct_chapter_1);
  console.log("Current List:", submitted_ids);

  let isCorrect = [true, true, true];
  let flag = true;

  if (submitted_ids.length !== correct_chapter_1.length) {
    isCorrect = [false, false, false];
    error.innerHTML = "You need to select 3 fragment pieces";
  } else {
    for (let i = 0; i < correct_chapter_1.length; i++) {
      if (submitted_ids[i] === correct_chapter_1[i]) {
        isCorrect[i] = true;
      } else if (correct_chapter_1.includes(submitted_ids[i])) {
        
        isCorrect[i] = "replace"; 
      } else {
        isCorrect[i] = false; 
      }
    }
  }

  for (let i = 0; i < isCorrect.length; i++) {
    const correctDiv = answer_containers[i].querySelector(".correct");
    const incorrectDiv = answer_containers[i].querySelector(".incorrect");
    const replaceDiv = answer_containers[i].querySelector(".replace");
    

    if (isCorrect[i] === true) {
      correctDiv.style.display = "block";
      incorrectDiv.style.display = "none"; 
      replaceDiv.style.display = "none"; 
    } else if (isCorrect[i] === false) {
      correctDiv.style.display = "none";
      incorrectDiv.style.display = "block";
      replaceDiv.style.display = "none";
      flag = false;
    } else if (isCorrect[i] === "replace") {
      correctDiv.style.display = "none";
      incorrectDiv.style.display = "none";
      replaceDiv.style.display = "block";
      flag = false;
    }
  }

  if(flag){
    localStorage.setItem("Correct_Chapter_1",  JSON.stringify(true));
  }
}

// window.onload = ()=>{
//   if(isSolved){
//     chapter1Solve.style.display = "none";
//   }
  
// }