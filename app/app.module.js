var bookmarksApp = angular.module('bookmarksApp', ['angularUtils.directives.dirPagination']);

bookmarksApp.controller('bookmarksController', function($scope, $http, $httpParamSerializerJQLike) {
    $scope.message = "";
    $scope.newBookMark = "http://";

    //if user changes the value of the email address input, then enable the "get" button
    //Once the button is clicked and rows are returned, the button is disabled.
    //This prevents the user from changing the email during the session without clicking "get bookmarks"
    $scope.emailChange = function() {
        // console.log('email changed to ' + $scope.email);
        if ($scope.email && $scope.email.length > 0) {
            $('#get-bm-button').css('visibility', 'visible');
        } else {
            $('#get-bm-button').css('visibility', 'hidden');
        }
    }

    //get all the bookmarks for the user by email address
    //then hide the button IF data is there (ie, bookmarks exist for the email address).  It will become visible only when/if
    //the user changes the email address
    $scope.lookup = function() {
            console.log("lookup for " + $scope.email);
            if ($scope.email && $scope.email.length > 5) {

                $scope.newBookMark = "http://";

                $http({
                    method: "post",
                    url: "db_read.php",
                    data: { email: $scope.email },
                    dataType: 'json'
                }).then(function successCallback(response) {
                    console.log(response.data);
                    $scope.data = response.data.rows;
                    $('#get-bm-button').css('visibility', 'hidden');

                }, function errorCallback(response) {
                    console.log("ERROR.");
                });
            }
        }
        //   Custom orderby function for applying a different sort rule for the click_count column
        //without this function the "click count" would be sorted as string instead of a number
        //have to know which column is being sorted
        // returns a closure of the orignal function
    $scope.orderByFunction = function(sortType) {
        return function(bm) {

            if (sortType === 'clicks') { //sorting on the click_count. force integer comparison versus default string compare
                console.log(sortType);
                return parseInt(bm.click_count);

            } else {
                return bm.url;
            }

        }
    }

    //add the bookmark to the DB.
    //duplicates not allow...ie, same combo of email and url
    $scope.addBookMark = function() {

        $scope.message = "";
        if ($scope.newBookMark && $scope.newBookMark.length > 11) {
            $http({
                method: "post",
                url: "db_create.php",
                data: {
                    email: $scope.email,
                    url: $scope.newBookMark
                },
                dataType: 'json'
            }).then(function successCallback(resp) {
                console.log(resp);
                status = resp.data.message;
                if (status == 'duplicate') {
                    $scope.message = "Failed to add bookmark.  Duplicate.";
                } else if (status == 'success') {
                    $scope.lookup();
                    $scope.newBookMark = "http://";
                } else {
                    $scope.message = "Failed to add the bookmark";
                }

            }, function errorCallback(response) {
                console.log("ERROR.");
            });
        }

    }

    //this function will make the ajax call to delete the entry clicked on.
    $scope.remove = function(obj) {
        $scope.message = "";
        console.log(obj);
        $http({
            method: "post",
            url: "db_delete.php",
            data: {
                key: Number(obj.idUser)
            },
            dataType: 'json'
        }).then(function successCallback(response) {
            console.log(response);
            //if successfully deleted, refresh the ng-repeat
            if (response.data.message === 'success') {
                $scope.lookup();
            } else {
                $scope.message = response.data.message;
            }

        }, function errorCallback(response) {
            console.log("ERROR.");
        });
    }

    $scope.clickCount = function(obj) {
        console.log("**** clicked on ****");
        console.log(obj.idUser);
        //user clicked a link. now update the click count in the DB and UI.
        $http({
            method: "post",
            url: "db_update.php",
            data: {
                key: Number(obj.idUser)
            },
            dataType: 'json'
        }).then(function successCallback(response) {
            console.log(response);
            //if successfully updated, refresh the ng-repeat
            if (response.data.message === 'success') {
                $scope.lookup();
            } else {
                $scope.message = response.data.message;
            }

        }, function errorCallback(response) {
            console.log("ERROR.");
        });

        var win = window.open(obj.url, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Broswer has blocked it
            alert('Please allow popups for this site');

        }
    }

});
