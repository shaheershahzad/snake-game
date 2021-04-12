<link rel="icon" type="image/jpg" href="http://shaheershahzad.esy.es/snake_game/snake_fav.png" sizes="16x16">
<title>Registration</title>
<form action="registrar_usuario.php" method="post">
 <table>
  <tr>
   <td>Full Name:</td>
   <td><input name="fullname" required="required" type="text" /></td>
  </tr>
  <tr>
   <td>Username:</td>
   <td><input name="username" required="required" type="text" /></td> 
  </tr>
  <tr>
   <td>Password:</td>
   <td><input name="password" required="required" type="password" /></td> 
  </tr>
  <tr>
   <td colspan="2"><input name="register" type="submit" value="Register" /></td>
  </tr>
</table>
<a href="login.php">Log In</a>
</form>