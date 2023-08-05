const quizeCard = document.getElementById('quize-card')
let lastQuestionReached = 0
let currentQuestion = 0
let score = 0


function displayQuestion() {
    quizeCard.innerHTML = `<div class="title bg-peimery flex-centered between">
    <div>
        <p class="question-num">Question number ${currentQuestion}</p>
        <p id='score'>score: ${score}</p>
    </div>
    <div class="timer" id="timer">
        60
    </div>
    </div>
    <div class="question">
        ${questions[currentQuestion].title}
    </div>
    
    ${questions[currentQuestion].code ? `<div class="code">
        ${questions[currentQuestion].code}
    </div>`: ''}
    
    <div class="options flex">
        ${questions[currentQuestion].options.map((option) => {
        return `<button class="outlined">${option}</button>`
    }).join('')}
    </div>
`
}
let timerFlag = false;
displayQuestion()
const timer = document.getElementById('timer');
let time = 60;
const updateTimer = () => {
    let timeer = setInterval(() => {
        if (timerFlag) {
            clearInterval(timer)
            return
        }
        time -= 1
        timer.innerHTML = time;
        if (time == 0 || timerFlag) {
            console.log(timerFlag)
            clearInterval(timeer)
            Swal.fire({
                title: '<strong>TimeOut</strong>',
                html: '<p>If you choose the correct answer you will got 2 points instead of 5</p>',
                icon: 'info',
                showCloseButton: true,
                focusConfirm: false
            })
        }
    }, 1000)
};

updateTimer()



const options = document.querySelectorAll('.options button')

options.forEach((option) => {
    option.addEventListener('click', () => {
        options.forEach(option => option.classList.remove('checked'))
        option.classList.add('checked')
    })
})
const submitBtn = document.getElementById('submit')

const checkAnswer = () => {
    const userAnswerElement = document.querySelector('.checked');
    const selectedAnswer = userAnswerElement ? userAnswerElement.textContent : null;
    if (!selectedAnswer) {
        Swal.fire({
            title: '<strong>No Answer Checked</strong>',
            html: '<p>You must choose an answer and then check if it is correct or not.</p>',
            icon: 'error',
            showCloseButton: true,
            focusConfirm: false
        });
    } else {
        const correctAnswer = questions[currentQuestion].options[questions[currentQuestion].answerIndex];
        if (selectedAnswer === correctAnswer) {
            userAnswerElement.classList.add('valid');
            Swal.fire({
                title: '<strong>Correct Answer</strong>',
                html: '<p>You got 5 points.</p>',
                icon: 'success',
                showCloseButton: true,
                focusConfirm: false
            });
            if (time == 0) {
                score += 2
            } else {
                score += 5
            }
            submitBtn.innerHTML = 'Next <i class="fa-solid fa-angle-right"></i>'
            timerFlag = true;
        } else {
            userAnswerElement.classList.add('invalid');
            const allOptions = document.querySelectorAll('.options button');
            console.log(allOptions);
            allOptions.forEach((option) => {
                if (option.textContent === correctAnswer) {
                    option.classList.add('valid');
                }
            });
        }
    }
};

submitBtn.onclick = checkAnswer