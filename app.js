'use strict';

var numOfTotalQuestions = 0;
var numOfQuestionsAnswerd = 0;
var percentageComplete = 0;
var percentageNotComplete = 0;
var keyValueArray = [];
var keyArray = [];
var storeData;
var answers = {};
var barChart = null;
var PieChart = null;
var sansCriticalControlsBarChartLabelsArray = [];
var highSeaSecScore = 0;
var midSeaSecScore = 0;
var lowSeaSecScore = 0;


function dataSelected(event) {
  var objKey = event.target.id;
  answers[objKey] = event.target.value;
  // console.log('The KEY "' + event.target.id + '" was updated with a VALUE of "' + event.target.value + '"');
}

function objectKeyExtraction() {
  keyArray = [];
  keyArray = Object.keys(answers);
  // console.log(keyArray);
}

function objectKeyValueExtraction() {
  keyValueArray = [];
  keyValueArray = Object.keys(answers).map(function(e) {
    return parseInt(answers[e]);
  });
  // console.log(keyValueArray);
}

function securityScoresObjectKeyValueExtraction() {
  highSeaSecScore = 0;
  midSeaSecScore = 0;
  lowSeaSecScore = 0;
  keyValueArray = [];
  keyValueArray = Object.keys(answers).map(function(e) {
    return parseInt(answers[e]);
  });
  for(var i = 0; i < keyValueArray.length; i++) {
    if(keyValueArray[i] < 6) {
      lowSeaSecScore += keyValueArray[i];
    } else if(keyValueArray[i] >= 6 && keyValueArray[i] < 8) {
      midSeaSecScore += keyValueArray[i];
    } else if(keyValueArray[i] >= 8) {
      highSeaSecScore += keyValueArray[i];
    }
  }
  // console.log(keyValueArray);
}

function countNumOfTotalQuestions() {
  numOfTotalQuestions = 0;
  var selectsArray = [];
  var select = [];
  selectsArray = document.getElementsByTagName('select');
  for (var i = 0; i < selectsArray.length; i++) {
    numOfTotalQuestions++;
  }
  // console.log('The number of total questions (or selects) is: ' + numOfTotalQuestions);
}

function countNumOfQuestionsAnswerd() {
  numOfQuestionsAnswerd = 0;
  objectKeyValueExtraction();
  for (var i = 0; i < keyValueArray.length; i++) {
    numOfQuestionsAnswerd++;
  }
  // console.log('The number of questions answered is: ' + numOfQuestionsAnswerd);
}

function calcPercentageComplete() {
  percentageComplete = 0;
  percentageNotComplete = 0;
  percentageComplete = numOfQuestionsAnswerd / numOfTotalQuestions;
  percentageNotComplete = 1 - percentageComplete;
  // console.log('The percentage of questionaire completed is: ' + percentageComplete);
}

function percentageCompleteHandler() {
  countNumOfTotalQuestions();
  countNumOfQuestionsAnswerd();
  calcPercentageComplete();
  objectKeyExtraction();
  console.log('The KEY "' + event.target.id + '" was updated with a VALUE of "' + event.target.value + '"');
}

function buildTables(tableDataArray, tableHeaderArray, buildLocation, title) {
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
  for (var i = 0; i < headerArray.length; i++) {
    var thEL = document.createElement('th');
    thEL.textContent = headerArray[i];
    trEL.appendChild(thEL);
  }
  //Build the table rows
  for (var i = 0; i < tableHeaderArray.length; i++) {
    var trEL = document.createElement('tr');
    table.appendChild(trEL);
    for (var j = 0; j < tableHeaderArray[i].length; j++) {
      var tdEl = document.createElement('td');
      tdEl.textContent = tableHeaderArray[i][j];
      trEL.appendChild(tdEl);
    }
  }
}

function destroyExistingBarChart() {
  if (barChart != null) {
    barChart.destroy();
  }
}

function destroyExistingPieChart() {
  if (PieChart != null) {
    PieChart.destroy();
  }
}

function destroyExistingPolarChart() {
  if (polarChart != null) {
    PolarChart.destroy();
  }
}

function buildSansCriticalControlsPolarChart() {
  var polarData = [
    {
      value: highSeaSecScore,
      color:'#69BE28',
      highlight: '#002244',
      label: 'Exceeding Expectations'
    },
    {
      value: midSeaSecScore,
      color: '#A5ACAF',
      highlight: '#002244',
      label: 'Meets Expectations'
    },
    {
      value: lowSeaSecScore,
      color: '#002C5F',
      highlight: '#002244',
      label: 'Below Expectations'
    }
  ];

  var polarOptions = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,
    //String - The colour of each segment stroke
    segmentStrokeColor : '#fff',
    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,
    //The percentage of the chart that we cut out of the middle.
    percentageInnerCutout : 50,
    //Boolean - Whether we should animate the chart
    animation : true,
    //Number - Amount of animation steps
    animationSteps : 100,
    //String - Animation easing effect
    animationEasing : 'easeOutBounce',
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,
	  //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : true,
	  //Function - Will fire on animation completion.
    onAnimationComplete : null
  };

  var sansCriticalControlsPolarChart = document.getElementById('buildSansCriticalControlsPolarChartHere').getContext('2d');
  polarChart = new Chart(sansCriticalControlsPolarChart).PolarArea(polarData);
}

function buildSansCriticalControlsBarChart() {
  destroyExistingBarChart();
  // objectKeyValueExtraction();
  var barData = {
    labels: sansCriticalControlsBarChartLabelsArray,
    datasets: [{
      fillColor: '#002C5F',
      strokeColor: '#69BE28',
      data: keyValueArray
    }]
  };
  var sansCriticalControlsBarChart = document.getElementById('buildSansCriticalControlsBarChartHere').getContext('2d');
  barChart = new Chart(sansCriticalControlsBarChart).Bar(barData);
}

function buildPercentagePieChart() {
  destroyExistingPieChart();
  // objectKeyValueExtraction();
  var pieData = [{
    value: percentageComplete,
    color: '#002C5F'
  },
    {
      value: percentageNotComplete,
      color: '#69BE28'
    }
  ];

  var pieOptions = {
    segmentShowStroke : false,
    animateScale : true
  };

  var sansPercentagePieChartHere = document.getElementById('buildPercentagePieChartHere').getContext('2d');
  pieChart = new Chart(sansPercentagePieChartHere).Pie(pieData, pieOptions);
}

storedData.addEventListener('change',dataSelected);
storedData.addEventListener('change',percentageCompleteHandler);

if(document.getElementById('buildRecommendationTableHere')){
  buildTables(recomendationsArray,recomendationsHeaderArray,'buildRecommendationTableHere','SANS Cricital Conrtols Recommendations');
}
