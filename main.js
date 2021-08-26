song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0; 

ScoreLeftWrist =  0;
ScoreRightWrist = 0;

song1_status = "";
song2_status = "";


function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    canvas.position(400,250);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose", gotposes);
}

function modelLoaded()
{
    console.log("Posenet is on!");
}

function gotposes(results)
{
    if (results.length > 0)
    {
        console.log(results);
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("ScoreLeftWrist = " + ScoreLeftWrist + "ScoreRightWrist = " + ScoreRightWrist);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftx = " + leftWristX + "lefty = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightx = " + rightWristX + "righty = " + rightWristY);
    }
}

function preload()
{
    song1 = loadSound("music2.mp3");    
    song2 = loadSound("music.mp3");
}

function draw()
{
    image(video, 0,0,600,500);


	fill("#FF0000");
	stroke("#FF0000");

    
    song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		song1.stop();

		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
		}
	}

    
}
