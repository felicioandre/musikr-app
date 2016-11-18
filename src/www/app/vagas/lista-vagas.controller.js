app.controller('ListaVagasCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false);
    $scope.mostraTela = false;

    var todas = 0;

    if ($stateParams.todas) {
        todas = 1;
    }
    

    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "vagas/lista-todas/" + todas + "/" + $stateParams.instrumento,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.listaVagas = data;
        $scope.mostraTela = true;
        //console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

});