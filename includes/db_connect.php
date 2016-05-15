<?php

  //get the IP address for each user.
  //would be interesting to see if app is used from multiple locations
	function getUserIP()
	{
    	$client  = @$_SERVER['HTTP_CLIENT_IP'];
    	$forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    	$remote  = $_SERVER['REMOTE_ADDR'];

    	if(filter_var($client, FILTER_VALIDATE_IP))
    	{
      	  $ip = $client;
    	}
    	else if(filter_var($forward, FILTER_VALIDATE_IP))
    	{
      	  $ip = $forward;
    	}
    	else
    	{
      	  $ip = $remote;
    	}

  	  return $ip;
	}


	$user_ip = getUserIP();

	$link = mysql_connect('127.0.0.1', 'x', 'x');
	if(!$link){
		die('Not Connected: ' . mysql_error()); 
	}

	$db_selected = mysql_select_db('bookmarks', $link);
	if(!$db_selected){
		die("Cannot use database bookmarks :" . mysql_error());
	}

  $connect_message = "Connected to bookmarks database";

	 // echo $connect_message;

?>





