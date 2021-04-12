<?php 
include_once("conexion.class.php");

class Game{

 	//constructor	
 	var $con;
 	
 	function Game(){
 		$this->con = new DBManager;
 	}

 	///////////////////////////// Sentencias Nuevas \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

 	function validar_usuario($usuario){
		if($this->con->conectar() == true){
			if(mysql_num_rows(mysql_query("SELECT * FROM users WHERE username='".$usuario ."'")) == 0){
				return array("error");
			}else{
				return mysql_query("SELECT * FROM users WHERE username='".$usuario ."'");
			}
		}
	}

	function validar_usuario_para_registrar($usuario){
		if($this->con->conectar() == true){
			$sql = mysql_query("SELECT username FROM users WHERE username='".$usuario ."'");
			$row = mysql_fetch_assoc($sql);
			return $row['username'];
		}
	}

	function registrar_usuario($nombre,$usuario,$password){
		if($this->con->conectar() == true){
			return mysql_query("INSERT INTO users (full_name, username, password) VALUES ('".$nombre."', '".$usuario ."', '" .$password ."')");
		}
	}

	function highscores_all(){
		if($this->con->conectar() == true){
			return mysql_query("SELECT * FROM scores ORDER BY score DESC LIMIT 10"); //$row;
		}
	}

	function highscores_player($nombre){
		if($this->con->conectar() == true){
			return mysql_query("SELECT * FROM scores WHERE nombre='" .$nombre ."' ORDER BY score DESC LIMIT 10"); //$row;
		}
	}

	function guardar_puntuacion($nombre, $puntuacion){
		if($this->con->conectar() == true){
			return mysql_query("INSERT INTO scores (nombre, score) VALUES ('".$nombre."', '".$puntuacion ."')");
		}
	}

	///////////////////////////// Sentencias Antigüas \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	function obtener_plazas($curso){
		if($this->con->conectar() == true){
			$sql = mysql_query("SELECT n_plazas FROM cursos WHERE codigo=".$curso);
			$row = mysql_fetch_assoc($sql);
			return $row['n_plazas'];
		}
	}

	function insertar_alumnos($campos){
		if($this->con->conectar() == true){
			return mysql_query("INSERT INTO alumnos (dni, nombre, apellidos, telefono, poblacion) VALUES ('".$campos[0]."', '".$campos[1]."','".$campos[2]."','".$campos[3]."','".$campos[4]."')");
		}
	}

	function actualizar_plazas($curso){
		if($this->con->conectar() == true){
			return mysql_query("UPDATE cursos set n_plazas = n_plazas-1 WHERE codigo=".$curso);
		}
	}

	function mostrar_alumno($dni){
		if($this->con->conectar() == true){
			return mysql_query("SELECT * FROM alumnos WHERE dni=".$dni);
		}
	}

	function mostrar_alumnos($curso){
		if($this->con->conectar() == true){
			return mysql_query("SELECT * FROM alumnos RIGHT JOIN matriculas ON alumnos.dni = matriculas.dni WHERE matriculas.codigo =".$curso);
		}
	}

	function select_cursos(){
		if($this->con->conectar() == true){
			return mysql_query("SELECT codigo, titulo FROM cursos");
		}
	}
}
?>