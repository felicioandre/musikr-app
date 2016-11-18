

app.controller('BuscaVagaInstrumentoCtrl', function ($scope,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.mostraTela = false;

    $scope.showLoading();

    $scope.listaInstrumento = [{
        checked: false,
        text: "Vocalista",
        value: 0
    }];

    $http({
        method: "GET",
        url: SERVIDOR + "instrumento/lista-instrumento",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        //$scope.listaInstrumento = data;
        $scope.listaInstrumento = $scope.listaInstrumento.concat(data);
        console.log(data);
        console.log($scope.listaInstrumento);
        $scope.mostraTela = true;
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

});