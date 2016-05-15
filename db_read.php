<?php

  require('includes/db_connect.php');
  // header('Content-type:application/json');
  $data = file_get_contents("php://input");
  $input = json_decode($data, TRUE);
  
  $email = "'" . $input['email'] . "'";
 
  $resp = [];

  $query = "SELECT * FROM user WHERE email=" . $email;
  $result = mysql_query($query);
 
 	if (!$result) {
     $resp['message'] = "fail";
 	} {
 		$resp['message'] = "success";
 		while ($row = mysql_fetch_assoc($result)) {
  		$resp['rows'][] = $row;
  	}
 	}
 //convert the php array to json
  echo json_encode($resp);

?>