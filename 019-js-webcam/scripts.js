const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
let toGray = false;

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(localMediaStream => {
        //console.log(localMediaStream);
        
        if ("srcObject" in video) {
            video.srcObject = localMediaStream;
        } else {
            // legacy
            video.src = window.URL.createObjectURL(localMediaStream);
        }
        video.play();
    })
    .catch(err=>{
        console.err("Error! ", err);
    });
}

function paintToCanvas(){
    const w = video.videoWidth;
    const h = video.videoHeight;
    canvas.width = w;
    canvas.height = h;

    return setInterval(function(){
        //ctx.globalAlpha = 0.5;
        
        // mirror x axis
        ctx.setTransform(-1,0,0,1, w, 0);
        ctx.drawImage(video, 0, 0, w, h);
        let pixels = ctx.getImageData(0,0,w,h);

        if(toGray){
            pixels = toGrayScale(pixels);
        }

        ctx.putImageData(pixels, 0, 0);
    }, 25);
}

function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL("image/jpeg");
    const a = document.createElement('a');
    
    a.href = data;
    a.setAttribute("download", "photo");
    a.innerHTML = `<img src="${data}"/>`;
    //strip.appendChild(a);
    strip.insertBefore(a, strip.firstChild);
}

getVideo();

video.addEventListener("canplay",function(){
    paintToCanvas();
});

function toGrayScale(p){
    var gray;
    for(var i=0; i<p.data.length; i+=4) {
        gray=(p.data[i]+p.data[i+1]+p.data[i+2])/3;
        p.data[i + 0] = gray;
        p.data[i + 1] = gray;
        p.data[i + 2] = gray;
    }
    return p;
}
function toggleGrayScale(){
    toGray = !toGray;
}