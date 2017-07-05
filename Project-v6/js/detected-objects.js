app.controller("objects", function($scope) {
    $scope.ocw = {
        "cameras": [
            { "cameraName": "Camera 1",
                "images":
                    [
                        {
                            "imageName": "images/ficsed.JPG",
                            "imageDate": "01/14/2015"
                        },
                        {
                            "imageName": "images/ficsed.JPG",
                            "imageDate": "01/15/2016"
                        }
                    ]
            },
            { "cameraName": "Camera 2",
                "images":
                    [
                        {
                            "imageName": "images/ficsed.JPG",
                            "imageDate": "01/15/2016"
                        },
                        {
                            "imageName": "images/ficsed.JPG",
                            "imageDate": "01/15/2018"
                        }
                    ]
            }
        ]
    };

    $scope.searchItems = ["by camera", "by date"];

    $scope.objectFilter = function (input) {
        if($scope.selectedItem == "by camera" && input.cameraName) return true;
        else if($scope.selectedItem == "by date" && input.image) return true;
        else if (!$scope.selectedItem) return true;
        return true;
    }

});