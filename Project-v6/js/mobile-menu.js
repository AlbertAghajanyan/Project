$(document).ready(function(){
    if (getCookie('a7@mail.ru')) {
        document.getElementById('log').innerHTML =
            "<i class='icon glyphicon glyphicon-user'></i>" + "&nbsp;&nbsp;Admin"
            + "<i class='icon glyphicon glyphicon-arrow'></i>";
        window.parent.document.getElementById('login').id = "logout";
    }

   /* $('#nav-menu').click(function(){
        $('#nav').toggle(500);
    });
    $('#home').click(function(){
        ChangeContent('home')
    });
    $('#cameras').click(function(){
        ChangeContent('cameras')
    });
    $('#detected').click(function(){
        ChangeContent('detected')
    });
    $('#login').click(function(){
        ChangeContent('login')
    });
    $('#mobile_home').click(function(){

        ChangeContent('home')
    });
    $('#mobile_cameras').click(function(){
        ChangeContent('cameras')
    });
    $('#mobile_detected').click(function(){
        ChangeContent('detected')
    });
    $('#mobile_login').click(function(){
        ChangeContent('login')
    }); */
});

/*
 document.getElementById("home").addEventListener("click", ChangeContent('home'));
 document.getElementById("cameras").addEventListener("click", ChangeContent('cameras'));
 document.getElementById("detected").addEventListener("click", ChangeContent('detected'));
 document.getElementById("login").addEventListener("click", ChangeContent('login'));
 document.getElementById("mobile_home").addEventListener("click", ChangeContent('home'));
 document.getElementById("mobile_cameras").addEventListener("click", ChangeContent('cameras'));
 document.getElementById("mobile_detected").addEventListener("click", ChangeContent('detected'));
 document.getElementById("mobile_login").addEventListener("click", ChangeContent('login'));

  */

function ChangeContent(pageName) {
    switch (pageName) {
        case "home":
            document.getElementById("content").src = "resources/home.html";
            break;
        case "cameras":
            document.getElementById("content").src = "resources/cameras.html";
            break;
        case "detected":
            document.getElementById("content").src = "resources/detected_objects.html";
            break;
        case "login":
            document.getElementById("content").src = "resources/login.html";
            break;
    }
}

function getCookie(mail) {
    var name = mail + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

