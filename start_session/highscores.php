<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>High Scorers</title>
</head>
<body>
	<?php
		//establecer conexión
		$db = mysqli_connect('mysql.hostinger.es','u248687387_root','Shaheershahzad96');
		if(mysqli_connect_errno($db) != 0){
			echo "No se ha podido conectar!<br>";
			exit();
		}
		//Selecciono la BD con la que quiero trabajar
		mysqli_select_db($db,'u248687387_users');
		if(mysqli_errno($db) != 0){
			echo "No se ha podido seleccionar la Base de datos!<br>";
			exit();
		}
		//Mostrar datos de la tabla users
		$sql = 'select * from scores order by Score desc limit 10';
		$resultado = mysqli_query($db,$sql);
		if(mysqli_errno($db) != 0){
			echo "No se ha podido ejecutar el select!<br>";
			exit();
		}
		//Recorro y muestro los resultados del select
		echo "<table border>";
		echo "<tr><th>Player Name</th><th>Score</th></tr>";
		while($fila = mysqli_fetch_array($resultado)){
			echo "<tr>";	
			echo "<td>" .$fila[0] ."</td>";
			echo "<td>" .$fila[1] ."</td>";
			echo "</tr>";
		}
		echo "</table>";
                echo "<a href='http://shaheershahzad.esy.es/snake_game/'><button>Back</button></a>";
		mysqli_free_result($resultado);
		mysqli_close($db);
	?>
</body>
</html>