// Variables
var askedQuestion=0; //current asked question on the screen
var rightAnswer =0; //count of right answers
var pickedAnswer; // selected choice
var secondsLeft = 160; //timer seconds
var intervalId; // second decrement
var answer = false; //if the answer is selected true or false, set false at the start
var isTimerRunning = false;

// elements
var startQuizBtn = document.getElementById("beginQuiz");
var timer = document.getElementById("clock");
var question = document.getElementById("question");
var results = document.getElementById("results");


//initials input
var initialsInput = document.createElement("initials");
// var form = document.createElement("form");
var initialsList = document.createElement("initialsList");
var scores = document.createElement("scores");

var initials = [];

function renderInitials() {
  // Clear initials element and update score
  initialsList.innerHTML = "";
  scores.textContent = initials.length;

  // Render a new li for each todo
  for (var i = 0; i < initials.length; i++) {
    var initials = initials[i];

    var li = document.createElement("li");
    li.textContent = initials;
    li.setAttribute("data-index", i);

    initialsList.appendChild(li);
  }
}





/////////////////////


// Question object consist of questions, options array, right answer, and gif
var questions = [
  {
    question: 'Which line will print "Hello World" ',
    options: [
      "All",
      "<html><head></head><body><h1>Hello World<h1></body></html>",
      "<html><head></head><body>Hello World</body></html>",
    ],
    answer: "All",
    gif: "assets/images/hello.gif",
  },
  {
    question:
      "The term ‘debugging’ was coined when programmer Admiral Grace Hopper had to remove a moth from a computer system",
    options: ["True", "False", "Myth"],
    answer: "Myth",
    gif: "assets/images/moth.gif",
  },
  {
    question: "What was the first computer game ever programmed?",
    options: ["Pacman", "Tennis for Two", "Tetris"],
    answer: "Tennis for Two",
    gif: "assets/images/tennis1.gif",
  },
  {
    question: "What is the most popular programming language in use today?",
    options: ["Java", "C#", "Pyhton"],
    answer: "Java",
    gif: "assets/images/java.gif",
  },
  {
    question: "Who was the first computer programmer ?",
    options: ["Ada Lovelace", "Charles Babbage", "Alan Turing"],
    answer: "Ada Lovelace",
    gif: "assets/images/ada.gif",
  },
  {
    question: "Who is the creator of Facebook?",
    options: ["Bill Gates", "Mark Zuckerberg", "Steve Jobs"],
    answer: "Mark Zuckerberg",
    gif: "assets/images/facebook.gif",
  },
  {
    question:
      "What is the average salary for a coder with more than six years experience?",
    options: ["$88,888", "$188,888", "$107,888"],
    answer: "$107,888",
    gif: "assets/images/dev.gif",
  },
  {
    question: "Which one is the html tag creates a heading on a webpage",
    options: ["br", "head", "h1"],
    answer: "h1",
    gif: "assets/images/heading.gif",
  },
];

// Start quiz when user clicks Start Quiz Button
$("#beginQuiz").on("click", function () {
  startQuizBtn.style.visibility = "hidden";
  startQuiz();
});

// start quiz function calls with start quiz button click , sets variablas and askes the questions
function startQuiz() {
  newQuestion();
}


function newQuestion() {
  answer = false;
  $("#question").empty();

  if (askedQuestion === questions.length) {
    // end asking questions
    endQuiz();

  } else {
    //start game

    $("#questionCount").text("Question Number " + (askedQuestion + 1) + " out of " + questions.length);
    $("#question").text(questions[askedQuestion].question);
    setTime();

    for (var i = 0; i < questions[askedQuestion].options.length; i++) {
      var answerList = $("<li>");
      answerList.text(questions[askedQuestion].options[i]);
      answerList.addClass("chooseAnswer");
      answerList.data("data-choiceValue", questions[askedQuestion].options[i]);
      $("#question").append(answerList);
    }

    $(".chooseAnswer").on("click", function () {
      pickedAnswer = $(this).data("data-choiceValue");
      console.log(pickedAnswer);
      answer = true;
      if (answer === true) {
        checkAnswer();
      }
    });
  }
}

function checkAnswer() {
  // if selected right answer add 1 point to the score
  if (pickedAnswer === questions[askedQuestion].answer && answer === true) {
    rightAnswer++;
    $("#question").empty();
    $("#question").html(
      'Right Answer! <br>  The answer was "' +
        questions[askedQuestion].answer +
        '".<br><br>'
    );
    displayGif();
  }
  // if selected wrong answer 
  else if (pickedAnswer != questions[askedQuestion].answer && answer === true) {
    $("#question").empty();
    $("#question").html('Wrong Answer!  <br> The answer was "' + questions[askedQuestion].answer +'".<br><br>');
    //minus 5 seconds from the TIMER
    secondsLeft = secondsLeft-5;
    displayGif();
  } else {
  }
}

function displayGif() {
  var giphy = $("<img>");
  giphy.attr("src", questions[askedQuestion].gif);
  giphy.addClass("img-responsive");
  $("#question").append(giphy);
  setTimeout(newQuestion, 2000);
  askedQuestion++;
}


// Timer function
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
      timer.textContent = secondsLeft;

      if(secondsLeft === 0) {
          clearInterval(timerInterval);
          timer.style.visibility = "hidden";
          secondsLeft = 0;   
           endQuiz();
      }
  }, 1000);
}


function endQuiz() {
  $("#question").empty();
  $("#questionCount").empty();
  $("#timer").empty();
  $("#timer").hide();
  $("#question").append("Quiz is Over  <br><br>");
  // $("#question").append("Your score is : " + rightAnswer +"<br> ");
  $("#question").append("<p id ='score' class='text-secondary'> Score: " + rightAnswer +"</p>");

  //enter you initials text box
  $("#question").append(
    "Enter Your Initials <textarea id = 'Userinitial' class='text-secondary'>Enter Your Initials</textarea>");

  //submit your initials button
  $("#question").append(
    "<button class='btn btn-info' onclick='submitInitials()'>Submit</button>"
  );
}



function submitInitials() {

alert("Submitted Initials");
var initial = document.querySelector("#Userinitial").value;

localStorage.setItem("score", rightAnswer);
localStorage.setItem("initials",initial);


// var initialsText = $("#Userinitial").value;
console.log(initial);


if (!rightAnswer || !initials) {
  return;
}



var scoreLocal = localStorage.getItem("score");
var UserinitialLocal = localStorage.getItem("initials");
console.log("scoreLocal: " +scoreLocal);
console.log("UserinitialLocal: " +UserinitialLocal);

  $("#question").append("<li>score: </li>" + scoreLocal);
  $("#question").append("<li>User initial: </li>"+UserinitialLocal);


  init();
  
}



function init() {
  // Get stored initals from localStorage
  // Parsing the JSON string to an object
  var storedInitials = JSON.parse(localStorage.getItem("initials"));
  var storedScore = JSON.parse(localStorage.getItem("score"));


  // If initials were retrieved from localStorage, update the initials array to it
  if (storedInitials !== null) {
    initials = storedInitials;
  }

  // Render initials to the DOM
  // renderInitials();

  var li = document.createElement("li");
    li.textContent = storedInitials + "" + storedScore;
    results.appendChild(li);


}

