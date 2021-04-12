<?php
	session_start();
	if(!isset($_SESSION['full_name'])){
        echo "no"; 
        exit();
    }else{
    	echo $_SESSION['full_name'];
    }
?>