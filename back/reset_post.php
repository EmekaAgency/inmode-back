<?php
    function reset_login() {
        unset($_POST['email']);
        unset($_POST['password']);
    }
    
    function reset_logout() {
        unset($_POST['logout']);
    }
    
    function reset_add_product() {
        unset($POST['add_product']);
    }
    
    function reset_edit_product() {
        unset($POST['edit_product']);
    }
?>