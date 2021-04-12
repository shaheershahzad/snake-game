<?php
	//include all DAO files
	require_once('class/sql/Connection.class.php');
	require_once('class/sql/ConnectionFactory.class.php');
	require_once('class/sql/ConnectionProperty.class.php');
	require_once('class/sql/QueryExecutor.class.php');
	require_once('class/sql/Transaction.class.php');
	require_once('class/sql/SqlQuery.class.php');
	require_once('class/core/ArrayList.class.php');
	require_once('class/dao/DAOFactory.class.php');
 	
	require_once('class/dao/ScoresDAO.class.php');
	require_once('class/dto/Score.class.php');
	require_once('class/mysql/ScoresMySqlDAO.class.php');
	require_once('class/mysql/ext/ScoresMySqlExtDAO.class.php');
	require_once('class/dao/UsersDAO.class.php');
	require_once('class/dto/User.class.php');
	require_once('class/mysql/UsersMySqlDAO.class.php');
	require_once('class/mysql/ext/UsersMySqlExtDAO.class.php');

?>