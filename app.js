'use strict';

var numOfTotalQuestions = 0;
var numOfQuestionsAnswerd = 0;
var percentageComplete = 0;
var dataArray = [];
var keyArray = [];
var storeData;
var answers = {};

function dataSelected(event){
  var objKey = event.target.id;
  answers[objKey] = event.target.value;
  console.log(answers);
}

function answersConversion(){
  //dataArray = [];
  dataArray = Object.keys(answers).map(function(e) { return parseInt(answers[e]); } );
  // console.log(dataArray);
}

function objectKeyExtraction() {
  //keyArray = [];
  keyArray = Object.keys(answers);
  // console.log(keyArray);
}

function countNumOfTotalQuestions() {
  // numOfTotalQuestions = 0;
  // var selectsArray = [];
  // var select = [];
  // selectsArray = document.getElementsByTagName('select');
  // for(var i = 0; i < selectsArray.length; i++) {
  //   numOfTotalQuestions++;
  // }

  // This line does all the calculation needed
  numOfTotalQuestions = document.getElementsByTagName('select').length;
  // console.log('The number of total questions (or selects) is: ' + numOfTotalQuestions);
}

function countNumOfQuestionsAnswerd() {
  //numOfQuestionsAnswerd = 0;
  answersConversion();
  // for(var i = 0; i < dataArray.length; i++) {
  //   numOfQuestionsAnswerd++;
  // }

  numOfQuestionsAnswerd = dataArray.length;
  // console.log('The number of questions answered is: ' + numOfQuestionsAnswerd);
}

function calcPercentageComplete() {
  percentageComplete = numOfQuestionsAnswerd / numOfTotalQuestions;
  // console.log('The percentage of questionaire completed is: ' + percentageComplete);
}

function renderPercentageCompleteChart() {
  var ctx = document.getElementById("percentageChart").getContext("2d");
  console.log(ctx)
  var chartData = [{
    value: numOfQuestionsAnswerd,
    color: "#00FF00",
    highlight: "#44FF44",
    label: "Questions Answered"
  }, {
    value: numOfTotalQuestions - numOfQuestionsAnswerd,
    color: "#FF0000",
    highlight: "#FF4444",
    label: "Remaining Questions"
  }]
  new Chart(ctx).Pie(chartData);
}

function renderIndividualBarChart() {
  var ctx = document.getElementById("individualBarChart").getContext("2d");
  console.log(ctx)
  var chartData = {
    labels: keyArray,
    datasets: [{
      label: "My dataset",
      fillColor: "rgba(151,187,205,0.5)",
      strokeColor: "rgba(151,187,205,0.8)",
      highlightFill: "rgba(151,187,205,0.75)",
      highlightStroke: "rgba(151,187,205,1)",
      data: dataArray
    }]
  };
  new Chart(ctx).Bar(chartData);
}

function percentageCompleteHandler(){
  countNumOfTotalQuestions();
  countNumOfQuestionsAnswerd();
  calcPercentageComplete();
  objectKeyExtraction();
  renderPercentageCompleteChart();
  renderIndividualBarChart();
}

function buildTables(dataArray,headerArray,buildLocation,title) {
//Declare table location, table title, and begin building the initial table element
  var tableLocation = document.getElementById(buildLocation);
  var h3 = document.createElement('h3');
  h3.textContent = title;
  var table = document.createElement('table');
  var trEL = document.createElement('tr');

  if (tableLocation) {
    tableLocation.appendChild(h3);
    tableLocation.appendChild(table);
  }
  table.appendChild(trEL);

//Build the table headers
  for (var i=0; i < headerArray.length; i++) {
    var thEL = document.createElement('th');
    thEL.textContent = headerArray[i];
    trEL.appendChild(thEL);
  }
//Build the table rows
  for (var i=0; i < dataArray.length; i++) {
    var trEL = document.createElement('tr');
    table.appendChild(trEL);
    for (var j=0; j < dataArray[i].length; j++){
      var tdEl = document.createElement('td');
      tdEl.textContent = dataArray[i][j];
      trEL.appendChild(tdEl);
    }
  }
}

storedData.addEventListener('change', dataSelected);
storedData.addEventListener('change', percentageCompleteHandler);

//buildTables(recomendationsArray,recomendationsHeaderArray,'listOfResultsId','SANS Cricital Conrtols Recommendations');
