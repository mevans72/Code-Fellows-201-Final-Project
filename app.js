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
  // console.log('The KEY '' + event.target.id + '' was updated with a VALUE of '' + event.target.value + ''');
}

function checkLocalStorageExistance(){
  if(window.localStorage.length !== 0) {
    var storedAnswersData = localStorage.getItem('answers');
    var answersData = JSON.parse(storedAnswersData);
    var answers = answersData;
    console.log(answersData);
  }
}

function updateLocalStorage (){
  var storedAnswersData = JSON.stringify(answers);
  localStorage.setItem('answers',storedAnswersData);
  console.log('Local storage has been updated.');
}

function objectKeyExtraction() {
  //keyArray = [];
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

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function shadeColor(color, percent) {
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return '#'+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function recreateCanvas(id, width, height) {
  // To fix the chartjs bug when you mouse over the chart, it changes
  //  after answering the 2nd question
  var canvas = document.getElementById(id);
  if (canvas) {
    canvas.parentNode.removeChild(canvas);
  }
  canvas = document.createElement('canvas');
  canvas.id = id;
  canvas.width = width;
  canvas.height = height;
  document.getElementById('chartContainer').appendChild(canvas);
  return canvas;
}

function renderPercentageCompleteChart() {
  var canvas = recreateCanvas('percentageChart', '400', '400');
  var ctx = canvas.getContext('2d');
  var chartData = [{
    value: numOfQuestionsAnswerd,
    color: '#69BE28',
    highlight: '#457E1A',
    label: 'Questions Answered'
  }, {
    value: numOfTotalQuestions - numOfQuestionsAnswerd,
    color: '#002C5F',
    highlight: '#002244',
    label: 'Remaining Questions'
  }];
  new Chart(ctx).Pie(chartData);
}

function renderIndividualBarChart() {
  var canvas = recreateCanvas('individualBarChart', '550', '400');
  var ctx = canvas.getContext('2d');
  var chartData = {
    labels: keyArray,
    datasets: [{
      label: 'My dataset',
      fillColor: '#69BE28',
      strokeColor: '#002244',
      highlightFill: '#457E1A',
      highlightStroke: '#002C5F',
      data: keyValueArray
    }]
  };
  new Chart(ctx).Bar(chartData);
}

// The data used in the 2nd chart (individualBarChart) and
//  3rd chart (individualPieChart) is the same as instructed
function renderIndividualPieChart() {
  var canvas = recreateCanvas('individualPieChart', '550', '400');
  var ctx = canvas.getContext('2d');
  var chartData = [];
  for (var i = 0; i < keyArray.length; i++) {
    var rcolor = getRandomColor();
    chartData.push({
      label: keyArray[i],
      value: keyValueArray[i],
      color: rcolor,
      highlight: shadeColor(rcolor, 0.3)
    });
  }
  new Chart(ctx).PolarArea(chartData);

}

function percentageCompleteHandler(){
  countNumOfTotalQuestions();
  countNumOfQuestionsAnswerd();
  calcPercentageComplete();
  securityScoresObjectKeyValueExtraction();
  objectKeyExtraction();
  renderPercentageCompleteChart();
  renderIndividualBarChart();
  renderIndividualPieChart();
  renderIndividualPolarChart();
  updateLocalStorage();
  checkLocalStorageExistance();
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

storedData.addEventListener('change', dataSelected);
storedData.addEventListener('change', percentageCompleteHandler);

//buildTables(recomendationsArray,recomendationsHeaderArray,'listOfResultsId','SANS Cricital Conrtols Recommendations');
// function destroyExistingBarChart() {
//   if (barChart != null) {
//     barChart.destroy();
//   }
// }

// function destroyExistingPieChart() {
//   if (PieChart != null) {
//     PieChart.destroy();
//   }
// }

// function destroyExistingPolarChart() {
//   if (polarChart != null) {
//     PolarChart.destroy();
//   }
// }

function renderIndividualPolarChart() {
  var canvas = recreateCanvas('buildSansCriticalControlsPolarChartHere', '400', '400');
  var polarChart = canvas.getContext('2d');


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

  new Chart(polarChart).PolarArea(polarData);

  // var sansCriticalControlsPolarChart = document.getElementById('buildSansCriticalControlsPolarChartHere').getContext('2d');
  // polarChart = new Chart(sansCriticalControlsPolarChart).PolarArea(polarData);
}

// function buildSansCriticalControlsBarChart() {
//   destroyExistingBarChart();
//   // objectKeyValueExtraction();
//   var barData = {
//     labels: sansCriticalControlsBarChartLabelsArray,
//     datasets: [{
//       fillColor: '#002C5F',
//       strokeColor: '#69BE28',
//       data: keyValueArray
//     }]
//   };
//   var sansCriticalControlsBarChart = document.getElementById('buildSansCriticalControlsBarChartHere').getContext('2d');
//   barChart = new Chart(sansCriticalControlsBarChart).Bar(barData);
// }

// function buildPercentagePieChart() {
//   destroyExistingPieChart();
//   // objectKeyValueExtraction();
//   var pieData = [{
//     value: percentageComplete,
//     color: '#002C5F'
//   },
//     {
//       value: percentageNotComplete,
//       color: '#69BE28'
//     }
//   ];
//
//   var pieOptions = {
//     segmentShowStroke : false,
//     animateScale : true
//   };
//
//   var sansPercentagePieChartHere = document.getElementById('buildPercentagePieChartHere').getContext('2d');
//   pieChart = new Chart(sansPercentagePieChartHere).Pie(pieData, pieOptions);
// }

storedData.addEventListener('change',dataSelected);
storedData.addEventListener('change',percentageCompleteHandler);

if(document.getElementById('buildRecommendationTableHere')){
  buildTables(recomendationsArray,recomendationsHeaderArray,'buildRecommendationTableHere','SANS Cricital Conrtols Recommendations');
}
