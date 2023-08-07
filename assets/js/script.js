const quizeCard = document.getElementById('quize-card')
let lastQuestionReached = 0
let currentQuestion = 0
let score = 0
const userAnswers = []
function displayQuestion() {
    quizeCard.innerHTML = `<div class="title bg-peimery flex-centered between">
    <div>
        <p class="question-num">Question number ${currentQuestion + 1} of ${questions.length}</p>
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
    </div>`
    const options = document.querySelectorAll('.options button')
    options.forEach((option) => {
        option.addEventListener('click', () => {
            options.forEach(option => option.classList.remove('checked'))
            option.classList.add('checked')
        })
    })
}

displayQuestion()

let timerFlag = false;
const timer = document.getElementById('timer');
let time = 60;
function startTimer() {
    let timeer = setInterval(() => {
        if (timerFlag) {
            console.log(time, timerFlag);
            clearInterval(timeer)
            return
        }
        time -= 1
        document.getElementById('timer').innerHTML = `${time}`;
        if (time <= 0) {
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

startTimer()

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
            document.getElementById('score').innerHTML =  `score: ${score}`
            timerFlag = true;
            submitBtn.innerHTML = 'Next <i class="fa-solid fa-angle-right"></i>'
            submitBtn.onclick = goToNextQuestion
        } else {
            userAnswerElement.classList.add('invalid');
            const allOptions = document.querySelectorAll('.options button');
            console.log(allOptions);
            allOptions.forEach((option) => {
                if (option.textContent === correctAnswer) {
                    option.classList.add('valid');
                }
            });
            Swal.fire({
                title: '<strong>Wrong Answer</strong>',
                icon: 'error',
                showCloseButton: true,
                focusConfirm: false
            });
            timerFlag = true;
            submitBtn.innerHTML = 'Next <i class="fa-solid fa-angle-right"></i>'
            submitBtn.onclick = goToNextQuestion
        }
    }
};

submitBtn.onclick = checkAnswer

const goToNextQuestion = () => {
    currentQuestion++
    if (currentQuestion === questions.length) {
        Swal.fire({
            title: '<strong>You have done all qestions</strong>',
            icon: 'warning',
            showCloseButton: true,
            focusConfirm: false
        });
        submitBtn.innerHTML = 'Get Certified <i class="fa fa-certificate"></i>'
        submitBtn.onclick = checkResult
        return
    }
    submitBtn.innerHTML = 'check<i class="fa-solid fa-check-double"></i>'
    submitBtn.onclick = checkAnswer
    timerFlag = false
    displayQuestion()
    time = 60;
    startTimer()

}
const goToPrevQuestion = () => {
    currentQuestion--
    // if(currentQuestion<=0){
    //     Swal.fire({
    //         title: "<strong>You can't go back this is the first question</strong>",
    //         icon: 'error',
    //         showCloseButton: true,
    //         focusConfirm: false
    //     });

    //     return
    // }
    displayQuestion()
}

document.getElementById('back-btn').onclick = goToPrevQuestion

const checkResult = () => {
    if(score >= 25){
        window.location.href = 'social-share.html'
    }else{
        Swal.fire({
            title: '<strong>Faild to pass test</strong>',
            htel: `<p>Your score is ${score} which is low so try again to pass the test</p>`,
            icon: 'error',
            showCloseButton: true,
            focusConfirm: false
        });
    }
}