// ===============================
// Elemente holen
// ===============================

const startScreen = document.getElementById("startScreen");
const gameSection = document.getElementById("gameSection");
const finishScreen = document.getElementById("finishScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const cards = document.querySelectorAll(".card");
const dropZones = document.querySelectorAll(".dropZone");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let draggedCard = null;
let solvedCards = 0;

const totalCards = cards.length;


// ===============================
// Start Button
// ===============================

startButton.addEventListener("click", () => {

    startScreen.classList.add("hidden");

    gameSection.classList.remove("hidden");

});


// ===============================
// Karten
// ===============================

cards.forEach(card => {

    card.addEventListener("dragstart", dragStart);

    card.addEventListener("dragend", dragEnd);

});


// ===============================
// Dropzonen
// ===============================

dropZones.forEach(zone => {

    zone.addEventListener("dragover", dragOver);

    zone.addEventListener("dragenter", dragEnter);

    zone.addEventListener("dragleave", dragLeave);

    zone.addEventListener("drop", dropCard);

});


// ===============================
// Drag Funktionen
// ===============================

function dragStart(e){

    draggedCard = this;

    this.classList.add("dragging");

}


function dragEnd(){

    this.classList.remove("dragging");

}


function dragOver(e){

    e.preventDefault();

}


function dragEnter(e){

    e.preventDefault();

    this.classList.add("hover");

}


function dragLeave(){

    this.classList.remove("hover");

}


// ===============================
// Ablegen
// ===============================

function dropCard(e){

    e.preventDefault();

    this.classList.remove("hover");

    if(!draggedCard) return;

    const correctCategory = this.dataset.category;

    const cardCategory = draggedCard.dataset.category;

    if(correctCategory === cardCategory){

        // Karte hinzufügen

        this.appendChild(draggedCard);

        draggedCard.classList.remove("wrong");

        draggedCard.classList.add("correct");

        draggedCard.setAttribute("draggable","false");

        draggedCard.removeEventListener("dragstart",dragStart);
        draggedCard.removeEventListener("dragend",dragEnd);

        solvedCards++;

        updateProgress();

    }

    else{

        draggedCard.classList.add("wrong");

        setTimeout(()=>{

            draggedCard.classList.remove("wrong");

        },500);

    }

}


// ===============================
// Fortschritt
// ===============================

function updateProgress(){

    progressBar.value = solvedCards;

    progressText.textContent = solvedCards + " / " + totalCards;

    if(solvedCards === totalCards){

        setTimeout(showFinishScreen,800);

    }

}


// ===============================
// Ende
// ===============================

function showFinishScreen(){

    gameSection.classList.add("hidden");

    finishScreen.classList.remove("hidden");

}


// ===============================
// Neustart
// ===============================

restartButton.addEventListener("click", resetGame);


function resetGame(){

    solvedCards = 0;

    progressBar.value = 0;

    progressText.textContent = "0 / " + totalCards;

    const container = document.getElementById("cardsContainer");

    cards.forEach(card=>{

        container.appendChild(card);

        card.classList.remove("correct");
        card.classList.remove("wrong");

        card.setAttribute("draggable","true");

        card.removeEventListener("dragstart",dragStart);
        card.removeEventListener("dragend",dragEnd);

        card.addEventListener("dragstart",dragStart);
        card.addEventListener("dragend",dragEnd);

    });

    finishScreen.classList.add("hidden");

    gameSection.classList.remove("hidden");

}