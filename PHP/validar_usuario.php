<?php
	require('../DAO/snake_game.class.php');

	$usuario = $_POST['usuario'];
	$password = $_POST['password'];

	$objGame = new Game;

	$consulta = $objGame->validar_usuario($usuario);

	if($consulta === FALSE) { 
    	die(mysql_error()); // TODO: better error handling
	}

	if($consulta[0] == "error"){
		$data = array("error");
		echo json_encode($data, JSON_FORCE_OBJECT);
	}else{
		while($row = mysql_fetch_array($consulta)){
	    	if($row['username'] == $usuario && $row['password'] == $password){
	    		session_start();
	    		$_SESSION['full_name'] = $row['full_name'];
	    		$data = array("correcto", $_SESSION['full_name']);
				echo json_encode($data, JSON_FORCE_OBJECT);
			}else{
				$data = array("error");
				echo json_encode($data, JSON_FORCE_OBJECT);
			}
		}
	}
?>