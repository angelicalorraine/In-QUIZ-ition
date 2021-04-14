var startButton = document.querySelector("#start-btn");
var questionCont = document.querySelector("#question-cont");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answer-buttons");
var nextButton = document.querySelector("#next-btn");
var timerCount = document.querySelector("#timer-count");
var resultCont = document.querySelector("#results");
var scoreBtn = document.querySelector("#scoreBtn");
var answerResult = document.querySelector("#results");
var inputForm = document.querySelector("#inputForm");
var scoreCont = document.querySelector("#scorecont");
var submitBtn = document.querySelector("#submitBtn");
var initialsBox = document.querySelector("#initialsBox")
var scoreCard = document.querySelector("#scorecard");
var scoreBoard = document.querySelector("#scoreboard");
var leaderBtn = document.querySelector("#leaderBtn");
var backBtn = document.querySelector("#backBtn");
let shuffledQuestions, currentQuestionIndex
var score = 0;
var scoreList = [];

getScore();



startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();

})

function startGame() {
    console.log("Started Game");
    startButton.classList.add("hide");
    timerCount.classList.remove("hide");
    setTime();

    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionCont.classList.remove("hide");
    setNextQuestion()

}

var secondsLeft = 120;

function setTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerCount.textContent = secondsLeft + " seconds left"
        if (secondsLeft === 0) {
            clearInterval(timerInterval)
            gameOver();
            // ADD LOCAL STORAGE HERE WITH SCORE

        }
    }, 1000);
}
// ADD FUNCTION TO SUBTRACT 10 SECS IF WRONG ANSWER



function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answersEl.appendChild(button)


    })

}

function resetState() {

    nextButton.classList.add("hide")
    while (answersEl.firstChild) {
        answersEl.removeChild
            (answersEl.firstChild)
    }
}

var correct = "";

function selectAnswer(e) {
    var selectedButton = e.target
    correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answersEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        clearInterval(timerInterval);
        gameOver();

    }
    checkResult();

}



function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        scoreCont.classList.remove("hide")
        element.classList.add("correct")
    } else {
        scoreCont.classList.remove("hide")
        element.classList.add("wrong")

    }

}

function checkResult() {
    if (correct) {
        answerResult.textContent = "You are Correct!"
    } else {
        answerResult.textContent = "You are Incorrect!"
        secondsLeft -= 10;
    }
    score = secondsLeft;
}

function getScore() {
    var storedScore = JSON.parse(localStorage.getItem("highScore"));
    if (storedScore !== null) {
        scoreList = storedScore;
    }
}

function saveScore() {
    localStorage.setItem("highScore", JSON.stringify(scoreList));
}




function gameOver() {
    scoreCont.classList.add("hide");
    questionCont.classList.add("hide");
    inputForm.classList.remove("hide");
    leaderBtn.classList.remove("hide");
    backBtn.classList.remove("hide");
    timerCount.classList.add("hide");
    checkResult();
    scoreBtn.innerHTML = score;
    setScoreBoard();


}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
    answerResult.textContent = "";
}


function setScoreBoard() {
    addScoreboard();
    scoreList.sort((a, b) => {
        return b.score - a.score;
    });

    topTen = scoreList.slice(0, 10);

    for (var i = 0; i < topTen.length; i++) {
        var player = topTen[i].player;
        var score = topTen[i].score;

        var newDiv = document.createElement("div");
        scoreBoardDiv.appendChild(newDiv);

        var newLabel = document.createElement("label");
        newLabel.textContent = player + "-" + score;
        newDiv.appendChild(newLabel);
    }
}

function addScoreboard() {
    scoreBoardDiv = document.createElement("div");
    scoreBoardDiv.setAttribute("id", "playerInitials");
    document.getElementById("scoreboard").appendChild(scoreBoardDiv);
}


submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var playerInitials = initialsBox.value;
    var newScore = {
        player: playerInitials,
        score: score,
    };

    scoreList.push(newScore);
    saveScore();
    setScoreBoard();
    inputForm.classList.add("hide");
    scoreCard.classList.remove("hide");

}
);

leaderBtn.addEventListener("click", function (event) {
    scoreCard.classList.remove("hide");
    leaderBtn.classList.add("hide");
    startButton.classList.add("hide");
    setScoreBoard();
});

backBtn.addEventListener("click", function (event) {
    location.reload();
});

var questions = [
    {
        question: "What is always coming, but never arrives?",
        answers: [
            { text: "Yesterday", correct: false },
            { text: "Tomorrow", correct: true },
            { text: "Your Past", correct: false },
            { text: "Progress", correct: false },


        ]
    },
    {
        question: "C is the father of D. But D is not the son of C. How is that possible?",
        answers: [
            { text: "D is C's daughter", correct: true },
            { text: "Both are brothers", correct: false },
            { text: "C is D's uncle", correct: false },
            { text: "They are not related", correct: false },

        ]
    },
    {
        question: "What is heavier? 100 pounds of rocks or 100 pounds of feathers?",
        answers: [
            { text: "100 pounds of rocks", correct: false },
            { text: "100 pounds of feathers", correct: false },
            { text: "The weigh the same", correct: true },
            { text: "They are not related", correct: false },

        ]
    },

    {
        question: "What can one catch that is not thrown?",
        answers: [
            { text: "A Strike", correct: false },
            { text: "A Shot", correct: false },
            { text: "A Person", correct: false },
            { text: "A Cold", correct: true },


        ]
    },

    {
        question: "If you have a bowl with six apples and you take away four, how many do you have?",
        answers: [
            { text: "Four", correct: true },
            { text: "Two", correct: false },
            { text: "Six", correct: false },
            { text: "Three", correct: false },


        ]
    },

    {
        question: "Some months have 31 days, others have 30 days, but how many have 28 days?",
        answers: [
            { text: "3 Months", correct: false },
            { text: "1 Month", correct: false },
            { text: "2 Months", correct: false },
            { text: "12 Months", correct: true },


        ]
    },

    {
        question: "What is it that lives if it is fed, and dies if you give it a drink??",
        answers: [
            { text: "Plants", correct: false },
            { text: "Gas", correct: false },
            { text: "Fire", correct: true },
            { text: "Wind", correct: false },


        ]
    },

    {
        question: "What can be broken but never held? ",
        answers: [
            { text: "A Promise", correct: true },
            { text: "A Plate", correct: false },
            { text: "A Secret", correct: false },
            { text: "Your Code", correct: true },


        ]
    },
    // Add more qeuestions here, Do we need to add the extra java file for questions to save room?
];