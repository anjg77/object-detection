img =" ";
status=" ";
objects=[];
function preload(){
    img=loadImage("bg.jpg");
}
function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();   
}
function start(){
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}
function modelLoaded(){
    console.log("Model loaded");
    status="true";
}
function draw(){
    image(video, 0, 0, 380, 380);
    r=floor(random(255));
    g=floor(random(255));
    b=floor(random(255));
    if (status!=" "){
        object_detector.detect(video, gotResult);
        for (i=0; i<objects.length; i++ ){
            document.getElementById("status").innerHTML="Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML="No. of objects detected are "+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}