# JSonTable
La libreria "JSonTable" dibuja una tabla en HTML a partir de datos serializados en formato JSON.
La version actual muestra todos los campos del JSON, le agrega un link para ordenar por campo y paginado a la tabla.

Para poder utilizar el metodo, es necesario incluir el encabezado de la tabla con el id en el codigo HTML. Por ejemplo
"<table id="tableSample">
</table>"

drawTable(vData, tableName, rows, actPage, keySort)
 - vData (requerido): JSON para convertir a tabla 
 - tableName (requerido): id de la tabla que debe incluirse en el codigo HTML. El metodo drawTable rellena la tabla.
 - rows (requerido): cantidad de registros a mostrar por pagina.
 - actPage (requerido): pagina actual a mostrar.
 - keySort (opcional): nombre del campo a ordenar.
