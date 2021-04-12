var Login = (function(){
	var my = {};

	var validation_functions = (function(){
		return{
			userValidation: function(){
				event.preventDefault();
				var usuario = $("#usuario").val();
				var password = $("#password").val();

				if(usuario.length == 0 && password.length == 0){
					$("#usernameInput, #passwordInput").attr("class","form-group has-error");
					$("#usernameInput .col-xs-3 span, #passwordInput .col-xs-3 span").attr("class","glyphicon glyphicon-remove form-control-feedback");
				}else if(usuario.length > 0 && password.length == 0){
					$("#passwordInput").attr("class","form-group has-error");
					$("#passwordInput .col-xs-3 span").attr("class", "glyphicon glyphicon-remove form-control-feedback");
					
					$("#usernameInput").attr("class","form-group has-success");
					$("#usernameInput .col-xs-3 span").attr("class", "glyphicon glyphicon-ok form-control-feedback");
				}else if(usuario.length == 0 && password.length > 0){
					$("#passwordInput").attr("class","form-group has-success");
					$("#passwordInput .col-xs-3 span").attr("class", "glyphicon glyphicon-ok form-control-feedback");

					$("#usernameInput").attr("class","form-group has-error");
					$("#usernameInput .col-xs-3 span").attr("class", "glyphicon glyphicon-remove form-control-feedback");
				}else{
					$("#usernameInput, #passwordInput").attr("class","form-group");
					$("#usernameInput .col-xs-3 span, #passwordInput .col-xs-3 span").attr("class", "");
					$.ajax({
						url: "./PHP/validar_usuario.php",
						type: "POST",
						data: "submit=&usuario="+usuario+"&password="+password,
						dataType: "JSON",
						success: function(data){
							if(data[0] == "correcto"){
								window.location.href = "index_game.html?name=" + data[1];
							}else{
								validation_functions.showError("Incorrect password or username! Please try again.");
								$("#form_login").trigger("reset");
								$("#usuario").focus();
							}
						}
					});
				}
			},

			userRegistration: function(){
				event.preventDefault();
				var nombre = $("#fullname_registro").val();
				var usuario = $("#usuario_registro").val();
				var password = $("#password_registro").val();

				if(nombre.length == 0){
					$("#registerNameInput").attr("class","form-group has-error");
					$("#registerNameInput .col-xs-3 span").attr("class","glyphicon glyphicon-remove form-control-feedback");
				}else{
					$("#registerNameInput").attr("class","form-group has-success");
					$("#registerNameInput .col-xs-3 span").attr("class","glyphicon glyphicon-ok form-control-feedback");
				}

				if(usuario.length == 0){
					$("#registerUsernameInput").attr("class","form-group has-error");
					$("#registerUsernameInput .col-xs-3 span").attr("class","glyphicon glyphicon-remove form-control-feedback");
				}else{
					$("#registerUsernameInput").attr("class","form-group has-success");
					$("#registerUsernameInput .col-xs-3 span").attr("class","glyphicon glyphicon-ok form-control-feedback");
				}

				if(password.length == 0){
					$("#registerPasswordInput").attr("class","form-group has-error");
					$("#registerPasswordInput .col-xs-3 span").attr("class","glyphicon glyphicon-remove form-control-feedback");
				}else{
					$("#registerPasswordInput").attr("class","form-group has-success");
					$("#registerPasswordInput .col-xs-3 span").attr("class","glyphicon glyphicon-ok form-control-feedback");
				}

				if(nombre.length > 0 && usuario.length > 0 && password.length > 0){
					$.ajax({
						url: "./PHP/registrar_usuario.php",
						type: "POST",
						data: "submit=&nombre="+nombre+"&usuario="+usuario+"&password="+password,
						success: function(data){
							if(data == "registrado"){
								validation_functions.showLoginForm();
								$("#usuario").focus();
								validation_functions.showSuccess("You've been registered!");
							}else if(data == "existe"){
								validation_functions.showWarning("The username is already taken. Please choose another username.");
								$("#registerPasswordInput, #registerUsernameInput, #registerNameInput").attr("class","form-group");
								$("#registerPasswordInput .col-xs-3 span, #registerUsernameInput .col-xs-3 span, #registerNameInput .col-xs-3 span").attr("class","");
								$("#form_registrar").trigger("reset");
								$("#fullname_registro").focus();
							}else{
								validation_functions.showError("We are unable to register you! Please try later.");
							}
						}
					});
				}
			},

			sessionCheck: function(){
				$.ajax({
					url: "./PHP/comprobar_sesion.php",
					success: function(data){
						if(data != "no"){
							window.location.href = "index_game.html?name=" + data;
						}
					}
				});
			},

			inputsFocus: function(){
				//Login Form
				$("#usuario").focus(function(){
					$("#usernameInput").attr("class","form-group");
					$("#usernameInput .col-xs-3 span").attr("class","");
				});

				$("#password").focus(function(){
					$("#passwordInput").attr("class","form-group");
					$("#passwordInput .col-xs-3 span").attr("class","");
				});

				//Register Form
				$("#fullname_registro").focus(function(){
					$("#registerNameInput").attr("class","form-group");
					$("#registerNameInput .col-xs-3 span").attr("class","");
				});

				$("#usuario_registro").focus(function(){
					$("#registerUsernameInput").attr("class","form-group");
					$("#registerUsernameInput .col-xs-3 span").attr("class","");
				});

				$("#password_registro").focus(function(){
					$("#registerPasswordInput").attr("class","form-group");
					$("#registerPasswordInput .col-xs-3 span").attr("class","");
				});
			},

			showLoginForm: function(){
				$("#usernameInput, #passwordInput").attr("class","form-group");
				$("#usernameInput .col-xs-3 span, #passwordInput .col-xs-3 span").attr("class","");
				$("#usuario, #password").val("");
				$("#login_form").show();
				$("#register_form").hide();
			},

			showRegisterForm: function(){
				$("#registerPasswordInput, #registerUsernameInput, #registerNameInput").attr("class","form-group");
				$("#registerPasswordInput .col-xs-3 span, #registerUsernameInput .col-xs-3 span, #registerNameInput .col-xs-3 span").attr("class","");
				$("#login_form").hide();
				$("#fullname_registro, #usuario_registro, #password_registro").val("");
				$("#register_form").show();
			},

			showSuccess: function(successMsg){
				var success = $("#successAlert");
				success.html("<strong>" + successMsg + "</strong>");
				success.show();
				setTimeout(function() { 
					success.fadeOut('slow');
				}, 3000);
			},

			showError: function(errorMsg){
				var error = $("#errorAlert");
				error.html("<strong>" + errorMsg + "</strong>");
				error.show();
				setTimeout(function() { 
					error.fadeOut('slow');
				}, 3000);
			},

			showWarning: function(warningMsg){
				var warning = $("#warningAlert");
				warning.html("<strong>" + warningMsg + "</strong>");
				warning.show();
				setTimeout(function() { 
					warning.fadeOut('slow');
				}, 3000);
			}
		};
	}());

	my.init = function(){
		validation_functions.sessionCheck();
		validation_functions.inputsFocus();
		$("#usuario, #password").val("");
		$("#fullname_registro, #usuario_registro, #password_registro").val("");
		$("#submit").click(validation_functions.userValidation);
		$("#crear_cuenta").click(validation_functions.showRegisterForm);
		$("#registrar").click(validation_functions.userRegistration);
		$("#iniciar_sesion").click(validation_functions.showLoginForm);
	}

	return my;
}());

$(document).ready(function(){
	Login.init();
});