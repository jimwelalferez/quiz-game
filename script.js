const quizData = [
    {
        question: "What is Goku's Saiyan name?",
        options: ["Bardock", "Raditz", "Kakarot", "Vegeta"],
        answer: "Kakarot"
    },
    {
        question: "Who was the first villain Goku fought in Dragon Ball Z?",
        options: ["Vegeta", "Frieza", "Raditz", "Nappa"],
        answer: "Raditz"
    },
    {
        question: "What is the name of Goku's signature attack?",
        options: ["Kamehameha", "Galick Gun", "Destructo Disc", "Final Flash"],
        answer: "Kamehameha"
    },
    {
        question: "Who is Goku's first child?",
        options: ["Gohan", "Trunks", "Goten", "Pan"],
        answer: "Gohan"
    },
    {
        question: "What planet is Vegeta the prince of?",
        options: ["Earth", "Namek", "Vegeta", "Saiyan"],
        answer: "Vegeta"
    },
    {
        question: "Which form does Goku achieve in his battle against Frieza on Namek?",
        options: ["Super Saiyan", "Ultra Instinct", "Super Saiyan God", "Kaioken"],
        answer: "Super Saiyan"
    },
    {
        question: "Who is Goku's mentor in the Other World?",
        options: ["Master Roshi", "Kami", "King Kai", "Whis"],
        answer: "King Kai"
    },
    {
        question: "What is the highest Super Saiyan form Goku achieves in Dragon Ball Z?",
        options: ["Super Saiyan 1", "Super Saiyan 2", "Super Saiyan 3", "Super Saiyan God"],
        answer: "Super Saiyan 3"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit");
const resultText = document.getElementById("result");
const retakeBtn = document.getElementById("retake");

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionEl.innerText = currentQuizData.question;
    optionsEl.innerHTML = "";
    currentQuizData.options.forEach(option => {
        const optionContainer = document.createElement("label");
        optionContainer.classList.add("option");
        
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.value = option;

        const span = document.createElement("span");
        span.innerText = option;

        optionContainer.appendChild(input);
        optionContainer.appendChild(span);
        optionsEl.appendChild(optionContainer);
    });
    resultText.innerText = "";
}

function getSelectedOption() {
    const options = document.querySelectorAll('input[name="option"]');
    let selectedOption = null;
    options.forEach(option => {
        if (option.checked) {
            selectedOption = option.value;
        }
    });
    return selectedOption;
}

submitBtn.addEventListener("click", () => {
    const selectedOption = getSelectedOption();
    if (selectedOption) {
        const isCorrect = selectedOption === quizData[currentQuestion].answer;
        resultText.innerText = isCorrect ? "Correct!" : "Incorrect!";
        resultText.classList.toggle("correct", isCorrect);
        resultText.classList.toggle("incorrect", !isCorrect);
        score += isCorrect ? 1 : 0;

        currentQuestion++;
        if (currentQuestion < quizData.length) {
            setTimeout(loadQuestion, 1000);
        } else {
            setTimeout(() => {
                questionEl.innerText = "Quiz Completed!";
                optionsEl.innerHTML = `<p>Your score: ${score}/${quizData.length}</p>`;
                submitBtn.style.display = "none";
                retakeBtn.style.display = "block";
            }, 1000);
        }
    } else {
        alert("Please select an answer!");
    }
});

retakeBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    retakeBtn.style.display = "none";
    submitBtn.style.display = "block";
    loadQuestion();
});


loadQuestion();
