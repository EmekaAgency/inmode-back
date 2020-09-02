<?php
    function login($email = "", $password = "") {
        $response = (array)json_decode(request(
            'POST',
            'https://emeka-back.emeka.fr/inmode/inmode.php',
            array(
                'action' => 'login',
                'data' => json_encode(array(
                    'type' => 'basic',
                    'email' => $email,
                    'password' => $password
                ))
            )
        ));
        if($response['status'] == 'success') {
            $datas = (array)json_decode($response['result']);
            $_SESSION['user'] = array(
                'loged' => (bool)true,
                'firstname' => $datas['firstname'],
                'lastname' => $datas['lastname'],
                'email' => $datas['email'],
                'role' => $datas['role']
            );
        }
        else {
            if(isset($_SESSION['user'])) {
                unset($_SESSION['user']);
            }
        }
        unset($response);
    }
?>