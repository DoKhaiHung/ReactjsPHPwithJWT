<?php 
require '../allowRequest.php';
include "../connect.php";
require 'authenticate.php';
if($message!=1) 
    exit;

$sql="SELECT products_list.*,products_category.category,products_gender.gender
FROM products_list
INNER JOIN products_gender ON products_gender.id=products_list.gender_id
INNER JOIN products_category ON products_category.id=products_list.category_id
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