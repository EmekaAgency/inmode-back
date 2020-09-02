<?php
    function edit_product($key, $picture_url = "public/nopic.svg", $normal_price = 0, $discount_price = 0, $name = '', $quantity = 0) {
        session_start();
        $_SESSION['products'][$key] = array(
            'picture_url' => 'public/nopic.svg',
            'discount_price' => $discount_price,
            'normal_price' => $normal_price,
            'name' => $name,
            'quantity' => $quantity
        );
        reset_edit_product();
        echo json_encode(array('id' => $key, 'values' => $_SESSION['products'][$key]));
    }
?>