app.controller('cameras', function($scope) {
    $scope.selectData = [
        "Search by",
        "Camera name",
        "Location"
    ];
    $scope.searchBy = "$";
    $scope.searchData = {};
    $scope.data = [
        {
            camName: "Camera_1",
            location: "Location_1",
            onOff: "Online"
        },
        {
            camName: "Camera_2",
            location: "Location_2",
            onOff: "Online"
        },
        {
            camName: "Camera_3",
            location: "Location_3",
            onOff: "Offline"
        },
        {
            camName: "Camera_4",
            location: "Location_4",
            onOff: "Online"
        },

    ]

});

/*
 var edit = function(i) {
 document.getElementById("delEdit").style.display = "inline-block";
 document.getElementById("cont").style.maxHeight = "100vh";
 document.getElementById("search").style.display = "none";
 document.getElementById("editArea").style.display = "inline-block";
 }

 var cancelBut = function() {
 document.getElementById("delEdit").style.display = "none";
 document.getElementById("editArea").style.display = "none";
 document.getElementById("search").style.display = "block";
 document.getElementById("cont").style.maxHeight = "none";
 }


 var del = function (i) {
 document.getElementById("dataArea_" + i).style.display = "none";
 }



 */

