"use strict";

const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

const cardnumbers = numbers.length;

let cards = null;

let play = true;
let firstcard = null;
let secondcard = null;
let matchedcount = 0;

function createcards(){
    const gamepy = document.querySelector('.game-py');
    for (let i = 0; i < cardnumbers; i++){
        const card = document.createElement('div');
        card.classList.add('game-card');

        gamepy.appendChild(card);
    }
    cards = document.querySelectorAll('.game-card');
}

function shufflenumbers(){
    for (let i = cardnumbers -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    cards.forEach((card, i) => {
        card.textContent = numbers[i]
    });
}

function flipcard(){
    cards.forEach(card => {
        card.addEventListener('click', function(){
            if(play){
                if(!this.classList.contains('show')){
                    this.classList.add('show');
                    if(!firstcard){
                        firstcard = this;
                    }else{
                        secondcard = this;
                        play = false;
                        matchcards();
                    }
                }
            }
        });
    });
}

function matchcards(){
    if(firstcard.textContent === secondcard.textContent){
        matchedcount += 1;
        if(matchedcount === cardnumbers / 2){
            setTimeout(() => {
                cards.forEach(card => {
                    card.classList.remove('show');
                });
                shufflenumbers();
                matchedcount = 0;
                readytoflip();
            }, 3000);
        }else{
            readytoflip();
        }
    }else{
        setTimeout(() => {
            firstcard.classList.remove('show');
            secondcard.classList.remove('show');
            readytoflip();
        }, 1500);
    }
}

function readytoflip(){
    firstcard = null;
    secondcard = null;
    play = true;
}

document.addEventListener('DOMContentLoaded', (event) =>{
    createcards();
    shufflenumbers();
    flipcard();
    startTimer();
});

let timer = null;
let seconds = 0;

function updateTimer(){
    seconds++;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `経過時間: ${seconds}秒`;
}

function startTimer(){
    if (timer === null){
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer(){
    if (timer !== null){
        clearInterval(timer);
        timer = null;
    }
}

function matchcards(){
    if (firstcard.textContent === secondcard.textContent){
        matchedcount += 1;
        if (matchedcount === cardnumbers / 2){
            stopTimer();
            seconds = 0;
            setTimeout(() =>{
                cards.forEach(card =>{
                    card.classList.remove('show');
                });
                shufflenumbers();
                matchedcount = 0;
                readytoflip();
                startTimer();
            }, 3000);
        }else{
            readytoflip();
        }
    }else{
        setTimeout(() =>{
            firstcard.classList.remove('show');
            secondcard.classList.remove('show');
            readytoflip();
        }, 1500);
    }
}