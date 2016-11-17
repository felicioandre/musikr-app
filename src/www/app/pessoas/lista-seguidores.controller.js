app.controller('ListaSeguidoresCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicHistory,
    $ionicLoading,
    $ionicActionSheet,
    $ionicViewSwitcher) {

    $scope.mostraTela = false;
    //$stateParams.id = 66;

    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "perfil/lista-seguidores/" + $stateParams.id,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.listaSeguidores = data;
        $scope.mostraTela = true;
        //console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });
});

app.controller('ListaSeguindoCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicHistory,
    $ionicLoading,
    $ionicActionSheet,
    $ionicViewSwitcher) {

    $scope.mostraTela = false;
    //$stateParams.id = 66;

    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "perfil/lista-seguindo/" + $stateParams.id,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.listaSeguindo = data;
        $scope.mostraTela = true;
        //console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });
});