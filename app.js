'use strict';

var numOfTotalQuestions = 0;
var numOfQuestionsAnswerd = 0;
var percentageComplete = 0;
var dataArray = [];


var answers = {};
// var displayedResults = document.getElementById('question1');
// var questAnswers = [];

function dataSelected(event){
  var objKey = event.target.id;
  answers[objKey] = event.target.value;
  console.log(answers);
}


storedData.addEventListener('change', dataSelected);


function answersConversion(){
  dataArray = [];
  dataArray = Object.keys(answers).map(function(e) { return parseInt(answers[e]); } );
  console.log(dataArray);
}
// answersConversion();


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

function countNumOfQuestionsAnswerd() {
  numOfQuestionsAnswerd = 0;
  answersConversion();
  // var tempArray = answersConversion();
  // var tempArray = [2,3,4];
  for(var i = 0; i < dataArray.length; i++) {
    numOfQuestionsAnswerd++;
  }
  console.log('The number of questions answered is: ' + numOfQuestionsAnswerd);
}

function calcPercentageComplete() {
  percentageComplete = numOfQuestionsAnswerd / numOfTotalQuestions;
  console.log('The percentage of questionaire completed is: ' + percentageComplete);
}

function percentageCompleteHandler(){
  countNumOfTotalQuestions();
  countNumOfQuestionsAnswerd();
  calcPercentageComplete();
}


storedData.addEventListener('change', percentageCompleteHandler);


// var ctx = document.getElementById("myChart").getContext("2d");
// var myNewChart = new Chart(ctx).PolarArea(data);
//
// var myDoughnutChart = new Chart(ctx[1]).Doughnut(data,options);
//
// var data = [
//     {
//         value: 300,
//         color:"#F7464A",
//         highlight: "#FF5A5E",
//         label: "Red"
//     },
//     {
//         value: 50,
//         color: "#46BFBD",
//         highlight: "#5AD3D1",
//         label: "Green"
//     },
//     {
//         value: 100,
//         color: "#FDB45C",
//         highlight: "#FFC870",
//         label: "Yellow"
//     }
// ]
