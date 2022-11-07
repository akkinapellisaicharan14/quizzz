class Quiz {
    constructor(questions, reward) {
        this.reward= reward;
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score +=this.reward;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// Create a question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// NOW DISPLAY THE QUESTIONS
var finalScore = 0;
function displayQuestion(count, quizElement, hasNext, next) {
    QuizNumber(count);
    if (quizElement.isEnded()) {
        finalScore += quizElement.score;
        if(hasNext){
            clearInterval(quizTimer1);
            countDown2(15);
            displayQuestion(2, quiz2, false, null);
        }
        else{
            clearInterval(quizTimer2);
            countDown3(8);
            displayLogoQuestion();
        }
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quizElement.getQuestionIndex().text;

        // show options
        let choices = quizElement.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i], count, quizElement, hasNext, next);
        }

        showProgress(quizElement);
    }
};

function displayLogoQuestion(){
    QuizNumber(3);
    if (quiz3.isEnded()) {
        finalScore += quiz3.score;
        showScores();
    }else{
        // show question
        let questionElement = document.getElementById("question");
        
        questionElement.innerHTML = `<img src='${quiz3.getQuestionIndex().text}' style='width:50%; display:block; margin-left:auto; margin-right:auto'></img>`;

        // show options
        let choices = quiz3.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess2("btn" + i, choices[i]);
        }
        showProgress(quiz3);
    }
}

// Quiz Number
function QuizNumber(Count){
    let quizNumber = document.getElementById("quiz-num");
    quizNumber.style.fontSize="40px";
    quizNumber.style.fontFamily="times roman";
    quizNumber.innerHTML = `Quiz- ${Count}`;
}

// GUESS ANSWER
function guess(id, guess, count, quizElement, hasNext, next) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quizElement.guess(guess);
        displayQuestion(count, quizElement, hasNext, next);
    }
};
function guess2(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz3.guess(guess);
        displayLogoQuestion();
    }
};

// SHOW QUIZ PROGRESS
function showProgress(quizElement) {
    let currentQuestionNumber = quizElement.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quizElement.questions.length}`;
        ProgressElement.style.fontSize="20px";
        ProgressElement.style.fontFamily="Serif";
        ProgressElement.style.marginLeft="100px";
        ProgressElement.style.color="#f50707";
        ProgressElement.style.textDecoration="underline";
   
};


// SHOW SCORES
function showScores() {
    var passed="Qualified",result="";
    if(finalScore > 9.5){
        result="Admitted in Vellore";
    }else if(finalScore > 7.5){
        result="Admitted in Chennai";
    }else if(finalScore > 6.5){
        result="Admitted in Amravati";
    }
    else{
        passed="Not Qualified & Not admitted";
    }
    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>
    <h2 class='score'> Your scored: ${finalScore}</h2>
    <h2 class='score'> ${passed}</h2>
    <h2 class='score'> ${result}</h2>
   
    `;
    let quizElemnt = document.getElementById("quiz");
    
    quizElemnt.innerHTML = quizEndHTML;
};

// create questions here
let questions1 = [
    new Question(
        "Brass gets discoloured in air because of the presence of which of the following gases in air?", ["Oxygen", "Hydrogen sulphide", "Carbon dioxide", "Nitrogen"], "Hydrogen sulphide"
    ),
    new Question(
        "Which of the following is a non metal that remains liquid at room temperature?", ["Phosphorous", "Bromine", "chlorine", "helium"], "bromine"
    ),
    new Question(
        "Chlorophyll is a naturally occurring chelate compound in which central metal is", ["copper", "magnesium", "iron", "calcium"], "magnesium"
    ),
    new Question(
        "Which of the following is used in pencils?", ["graphite", "silicon", "charcoal", "phosphorous"], "graphite"
    ),
    new Question(
        "Which of the following metals forms an amalgam with other metals?", ["Tin", "mercury", "lead", "Zinc"], "Mercury"
    ),
    new Question(
        "Chemical formula for water is", ["NaAlO2", "H2O", "Al2O3", "CaSiO3"], "H2O"
    ),
    new Question(
        "The gas usually filled in the electric bulb is", ["nitrogen", "hydrogen", "carbon dioxide", "oxygen"], "nitrogen"
    ),
    new Question(
        "Washing soda is the common name for", ["Sodium carbonate", "Calcium bicarbonate", "Sodium bicarbonate", "Calcium carbonate"], "Sodium carbonate"
    ),
    new Question(
        "Quartz crystals normally used in quartz clocks etc. is chemically", ["silicon dioxide", "germanium oxide", "h2o", "sodium silicate"], "silicon dioxide"
    ),
    new Question(
        "Which of the gas is not known as green house gas?", ["Methane", "Nitrous oxide", "Carbon dioxide", "Hydrogen"], "Hydrogen"
    )
];

let questions2 = [
    new Question(
      "The classical/folk dances namely Kuchipudi and Ottam thedal belong to …", ["Andhra Pradesh", "Uttarakhand", "west bengal", "Assam"], "Andhra pradesh"  
    ),
    new Question(
      "Zubin Mehta is related to …", ["Symphony", "Violin", "Veena", "rudra veena"], "Symphony"  
    ),
    new Question(
      "Rashtriya Panchayat is the Parliament of …", ["Sri Lanka", "Bhutan", "Bangladesh", "Nepal"], "Nepal"  
    ),
    new Question(
      "Who among the following was the Last Governor of Bengal?", ["Lord clive", "warren hastings", "Lord william bentic", "Lord canning"], "warren hastings"  
    ),
    new Question(
      "Which among the following stadiums is known for Cricket?", ["Jawahaelal nehru stadium", "wankede stadium", "shivaji stadium", "Feroz  shah kotla stadium"], "Feroz  shah kotla stadium"  
    )
];

let questions3 = [
    new Question(
        "https://res.cloudinary.com/rajaramanikanta/image/upload/v1667749548/download_te3ghn.png", ["starbucks", "starstucks", "starangel", "queen"], "starbucks"
    ),
    new Question(
        "https://res.cloudinary.com/rajaramanikanta/image/upload/v1666250756/apple_cv6xz8.png", ["Oneplus", "Apple", "Poco", "samsung"], "Apple"
    ),
    new Question(
        "https://res.cloudinary.com/rajaramanikanta/image/upload/v1666250824/youtube_ocuj9y.png", ["Youtube", "Instagram", "snapchat", "FaceBook"], "Youtube"
    ),
    new Question(
        "https://res.cloudinary.com/rajaramanikanta/image/upload/v1666250926/dell_zuqjbr.png", ["HP", "sony", "Dell", "Asus"], "Dell"
    ),
    new Question(
        "https://res.cloudinary.com/rajaramanikanta/image/upload/v1666250986/google_xpbtym.png", ["Operamini", "UC Browser", "Linkedin", "Google"], "Google"
    )
];

// INITIALIZE quiz
let quiz1 = new Quiz(questions1, 2);
let quiz2 = new Quiz(questions2, 2);
let quiz3 = new Quiz(questions3, 4)

// display questions
displayQuestion(1, quiz1, true, quiz2);


// Add A CountDown for the Quiz
let counting = document.getElementById("count-down");
counting.style.backgroundColor="white";
counting.style.width="90px";
counting.style.borderRadius="120px";
counting.style.height="90px"; 
counting.style.paddingTop="35px";
counting.style.marginLeft="5px";
counting.style.marginRight="180px";
counting.style.paddingLeft="10px"; 
counting.style.fontSize="12px"; 
counting.style.fontWeight="bold";       

var quizTimer1, quizTimer2, quizTimer3;

function countDown1(time) {
    let quizTimeInMinutes = time * 60 * 60;
    let quizTime = quizTimeInMinutes / 60;
    quizTimer1 = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer1);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}
function countDown2(time) {
    let quizTimeInMinutes = time * 60 * 60;
    let quizTime = quizTimeInMinutes / 60;
    quizTimer2 = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer2);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}
function countDown3(time) {
    let quizTimeInMinutes = time * 60 * 60;
    let quizTime = quizTimeInMinutes / 60;
    quizTimer3 = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer3);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}
countDown1(15);