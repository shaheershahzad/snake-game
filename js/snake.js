var Game = (function(){
	//Se crea un objeto vacío.
	var my = {};

	//Se declaran e inicializan las variables globales.
	var mainMusic = $("#main_music").get(0),
	foodMusic = $("#food").get(0), 
	goMusic = $("#gameOver").get(0),
	name = "Player",
	level = 40,
	walls = true,
	pointsPerCatch = 5,
	musicSpeed = 1,
	paused = false,
	muted = false,
	challengeMode = false,
	autoMode = false,
	timeoutId,
	countDown = 60;

	//Las variables del elemento Canvas
	var canvas = $("#canvas").get(0);
	var ctx = canvas.getContext("2d");
	var width = $("#canvas").width();
	var height = $("#canvas").height();
	
	//Se instancian las variables de ancho de punto, la dirección, la comida y la puntuación
	//Se inicializa la variable de ancho de punto a 10
	var cellWidth = 10;
	var direction;
	var food;
	var score;
	
	//Se instancia el array de serpiente
	//El siguiente array se utilizará para crear la serpiente e incrementarle el tamaño
	var snake_array;

	//Se separan las funciones del Canvas de y del juego

	//**************************** Las funciones del Canvas ***********************
	var canvas_functions = (function(){
		return{
			//La siguiente función ejecuta el juego en el Canvas
			init: function(){
				//Dirección por defecto
				direction = "right";

				//Se llama a las funciones de crear la serpiente y crear la comida, respectivamente.
				canvas_functions.create_snake();
				canvas_functions.create_food();

				//Se inicializa la variable de la puntuación, que incrementará en función de la dificultad
				//del juego y las veces que se consigue atrapar la comida.
				score = 0;

				//Se pone la música de fondo
				mainMusic.play();
				mainMusic.playbackRate = musicSpeed;
				
				//El siguiente código ejecutará la función paint_snake con un temporizador
				//Por defecto, se pone en 60ms pero cambiará dependiendo de la dificultad seleccionada.
				if(typeof game_loop != "undefined") clearInterval(game_loop);
				game_loop = setInterval(canvas_functions.paint_snake, level);
			},

			//La siguiente función genera la serpiente para que luego pueda ser pintada en el Canvas.
			create_snake: function(){
				//Se guarda en una variable el length de la serpiente
				var length = 5;

				//Se inicializa el array de la serpiente (Vacío)
				snake_array = [];

				//El siguiente bucle creará una serpiente en posición horizontal.
				//Desde la parte superior izquierda del Canvas.
				for(var i = length-1; i>=0; i--) {
					//Las posiciones en el Canvas.
					snake_array.push({x: i, y:0});
				}
			},

			//La siguiente función creará la comida de la serpiente
			create_food: function(){
				//El siguiente código divide el ancho y el alto del Canvas entre el ancho de cada partícula
				//del Canvas. El resultado son las posiciones visibles del Canvas.
				//Por tanto, sólo creará la comida entre esas posiciones para que no se salga del Canvas.
				food = {
					x: Math.round(Math.random() * (width - cellWidth) / cellWidth), 
					y: Math.round(Math.random() * (height - cellWidth) / cellWidth), 
				};
			},

			//Las funciones anteriores creaban los elementos que se mostrarían en el Canvas.
			//Y la siguiente función es la que pintará dichos elementos en sus sitios.
			paint_snake: function(){
				//Para hacer las animaciones de los movimientos de la serpiente, y no dejar pintadas
				//las partículas en el Canvas, rellenaremos el fondo de negro en cada frame.

				//Pintamos el Canvas de negro.
				ctx.fillStyle = "black"; //#B0B774
				ctx.fillRect(0, 0, width, height);
				ctx.strokeStyle = "black";
				ctx.strokeRect(0, 0, width, height);
				
				//Ahora pasamos a escribir el código para mover la serpiente.
				//Se quita la última partícula del array y se coloca en la cabeza del mismo.
				//Se guardan las posiciones de las primeras partículas del array. 
				var headx = snake_array[0].x;
				var heady = snake_array[0].y;

				//These were the position of the head cell.
				//We will increment it to get the new head position
				//Lets add proper direction based movement now

				//Dependiendo de la dirección que tome la serpiente, se incrementará la x del array o la y
				if(direction == "right"){
					headx++;
				}else if(direction == "left"){
					headx--;
				}else if(direction == "up"){
					heady--;	
				}else if(direction == "down"){
					heady++;
				}

				//Ahora añadimos las condiciones de terminar la partida
				//Si se selecciona jugar con bordes en el canvas, el juego se terminará cuando la...
				//...serpiente toque algún borde.
				//O, cuando toque a si mismo.
				if(walls){
					$("#canvas").css("border", "10px solid #ff2d1c");
					if(headx == -1 || headx == width/cellWidth || heady == -1 || heady == height/cellWidth || canvas_functions.check_collision(headx, heady, snake_array)) {
						canvas_functions.gameOver("Game Over");
						if(score > 0){
							game_functions.save_score(name,score);
						}
						return;
					}
				}else{
					if(canvas_functions.check_collision(headx, heady, snake_array)) {
						canvas_functions.gameOver("Game Over");
						if(challengeMode){
							clearTimeout(timeoutId);
						}
						if(score > 0){
							game_functions.save_score(name,score);
						}
						return;
					}

					if(headx == -1 ){
						headx = width/cellWidth - 1;
					}else if (headx == width / cellWidth){
						headx = 0;
					}
					if(heady == -1){
						heady = height/cellWidth - 1;
					}
					else if (heady == height/cellWidth){
						heady = 0;
					}
				}

				//El siguiente código es para comprobar si la serpiente ha atrapado la comida o no.
				//Si la posición de la cabeza es igual que la posición de la comida, se le añade...
				//...una partícula a la serpiente así pues, incrementa su tamaño.
				//Y luego, se crea más comida.
				if(headx == food.x && heady == food.y) {
					foodMusic.play();
					var tail = {x: headx, y: heady};
					score += pointsPerCatch;

					//Se crea nueva partícula de comida.
					canvas_functions.create_food();
				}else{
					//Hasta que no se atrapa la comida, se le va quitando la última partícula al array.
					var tail = snake_array.pop();
					tail.x = headx; tail.y = heady;
				}
				
				//Se va añadiendo la última partícula del array como la primera del mismo.
				snake_array.unshift(tail);
				
				//El siguiente bucle va pintando el mismo nº de partículas en la posición de la serpiente...
				//...que el length del array.
				for(var i = 0; i < snake_array.length; i++) {
					var c = snake_array[i];
					//Lets paint 10px wide cells
					canvas_functions.paint_snake_cells(c.x, c.y, i);
				}
				
				//Ahora se pinta la partícula de la comida en el Canvas.
				canvas_functions.paint_food_cell(food.x, food.y);

				//El siguiente código muestra la puntuación en la página.
				var points = $('#usuario_puntos');
				points.html(score);
			},

			//La siguiente función pinta la partícula de la comida.
			//Se le debe pasar la posición x y la posición y del Canvas para pintar la comida.
			paint_food_apple:  function(x,y){
				var image = new Image();

				image.src = "img/apple.png";
				ctx.drawImage(image, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
			},

			paint_food_cell: function(x,y){
				ctx.fillStyle = "red";
				ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
			},

			paint_snake_cells: function(x,y,i){
				if(i != 0){
					ctx.fillStyle = "#9bcc99";
					ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
					ctx.strokeStyle = "black";
					ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
				}else{
					ctx.fillStyle = "yellow";
					ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
					ctx.strokeStyle = "black";
					ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
				}
			},

			//La siguiente función comprueba si la serpiente ha tocado a si mismo.
			check_collision: function(x,y,array){
				//A la función se le pasa la posición de la cabeza de la serpiente.
				//Si la posición de la cabeza es igual que la posición de alguna de las partículas del array...
				//...hay colisión. Por tanto, devuelve verdadero y termina el juego.
				for(var i = 0; i < array.length; i++){
					if(array[i].x == x && array[i].y == y){
						return true;
					}
				}
				//Si no hay colisión, devuelve falso.
				return false;
			},

			//La siguiente función simplemente reinicia el juego.
			restart: function(){
				canvas_functions.init();
			},

			gameOver: function(msg){
				clearInterval(game_loop);
				mainMusic.pause();
				goMusic.play();
				ctx.fillStyle = "black";
				ctx.fillText("|||||||||||||", 360, 150);
				ctx.font = "70px Metal";
				ctx.fillStyle = "#ff2d1c";
				ctx.textAlign = "center";
				ctx.fillText(msg + "!", 360, 150);
				$('#gameoverMenu').show();
			}
		};
	}());


	//**************************** Las funciones del Juego ***********************
	var game_functions = (function(){
		return{
			//La siguiente función para el juego.
			pauseGame: function(){
				clearInterval(game_loop);
				mainMusic.pause();
				paused = true;
			},

			//La siguiente función reanuda el juego.
			resumeGame: function(){
				game_loop = setInterval(canvas_functions.paint_snake, level);
				mainMusic.play();
				paused = false;
			},

			//La siguiente función quita la música.
			mute: function(){
				mainMusic.muted = true;
				foodMusic.muted = true;
				goMusic.muted = true;
				$("#sound").addClass("mute");
				muted = true;
			},

			//La siguiente función pone la música.
			unmute: function(){
				mainMusic.muted = false;
				foodMusic.muted = false;
				goMusic.muted = false;
				$("#sound").removeClass("mute");
				muted = false;
			},

			//La siguiente función cierra la sesión.
			logout: function(){
				$.ajax({
		            url: "./PHP/cerrar_sesion.php",
		            success: function(data){
		                if(data == "ok"){
		                    window.location.href = "index.html";
		                }else{
		                	if(!$("#gameoverMenu").is(':visible')){
		                    	game_functions.showError("Error on closing your session. Please try again.");
		                	}else{
		                		$("#errorAlert").css("margin-top", "25em");
		                		game_functions.showError("Error on closing your session. Please try again.");
		                	}
		                }       
		            }
		        });
			},

			//La siguiente función guarda la puntuación.
			save_score: function(name,score){
				$.ajax({
					url: "./PHP/guardar_puntuacion.php",
					data: "nombre=" +name[0] +"&puntuacion=" +score,
					type: "POST",
					success: function(data){
						if(data != "insertado"){
							if(!$("#gameoverMenu").is(':visible')){
		                    	game_functions.showError("Your score hasn't been saved correctly.");
		                	}else{
		                		$("#errorAlert").css("margin-top", "25em");
		                		game_functions.showError("Your score hasn't been saved correctly.");
		                	}
						}
					}
				});
			},

			//La siguiente función comprueba si ya hay una sesión iniciada.
			session_check: function(){
				$.ajax({
					url: "./PHP/comprobar_sesion.php",
					success: function(data){
						if(data == "no"){
							window.location.href = "index.html";
						}
					}
				});
			},

			//La siguiente función guarda el nombre del jugador y lo muestra en la página.
			player_name: function(){
				var full_name = location.search.split("name=")[1]
		        name = full_name.split("%20");
		        $('#nombre_usuario').html(name[0]);	
			},

			//La siguiente función muestra la tabla con las mejores puntuaciones de todo el juego.
			show_all_highscores: function(){
				$.ajax({
    			    url: "./PHP/highscores.php",
		            dataType: 'JSON',
		            success: function(data){
		            	var table = $("#highscores_table");
						var table_html = "";

		            	if($.isEmptyObject(data)){
		            		table_html += "<tr><td colspan='2'>No Scores. Be the first!</td></tr>";
		            		table.html("<center><table class='table'><tr><th colspan='2' id='highscores_title' align='center' valign='middle'>SNAKES HIGHSCORES</th></tr><tr><th>Player Name</th><th>Score</th></tr>" +table_html +"</table></center>");
		            	}else{			                
							for(var i in data){
								table_html += "<tr><td>" +data[i].nombre +"</td><td>" +data[i].score +"</td></tr>";
							}
							table.html("<center><table class='table'><tr><th colspan='2' id='highscores_title' align='center' valign='middle'>SNAKES HIGHSCORES</th></tr><tr><th>Player Name</th><th>Score</th></tr>" +table_html +"</table></center>");   
		            	}
		            	$("#highscores_table").fadeIn("slow");
						$("#menu").hide();
						$("#sound").hide();
						$("#cerrar_sesion").hide();
						$("#game_logo").hide();
						$("#back_to_main_menu").show();
		            }
		        });
			},

			//La siguiente función muestra la tabla con las mejores puntuaciones sólo del jugador.
			show_my_highscores: function(){
				$.ajax({
    			    url: "./PHP/highscoresMy.php",
    			    data: "nombre=" +name[0],
    			    type: "POST",
		            dataType: 'JSON',
		            success: function(data){
		            	var table = $("#highscores_table");
						var table_html = "";

		            	if($.isEmptyObject(data)){
		            		table_html += "<tr><td colspan='2'>You don't have any scores yet.</td></tr>";
		            		table.html("<center><table class='table'><tr><th colspan='2' id='highscores_title' align='center' valign='middle'>" +name[0]  +"'s HIGHSCORES</th></tr><tr><th>Player Name</th><th>Score</th></tr>" +table_html +"</table></center>");
		            	}else{
							for(var i in data){
								table_html += "<tr><td>" +data[i].nombre +"</td><td>" +data[i].score +"</td></tr>";
							}
							table.html("<center><table class='table'><tr><th colspan='2' id='highscores_title' align='center' valign='middle'>" +name[0]  +"'s HIGHSCORES</th></tr><tr><th>Player Name</th><th>Score</th></tr>" +table_html +"</table></center>");
		            	}

		            	$("#highscores_table").fadeIn("slow");
						$("#menu").hide();
						$("#sound").hide();
						$("#cerrar_sesion").hide();
						$("#game_logo").hide();
						$("#back_to_main_menu").show();
		            }
		        });
			},

			//La siguiente función asigna las funciones a las teclas.
			keyboard_controlls: function(){
				$(document).keydown(function(e) {
					var key = e.which;
					//Se ponen las siguientes condiciones para evitar una marcha atrás.
					//Y para asignar las funciones a las teclas.
					if(key == "37" && direction != "right"){
						direction = "left";
					}else if(key == "38" && direction != "down"){
						direction = "up";
					}else if(key == "39" && direction != "left"){
						direction = "right";
					}else if(key == "40" && direction != "up"){
						direction = "down";
					}else if(key == "77" && !muted){
						//M para quitar sonido.
						game_functions.mute();
					}else if(key == "77" && muted){
						//M para poner sonido si está quitado.
						game_functions.unmute();
					}else if(key == "80" && !paused){
						//P para pausar el juego.
						game_functions.pauseGame();
						if(challengeMode){
							clearTimeout(timeoutId);
						}
						ctx.font = "50px Metal";
						ctx.fillStyle = "#ff2d1c";
						ctx.textAlign = "center";
						ctx.fillText("PAUSED", canvas.width/2, canvas.height/2);
					}else if(key == "80" && paused){
						//P para reanudar el juego si está pausado.
						game_functions.resumeGame();
						if(challengeMode){
							timeoutId = setTimeout(game_functions.oneMinuteTimer, 1000);
						}
						ctx.fillStyle = "black"; //#B0B774
						ctx.fillRect(0, 0, canvas.width/2,canvas.height/2);
					}else if(key == "81"){ //Q para salir del juego.
						if(!$("#gameoverMenu").is(':visible')){
		                	mainMusic.pause();
		                	game_functions.pauseGame();
		                	if(challengeMode){
								clearTimeout(timeoutId);
							}
		                	bootbox.confirm("Want to quit?", function(result) {
			  					if(result){
			  						location.reload();
			  					}else{
			  						if(paused){
			                			mainMusic.play();
			                			game_functions.resumeGame();
			                			if(challengeMode){
											timeoutId = setTimeout(game_functions.oneMinuteTimer, 1000);
										}
			                		}else{
			                			mainMusic.play();
			                			if(challengeMode){
											timeoutId = setTimeout(game_functions.oneMinuteTimer, 1000);
										}
			                		}
			  					}
							});
						}
			        }
				})
			},

			//La siguiente función inicia el juego.
			start_game_button: function(){
				$("#menu").hide();
				$("#game_logo").hide();
				$("#highscores_table").hide();
				$("#canvas").show();
				$("#points_display").show();
				canvas_functions.init();
			},

			//La siguiente función muestra las opciones de dificultad.
			level_selection: function(){
				//var level_menu_html = "";

				/*level_menu_html = ('<div id="level_menu_1">')+
            						('<h2><i>SPEED LEVELS</i></h2>')+
            							('<select id="difficulty" class="form-control">')+
							                ('<option value="60">Very Easy</option>')+
							                ('<option value="50">Easy</option>')+
							                ('<option value="40">Medium</option>')+
							                ('<option value="30">Hard</option>')+
							                ('<option value="20">Master</option>')+
							            ('</select>')+

						            ('<div class="checkbox">')+
						                ('<label><input type="checkbox" checked value="yes" id="walls"> Walls</label>')+
						                ('<label><input type="checkbox" value="no" id="nowalls"> No Walls</label>')+
						            ('</div>')+
            						('<a href="#"><button id="btn-start" class="btn btn-primary btn-lg">Start</button></a>')+
        							('</div><br>')+
							        ('<div id="level_menu_2">')+
							            ('<h2><i>GAME MODES</i></h2>')+
							            ('<div id="auto"><h2><i><a id="autoMode" href="#">AUTO</a></i></h2></div>')+
							            ('<div id="challenge"><h2><i><a id="challengeMode" href="#">CHALLENGE</a></i></h2></div>')+
							        ('</div>')+
							        ('<a href="#"><button id="btn-return" class="btn btn-default btn-lg btn-block">Back</button></a>');
				*/
				$("#menu").hide();
				$("#game_logo").hide();
				$("#canvas").hide();
				$("#points_display").hide();
				$("#highscores_table").hide();
				$("#cerrar_sesion").hide();
				$("#sound").hide();
				//$("#level_menu").html(level_menu_html);
				$("#level_menu").show();
			},

			//La siguiente función coge las difcultades seleccionadas e inicia el juego dependiendo de ellas.
			start_game_button_levels: function(){
				$("#menu").hide();
				$("#level_menu").hide();
				$("#highscores_table").hide();

				if($("#walls").is(":checked")){
					walls = true;
				}else{
					walls = false;
				}

				level = $("#difficulty").val();
				switch(level){
					case "60":
						pointsPerCatch = 1;
						musicSpeed = 0.7;
						break;
					case "50":
						pointsPerCatch = 2;
						musicSpeed = 0.8;
						break;
					case "40":
						pointsPerCatch = 5;
						musicSpeed = 1;
						break;
					case "30":
						pointsPerCatch = 10;
						musicSpeed = 1.2;
						break;
					case "20":
						pointsPerCatch = 20;
						musicSpeed = 1.5;
						break;
				}

				$("#canvas").show();
				$("#points_display").show();
				canvas_functions.init();
			},

			//La siguiente función vuelve al menú principal.
			return_button: function(){
				location.reload();
			},

			//La siguiente función reinicia el juego.
			play_again_button: function(){
				$("#gameoverMenu").hide();
				$("#highscores_table").hide();
				$("#canvas").show();
				$("#points_display").show();
				if(challengeMode){
					countDown = 60;
					game_functions.oneMinuteTimer();
				}else{
					canvas_functions.restart();
				}
			},

			//La siguiente función lleva al menú principal.
			main_menu_button: function(){
				location.reload();
			},

			//La siguiente función inserta el gif de cargar, el texto y lo muestra para 800ms.
			loader: function(){
				$("#cargador").html('<center>Cargando...<br><img src="img/loading.gif"><center>');
				setTimeout(function() {
			        $("#cargador").fadeOut(500);
			    },800);
			},

			//La siguiente función cambia el sprite de sonido dependiendo de si está en silencio o no.
			sound_sprite_button: function(){
				if ( $( this ).attr("class") == "mute" ) {
		    		$("#sound").removeClass("mute");
		    		game_functions.unmute();
		  		} else {
		    		$("#sound").addClass("mute");
		    		game_functions.mute();
		  		}
			},

			/*highscores_button: function(){
				$("#highscores_table").fadeIn("slow");
				game_functions.show_all_highscores();
				$("#menu").hide();
				$("#back_to_main_menu").show();
			},*/

			//La siguiente función oculta todos los divs y sólo muestra el menú principal.
			back_to_main_menu_button: function(){
				$("#game_logo").show();
				$("#menu").fadeIn("slow");
				$("#sound").show();
				$("#cerrar_sesion").show();
				$("#highscores_table").hide();
				$("#instructions_table").hide();
				$("#level_menu").hide();
				$("#timer").hide();
				$("#creditsDiv").hide();
				$("#back_to_main_menu").hide();
			},

			//La siguiente función muestra la tabla de instrucciones.
			instructions_button: function(){
				var instructions_table = $("#instructions_table");
				var table_html = "";

				table_html += ("<tr><td><img height='50px' width='50px' src='img/Keys/computer_key_Arrow_Up.png'></td><td>Move Up</td></tr>")+
								("<tr><td><img height='50px' width='50px' src='img/Keys/computer_key_Arrow_Down.png'></td><td>Move Down</td></tr>")+
								("<tr><td><img height='50px' width='50px' src='img/Keys/computer_key_Arrow_Right.png'></td><td>Move to Right</td></tr>")+
								("<tr><td><img height='50px' width='50px' src='img/Keys/computer_key_Arrow_Left.png'></td><td>Move to Left</td></tr>")+
								("<tr><td><img height='50px' width='50px' src='img/Keys/computer_key_M.png'></td><td>Mute / Unmute</td></tr>")+
								("<tr><td><img height='50px' width='50px' src='img/Keys/computer_key_P.png'></td><td>Pause / Resume</td></tr>")+
								("<tr><td><img height='50px' width='50px' src='img/Keys/computer_key_Q.png'></td><td>Quit Game</td></tr>");
				instructions_table.html("<center><table class='table'><tr><th colspan='2' id='instructions_title' align='center' valign='middle'>GAME INSTRUCTIONS</th></tr><tr width='50%'><th>Key</th><th>Functionality</th></tr>" +table_html +"</table></center>");
				$("#menu").hide();
				$("#game_logo").hide();
				instructions_table.fadeIn("slow");
				$("#sound").hide();
				$("#cerrar_sesion").hide();
				$("#back_to_main_menu").show();
			},

			credits_button: function(){
				var credits_data = "";
				credits_data = ("<table><tr><td id='developer' colspan='2'><span>CREATED BY</span> SHAHEER SHAHZAD</td></tr><tr><td>&nbsp</td></tr>")+
								("<tr><td id='area'>Javascript Developer</td> <td id='contributors'>&nbspShaheer Shahzad</td></tr>")+
								("<tr><td id='area'>HTML & CSS Developer</td> <td id='contributors'>&nbspShaheer Shahzad</td></tr>")+
								("<tr><td id='area'>Design by</td> <td id='contributors'>&nbspShaheer Shahzad</td></tr>")+
								("<tr><td id='area'>Logo</td> <td id='contributors'>&nbspShaheer Shahzad & Photobucket</td></tr>")+
								("<tr><td id='area'>Fonts by</td> <td id='contributors'>&nbspdafont.com</td></tr></table>");
				$("#creditsDiv").html(credits_data);
				$("#menu").hide();
				$("#sound").hide();
				$("#creditsDiv").fadeIn();
				$("#cerrar_sesion").hide();
				$("#back_to_main_menu").show();
			},

			oneMinuteTimer: function(){
				$("#level_menu").hide();
				$("#timer").show();
				$("#canvas").show();
				$("#sound").show();
				$("#cerrar_sesion").show();
				$("#points_display").show();

				walls = false;
				challengeMode = true;

				$("#timer").css("font-family", "SFFedora");
				$("#timer").html(countDown);
				countDown--;

				level = 30;
	    		pointsPerCatch = 10;
	    		musicSpeed = 1.2;

				if(countDown < 10){
					if(countDown < 0){
						canvas_functions.gameOver("Time up");
	    			}else{
						$("#timer").css("color", "#ff2d1c");
						$("#timer").fadeOut();
						$("#timer").fadeIn();
		    			timeoutId = setTimeout(game_functions.oneMinuteTimer, 1000);
		    		}
	    		}else{
	    			timeoutId = setTimeout(game_functions.oneMinuteTimer, 1000);
	    		}
	    		if(countDown < 60 && countDown >= 59){
	    			$("#timer").css("color", "#333");
	    			canvas_functions.init();
	    		}
			},

			showError: function(errorMsg){
				var error = $("#errorAlert");
				error.html("<strong>" + errorMsg + "</strong>");
				error.show();
				setTimeout(function() { 
					error.fadeOut('slow');
				}, 3000);
			}
		};
	}());

	//Se crea la función initialise para tener todo el juego preparado para su uso.
	my.initialise = function(){
		game_functions.loader();
    	game_functions.session_check();
      	game_functions.player_name();
      	game_functions.keyboard_controlls();

      	//Level Menu Code
      	$('.checkbox input:checkbox').click(function() {
		   $('.checkbox input:checkbox').not(this).prop('checked', false);
		});
		$("#challengeMode").click(game_functions.oneMinuteTimer);
	  	$("#btn-start").click(game_functions.start_game_button_levels);
	  	$("#btn-return").click(game_functions.back_to_main_menu_button);
	  	//*****************************************************************

      	$("#start").click(game_functions.start_game_button);
      	$("#levels").click(game_functions.level_selection);
      	$("#playAgain").click(game_functions.play_again_button);
      	$("#mainMenu").click(game_functions.return_button);
      	$("#sound").click(game_functions.sound_sprite_button);
      	$("#highscores").click(game_functions.show_all_highscores);
      	$("#highscoresPlayer").click(game_functions.show_my_highscores);
      	$("#back_to_main_menu").click(game_functions.back_to_main_menu_button);
      	$("#instructions").click(game_functions.instructions_button);
      	$("#credits").click(game_functions.credits_button);
      	$("#cerrar_sesion").click(game_functions.logout);
      	$("#menu").fadeIn("slow");
	}

	return my;
}());

$(document).ready(function(){
	//Se ejecuta la función initialise
	Game.initialise();
});			