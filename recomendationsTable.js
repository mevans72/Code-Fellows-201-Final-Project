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

buildTables(recomendationsArray,recomendationsHeaderArray,'listOfResultsId','SANS Cricital Conrtols Recommendations');
