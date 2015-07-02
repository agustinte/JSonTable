/*! JSonTable v0.00.1 | (c) 2015, 2015 Agustín E. Tamborelli */
var data;

function drawTable(vData, tableName, rows, actPage) {
	data = vData;
	workTable(tableName, rows, actPage);
}

function workTable(tableName, rows, actPage) {
	try {
		drawTableTh(data, tableName);
		
  	// Calcula cantidad de páginas, desde y hasta
  	var tot = Math.ceil((data.length) / rows);
  	var rDesde, rHasta;
  	
  	rDesde = CalcRegDesde(actPage, rows);
  	rHasta = CalcRegHasta(actPage, rows, data.length);
  	
  	// Dibuja Tabla
  	for (var i = rDesde; i <= rHasta; i++) {
  		drawRow(data[i], tableName);
  	}
  	
  	// Paginado
  	if(tot > 1){
	  	var footer = $("<tfoot id='tfoot'	/>")
			$("#" + tableName).append(footer);
	
			var foottr = $("<tr id='tfootTR' />")
			$("#tfoot").append(foottr);
	
			var pager = $("<td colspan='2' />")
			$("#tfootTR").append(pager);	
	
			// Principio
			if(actPage != 1){
				pager.append("<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", 1)\">Inicio</a>");
				pager.append(" - ");
				pager.append("<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", " + (actPage - 1) +")\">Anterior</a>");
			}
			else
				pager.append("Inicio - Anterior ");
			
			// Fin	
			if(actPage != tot){
				pager.append(" - ");
				pager.append("<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", "+ (actPage + 1) + ")\">Siguiente</a>");
				pager.append(" - ");
				pager.append("<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", "+ tot + ")\">Fin</a>");
			}
			else
				pager.append(" Siguiente - Fin");

			pager.append(" | " + actPage + " - " + tot);

			pager.append("</tr>");
  	}
  	 
	} catch (e) {
		alert("JSonTable error: " + e);	
	}
}

function drawTableTh(data, tableName) {
	// Borra tabla
	var Table = document.getElementById(tableName);
	Table.innerHTML = "";	
	
	var keys = Object.keys(data[0]);
	
	var row = $("<tr />")
  $("#" + tableName).append(row); 

	for (var i = 0; i < keys.length; i++) {      
   	row.append($("<th>" + keys[i] + "</th>"));
  }
}

function drawRow(rowData, tableName) {
	var keys = Object.keys(rowData);

	var row = $("<tr />")
   $("#" + tableName).append(row); 

	for (var i = 0; i < keys.length; i++) {      
   	row.append($("<td>" + rowData[keys[i]] + "</td>"));
  }
}

function CalcRegDesde(actPage, rows){
	if (actPage == 1)
  	return 0;
	else
		return (actPage - 1) * rows;
}

function CalcRegHasta(actPage, rows, vlength){
	if(((actPage * rows) - 1) < vlength - 1)
  	return (actPage * rows) - 1;
	else
  	return vlength - 1;
}