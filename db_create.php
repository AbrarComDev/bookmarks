<?php

  require('includes/db_connect.php');
  // front end is sending json. need to convert json to assoc array for php to handle
  $data = file_get_contents("php://input");
  $input = json_decode($data, TRUE);

  $email = "'" .$input['email'] . "'" ;
  $url = "'"  . $input['url'] . "'" ;
  $userIP = "'"  . getUserIP() . "'" ;

  $resp = [];
  //email and url must be unique. if query returns a row, respond with an error
  $query = "SELECT idUser FROM user WHERE email=" . $email . " AND url=" . $url;
  $result = mysql_query($query);
  if($result) {
    if (mysql_num_rows($result) > 0) {
      $resp['message'] = "duplicate";
      $resp['other'] = mysql_num_rows($result);
      echo json_encode($resp);
      exit;
    }
  }

  $query = "INSERT INTO user (user_ip, click_count, email, url) VALUES (" . $userIP . ", 0, " . $email . ", " . $url . ")";
  // $response['query'] = $query;

 	$result = mysql_query($query);
  // notify the client of success or failure
 	if (!$result) {
     $resp['message'] = "fail";
 	} {
 		$resp['message'] = "success";
 	}

  echo json_encode($resp);

?>