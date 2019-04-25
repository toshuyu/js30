const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}
function updateIcon(){
    const icon = video.paused?'►':'❚ ❚';
    toggle.textContent = icon;
}
function skip(){
    video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateIcon);
video.addEventListener("paused", updateIcon);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(b=>{
    b.addEventListener("click", skip);
});
video.addEventListener("timeupdate", function(e){
    const c = this.currentTime;
    const tot = this.duration;
    progressBar.style.flexBasis = `${c/tot*100}%`;
});
ranges.forEach(function(r){
    r.addEventListener("input",function(e){
        if(this.name=="volume"){
            video.volume = this.value;
        } else if(this.name=="playbackRate"){
            video.playbackRate = this.value;
        }
    });
});
function adjustDuration(e){
    const c = e.offsetX;

    // dont use e.target or this here. since you might click on "running bar"
    // also can't use e.currentTarget together with throttle due to
    // https://stackoverflow.com/questions/26496176/when-logging-an-event-object-currenttarget-is-null-but-when-logging-event-curr
    const tot = progress.offsetWidth; 
    
    video.currentTime = c/tot*video.duration;
}
progress.addEventListener("click", adjustDuration);

let mouseDown = false;
progress.addEventListener("mousedown", (e)=>{mouseDown=true;});
progress.addEventListener("mousemove", throttle(function(e){
    if(!mouseDown) return;
    adjustDuration(e);
},25));

progress.addEventListener("mouseup", (e)=>{mouseDown=false;});
progress.addEventListener("mouseleave", (e)=>{mouseDown=false;});

function throttle(func, thres){
    var timer, last;
    return function(){
        var context = this, args = arguments, now = +new Date();
        if(last && now<last+thres){
            clearTimeout(timer);
            timer = setTimeout(function(){
                func.apply(context, args);
                last = now;
            });
        }else{
            func.apply(context, args);
            last = now;
        }
    };
}