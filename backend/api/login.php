<?php 
    require "../vendor/autoload.php";
    require "../allowRequest.php";
    require "../env.php";
    require "../connect.php";
    use \Firebase\JWT\JWT; 
    if (!empty($_POST['email']) && !empty($_POST['password'])){
        $id="";
        $email=addslashes($_POST['email']);
        $password=addslashes($_POST['password']);
        $sqll=" SELECT email,password,id,access,name from adm_list
                WHERE email='$email'
        ";
        $result=mysqli_query($connect, $sqll);
        $result=mysqli_fetch_assoc($result);

        // wrong email
        if(empty($result['id'])){
            echo json_encode(['status'=>'0','message'=>'wrong email' ]);
            exit;
        }
        $res= password_verify($password,$result['password']);
        $name;              
        if($res) {
            $name=$result['name'];
            $id=$result['id'];
            $access=$result['access'];
            $secret_key = $SECRET_KEY;
            $issuer_claim = $SERVER_NAME; // this can be the servername
            $expire = $EXPIRE; // issued at
            $data = array(
                "iss" => $issuer_claim,
                "iat" => time(),
                "exp" => $expire,
                "data" => array(
                    "id" => $id,
                    "access" => $access,
                    "name"=>$name,
                    "email"=>$email
            ));
            $token= JWT::encode(
                $data,
                $secret_key,
                'HS256'
            );
        }else{
            echo json_encode(['status'=>'0','message'=>'wrong password' ]);
            exit;
        }
        mysqli_close($connect);
        echo json_encode(['status'=>'1','message'=>'sucesss','token'=>$token ,'name'=>$name]);         
    }
    else{
        echo json_encode(['status'=>'0','message'=>'empty input' ]);
    }
?>