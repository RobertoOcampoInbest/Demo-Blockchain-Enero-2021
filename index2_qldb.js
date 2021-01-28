// Prueba de toda la aplicacion para modificar tablas
const qldb = require('amazon-qldb-driver-nodejs');
const loadJsonFile = require('load-json-file');
var pack_value;

async function createTable(driver,table) {
    await driver.executeLambda(async (txn) => {
        await txn.execute("CREATE TABLE"+table);
    });
}

async function createIndex(driver,table,index) {
    await driver.executeLambda(async (txn) => {
        await txn.execute("CREATE INDEX ON " + table + index);
    });
}

async function insertDocument(driver,table,pack) {
    await driver.executeLambda(async (txn) => {
        await txn.execute("INSERT INTO " + table + " ?", pack);
    });
}

async function fetchDocuments(driver, table) {
    await driver.executeLambda(async (txn) => {
      // ejemplo instruccion = "SELECT firstName, age, lastName FROM People WHERE firstName = ?", "John"
        var result = await txn.execute("SELECT * FROM " + table);
        var resultList = result.getResultList();
        // Pretty print the result list
        console.log("The result List is ", JSON.stringify(resultList, null, 2));
        //var lista = JSON.stringify(resultList, null, 2);
        //console.log(JSON.stringify(resultList[0]._val.Votos.Partido1,null, 2))
    });
}

async function GetDocuments(driver, table) {
    await driver.executeLambda(async (txn) => {
      // ejemplo instruccion = "SELECT firstName, age, lastName FROM People WHERE firstName = ?", "John"
        var result = await txn.execute("SELECT * FROM " + table);
        var resultList = result.getResultList();
        // Pretty print the result list
        //var lista = JSON.stringify(resultList, null, 2);
        //console.log(JSON.stringify(resultList[0]._val.Votos.Partido1,null, 2))
    });
    return resultList;
}

async function updateDocuments(driver, table, pack) {
    await driver.executeLambda(async (txn) => {
      console.log("Updating table... \n");
      //ejemplo intruccionSet = "UPDATE" + table + "SET" + variableSet + "=" newvalorvariableSet + "WHERE" + wherecondition
        await txn.execute("UPDATE "+  table +   " SET _val = ? WHERE _key = ?",pack,"mykeypersonal");
    });
}

async function ViewMetadata(driver,table){
  await driver.executeLambda(async (txn) => {
      var result = await txn.execute("SELECT * FROM history(" + table + "  ,`2000T `, `2021-01-20T11:30:00Z` )");
      var resultList = result.getResultList();
      // Pretty print the result list
      console.log("The result List is ", JSON.stringify(resultList, null, 2));
    });
}

function genera_tabla() {
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // Crea las celdas
  for (var i = 0; i < 2; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode("celda en la hilera "+i+", columna "+j);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
}

async function main() {

  
    
    const driver = new qldb.QldbDriver("vehicle-registration");
    console.log("Bienvenido a la Demo de QLBD \n");
    //var continuar = 1;
    var table = "KVS1";
    //pack = await loadJsonFile('prueba1.json');
    //await  updateDocuments(driver, table, pack)

/*
    console.log("Create index on "");
    await createIndex(driver);
    console.log("Insert document");
    await insertDocument(driver);
    console.log("Fetch document");
    await fetchDocuments(driver);
    console.log("Update document");
    await updateDocuments(driver);
    */
    //console.log("Fetch document after update");

    //console.log("View Metadata");
    //await ViewMetadata(driver,table);
    //await fetchDocuments(driver, table);
    //var Listajosn = GetDocuments(driver,table);
    //crear_tabla(Listajosn)

    genera_tabla();
    driver.close();
}

main();

/*
function crear_tabla(Listajosn) {
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var datos = ["Fecha de emisión de paquete", "Hash", "Votos partido 1	", "Votos partido 2"	;
                "hash",JSON.stringify(resultList[0]._val.fecha,null, 2),JSON.stringify(resultList[0]._val.Votos.Partido1,null, 2),JSON.stringify(resultList[0]._val.Votos.Partido2,null, 2) ]

  // Crea las celdas
  for (var hilera_ind = 0; hilera_ind < 2; hilera_ind++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (var columna_ind = 0; columna_ind < 4; columna_ind++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(datos[hilera_ind, columna_ind]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
}
*/
