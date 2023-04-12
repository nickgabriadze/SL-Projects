// created a separate object variable to store the questions
const questions = {
  1: {
    question: "What was the most used programming language in 2019?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },

  2: {
    question: "Who is the President of US?",
    a: "Donald Trump",
    b: "Joe Biden",
    c: "Hillary Clinton",
    d: "Bernie Sanders",
    correct: "b",
  },

  3: {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "none of the above",
    correct: "a",
  },

  4: {
    question: "What year was JavaScript launched?",
    a: "1993",
    b: "1994",
    c: "1995",
    d: "1996",
    correct: "c",
  },
};

//this array is used to store the user given answers
let userAnswers = [];

//loading the default/main question with the specific answers when the user opens the page for the first time
window.onload = () => {
  //getting the question from the html file with the class name of 'question'
  const questionArea = document.querySelector(".question");
  questionArea.style.marginTop = "30px";
  //i did this marginTop thing because I needed to make it a bit far away from the top

  //setting the specific text to specific elements
  questionArea.innerText = questions[1].question;
  const answerA = document.querySelector(".a");
  answerA.innerText = questions[1].a;
  const answerB = document.querySelector(".b");
  answerB.innerText = questions[1].b;
  const answerC = document.querySelector(".c");
  answerC.innerText = questions[1].c;
  const answerD = document.querySelector(".d");
  answerD.innerText = questions[1].d;
};

//counter needed to track which question is actually displayed to the user
let counter = 1;
//counter to track the number of questions that the user actually got right
let correctAnswer = 0;


//getting the submit button with querySelector and adding the eventListener to it for each click
document
  .querySelector(".submit-btn")
  .addEventListener("click", function fireQuestionEvent(e) {
    //getting the question after the click
    const questionArea = document.querySelector(".question");
    //grabbing all the displayed answer options
    const answersList = document.querySelectorAll(".answer");
    //getting the correct answer for the specific question that is being displayed
    const correctAnswer = questions[counter]?.correct;


    /* if the answersList isn't empty we are looping over it and if any of the answers were marked as checked,
    we are getting it and putting directly into the userAnswers array where we store the userGiven answers and also
    the correct answer alongside with it
    */
    answersList.forEach((eachAnswer) => {
      if (eachAnswer.children[0].checked === true) {
        userAnswers.push([eachAnswer.children[1].classList[0], correctAnswer]);
      }
    });

    /* now we start to check if the user hasn't chosen anything from the given answers, we have to display the 
    alert message to forbid the user to choose at least one option as an answer
    */
    if (userAnswers.length !== counter && counter <= 4) {
      alert("Please choose at least one option as an answer!");
      e.preventDefault();
    } else {
      /* if the user has chosen at least one option, we begin to check if the question counter is below 4 to
        change the question and do the necessary operations
      */
      if (counter < 4) {
        /* we increment the question counter to be able to display the new question for the user */
        let newCount = counter + 1;

        //for the options we need to make sure that every option is not checked for the new question
        answersList.forEach((eachAnswer) => {
          eachAnswer.children[0].checked = false;
        });

        //here we are doing the same stuff we did on page load, because new question is necessary
        questionArea.innerText = questions[newCount].question;
        const answerA = document.querySelector(".a");
        answerA.innerText = questions[newCount].a;
        const answerB = document.querySelector(".b");
        answerB.innerText = questions[newCount].b;
        const answerC = document.querySelector(".c");
        answerC.innerText = questions[newCount].c;
        const answerD = document.querySelector(".d");
        answerD.innerText = questions[newCount].d;
      }
      /* if the question qounter is actually equal to 4, we have to start calculating the number of 
      correctly answered questions */
      if (counter === 4) {
        //variable to increase as the number of correct answers increases
        let gotRight = 0;
        //looping over the userAnswers array to get check if the given answer is equal to the actual correct answer
        userAnswers.forEach((eachAnswer) => {
          if (eachAnswer[0] === eachAnswer[1]) {
            //in case of its correctness we increase the "correct answer counter"
            gotRight++;
          }
        });

        //after all the operations are done, we need to display how many questions the user got right
        questionArea.innerText = `You've answered ${gotRight}/4 questions correctly.`;
        //we are grabbing the div of answers and completely deleting it
        const answers = document.querySelector(".answers");
        answers.remove();
        //setting some styles to the general quiz elmenet in order to make it better visually
        const quiz = document.querySelector(".quiz");
        quiz.style.gap = "0.5rem";
        questionArea.style.marginTop = "0px";
        questionArea.style.padding = "0px";
        /*
        grabbing the button element and when the quiz is over instead of displaying the "submit" again, we are
        telling the user that he/she can actually "Restart" the quiz
        */
        const button = document.querySelector('.submit-btn')
        button.innerText = "Restart"
      }
      /*
      here we have to check that if the user presses the button once more and the counter is greater or equal to the 
      given question counter, we have to restart the website in order to refresh the questions and let him/her start over 
      */
      if (counter >= 5) {
        window.location.reload();
      }
      //once again, increasing the question counter
      counter++;
    }
  });
