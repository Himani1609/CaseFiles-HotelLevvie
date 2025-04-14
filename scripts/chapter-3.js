// const chapter3Content = document.getElementById("chapter-3-content");
const chapter3Solve = document.getElementById("chapter-3-solve");
const full_chapter = document.getElementById("Chapter-3-solve");
const correct_audio = document.getElementById("correct-audio");

// // Display the Listening content for chapter
// function displayListenContent() {
//   chapter3Content.classList.add("center-card");;
//   chapter3Solve.style.display = "none";
// }

// function displaychapter3Solve() {
 
// }

const isSolved = JSON.parse(localStorage.getItem('Correct_chapter_3'));

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
    document.getElementById(tabChosen).style.display = "flex";
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

// const correct_chapter_3 = JSON.parse(localStorage.getItem('chapter-3'));
// const correct_chapter_2 = JSON.parse(localStorage.getItem('Chapter-2'));
const correct_chapter_3 = JSON.parse(localStorage.getItem('Chapter-3'));

const correct = JSON.parse(localStorage.getItem('Correct_chapter_1'));
const correct2 = JSON.parse(localStorage.getItem('Correct_chapter_2'));
const correct3 = JSON.parse(localStorage.getItem('Correct_chapter_3'));

reset.onclick = function() {
  window.location.reload();
}

let currentAnswerIndex = 0;
const maxAnswers = 3;

let list_of_element = [];
function doubleclickhandler(ev){
  ev.preventDefault();

  if (list_of_element.includes(ev.target.id)) {
    console.log("Already placed.");
    return;
  }

  // Find the first available answer box
  let placed = false;
  for (let i = 1; i <= maxAnswers; i++) {
    const targetBox = document.getElementById(`ans${i}`);
    
    // If the answer box is empty (has no img)
    if (targetBox && targetBox.children.length === 0) {
      targetBox.appendChild(ev.target);
      list_of_element.push(ev.target.id);
      console.log(`Transferred image ${ev.target.id} to answer container ans${i}`);
      placed = true;
      togglestatus(); 
      break;
    }
  }

  if (!placed) {
    console.log("All answer containers are full.");
  }
}


function dragstartHandler(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  console.log("drag start", ev.target.id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const targetElement = ev.target;

  if (
    targetElement &&
    (targetElement.id === "div1" ||
      targetElement.id === "div2" ||
      targetElement.id === "div3" ||
      targetElement.id === "div4" ||
      targetElement.id === "div5" ||
      targetElement.id === "div6" ||
      targetElement.id === "div7" ||
      targetElement.id === "div8" ||
      targetElement.id === "div9" ||
      targetElement.id === "ans1" ||
      targetElement.id === "ans2" ||
      targetElement.id === "ans3")
  ) {
    const droppedElement = document.getElementById(data);
    targetElement.appendChild(droppedElement);
    console.log("Dropped element: ", droppedElement.id);

    if (
      targetElement.id === "ans1" ||
      targetElement.id === "ans2" ||
      targetElement.id === "ans3"
    ) {
      if (!list_of_element.includes(droppedElement.id)) {
        list_of_element.push(droppedElement.id);
        console.log(list_of_element);
        togglestatus();

        currentAnswerIndex = document.querySelectorAll(".answer_box img").length;
      }
    } else {
      const index = list_of_element.indexOf(droppedElement.id);
      if (index !== -1) {
        list_of_element.splice(index, 1);
        console.log(list_of_element);
        togglestatus();


        currentAnswerIndex = document.querySelectorAll(".answer_box img").length;
      }
    }
  }
}


function togglestatus() {
  
  const allCards = document.querySelectorAll("#fragment_list .fragment");
  const allAnswerCards = document.querySelectorAll("#answer_container .fragment");

  if (list_of_element.length >= 3) {
    allCards.forEach(card => card.setAttribute("draggable", "false"));
    allCards.forEach(card => card.setAttribute("ondblclick", ""));
  } else {
    allCards.forEach(card => card.setAttribute("draggable", "true"));
    allCards.forEach(card => card.setAttribute("ondblclick", "doubleclickhandler(event)"));
  }

  if (list_of_element.length >= 3) {
    allAnswerCards.forEach(card => card.setAttribute("ondblclick", ""));
  } else {
    allAnswerCards.forEach(card => card.setAttribute("ondblclick", "doubleclickhandler(event)"));
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

  console.log("Correct chapter 3:", correct_chapter_3);
  console.log("Current List:", submitted_ids);

  let isCorrect = [true, true, true];
  let flag = true;

  if (submitted_ids.length !== correct_chapter_3.length) {
    isCorrect = [false, false, false];
   error.innerHTML = "You need to select 3 fragment pieces";
  } else {
    error.innerHTML = "";
    for (let i = 0; i < correct_chapter_3.length; i++) {
      if (submitted_ids[i] === correct_chapter_3[i]) {
        isCorrect[i] = true;
      } else if (correct_chapter_3.includes(submitted_ids[i])) {
        
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
    localStorage.setItem("Correct_chapter_3",  JSON.stringify(true));
  }
}

if(correct3){
  chapter3Solve.style.display = "none";
  full_chapter.innerHTML = "<h1 class='text-center text-white'>You have Solved The Chapter - 3</h1>";
  correct_audio.style.display = "block";

}

if(correct && correct2 && correct3){
  window.location.href("./chapter-solve.html")
}