<?php
    session_start();
    require_once('back/echo_pre.php');
    require_once('back/is_loged.php');
    require_once('back/post_is.php');
    require_once('back/login.php');
    require_once('back/logout.php');
    require_once('back/reset_post.php');
    require_once('back/request.php');
    if(isset($_POST)) {
        if( post_is('login') ) {
            login($_POST['email'], $_POST['password']);
            reset_login();
        }
        elseif( post_is('logout') ) {
            logout();
            reset_logout();
        }
    }
    if(is_loged()) {
        $_SESSION['products'] = array(
            '0' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test0', 'quantity' => 5),
            '1' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test1', 'quantity' => 5),
            '2' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test2', 'quantity' => 5),
            '3' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => null,'name' => 'Test3', 'quantity' => 5),
            '4' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test4', 'quantity' => 5),
            '5' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test5', 'quantity' => 5),
            '6' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test6', 'quantity' => 5),
            '7' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test7', 'quantity' => 5),
            '8' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => null,'name' => 'Test8', 'quantity' => 5),
            '9' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test9', 'quantity' => 5),
            '10' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test10', 'quantity' => 5),
            '11' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test11', 'quantity' => 5),
            '12' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => null,'name' => 'Test12', 'quantity' => 5),
            '13' => array('picture_url' => 'public/nopic.svg','discount_price' => 5,'normal_price' => 10,'name' => 'Test13', 'quantity' => 5),
        );
    }
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
    <head>
        <title>InMode - France</title>
        <link rel="icon" href="public/inmodemd_48x48.png">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="author" content="Emeka">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./main.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <body>
        <header>
            <?php
                if(is_loged(session_id())) {
                    echo '
                        <div class="head">
                            <div class="loged-as">Loged as '.$_SESSION['user']['role'].'</div>
                            <form class="logout" name="logout" method="POST">
                                <button type="submit" name="logout">Logout</button>
                            </form>
                        </div>
                    ';
                }
            ?>
        </header>
        <main>
            <?php
                if(is_loged(session_id())) {
                    echo '
                    <div class="product-group">
                        <div id="product-add" class="product transition product-add">
                            <div class="product-pic-zone transition">
                                <div class="product-pic background-image" style="background-image: url(\'public/plus.svg\')"></div>
                            </div>
                            <div class="product-infos">
                                <div class="product-prices">
                                    <div class="product-price">Discount €</div>
                                    <div class="product-normal-price">Real €</div>
                                    <div class="product-quantity">Qté</div>
                                </div>
                                <div class="product-name">Nom du produit</div>
                            </div>
                        </div>
                    ';
                    foreach($_SESSION['products'] as $key => $product) {
                        echo '
                        <div id="prod-'.$key.'" class="product transition">
                            <div class="product-pic-zone transition">
                                <div class="product-pic background-image" style="background-image: url(\''.$product['picture_url'].'\')"></div>
                                <div class="product-edit transition">
                                    <div class="product-edit-ico background-image"></div>
                                </div>
                            </div>
                            <div class="product-infos">
                                <div class="product-prices">
                                    <div class="product-price euro">'.$product['discount_price'].'</div>
                                    '.($product['normal_price'] == null ? '' : '<div class="product-normal-price euro">'.$product['normal_price'].'</div>').'
                                    <div class="product-quantity">'.$product['quantity'].'</div>
                                </div>
                                <div class="product-name">'.$product['name'].'</div>
                            </div>
                        </div>
                        ';
                    }
                    echo '</div>';
                }
                else {
                    echo'
                    <div class="main-unlog">
                        <div class="unlog-content">
                            <div class="login-head">Login</div>
                            <div class="login-form">
                                <form id="login-form" method="POST">
                                    <div class="input-with-icon">
                                        <span class="material-icons">email</span>
                                        <input required spellcheck="false" id="login-email" name="email" placeholder="Mail" type="email" class="transition-border"/>
                                        <div class="input-bottom-color"></div>
                                    </div>
                                    <div class="input-with-icon">
                                        <span class="material-icons">lock</span>
                                        <input required spellcheck="false" id="login-password" name="password" placeholder="Mot de passe" type="password" class="transition-border"/>
                                        <div class="input-bottom-color"></div>
                                    </div>
                                    <button id="login-submit" type="submit" class="transition-background">Connexion</button>
                                </form>
                            </div>
                        </div>
                    </div>';
                }
            ?>
            <div id="popup-div"></div>
        </main>
        <footer>

        </footer>
        <script src="./script.js"></script>
    </body>
</html>