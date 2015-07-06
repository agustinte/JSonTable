# JSonTable
La libreria "JSonTable" dibuja una tabla en HTML a partir de datos serializados en formato JSON.
La version actual muestra todos los campos del JSON (permitiendo ocultar campos), le agrega un link para ordenar al encabezado de la tabla y agrega paginado a la tabla.

Para poder utilizar el metodo, es necesario incluir el encabezado de la tabla con el id en el codigo HTML.

drawTable(vData, tableName, rows, actPage, keySort, vArrNotShow)
 - vData (requerido): JSON para convertir a tabla 
 - tableName (requerido): id de la tabla que debe incluirse en el codigo HTML. El metodo drawTable rellena la tabla.
 - rows (requerido): cantidad de registros a mostrar por pagina.
 - actPage (requerido): pagina actual a mostrar.
 - keySort (opcional): nombre del campo a ordenar.
 - vArrNotShow (opcional): Array con los nombres de los campos a ocultar. Ejemplo "['Colmuna1', 'Columna4']"

Sobreescrituras permitidas:
- drawTable(vData, tableName, rows, actPage)
- drawTable(vData, tableName, rows, actPage, keySort)
- drawTable(vData, tableName, rows, actPage, keySort, vArrNotShow)

------------------------------
Pendiente (05-07-2015)
------------------------------
 - Permitir agregar links a columnas (informando una funcion javascript para seter el onclick de cada columna0)
