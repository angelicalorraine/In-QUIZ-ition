var startButton = document.querySelector("#start-btn");
var questionCont = document.querySelector("#question-cont")
var questionEl = document.querySelector("#question")
var answersEl = document.querySelector("#answer-buttons")
var nextButton = document.querySelector("#next-btn");

let shuffledQuestions, currentQuestionIndex


startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();

})

function startGame() {
    console.log("Started Game");
    startButton.classList.add("hide");

    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionCont.classList.remove("hide");
    setNextQuestion()

}



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


function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answersEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }


}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

var questions = [
    {
        question: "Do you have common sense?",
        answers: [
            { text: "Yes", correct: false },
            { text: "Let's find out", correct: false },


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
        question: "When does February have only 27 days?",
        answers: [
            { text: "D is C's daughter", correct: true },
            { text: "Both are brothers", correct: false },
            { text: "C is D's uncle", correct: false },
            { text: "They are not related", correct: false },

        ]
    },

    // Add more qeuestions here, Do we need to add the extra java file for questions to save room?
]