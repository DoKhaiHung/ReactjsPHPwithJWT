<?php
require "../allowRequest.php";
require "authenticate.php";
if($message==1)  echo json_encode(array(
    "status"=>1,
    "message" => "Valid user.",
    "name"=>$name,
    "email"=>$email
));

?>