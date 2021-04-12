<?php
	require('../DAO/snake_game.class.php');

	$objGame = new Game;

	$consulta = $objGame->highscores_all();

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