let app = angular.module('randomBox', []);
app.controller('getRandomUsersController', ['$http', '$scope', function ($http, $scope) {
    $scope.usersParams = [];
    let getUsers = function () {
        let randomValue = Math.floor(Math.random() * 1000);
        $http({method: 'GET', url: 'https://api.github.com/users?since=' + randomValue})
            .then(function (data) {
                 addUsers(data.data);
            }).catch(function (error) {
            console.log(error);
        });
    };

    let addUsers = function (usersData) {
        usersData.forEach(function (item) {
            $scope.usersParams.push(item);
        });
    };

    let isEnoughUsers = function (usersLastIndex) {
        return usersLastIndex < 4;
    };

    $scope.remove = function (id) {
        let usersDataLastIndex = $scope.usersParams.length - 1;
        if(isEnoughUsers(usersDataLastIndex)){
            getUsers();
        }
        $scope.usersParams[id] = $scope.usersParams[usersDataLastIndex];
        $scope.usersParams = $scope.usersParams.slice(0, -1);
    };

   getUsers();
}]);
