<?php

  require('includes/db_connect.php');
  // header('Content-type:application/json');
  $data = file_get_contents("php://input");
  $input = json_decode($data, TRUE);
  
  $key = $input['key'];

 
  $resp = [];
  //first get the current click count, increment by 1, then update the DB.
  $query = "SELECT click_count FROM user WHERE idUser=" . $key;
  $result = mysql_query($query);
  $row = mysql_fetch_assoc($result);
  $curCount = $row['click_count'];
  //increment by 1
  $newCount = $curCount + 1;
  //now update the count
  $query = "UPDATE user SET click_count = " . $newCount . " WHERE idUser = " . $key;
 	$result = mysql_query($query);

 	if (!$result) {
     $resp['message'] = "fail";
 	} {
 		$resp['message'] = "success";
    $resp['newCount'] = $newCount;
 	}

  echo json_encode($resp);

?>