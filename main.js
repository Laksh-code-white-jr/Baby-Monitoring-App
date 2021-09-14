status="";
object=[];
accuracy="";
alarm="";
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    camera=createCapture(VIDEO);
    camera.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelLoaded(){
    console.log("COCOSSD Has Successfully Loaded!");
    status=true;
}
function preload(){
alarm=loadSound("mixkit-space-shooter-alarm-1002.wav");
}
function draw(){
image(camera,0,0,500,500);
if (status!=""){
    objectDetector.detect(camera,gotresult);
    for (var l=0;l<object.length;l++){
        document.getElementById("status").innerHTML="Status : Object Detected";
        fill("#FF0000");
        accuracy = floor(object[l].confidence * 100);
        text(object[l].label + " "+ accuracy+ "%",object[l].x + 15,object[l].y + 15);
        noFill();
stroke("#FF0000");
rect(object[l].x,object[l].y,object[l].width,object[l].height);
if  (object[l].label=="person"){
    document.getElementById("found").innerHTML="Baby Found";
    alarm.stop();
}
else {
    document.getElementById("found").innerHTML="Baby Not Found";
    alarm.play();
}
if (object.length==0){
    document.getElementById("found").innerHTML="Baby Not Found";
    alarm.play();
}
    }
}
}
function gotresult(error,results){
if (error){
    console.error(error);
}
else {
    console.log(results);
object=results;
}
}