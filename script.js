const default_url  = "https://emeka-back.emeka.fr/inmode/inmode.php";
const default_data = {'action':'', 'data': ''};

function login() {
    let i = 0;
    if(document.getElementById("login-email").value === '' || !is_mail(document.getElementById("login-email").value)){
        document.getElementById("login-email").classList.add('error');
        ++i;
    }
    else {
        document.getElementById("login-email").classList.remove('error');
    }
    if(document.getElementById("login-password").value === ''){
        document.getElementById("login-password").classList.add('error');
        ++i;
    }
    else {
        document.getElementById("login-password").classList.add('error');
    }
    var data = {
        'action': 'login',
        'data': {
            'type': type
        }
    };
    if(i > 0){return false;}
    data.data.email = document.getElementById("login-email").value;
    data.data.password = document.getElementById("login-password").value;
    _AJAX(data, "POST");
}

function add_product($this, id) {
    _AJAX(
        {
            'action': 'add_product',
            'data': {
                'price': $this.getElementsByClassName('add-price')[0].value,
                'discount': $this.getElementsByClassName('add-discount')[0].value,
                'name': $this.getElementsByClassName('add-name')[0].value,
                'quantity': $this.getElementsByClassName('add-quantity')[0].value
            }
        },
        "POST",
        'https://inmode.emeka.fr/back/posts.php',
        false,
        callback = process_add_product
    );
}

function process_add_product(res) {
    var el = document.createElement("div");
    el.id = 'prod-' + res.id;
    el.classList.add('product');
    el.classList.add('transition');
    document.getElementById('product-add').parentNode.insertBefore(el, document.getElementById('product-add').nextSibling);
    document.getElementById(el.id).innerHTML = '\
        <div class="product-pic-zone transition">\
            <div class="product-pic background-image" style="background-image: url(\'' + res.values.picture_url + '\')"></div>\
            <div class="product-edit transition">\
                <div class="product-edit-ico background-image"></div>\
            </div>\
        </div>\
        <div class="product-infos">\
            <div class="product-prices">\
                <div class="product-price euro">' + res.values.discount_price + '</div>'
                + (res.values.normal_price == null ? '' : '<div class="product-normal-price euro">' + res.values.normal_price + '</div>') + '\
                <div class="product-quantity">' + res.values.quantity + '</div>\
            </div>\
            <div class="product-name">' + res.values.name + '</div>\
        </div>\
        ';
    add_edit_listener(document.getElementById(el.id).getElementsByClassName('product-edit')[0]);
    close_popup();
}

function edit_product($this, id) {
    _AJAX(
        {
            'action': 'edit_product',
            'data': {
                'id': id,
                'price': $this.getElementsByClassName('edit-price')[0].value,
                'discount': $this.getElementsByClassName('edit-discount')[0].value,
                'name': $this.getElementsByClassName('edit-name')[0].value,
                'quantity': $this.getElementsByClassName('edit-quantity')[0].value
            }
        },
        "POST",
        'https://inmode.emeka.fr/back/posts.php',
        false,
        callback = process_edit_product
    );
}

function process_edit_product(res) {
    $edit = document.getElementById('prod-'+ res.id);
    $edit.getElementsByClassName('product-pic')[0].style.backgroundImage = res.values['picture_url'];
    $edit.getElementsByClassName('product-price')[0].innerHTML =  res.values['discount_price'];
    $edit.getElementsByClassName('product-normal-price')[0] = res.values['normal_price'] ;
    $edit.getElementsByClassName('product-name')[0].innerHTML =  res.values['name'];
    $edit.getElementsByClassName('product-quantity')[0].innerHTML =  res.values['quantity'];
    close_popup();
}

function _AJAX(data = default_data, method = "POST", url = default_url, reload = false, callback = null) {

    console.log(url);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = to_json(this.response);
            if(callback !== null) {
                callback(res);
            }
            if(reload) {
                window.reload();
            }
        }
        else {
            console.log("readyState => ", this.readyState);
            console.log("status => ", this.status);
        }
    };

    xhttp.open(method, url, true, 'inmode', 'inmode');
    
    xhttp.withCredentials = true;

    xhttp.send(jsonToFormData(data));
}

function _process_response(action, type, response, status) {
    var keys = Object.keys(response);
    for(key in keys) {
        console.log(action + '-' + type + '-result-' + keys[key]);
        document.getElementById(action + '-' + type + '-result-' + keys[key]).innerHTML = response[keys[key]];
    }
    return false;
}

function object_to_formdata(object) {
    var form_data = new FormData();
    for(const key in object) {
        form_data.append(key, object[key]);
    }
    return form_data;
}

function to_json(response) {
    return response ? JSON.parse(response) : {};
}

function is_mail(str) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
}

function open_popup(content) {
    document.getElementById('popup-div').innerHTML = '\
        <div id="popup-main" class="popup-main">\
            <div class="popup-content">\
                <div id="popup-card" class="popup-card">\
                <div id="popup-close" class="popup-close background-image"></div>\
                ' + content + '\
                </div>\
            </div>\
        </div>\
    ';
    document.getElementById('popup-close').addEventListener('click', function() {
        close_popup();
    });
    document.getElementById('popup-main').addEventListener('click', function(e) {
        if(!document.getElementById('popup-card').contains(e.target)){
            close_popup();
        }
    });
    disable_scroll();
}

function close_popup() {
    document.getElementById('popup-div').innerHTML = '';
    enable_scroll();
}

function open_popup_add() {
    open_popup('\
        <form id="popup-add" class="popup-add" onsubmit="add_product(this)" action=".">\
            <h2>Ajouter un produit</h2>\
            <label for="image">Image de l\'article</label>\
            <input name="image" class="add-img" type="file">\
            <div class="add-input-bottom-color">\
                <label for="price">Prix de l\'objet</label>\
                <input name="price" class="add-price transition-border" type="number" min="0" value="0"/>\
                <div class="input-bottom-color"></div>\
            </div>\
            <div class="add-input-bottom-color">\
                <label for="discount">Réduction de l\'article</label>\
                <input name="discount" class="add-discount transition-border" type="number" min="0" value="0">\
                <div class="input-bottom-color"></div>\
            </div>\
            <div class="add-input-bottom-color">\
                <label for="name">Nom de l\'article</label>\
                <input name="name" class="add-name transition-border" type="text"/>\
                <div class="input-bottom-color"></div>\
            </div>\
            <div class="add-input-bottom-color">\
                <label for="quantity">Quantité disponible</label>\
                <input name="quantity" class="add-quantity transition-border" type="number" min="0" value="0"/>\
                <div class="input-bottom-color"></div>\
            </div>\
            <button id="login-submit" type="submit" class="transition-background">Ajouter</button>\
        </form>\
    ');
}

function open_popup_edit(el) {
    open_popup('\
        <form id="popup-edit" class="popup-edit" onsubmit="edit_product(this, \'' + el.id + '\')" action=".">\
            <h2>Modifier un produit</h2>\
            <label for="image">Image de l\'article</label>\
            <input name="image" class="edit-img" type="file">\
            <div class="edit-input-bottom-color">\
                <label for="price">Prix de l\'objet</label>\
                <input name="price" class="edit-price transition-border" type="number" min="0" value="' + el.getElementsByClassName('product-normal-price')[0].innerHTML + '"/>\
                <div class="input-bottom-color"></div>\
            </div>\
            <div class="edit-input-bottom-color">\
                <label for="discount">Réduction de l\'article</label>\
                <input name="discount" class="edit-discount transition-border" type="number" min="0" value="'
                + (el.getElementsByClassName('product-normal-price')[0] == undefined ? '' : el.getElementsByClassName('product-price')[0].innerHTML) +
                '"/>\
                <div class="input-bottom-color"></div>\
            </div>\
            <div class="edit-input-bottom-color">\
                <label for="name">Nom de l\'article</label>\
                <input name="name" class="edit-name transition-border" type="text" value="' + el.getElementsByClassName('product-name')[0].innerHTML + '"/>\
                <div class="input-bottom-color"></div>\
            </div>\
            <div class="edit-input-bottom-color">\
                <label for="quantity">Quantité disponible</label>\
                <input name="quantity" class="edit-quantity transition-border" type="number" min="0" value="' + el.getElementsByClassName('product-quantity')[0].innerHTML + '"/>\
                <div class="input-bottom-color"></div>\
            </div>\
            <button id="login-submit" type="submit" class="transition-background">Ajouter</button>\
        </form>\
    ');
}

function add_edit_listener(el) {
    el.addEventListener('click', function() {
        open_popup_edit(this.parentNode.parentNode);
        document.getElementById("popup-edit").addEventListener('submit', function(e) {
            e.preventDefault();
        })
    })
}

document.addEventListener('DOMContentLoaded', function() {
    var login_submit = false;
    
    // SUBMIT LOCK FOR SPAM
    if(document.getElementById("login-form")) {
        $this = document.getElementById("login-form");
        $this.reset();
        $this.addEventListener('submit', function(event) {
           if(login_submit) {
               event.preventDefault();
           }
           else {
               login_submit = true;
           }
        });
    }
    
    // LOGIN BUTTON CLICK STYLE BEHAVIOR
    if(document.getElementById("login-submit")) {
        var $this = document.getElementById("login-submit");
        $this.addEventListener('mouseout', function() {
            this.style.outlineColor = 'transparent';
            this.style.backgroundColor = 'transparent';
        });
        $this.addEventListener('click', function() {
            this.style.outlineColor = 'transparent';
            this.style.backgroundColor = '#f7c8e2';
        });
        $this.addEventListener('focus', function() {
            this.style.outlineColor = 'transparent';
        });
        $this.addEventListener('focus-within', function() {
            this.style.outlineColor = 'transparent';
        });
    }
    
    // SUBMIT RESET AT RELOAD
    if ( window.history.replaceState ) {
      window.history.replaceState( null, null, window.location.href );
    }
    
    // PRODUCT ADD
    if(document.getElementById("product-add")) {
        $this = document.getElementById("product-add");
        $this.addEventListener('click', function() {
            open_popup_add();
            document.getElementById('popup-add').addEventListener('submit', function(e) {
                e.preventDefault();
            });
        })
    }
    
    // PRODUCT EDIT
    if(document.getElementsByClassName('product-edit').length > 0) {
        [].forEach.call(document.getElementsByClassName('product-edit'), function(el) {
            add_edit_listener(el);
        });
    }
})

// STACK-OVERFLOW //

function buildFormData(formData, data, parentKey) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
  
      formData.append(parentKey, value);
    }
}
  
function jsonToFormData(data) {
    const formData = new FormData();
  
    buildFormData(formData, data);
  
    return formData;
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disable_scroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enable_scroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}