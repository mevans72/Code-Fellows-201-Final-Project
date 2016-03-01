'use strict';

var numOfTotalQuestions = 0;
var numOfQuestionsAnswerd = 0;
var percentageComplete = 0;



function countNumOfTotalQuestions() {
  numOfTotalQuestions = 0;
  var selectsArray = [];
  var select = [];
  selectsArray = document.getElementsByTagName('select');
  for(var i = 0; i < selectsArray.length; i++) {
    numOfTotalQuestions++;
  }
  console.log('The number of total questions (or selects) is: ' + numOfTotalQuestions);
}
countNumOfTotalQuestions();

//iterate over an array. Not so good...
// function countNumOfQuestionsAnswerd() {
//   var dataArray = [];
//   // answersConversion();
//   dataArray = Object.keys(answers).map(function(e) { return parseInt(answers[e]); } );
//   for(var i = 0; i < dataArray.length; i++) {
//     numOfQuestionsAnswerd++;
//   }
//   percentageComplete = numOfQuestionsAnswerd / numOfTotalQuestions;
//   console.log('You answered ' + numOfQuestionsAnswerd + ' questions out of ' + numOfTotalQuestions + ' total questions.');
// }

// function countNumOfQuestionsAnswerd() {

  // var dataArray = [];
  // answersConversion();
  // dataArray = Object.keys(answers).map(function(e) { return parseInt(answers[e]); } );
  // for(var i = 0; i < dataArray.length; i++) {
  //   numOfQuestionsAnswerd++;
  // }
  ////another example...
  // var keyIndex = '';
  // for (var 'keyIndex' in p) {
  //   if (p.hasOwnProperty(key)) {
  //     alert(key + ' -> ' + p[key]);
  //   }
  // }
  // Object Declaration
  // var p =
  //   {
  //     'p1': 'value1',
  //     'p2': 'value2',
  //     'p3': 'value3'
  //   };
  //
  // Extract properties of object using 'for-in' loop.
  // for (var key in p) {
  //   console.log(key + ' having ' + p[key]);
  // }
  // var property;
  // for (property in answers) {
  // if(property != '-Choose-') {

  // if(!('-Choose-' in answers)) {

  // if (!answers.hasOwnProperty('-Choose-')) {
    // console.log(answers + ' object contains the chosen value...');
    // console.log(property + ' holds the proterty value of ' + answers[property]);
  // percentageComplete = numOfQuestionsAnswerd / numOfTotalQuestions;
  // console.log('You answered ' + numOfQuestionsAnswerd + ' questions out of ' + numOfTotalQuestions + ' total questions.');
  // }
// }



// auditData.addEventListener('change', countNumOfQuestionsAnswerd);






function hideThingsTemporarily() {
  document.getElementById('auditData').style.visibility = 'hidden';
};
// hideThingsTemporarily();

var answers = {};
var displayedResults = document.getElementById('question1');
var questAnswers = [];
var dataArray = [];

function dataSelected(event){
  var objKey = event.target.id;
  answers[objKey] = event.target.value;
  console.log(answers);
}


auditData.addEventListener('change', dataSelected);


function answersConversion(){
  dataArray = Object.keys(answers).map(function(e) { return parseInt(answers[e]); } );
  console.log(dataArray);
  return dataArray;
}
// answersConversion();
