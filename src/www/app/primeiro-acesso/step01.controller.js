app.controller('step01Ctrl', function($scope,
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


    $scope.listaSexo = [{
        text: "Masculino",
        value: "M"
    }, {
        text: "Feminino",
        value: "F"
    }, ];
    $scope.dados = {};
    $scope.dados.foto = null;
    $scope.dados.dataNascimento = null;
    $scope.dados.sexo = null;
});