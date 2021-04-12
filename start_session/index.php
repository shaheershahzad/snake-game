<?php
//creamos la sesion
session_start();
//validamos si se ha hecho o no el inicio de sesion correctamente
//si no se ha hecho la sesion nos regresará a login.php
if(!isset($_SESSION['usuario'])) 
{
  header('Location: login.php'); 
  exit();
}
 ?>
<link rel="icon" type="image/jpg" href="http://shaheershahzad.esy.es/snake_game/snake_fav.png" sizes="16x16">
<title>Welcome</title>
  <h1>BIENVENIDO, <?php echo $_SESSION['usuario'] ?></h1>
  <a href="logout.php">Cerrar Sesión</a>
 <?
?>
