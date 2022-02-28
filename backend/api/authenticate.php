<?php 
    require "../vendor/autoload.php";
    require "../env.php";
    use \Firebase\JWT\JWT;
    use \Firebase\JWT\Key;
    if(empty($_SERVER['HTTP_AUTHORIZATION'])){
        echo json_encode(array(
            "status"=>0,
            "message" => "Don't contain authorization in header.",
        ));
        exit;
    }
    $message=0;
    $name='';
    $email='';
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $arr = explode(" ", $authHeader);  
    if (! preg_match('/Bearer\s(\S+)/',$authHeader, $matches)) {
        echo json_encode(array(
            "status"=>0,
            "message" => "Token not found.",
        ));
        exit;
    }
    $jwt = $arr[1];
    if($jwt){

        try {

            $decoded = JWT::decode($jwt, new Key($SECRET_KEY, 'HS256'));
            // Access is granted. Add code of the operation here 
            $decoded=(array)$decoded;
            $decoded=(array)$decoded['data'];
            $id=$decoded['id'];
            $access=$decoded['access'];
            $message=1;
            $name=$decoded['name'];
            $email=$decoded['email'];

        }catch (Exception $e){
            //http_response_code(401);
            echo json_encode(array(
                "status"=>0,
                "message" => "Access denied.",
                "error" => $e->getMessage()
            ));
            exit;
        }

    }