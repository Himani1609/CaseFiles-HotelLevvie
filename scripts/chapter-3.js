// const chapter3Content = document.getElementById("chapter-3-content");
const chapter3Solve = document.getElementById("chapter-3-solve");
const full_chapter = document.getElementById("chapter-3-solve");
const full_content = document.getElementById("Chapter-3-content");
const tab_btns = document.getElementById("tab");
const correct_audio = document.getElementById("correct-audio");
const frag_list = document.getElementById("fragment_list");
const solve_ready = document.getElementById("chapter_solve_ready");


// // Display the Listening content for chapter
// function displayListenContent() {
//   chapter3Content.classList.add("center-card");;
//   chapter3Solve.style.display = "none";
// }

// function displaychapter3Solve() {
 
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

// const correct_chapter_1 = JSON.parse(localStorage.getItem('Chapter-1'));
// const correct_chapter_2 = JSON.parse(localStorage.getItem('Chapter-2'));
const correct_chapter_3 = JSON.parse(localStorage.getItem('Chapter-3'));

const correct = JSON.parse(localStorage.getItem('Correct_Chapter_1'));
const correct2 = JSON.parse(localStorage.getItem('Correct_Chapter_2'));
const correct3 = JSON.parse(localStorage.getItem('Correct_Chapter_3'));


let currentAnswerIndex = 0;
const maxAnswers = 3;

let list_of_element = [];
function doubleclickhandler(ev) {
  ev.preventDefault();

  const imageId = ev.target.id;

  // If the image is already placed in an answer box
  if (list_of_element.includes(imageId)) {
    // Move it back to first available empty fragment container
    for (let i = 1; i <= 9; i++) {
      const fragBox = document.getElementById(`div${i}`);
      if (fragBox.children.length === 0) {
        fragBox.appendChild(ev.target);

        // Remove from placed list
        const index = list_of_element.indexOf(imageId);
        if (index !== -1) list_of_element.splice(index, 1);

        togglestatus();
        console.log(`Returned ${imageId} to fragment area`);
        return;
      }
    }

    console.log("No empty fragment containers available.");
    return;
  }


  for (let i = 1; i <= maxAnswers; i++) {
    const targetBox = document.getElementById(`ans${i}`);
    if (targetBox.children.length === 0) {
      targetBox.appendChild(ev.target);
      list_of_element.push(imageId);
      togglestatus();
      console.log(`Moved ${imageId} to answer box ans${i}`);
      return;
    }
  }

  console.log("All answer containers are full.");
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
  // const droppedElement = document.getElementById(data);
  const targetElement = ev.target;


  // let dropTarget = targetElement;
  // if (targetElement.tagName === "IMG") {
  //   dropTarget = targetElement.parentElement;
  // }

  // if (dropTarget && dropTarget.classList.contains("frag_holder")) {

  //   dropTarget.classList.remove("empty");

  //   const parentHolder = droppedElement.parentElement;
  //   if (parentHolder.classList.contains("frag_holder")) {
  //     parentHolder.classList.add("empty"); 
  //   }

  //   dropTarget.appendChild(droppedElement);
  // }


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

  // if (list_of_element.length >= 3) {
  //   allAnswerCards.forEach(card => card.setAttribute("ondblclick", ""));
  // } else {
  //   allAnswerCards.forEach(card => card.setAttribute("ondblclick", "doubleclickhandler(event)"));
  // }
}

function randomiser(){
  const fragment_map = {
    0: '<div class="frag_holder" id="div1" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/c1-fragment1.png" alt="" class="fragment chapter-1" id="c1-f1" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>',
    1: '<div class="frag_holder" id="div2" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/c1-fragment2.png" alt="" class="fragment chapter-1" id="c1-f2" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>',
    2: '<div class="frag_holder" id="div3" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/c1-fragment3.png" alt="" class="fragment chapter-1" id="c1-f3" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>',
    3: '<div class="frag_holder" id="div4" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/c2-fragment1.png" alt="" class="fragment chapter-2" id="c2-f1" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>',
    4: '<div class="frag_holder" id="div5" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/c2-fragment2.png" alt="" class="fragment chapter-2" id="c2-f2" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>',
    5: '<div class="frag_holder" id="div6" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/c2-fragment3.png" alt="" class="fragment chapter-2" id="c2-f3" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>',
    6: '<div class="frag_holder" id="div7" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/c3-fragment1.png" alt="" class="fragment chapter-3" id="c3-f1" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>',
    7: '<div class="frag_holder" id="div8" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/c3-fragment2.png" alt="" class="fragment chapter-3" id="c3-f2" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>',
    8: '<div class="frag_holder" id="div9" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/c3-fragment3.png" alt="" class="fragment chapter-3" id="c3-f3" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>'
  }

  const keys = Object.keys(fragment_map);

  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }

  keys.forEach(key => {
    frag_list.innerHTML += fragment_map[key];
  });


}
const submitted_ids = [];

check.onclick = function() {
  submitted_ids.length = 0; 
  const answer_containers = document.getElementsByClassName("answer");
  const placement = document.getElementById("placement");

    const submitted_elements = document.querySelectorAll(".answer_box img");
    
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
    localStorage.setItem("Correct_Chapter_3",  JSON.stringify(true));
    const reload_true = JSON.parse(localStorage.getItem('Correct_Chapter_3'));
    if (reload_true) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }


}

if(correct3){
  tab_btns.style.display = "none";
  full_content.style.display = "none";
  full_chapter.style.display = "none";
  correct_audio.style.display = "block";
}

if(correct && correct2 && correct3){
 solve_ready.style.display = "flex";
}


reset.onclick = function() {
  frag_list.innerHTML = "";
  randomiser();
  // while(submitted_ids.length){
  //   submitted_ids.pop();
  // }
  submitted_ids.length = 0;
  for (let i = 1; i <= maxAnswers; i++) {
    const targetBox = document.getElementById(`ans${i}`);
    while(targetBox.children.length){
      targetBox.innerHTML="";
    }
  }
  list_of_element.length = 0;

}

window.onload = () => {
  randomiser();
}