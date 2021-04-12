<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
        <link rel="icon" type="image/jpg" href="http://shaheershahzad.esy.es/snake_game/snake_fav.png" sizes="16x16">
        <?php
             //creamos la sesion
               session_start();
             //validamos si se ha hecho o no el inicio de sesion correctamente
             //si no se ha hecho la sesion nos regresará a login.php
               if(!isset($_SESSION['usuario'])){
                  header('Location: http://shaheershahzad.esy.es/start_session/login.php'); 
                  exit();
               }
        ?>
	<title>Snake Game</title>
        <!-- Jquery -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
        	<style>
                body {
                  background-color: #5DD959;
                }

		#menu, #gameoverMenu {
		  width: 300px;
		}

		ul {
		  list-style-type: none;
		  margin: 0;
		  padding: 0;
		  background-color: #5DD959;
		}

		li {
		  font: 200 20px/1.5 Helvetica, Verdana, sans-serif;
		  border-bottom: 1px solid #ccc;
		}

		li:last-child {
		  border: none;
		}

		li a {
		  text-decoration: none;
		  color: #000;
		  display: block;
		  width: 300px;

		  -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
		  -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
		  -o-transition: font-size 0.3s ease, background-color 0.3s ease;
		  -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
		  transition: font-size 0.3s ease, background-color 0.3s ease;
		}

		li a:hover {
		  font-size: 25px;
		  background: #f6f6f6;
		}

                select#difficulty {
                  display: block;
                  margin-bottom: 1em;
                }
	</style>
</head>
<body>
<center>

<!--Main  Menu-->
<div id="menu">
     <ul>
     <li><a href="#" id="start">Start<a></li>
     <li><a href="#" id="levels">Levels<a></li>
     <li><a href="#" id="options">Options<a></li>
     <li><a href="http://shaheershahzad.esy.es/start_session/highscores.php" id="highscores">High Scores<a></li>
     <li><a href="#" id="instructions">Instructions<a></li>
     <li><a href="#" id="credits">Credits<a></li>
     </ul>
</div>

<!--Difficulty Options-->
<div id="level_menu" style="display:none;">
<select id="difficulty">
     <option value="60">Very Easy</option>
     <option value="50">Easy</option>
     <option value="40">Medium</option>
     <option value="30">Hard</option>
     <option value="20">Master</option>
</select>
<input type="button" value="Start" id="btn-start">&nbsp<input type="button" value="Return" id="btn-return">
</div>

<!-- Lets make a simple snake game -->
<canvas id="canvas" width="950" height="450" style="display:none;"></canvas>

<!--Secondary Menu-->
<div id="gameoverMenu" style="display:none;">
     <ul>
     <li><a href='#' id="playAgain">Play Again</a></li>
     <li><a href='#' id="mainMenu">Main Menu</a></li>
     </ul>
</div>

<div id="result"></div>

<h3 id="points_display" style="display:none;"><?php echo ucwords($_SESSION['usuario']) ?>, your score is <p id="usuario_puntos" style="display:inline-block;"></p></h3>

<a href="http://shaheershahzad.esy.es/start_session/logout.php" style="display:block;margin-top:1em;">Log Out</a>

</center>

<!-- Audio -->
<audio id="main_music" loop>
	<source src="http://dl.dropbox.com/u/26141789/canvas/snake/main.mp3" type="audio/mp3" />
	<source src="http://dl.dropbox.com/u/26141789/canvas/snake/main.ogg" type="audio/ogg"/>
</audio>

<audio id="gameOver">
	<source src="http://dl.dropbox.com/u/26141789/canvas/snake/go.mp3" type="audio/mp3" />
	<source src="http://dl.dropbox.com/u/26141789/canvas/snake/go.ogg" type="audio/ogg"/>
</audio>

<audio id="food">
	<source src="http://dl.dropbox.com/u/26141789/canvas/snake/food.mp3" type="audio/mp3" />
	<source src="http://dl.dropbox.com/u/26141789/canvas/snake/food.ogg" type="audio/ogg"/>
</audio>
<script src="snake.js"></script>
</body>
</html>		