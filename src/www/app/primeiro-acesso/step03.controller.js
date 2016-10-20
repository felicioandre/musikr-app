app.controller('step03Ctrl', function($scope, 
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

    $scope.listaInstrumento = [{
        text: "Violão",
        value: 1,
        checked: false
    }, {
        text: "Guitarra",
        value: 2,
        checked: false
    }, {
        text: "Baixo",
        value: 3,
        checked: false
    }, {
        text: "Bateria",
        value: 4,
        checked: false
    }, {
        text: "Teclado",
        value: 5,
        checked: false
    }, ];
    $scope.dados = {};
    $scope.dados.genero = null;
});