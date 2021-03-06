/*! JSonTable v0.00.4 | (c) 2015, 2015 Agust�n E. Tamborelli */
var eData;
var eLastkeySort = '';
var eKeySortOrdenAac = true;
var eArrNotShow, eArrNotShowIndex = [];
var eArrColumnLinks, eArrColumnLinksIndex = [];

// Constructores

function drawTable(vData, tableName, rows, actPage) {
	eData = vData;
	workTable(tableName, rows, actPage, '');
}

function drawTable(vData, tableName, rows, actPage, keySort) {
	eData = vData;
	workTable(tableName, rows, actPage, keySort);
}

function drawTable(vData, tableName, rows, actPage, keySort, vArrNotShow) {
	eData = vData;
	eArrNotShow = vArrNotShow;
	workTable(tableName, rows, actPage, keySort);
}

function drawTable(vData, tableName, rows, actPage, keySort, vArrNotShow, vColumnLinks) {
	eData = vData;
	eArrNotShow = vArrNotShow;
	eArrColumnLinks = vColumnLinks;
	
	workTable(tableName, rows, actPage, keySort);
}

// fin Constructores

function workTable(tableName, rows, actPage, keySort) {
	try {
		SetIndexKeyNotShow();
		
		// Ordena tabla
		if(keySort != ''){
			eData = sortByKey(keySort);
		}
		
		drawTableTh(eData, tableName, rows, actPage, keySort);
		
  	// Calcula cantidad de p�ginas, desde y hasta
  	var tot = Math.ceil((eData.length) / rows);
  	var rDesde, rHasta;
  	
  	rDesde = CalcRegDesde(actPage, rows);
  	rHasta = CalcRegHasta(actPage, rows, eData.length);
  	
  	// Dibuja Tabla
  	for (var i = rDesde; i <= rHasta; i++) {
  		drawRow(eData[i], tableName);
  	}
  	
  	// Paginado
  	if(tot > 1){
	  	var footer = $("<tfoot id='tfoot'	/>")
			$("#" + tableName).append(footer);
	
			var foottr = $("<tr id='tfootTR' />")
			$("#tfoot").append(foottr);
	
			var pager = $("<td colspan='" + Object.keys(eData[0]).length + "' />")
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
		if($.inArray(i, eArrNotShowIndex) == -1){
			if(keys[i] == keySort){
				if(eKeySortOrdenAac)
					text = text + "&#x25B2;";
				else
					text = text + "&#x25BC;";
			}
			link = "<a href='#' onclick=\"workTable('" + tableName + "', " + rows + ", " + actPage + ",'" + keys[i].trim() + "')\">" + text + "</a>";  
	   	row.append($("<th>" + link + "</th>"));
	  }
	}
}

function drawRow(rowData, tableName) {
	try {
		var lFunction = '';
		var keys = Object.keys(rowData);
		var row = $("<tr />")
   	$("#" + tableName).append(row); 

		for (var i = 0; i < keys.length; i++) {
			if($.inArray(i, eArrNotShowIndex) == -1){
				
				lFunction = GetFunction(rowData, keys[i]);
				
				if(lFunction != ''){
					row.append($("<td><a href='#' onclick=\"" + lFunction + "\">" + rowData[keys[i]] + "</a></td>"));
				} else {
   				row.append($("<td>" + rowData[keys[i]] + "</td>"));
   			}
  		}
		}
	} catch (e) {
		alert("Error en drawRow: " + e);
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
    if(eLastkeySort == '')
			eKeySortOrdenAac = true;
		else if(eLastkeySort == key){
			if(eKeySortOrdenAac == true)
				eKeySortOrdenAac = false;
			else
				eKeySortOrdenAac = true;
		} else {
			eKeySortOrdenAac = true;
		}
		eLastkeySort = key;
		
    return eData.sort(function(a, b) {
        var x, y;
        if(eKeySortOrdenAac){
        	x = a[key]; 
        	y = b[key];
        } else {
        	x = b[key]; 
        	y = a	[key];
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function SetIndexKeyNotShow(){
	try {
		if(eArrNotShow != ''){
			// Obtiene las claves de la tabla
			var keys = Object.keys(eData[0]);
			for (var i = 0; i < keys.length; i++) {
				if($.inArray(keys[i], eArrNotShow) != -1)
					eArrNotShowIndex.push(i);
			}
	}
	} catch (e) {
		alert("Error en SetIndexKeyNotShow: " + e)
	}
}

function GetFunction(vReg, vKey){
	
	// eArrColumnLinks, eArrColumnLinksIndex
	var txt = '';
	var lFunction, Value;
	
	try {
		if(eArrColumnLinks != '' && eArrColumnLinks != undefined){
			// Obtiene las claves
			var keys = Object.keys(vReg);
			
			for (var i = 0; i < eArrColumnLinks.length; i++) {
				if(vKey == eArrColumnLinks[i].split(';')[0]){
					lFunction = eArrColumnLinks[i].split(';')[1];
					Value = vReg[eArrColumnLinks[i].split(';')[2]]
					txt = lFunction + "('" + Value + "');"
				}
			}
		}
	} catch (e) {
		alert("Error al obtener funcion: " + e)
	}
	return txt;
}  