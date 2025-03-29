let music;
let mainControl, stopControl, songTime;
let processYet, voidProcessYet;
let currentTime,duration;
window.onload=function(){
    mainControl = document.querySelector("#mainControl");
    stopControl = document.querySelector("#stopControl");
    songTime = document.querySelector("#songTime");
    music = document.querySelector("#myMusic");
    processYet = document.querySelector("#processYet");
    voidProcessYet = document.querySelector("#voidProcessYet");
}

function playAudio() {
    if(window.HTMLAudioElement){
        let mainControl = document.querySelector ("#mainControl");
        let stopCotrol = document.querySelector ("#stopControl");
        songTime=document.querySelector("#songTime");

        music = document.querySelector ("#myMusic");
        music.play();
        //切换按钮
        mainControl.style.display = "none";
        stopCotrol.style.display = "block";
        //实时更新
        music.addEventListener("timeupdate",function(){
            let currentTime = music.currentTime;
            let duration = music.duration;
            // let processWidth = document.querySelector("#process").style.width;
            let percentwidth=getWidth("#process");
            document.querySelector("#processYet").style.width = (currentTime/duration)*percentwidth+"px";
            // console.log(processWidth);
            songTime.innerHTML=timeDispose(music.currentTime)+"&nbsp;|&nbsp;"+timeDispose(music.duration);
        })
    }
}                                                                          

function getWidth(domName){
    let width = document.querySelector(domName).style.width;
    let widthint = width.split("px")[0];
    // console.log(widthint);
    return widthint;
}

//手动拖动音乐
function audioProcess(e){
    let duration = music.duration;
    let processWidth = getWidth("#process");
    //求进度条的长度
    let processYet = document.querySelector("#processYet");
    let processYetWidth =event.clientX-processYet.getBoundingClientRect().x;
    // console.log(processYetWidth);
    processYet.style.width = processYetWidth+"px";
    music.currentTime = (processYetWidth/processWidth)*duration;
}

function voidProcess(){
    let voidprocessWidth = getWidth("#voidProcess");
    //求进度条的长度
    let voidProcessYet = document.querySelector("#voidProcessYet");
    let voidProcessYetWidth =event.clientX-voidProcessYet.getBoundingClientRect().x;
    voidProcessYet.style.width = voidProcessYetWidth+"px";
    music.volume = voidProcessYetWidth/voidprocessWidth;
}


//音乐暂停
function pauseAudio() {
    if(window.HTMLAudioElement){
        music.pause();
        //切换按钮
        mainControl.style.display = "block";
        stopControl.style.display = "none";
    }
}

//音量控制
// 静音功能
function voiceEmp() {
    if(window.HTMLAudioElement){
        let vEmp=document.querySelector(".voiceEmp");
        music.volume = 0;
    }
}

// 最大音量功能
function voiceFull() {
    if(window.HTMLAudioElement){
        let vEmp=document.querySelector(".voiceFull");
        music.volume = 1;
    }
}

//快进
function forwardAudio() {
    if(window.HTMLAudioElement){
        music.currentTime += 10;
    }
}

//快退
function rewindAudio() {
    if(window.HTMLAudioElement){
        music.currentTime -= 10;
    }
}

//处理时间
function timeDispose(time){
    let timeText;
    let mm=parseInt(time/60);
    let ss=parseInt(time%60);
    mm=mm<10?"0"+mm:mm;
    ss=ss<10?"0"+ss:ss;
    timeText=mm+":"+ss;
    return timeText;
}

