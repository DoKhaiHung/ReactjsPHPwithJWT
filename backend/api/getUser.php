<?php 
require '../allowRequest.php';
include "../connect.php";
require 'authenticate.php';
if($message!=1) 
    exit;

$sql="SELECT *
FROM cli_list
 ";
 
//$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);
if(isset($_POST['id'])) {
    print_r(json_encode($_POST)) ;
    exit;
};
 $res=mysqli_query($connect,$sql);
 $res=mysqli_fetch_all($res,MYSQLI_ASSOC);
 echo json_encode($res)
?>