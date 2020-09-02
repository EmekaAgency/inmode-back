<?php
    require_once('reset_post.php');
    require_once('request.php');
    require_once('post_is.php');
    require_once('edit_product.php');
    require_once('add_product.php');
    if(isset($_POST)) {
        if( post_is('edit_product') ) {
            edit_product(
                str_replace('prod-', '', $_POST['data']['id']),
                null,
                $_POST['data']['price'],
                $_POST['data']['discount'],
                $_POST['data']['name'],
                $_POST['data']['quantity']    
            );
        }
        elseif( post_is('add_product') ) {
            add_product(
                null,
                $_POST['data']['price'],
                $_POST['data']['discount'],
                $_POST['data']['name'],
                $_POST['data']['quantity']    
            );
        }
        else {
        }
    }
?>