<link rel="icon" type="image/jpg" href="http://shaheershahzad.esy.es/snake_game/snake_fav.png" sizes="16x16">
<title>Login</title>
<form action="validar_usuario.php" method="post">
 <table>
  <tr>
   <td>Usuario:</td>
   <td><input name="admin" required="required" type="text" autofocus/></td>
  </tr>
  <tr>
   <td>Password:</td>
   <td><input name="password_usuario" required="required" type="password" /></td> 
  </tr>
  <tr>
   <td colspan="2"><input name="iniciar" type="submit" value="Sign in" /></td>
  </tr>
</table>
<a href="register.php">No dispones de una cuenta de Snake Game? Regístrate</a>
</form>