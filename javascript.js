var playing=false;
var score=0;
var time;
var action;
var correctans;
//if we click on click on button
document.getElementById("button").onclick=function(){
    //if game is running
    if(playing){
        //reload the page
        location.reload();
        playing=false;
        
    }
    //if game is not running
    else{
        //change mode to play
        playing=true;
        // set score to 0
        score=0;
        document.getElementById("scorevalue").innerHTML=score;
        //show countdown box
        document.getElementById("time").style.display="block";
        //change button text to reset
        document.getElementById("button").innerHTML="Reset Game";
        //reduce by 1s in loops
        //time left?
            //no -> show game over box
            //yes -> continue
        time=60;
        //hide the gameover box
        document.getElementById("timeremaining").innerHTML="60 sec";
        hide("gameover");
        startcountdown();
        //Generate new questions and answer
        generateQA();
    }
}

clickbox("option1");
clickbox("option2");
clickbox("option3");
clickbox("option4");
        


//if we click on answer box
    //Are we playing
        //no -> no action
        //yes
            //not correct -> show try again box for 1 sec
            //correct
                //increase score by 1
                //show correct box for 1sec
                //generate new Q&A


//functions
function startcountdown(){
    action = setInterval(function(){
        if(time==0){
                clearInterval(action);
//                document.getElementById("gameover").style.display="block";
                show("gameover");
                document.getElementById("gameover").innerHTML="<p>The game is over</p><p>Your final score is "+score+"</p>"
                hide("time");
                hide("correct");
                hide("wrong");
//                document.getElementById("time").style.display="none";
//                document.getElementById("correct").style.display="none";
//                document.getElementById("wrong").style.display="none";
                document.getElementById("button").innerHTML="Start game";
                playing=false;
            }
        --time;
            timeremaining.innerHTML=time+" sec";
        },1000)
}

function hide(x){
    document.getElementById(x).style.display="none";
}

function show(x){
    document.getElementById(x).style.display="block";
}

function generateQA(){
    var x = 1+Math.round(Math.random()*9);
    var y = 1+Math.round(Math.random()*9);
    correctans = x*y;
    document.getElementById("question").innerHTML=x+"x"+y;
    var index=1+Math.round(Math.random()*3);
    document.getElementById("option"+index).innerHTML=correctans;
    var answers=[correctans];
    for(i=1;i<=4;i++){
        var wrong=(1+Math.round(Math.random()*9))*(1+Math.round(Math.random()*9));
        while(answers.indexOf(wrong)>-1)
            wrong=(1+Math.round(Math.random()*9))*(1+Math.round(Math.random()*9));
        if(i!=index)
            document.getElementById("option"+i).innerHTML=wrong;
        answers.push(wrong);
    }
}

function clickbox(box){
    document.getElementById(box).onclick=function(){
    if(playing){
        var k=document.getElementById(box).innerHTML;
        if(k==correctans){
            score++;
            document.getElementById("scorevalue").innerHTML=score;
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            },1000)
            generateQA();
        }
        else{
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000)
        }
    }
}
}