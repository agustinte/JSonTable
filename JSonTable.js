/*! JSonTable v0.00.4 | (c) 2015, 2015 Agustín E. Tamborelli */
var data;
var lastkeySort = '';
var keySortOrdenAac = true;

function drawTable(vData, tableName, rows, actPage) {
	drawTable(vData, tableName, rows, actPage, '');
}

function drawTable(vData, tableName, rows, actPage, keySort) {
	data = vData;
	workTable(tableName, rows, actPage, keySort);
}

function workTable(tableName, rows, actPage, keySort) {
	try {
		
		// Ordena tabla
		if(keySort != ''){
			data = sortByKey(keySort);
		}
		
		drawTableTh(data, tableName, rows, actPage, keySort);
		
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
				pager.append("<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", 1, '')\">Inicio</a>");
				pager.append(" - ");
				pager.append("<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", " + (actPage - 1) +", '')\">Anterior</a>");
			}
			else
				pager.append("Inicio - Anterior ");
			
			// Fin	
			if(actPage != tot){
				pager.append(" - ");
				pager.append("<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", "+ (actPage + 1) + ", '')\">Siguiente</a>");
				pager.append(" - ");
				pager.append("<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", "+ tot + ", '')\">Fin</a>");
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

function drawTableTh(data, tableName, rows, actPage, keySort) {
	// Borra tabla
	var Table = document.getElementById(tableName);
	var link;
	var text;
	Table.innerHTML = "";	
	
	var keys = Object.keys(data[0]);
	
	var row = $("<tr />")
  $("#" + tableName).append(row); 

	for (var i = 0; i < keys.length; i++) {
		text = keys[i];
		if(keys[i] == keySort){
			if(keySortOrdenAac)
				text = text + "&#x25B2;";
			else
				text = text + "&#x25BC;";
		}
		link = "<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", " + actPage + ",'" + keys[i].trim() + "')\">" + text + "</a>";  
   	row.append($("<th>" + link + "</th>"));
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

function sortByKey(key) {
    if(lastkeySort == '')
			keySortOrdenAac = true;
		else if(lastkeySort == key){
			if(keySortOrdenAac == true)
				keySortOrdenAac = false;
			else
				keySortOrdenAac = true;
		} else {
			keySortOrdenAac = true;
		}
		lastkeySort = key;
		
    return data.sort(function(a, b) {
        var x, y;
        if(keySortOrdenAac){
        	x = a[key]; 
        	y = b[key];
        } else {
        	x = b[key]; 
        	y = a	[key];
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}