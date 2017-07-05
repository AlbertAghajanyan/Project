var x= "<i class='icon glyphicon glyphicon-user'></i>" + "&nbsp;&nbsp;Log Out" + "<i class='icon glyphicon glyphicon-arrow'></i>";
$(document).ready(function(){
    $('#login').click(function() {
        if (window.parent.document.getElementById('log').innerHTML == x) {
            alert('logout');
        }
    });
});

var checkEmail = false,
    checkPsw = false;

function validate() {
    if (true == checkEmail && true == checkPsw) {
        document.getElementById("btnLogId").disabled = false;
    }
}
function setMyAtributtsForEmail() {
    document.getElementById("alertEmail").style.display = "block";
    document.getElementById("inputEmail").style.borderColor = "red";
    //document.getElementById("inputEmail").style.boxShadow = "1px 1px 1px 1px red";
    document.getElementById("btnLogId").disabled = true;
}
function setMyAtributtsForPassword() {
    document.getElementById("alertPsw").style.display = "block";
    document.getElementById("inputPassword").style.borderColor = "red";
    //document.getElementById("inputPassword").style.boxShadow = "1px 1px 1px 1px red";
    document.getElementById("btnLogId").disabled = true;
}

app.controller('login', function($scope) {
    $scope.email = "";
    $scope.validateEmail = function() {
        var regularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ("" == $scope.email) {
            document.getElementById("alertEmail").innerHTML = "Please, fill out this field";
            setMyAtributtsForEmail();
            checkEmail = false;
        } else if (!regularExpression.test($scope.email)) {
            document.getElementById("alertEmail").innerHTML = "Invalid mail format";
            setMyAtributtsForEmail();
            checkEmail = false;
        } else {
            document.getElementById("alertEmail").style.display = "none";
            document.getElementById("inputEmail").style.borderColor = "green";
            //document.getElementById("inputEmail").style.boxShadow = "1px 1px 1px 1px green";
            checkEmail = true;
            validate();
        }
    };
    $scope.validatePassword = function() {
        var regularExpression = /^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
        if ("" == $scope.password) {
            document.getElementById("alertPsw").innerHTML = "Please, fill out this field";
            setMyAtributtsForPassword();
            checkPsw = false;
        } else if (!regularExpression.test($scope.password)) {
            document.getElementById("alertPsw").innerHTML = "Password should contain 6-20 symbols <br> (required one lowercase letter and one number)";
            setMyAtributtsForPassword();
            checkPsw = false;
        } else {
            document.getElementById("alertPsw").style.display = "none";
            document.getElementById("inputPassword").style.borderColor = "green";
            //document.getElementById("inputPassword").style.boxShadow = "1px 1px 1px 1px green";
            checkPsw = true;
            validate();
        }
    };

    $scope.loginClicked = function() {
        alert(1);
        //window.location = "index.html";
        window.parent.document.getElementById('log').innerHTML =
            "<i class='icon glyphicon glyphicon-user'></i>" + "&nbsp;&nbsp;Log Out"
            + "<i class='icon glyphicon glyphicon-arrow'></i>";
    };
});

/*
app.controller('login', ['$scope', function($scope) {
    alert(1);
    $scope.loginClicked = function() {
        alert(2);
        app.config(function ($routeProvider) {
            $routeProvider
                .when("login", {
                    templateUrl: "resources/home.html",
                    controller: "myCtrl"
                })
        });
    };
}]);
*/



/*
var app = angular.module('loginApp', []);

app.controller('loginCtrl',function($scope) {
        $scope.validateEmail = function() {
            alert('emaill');
            var regularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ("" == $scope.email) {
                //document.getElementById("alertEmail").style.display = "block";
                //document.getElementById("alertEmail").innerHTML = "Please, fill out this field";
                document.getElementById("inputEmail").style.borderColor = "red";
                document.getElementById("btnLogId").disabled = true;
                checkEmail = false;
            } else if (!regularExpression.test($scope.email)) {
                //document.getElementById("alertEmail").style.display = "block";
                //document.getElementById("alertEmail").innerHTML = "Invalid mail format";
                document.getElementById("inputEmail").style.borderColor = "red";
                document.getElementById("btnLogId").disabled = true;
                checkEmail = false;
            } else {
                //document.getElementById("alertEmail").style.display = "none";
                document.getElementById("inputEmail").style.borderColor = "green";
                checkEmail = true;
                validate();
            }
        };
        $scope.validatePassword = function() {
            var regularExpression = /^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
            if ("" == $scope.password) {
                //document.getElementById("alertPsw").style.display = "block";
                //document.getElementById("alertPsw").innerHTML = "Please, fill out this field";
                document.getElementById("inputPassword").style.borderColor = "red";
                document.getElementById("btnLogId").disabled = true;
            } else if (!regularExpression.test($scope.password)) {
                //document.getElementById("alertPsw").style.display = "block";
                //document.getElementById("alertPsw").innerHTML = "Password should contain 6-20 symbols(required one lowercase letter and one number)";
                document.getElementById("inputPassword").style.borderColor = "red";
                document.getElementById("btnLogId").disabled = true;
                checkPsw = false;
            } else {
                //document.getElementById("alertPsw").style.display = "none";
                document.getElementById("inputPassword").style.borderColor = "green";
                checkPsw = true;
                validate();
            }
        };
    });
*/
/*
$(document).ready(function(){
    $('#btnLogId').click(function(){
        var mail = document.getElementById('email').value;
        var pass = document.getElementById('password').value;
        if (checkEmail(mail)){
            if (checkPassword(pass)) {
                window.parent.document.getElementById('login').id = "logout";
                window.parent.document.getElementById("content").src = "resources/home.html";
                window.parent.document.getElementById('log').innerHTML =
                    "<i class='icon glyphicon glyphicon-user'></i>" + "&nbsp;&nbsp;Admin"
                    + "<i class='icon glyphicon glyphicon-arrow'></i>";

                var exhours = 5;
                var d = new Date();
                d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = mail + "=" + pass + ";" + expires + ";path=/";
            }
        }
    });
});

function checkEmail(email) {
    //var email = document.getElementById('email');
    //var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var filter = /^[a-zA-Z]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!filter.test(email)) {
        alert('Please provide a valid email address');
        email.focus;
        return false;
    }
    return true;
}

function checkPassword(pass) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters that are letters, numbers or the underscore
    //var filter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    var filter = /(?=.*[a-z])(?=.*[A-Z]).{6,15}/;
    if (!filter.test(pass)) {
        alert('Password must contain at least 6 characters, at least one number, one lowercase and one uppercase letter.All characters are allowed');
        pass.focus;
        return false;
    }
    return true;
}
*/