<?php
    function post_is($name = "") {
        switch($name) {
            case 'login':
                return (bool)(isset($_POST['email']) && isset($_POST['password']));
                break;
            case 'logout':
                return (bool)(isset($_POST['logout']));
                break;
            case 'add_product':
            case 'edit_product':
                if( isset($_POST['action']) ) {
                    if( $_POST['action'] == $name ) {
                        if( isset($_POST['data']) ) {
                            if( $name == 'edit_product' && !isset($_POST['data']['id'] )) {
                                return (bool)false;
                            }
                            return (bool)(
                                isset($_POST['data']['price']) &&
                                isset($_POST['data']['discount']) &&
                                isset($_POST['data']['name']) &&
                                isset($_POST['data']['quantity'])
                            );
                        }
                        return (bool)false;
                    }
                    return (bool)false;
                }
                return (bool)false;
                break;
            default:
                return (bool)false;
        }
    }
?>