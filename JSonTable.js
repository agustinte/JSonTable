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
  	
  	if (actPage == 1)
  		rDesde = 0;
  	else
			rDesde = (actPage - 1) * rows;
  	
  	if(((actPage * rows) - 1) < data.length - 1)
  		rHasta = (actPage * rows) - 1;
  	else
  		rHasta = data.length - 1;
		
  	// Dibuja Tabla
  	for (var i = rDesde; i <= rHasta; i++) {
  		drawRow(data[i], tableName);
  	}
  	
  	if(tot > 1){
	  	// Agrega paginado
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

			/*
	  	for (var i = 0; i < tot; i++) {
	  		if(i + 1 != actPage)
					pager.append("<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", " + (i + 1) + ")\">" + (i + 1) + "</a>");
	  		else
	  			pager.append(i + 1);
	  	}
	  	*/
  	}
  	 
	} catch (e) {
		alert("JSonTable error:" + e);	
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