<?php
/****************************************
**establecemos conexion con el servidor.
**nombre del servidor: localhost.
**Nombre de usuario: root.
**Contrase�a de usuario: root.
**Si la conexion fallara mandamos un msj 'ha fallado la conexion'**/
$url = mysqli_connect('mysql.hostinger.es','u248687387_root','Shaheershahzad96')or die ('Ha fallado la conexi�n: '.mysqli_error());

/*Luego hacemos la conexi�n a la base de datos. 
**De igual manera mandamos un msj si hay algun error*/
mysqli_select_db($url,'u248687387_users')or die ('Error al seleccionar la Base de Datos: '.mysqli_error());
 
/*capturamos nuestros datos que fueron enviados desde el formulario mediante el metodo POST
**y los almacenamos en variables.*/
$name = $_GET["name"];
$score = $_GET["score"];

mysqli_query($url,"insert into scores(`Name`, `Score`) values ('$name','$score')");

/*Mysql_close() se usa para cerrar la conexi�n a la Base de datos y es 
**necesario hacerlo para no sobrecargar al servidor, bueno en el caso de
**programar una aplicaci�n que tendr� muchas visitas ;) .*/
mysqli_close($url);
header('Location: http://shaheershahzad.esy.es/snake_game/');
exit;
?>