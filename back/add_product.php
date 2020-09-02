<?php
    function add_product($picture_url = "public/nopic.svg", $normal_price = 0, $discount_price = 0, $name = '', $quantity = 0) {
        session_start();
        $key = (string)((integer)max(array_keys($_SESSION['products'])) + 1);
        $_SESSION['products'][$key] = array(
            'picture_url' => 'public/nopic.svg',
            'discount_price' => $discount_price,
            'normal_price' => $normal_price,
            'name' => $name == '' ? 'Test'.$key : $name,
            'quantity' => $quantity
        );
        reset_add_product();
        echo json_encode(array('id' => $key, 'values' => $_SESSION['products'][$key]));
    }
?>