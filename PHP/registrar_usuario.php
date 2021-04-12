<?php
	require('../DAO/snake_game.class.php');

	$nombre = $_POST['nombre'];
	$usuario = $_POST['usuario'];
	$password = $_POST['password'];

	$objGame = new Game;

	$consulta = $objGame->validar_usuario_para_registrar($usuario);
	if($consulta === FALSE) { 
    	die(mysql_error()); // TODO: better error handling
	}

	if($consulta != $usuario){
		$consulta1 = $objGame->registrar_usuario($nombre,$usuario,$password);
		if($consulta1 === FALSE) { 
	    	die(mysql_error()); // TODO: better error handling
		}
		echo $consulta;
		echo "registrado";
	}else{
		echo "existe";
	}
?>