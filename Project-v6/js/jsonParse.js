/**
 * Created by vrezh on 6/21/17.
 */

var jsonText = '  { "camera": [\
    { "cameraName": "Camera 1",\
      "images": [\
        {\
          "imageName": "../images/ficsed.JPG",\
          "imageDate": "01/15/2015"\
        },\
        {\
          "imageName": "../images/ficsed.JPG",\
          "imageDate": "01/15/2016"\
        }\
      ]\
    },\
    {\
      "cameraName": "Camera 2",\
      "images": [\
        {\
          "imageName": "../images/ficsed.JPG",\
          "imageDate": "01/15/2017"\
        },\
        {\
          "imageName": "../images/ficsed.JPG",\
          "imageDate": "01/15/2017"\
        }\
      ]\
    }\
  ]\
}'

//var cameraName = [];

/*function jsonParse(file, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                myObj = JSON.parse(this.responseText)
                callback(myObj);
            }
        };
        xmlhttp.open("GET", file, true);
        xmlhttp.send();
}*/

$(document).ready(function() {
	var myObj = JSON.parse(jsonText) 
   	//jsonParse("../json/detectedObject.json",createItem) ;
	createItem(myObj);
});

/*var createSearchByCameraMenu = function () {
    var a = document.getElementById("searchByCamera");

    for (var i = 0; i < cameraName.length; ++i) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        var aText = document.createTextNode(cameraName[i]);
        a.appendChild(aText);
        li.appendChild(a);
        li.onclick = function () {
            var name = cameraName[i];
            cameraName[i] = cameraName[0];
            cameraName[0] = name;
        }
        var ul = document.getElementById("searchByCamera");
        ul.appendChild(li);
    }
}*/

var createItem = function(myObj, cameraName, fromDate ,toDate) {
    var text = "";

    for (var i = 0; i < myObj.camera.length; ++i) {
        //createSearchByCameraMenu(myObj.camera[i].cameraName);
        if(myObj.camera[i].cameraName == cameraName || !cameraName) {
            for (var j = 0; j < myObj.camera[i].images.length; ++j) {
                if (!fromDate || isContainInterval(myObj.camera[i].images[j].imageDate, fromDate, toDate)) {
                    text += '\
                    <div class="detected-object row">\
                        <img class="col-md-3 col-xs-3 col-sm-3" src="' + myObj.camera[i].images[j].imageName + '">\
                        <div class="col-xs-9 col-sm-9 col-md-9 ficsed-data">\
                                        <p><b>' + myObj.camera[i].cameraName + '</b></p>\
                            <p>' + myObj.camera[i].images[j].imageDate + '</b></p>\
                        </div>\
                    </div>';
                }
            }
        }
    }
    document.getElementById("detected-objects").innerHTML = text;
}

function isContainInterval(date, fromDate, toDate) {
    var dt = date.split('/');
    for (var i = 0; i < 3; ++i) {
        if (dt[i] < fromDate[i] || (toDate && dt[i] > toDate[i]) || (!toDate && dt[i] != fromDate[i])){
            return false;
        }
    }
    return true;
}

var searchByCameraName = function() {
    var text = document.getElementById("searchByCamera").value;
    var data = JSON.parse(jsonText)
    createItem(data, text);
}

function searchByInterval () {
    var regExpr = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    var data;
    var date = document.getElementById('date');
    var dateList = date.value.split('-');

    var fromDate = dateList[0] ? dateList[0] : date.value;
    var toDate = dateList[1] ? dateList[1] : date.value;
    if (fromDate && fromDate.match(regExpr)) {
        data = JSON.parse(jsonText);
        if(toDate && toDate.match(regExpr)){
            createItem(data, null, fromDate.split('/'), toDate.split('/'));
        } else {
            createItem(data,null, fromDate.split('/'), null);
        }
    } else {
        date.placeholder = "incorrect date";
    }
}

function a(i) {
    alert(i);

}