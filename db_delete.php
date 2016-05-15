<?php

  require('includes/db_connect.php');
  // header('Content-type:application/json');
  $data = file_get_contents("php://input");
  $input = json_decode($data, TRUE);
  
  $key = $input['key'];

  $resp = [];
 
  $query = "DELETE FROM user WHERE idUser=" . $key;
  $result = mysql_query($query);

 	if (!$result) {
     $resp['message'] = "fail";
 	} {
 		$resp['message'] = "success";
  }

  echo json_encode($resp);

?>