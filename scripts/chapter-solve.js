// const chapter3Content = document.getElementById("chapter-3-content");
const Full_chapter = document.getElementById("Full-chapter-content");
const chapter_solve = document.getElementById("Full-chapter-solve");
const chapter_list = document.getElementById("chapter_list");

const tab_btns = document.getElementById("tab");
const correct_audio = document.getElementById("correct-audio");
const solve_ready = document.getElementById("chapter_solve_ready");

// // Display the Listening content for chapter
// function displayListenContent() {
//   chapter3Content.classList.add("center-card");;
//   chapter3Solve.style.display = "none";
// }

// function displaychapter3Solve() {
 
// }

const fullChapter1 = document.getElementById("full-chapter-1-audio");
const fullChapter2 = document.getElementById("full-chapter-2-audio");
const fullChapter3 = document.getElementById("full-chapter-3-audio");
const chapter1Img = document.getElementById("chapter-1-img");
const chapter2Img = document.getElementById("chapter-2-img");
const chapter3Img = document.getElementById("chapter-3-img");

// function openTab(event, tabChosen) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace("active", "");
//     }
//     document.getElementById(tabChosen).style.display = "block";
//     event.currentTarget.className += "active";
// }


function openTab(event, tabChosen) {
  // Hide all tab content
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove active class from buttons
  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show selected tab and mark active
  document.getElementById(tabChosen).style.display = "block";
  event.currentTarget.classList.add("active");

  // Reset audio players and hide them
  [fullChapter1, fullChapter2, fullChapter3].forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
    audio.style.display = "none";
  });

  // Remove borders from all chapter images
  [chapter1Img, chapter2Img, chapter3Img].forEach(img => {
    img.style.border = "none";
    img.style.padding = "0"; 
  });
}


function turnOnAudio(chapterNumber){
  if(chapterNumber==='chapter-1'){
    // turn on the chapter 1
    fullChapter1.style.display = "block";
    chapter1Img.style.border = "4px dashed  #5e1818"; 
    chapter1Img.style.padding = "10px";
    
    // turn off other chapters and audios
    fullChapter2.pause();
    fullChapter2.currentTime = 0;
    fullChapter2.style.display = "none";
    chapter2Img.style.border = "none";

    fullChapter3.pause();
    fullChapter3.currentTime = 0;
    fullChapter3.style.display = "none";
    chapter3Img.style.border = "none";

  }
  else if(chapterNumber==='chapter-2'){
    // turn on the chapter 2
    fullChapter2.style.display = "block";
    chapter2Img.style.border = "4px dashed  #5e1818";
    chapter2Img.style.padding = "10px";


    // turn off other chapters and audios
    fullChapter1.pause();
    fullChapter1.currentTime = 0;
    fullChapter1.style.display = "none";
    chapter1Img.style.border = "none";

    fullChapter3.pause();
    fullChapter3.currentTime = 0;
    fullChapter3.style.display = "none";
    chapter3Img.style.border = "none";

  }
  
  else if(chapterNumber==='chapter-3'){
    // turn on the chapter 3
    fullChapter3.style.display = "block";
    chapter3Img.style.border = "4px dashed  #5e1818"; 
    chapter3Img.style.padding = "10px";

    // turn off other chapters and audios
    fullChapter1.pause();
    fullChapter1.currentTime = 0;
    fullChapter1.style.display = "none";
    chapter1Img.style.border = "none";

    fullChapter2.pause();
    fullChapter2.currentTime = 0;
    fullChapter2.style.display = "none";
    chapter2Img.style.border = "none";

  }
}

// CHAPTER
const check = document.getElementById("check");
const reset = document.getElementById("reset");
const error = document.getElementById("error_text");

const correct_chapters = JSON.parse(localStorage.getItem('Chapter-solution'));
const correct_chap = JSON.parse(localStorage.getItem('correct_chapters'));

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
    for (let i = 1; i <= 3; i++) {
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
  const targetElement = ev.target;

  if (
    targetElement &&
    (targetElement.id === "div1" ||
      targetElement.id === "div2" ||
      targetElement.id === "div3" ||
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
    0: '<div class="frag_holder" id="div1" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/chapter1.png" alt="" class="full-chapter-1" id="c1" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>',
    1: '<div class="frag_holder" id="div2" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/chapter2.png" alt="" class="full-chapter-2" id="c2" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>',
    2: '<div class="frag_holder" id="div3" ondrop="dropHandler(event)"   ondragover="dragoverHandler(event)"> <img src="./images/chapter3.png" alt="" class="full-chapter-3" id="c3" draggable="true" ondblclick="doubleclickhandler(event)" ondragstart="dragstartHandler(event)" width="300" height="200"> </div>'
  }

  const keys = Object.keys(fragment_map);

  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }

  keys.forEach(key => {
    chapter_list.innerHTML += fragment_map[key];
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

  console.log("Correct Chapter 1:", correct_chapters);
  console.log("Current List:", submitted_ids);

  let isCorrect = [true, true, true];
  let flag = true;

  if (submitted_ids.length !== correct_chapters.length) {
    isCorrect = [false, false, false];
    error.innerHTML = "You need to select 3 fragment pieces";
  } else {
    error.innerHTML = "";
    for (let i = 0; i < correct_chapters.length; i++) {
      if (submitted_ids[i] === correct_chapters[i]) {
        isCorrect[i] = true;
      } else if (correct_chapters.includes(submitted_ids[i])) {
        
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
    localStorage.setItem("correct_chapters",  JSON.stringify(true));
    const reload_true = JSON.parse(localStorage.getItem('correct_chapters'));
    if (reload_true) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
}


if(correct_chap){
  tab_btns.style.display = "none";
  Full_chapter.style.display = "none";
  chapter_solve.style.display = "none";
  correct_audio.style.display = "block";
}

if(correct && correct2 && correct3 && correct_chap){
  solve_ready.style.display = "flex";
 }
 

reset.onclick = function() {
  chapter_list.innerHTML = "";
  randomiser();
  // while(   .length){
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

