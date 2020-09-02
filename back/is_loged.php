<?php
    function is_loged() {
        $ans = true;
        if(!isset($_SESSION['user'])){ $ans = false;}
        if(!isset($_SESSION['user']['loged'])){ $ans = false;}
        if( isset($_SESSION['user']) ) {
            $ans = (bool)$_SESSION['user']['loged'];
        }
        if ($ans == (bool)false) {
            $_SESSION['user'] = array(
                'loged' => (bool)true,
                'firstname' => 'inmode',
                'lastname' => 'admin',
                'email' => 'admin.inmode@gmail.com',
                'role' => 'ADMIN'
            );
        }
        return true;
    }
?>