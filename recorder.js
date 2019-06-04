navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream => {handlerFunction(stream)});

function handlerFunction(stream) {
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
        audioChunks.push(e.data);
        if (rec.state == "inactive"){
            let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
            var recordedAudio = document.querySelector('#recordedAudio');
            recordedAudio.src = URL.createObjectURL(blob);
            video = URL.createObjectURL(blob);
            window.location.href = (video);
            setItem(video.split('/')[3]);
            recordedAudio.controls=true;
            recordedAudio.autoplay=true;
            sendData(blob)
        }
    }
}
function sendData(data) {}


function start() {
    var record = document.querySelector('#record');
    console.log('I was clicked')
    record.disabled = true;
    record.style.backgroundColor = "blue"
    stopRecord.disabled=false;
    audioChunks = [];
    rec.start();
}

function stop() {

    var stopRecord = document.querySelector('#stopRecord');

    console.log("I was clicked");
    record.disabled = false;
    stop.disabled=true;
    record.style.backgroundColor = "red";
    rec.stop();

}

function setItem(audio){

    var aud = new Array();
    var audios = getItem();

    if(audios != null) {

        for (var i = 0; i < audios.length; i++)
        {
            aud.push(audios[i]);
        }
    }

    aud.push(audio);
    localStorage.setItem('audio', JSON.stringify(aud));

}


function getItem() {
    return JSON.parse(localStorage.getItem('audio'));
}

function stopRecording() {

    var stopRecord = document.querySelector('#stopRecord');

    console.log("I was clicked");
    record.disabled = false;
    stop.disabled=true;
    record.style.backgroundColor = "red";
    rec.stop();
}