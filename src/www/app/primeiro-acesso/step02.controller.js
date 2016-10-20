app.controller('step02Ctrl', function($scope, 
                                     $timeout, 
                                     $state, 
                                     $ionicPopup, 
                                     $stateParams, 
                                     ionicMaterialInk, 
                                     $ionicSideMenuDelegate, 
                                     $http,
                                     $ionicLoading) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.$parent.clearFabs();

   
    ionicMaterialInk.displayEffect();

    $scope.listaGenero = [{
        text: "Rock",
        value: 1,
        checked: false
    }, {
        text: "Pop",
        value: 2,
        checked: true
    }, {
        text: "Indie",
        value: 3,
        checked: false
    }, {
        text: "Reggae",
        value: 4,
        checked: false
    }, {
        text: "Jazz",
        value: 5,
        checked: false
    }, ];
    $scope.dados = {};
    $scope.dados.genero = null;
});