'use strict';

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
  var dataArray = Object.keys(answers).map(function(e) { return parseInt(answers[e]); } );
  console.log(dataArray);
}
answersConversion();


var ctx = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(ctx).PolarArea(data);

var myDoughnutChart = new Chart(ctx[1]).Doughnut(data,options);

var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
]
