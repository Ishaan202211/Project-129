song1="";
song2="";
leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
scoreLeftWrist=0
song_play=""
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3")
}
function setup(){
    canvas=createCanvas(600,500)
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20)
        InNumberleftWristY=Number(leftWristY);
        remove_decimals=floor(InNumberleftWristY)
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume"+volume;
        song2.stop()
        song_play=song1.isPlaying()
        if(song1.isPlaying()=false){
            song1.play()
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log('Posenet is initialized');
}
function gotPoses(results){
    if(results.length>0){
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist="+scoreLeftWrist)
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWriostX="+leftWristX+"leftWristY="+leftWristY)
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWriostX="+rightWristX+"rightWristY="+rightWristY)
    }
}