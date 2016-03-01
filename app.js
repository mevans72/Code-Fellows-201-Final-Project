'use strict';

// var complianceAudit = function(questionNum, questAnswer){
//   this.questionNum = questionNum;
//   this.questAnswer = [];
//   this.recommendationNum = recommendationNum;
//   this.auditAnsweredResults = [];
//   this.auditComplianceResults = [];
// };
//
// var question1 = new complianceAudit('question1','questAnswer1');
// var question2 = new complianceAudit('question2', 'questAnswer2');
// var question3 = new complianceAudit('question3', 'questAnwer3');
// var question1 = new complianceAudit('question4', 'questAnwer4');
// var question2 = new complianceAudit('question5', 'questAnwer5');
// var question3 = new complianceAudit('question6', 'questAnwer6');
// var question1 = new complianceAudit('question7', 'questAnwer7');
// var question2 = new complianceAudit('question8', 'questAnwer8');
// var question3 = new complianceAudit('question9', 'questAnwer9');
// var question1 = new complianceAudit('question10', 'questAnwer10');
// var question1 = new complianceAudit('question11', 'questAnwer11');
// var question2 = new complianceAudit('question12', 'questAnwer12');
// var question3 = new complianceAudit('question13', 'questAnwer13');
// var question1 = new complianceAudit('question14', 'questAnwer14');
// var question2 = new complianceAudit('question15', 'questAnwer15');
// var question3 = new complianceAudit('question16', 'questAnwer16');
// var question1 = new complianceAudit('question17', 'questAnwer17');
// var question2 = new complianceAudit('question18', 'questAnwer18');
// var question3 = new complianceAudit('question19', 'questAnwer19');
// var question1 = new complianceAudit('question20', 'questAnwer20');

var answers = {};
var displayedResults = document.getElementById('question1');
var questAnswers = [];

function dataSelected(event){
  var objKey = event.target.id;
  answers[objKey] = event.target.value;
  console.log(answers);
}


storedData.addEventListener('change', dataSelected);


function answersConversion(){
  var dataArray = Object.keys(answers).map(function(e) { return answers[e]; } );
  console.log(dataArray);
}
answersConversion();
