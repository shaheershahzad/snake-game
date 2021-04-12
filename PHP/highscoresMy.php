<?php
	require('../DAO/snake_game.class.php');

	$nombre = $_POST['nombre'];
	$objGame = new Game;

	$consulta = $objGame->highscores_player($nombre);

	if($consulta === FALSE) { 
    	die(mysql_error()); // TODO: better error handling
    	echo "error";
	}

	$rows = [];
	while($row = mysql_fetch_array($consulta)){
    	$rows[] = $row;
	}
	//echo $consulta;
	echo json_encode($rows, JSON_FORCE_OBJECT);
?>