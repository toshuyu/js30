const timeSelector = document.querySelectorAll(".timer__button");
const displayTimeLeft = document.querySelector(".display__time-left");
const displayTimeEnd = document.querySelector(".display__end-time");

let countdownTimer;

function countdown(seconds){
    const now = Date.now()/1000;
    const then = now + seconds;

    displayCountDown(seconds);
    clearTimeout(countdownTimer);
    showEndTime(then);

    countdownTimer = setInterval(function(){
        const remaining = Math.round((then - Date.now()/1000));
        displayCountDown(remaining);
        if(remaining<=0){
            clearTimeout(countdownTimer);
        }
    },1000);
}

function displayCountDown(seconds){
    const formatM = Math.floor(seconds/60);
    const fotmatS = (seconds%60)<10?`0${(seconds%60)}`:(seconds%60);
    displayTimeLeft.textContent = `${formatM}:${fotmatS}`;
}

function showEndTime(end){
    const endTime = new Date(end*1000);
    let formatM = endTime.getHours();
    let formatS = endTime.getMinutes();
    formatS = formatS<10 ? `0${formatS}` : formatS;
    displayTimeEnd.textContent = `Be Back At ${formatM}:${formatS}`;
}

timeSelector.forEach(t=>{
    t.addEventListener("click", function(){
        countdown(parseFloat(this.dataset.time));
    });
});

document.customForm.addEventListener("submit", function(e){
    e.preventDefault();
    countdown(parseFloat(this.minutes.value)*60);
    this.reset();
});