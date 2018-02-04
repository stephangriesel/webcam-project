// Global variables
let width = 300,
    height = 0,
    filter = 'none',
    streaming = false;

// DOM elements;

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

// Get media stream
navigator.mediaDevices.getUserMedia({video:true,audio: false}
)
.then(function(stream) {
    // Link to video source
    video.srcObject = stream;
    // Play videp
    video.play();
})
.catch(function(err) {
    console.log(`Error: ${err}`);
})

// Play when ready 
video.addEventListener('canplay', function(e){
    if(!streaming){
        //set video canvas height
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        streaming = true;

    }
}, false);

photoButton.addEventListener('click', function(e){
    takePicture();

    e.preventDefault();

}, false);

function takePicture () {
    // Create canvas
    const context = canvas.getContext('2d');
    if(width && height) {
        // set canvas props
        canvas.width = width;
        canvas.height = height;
        // draw an image of the video on the canvas
        context.drawImage(video, 0, 0, width, height);


    }

}