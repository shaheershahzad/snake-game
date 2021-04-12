<?php
	require('../DAO/snake_game.class.php');

	$nombre = $_POST['nombre'];
	$puntuacion = $_POST['puntuacion'];

	$objGame = new Game;

	$consulta = $objGame->guardar_puntuacion($nombre, $puntuacion);
	if($consulta === FALSE) { 
    	die(mysql_error()); // TODO: better error handling
	}else{
		echo "insertado";
	}
?>