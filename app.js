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
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function recreateCanvas(id, width, height) {
  // To fix the chartjs bug when you mouse over the chart, it changes
  //  after answering the 2nd question
  var canvas = document.getElementById(id);
  if (canvas) {
    canvas.parentNode.removeChild(canvas);
  }
  canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.width = width;
  canvas.height = height;
  document.getElementById("chartContainer").appendChild(canvas);
  return canvas;
}

function renderPercentageCompleteChart() {
  var canvas = recreateCanvas("percentageChart", "400", "400");
  var ctx = canvas.getContext("2d");
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
  var canvas = recreateCanvas("individualBarChart", "550", "400");
  var ctx = canvas.getContext("2d");
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

// The data used in the 2nd chart (individualBarChart) and
//  3rd chart (individualPieChart) is the same as instructed
function renderIndividualPieChart() {
  var canvas = recreateCanvas("individualPieChart", "550", "400");
  var ctx = canvas.getContext("2d");
  var chartData = [];
  for (var i = 0; i < keyArray.length; i++) {
    var rcolor = getRandomColor();
    chartData.push({
      label: keyArray[i],
      value: dataArray[i],
      color: rcolor,
      highlight: shadeColor(rcolor, 0.3)
    });
  }
  new Chart(ctx).Pie(chartData);
}

function percentageCompleteHandler(){
  countNumOfTotalQuestions();
  countNumOfQuestionsAnswerd();
  calcPercentageComplete();
  objectKeyExtraction();
  renderPercentageCompleteChart();
  renderIndividualBarChart();
  renderIndividualPieChart();
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
