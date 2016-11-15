app.controller('BuscaResultadoCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher,
    $ionicHistory) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.voltarPagina = function () {
        $ionicHistory.goBack();
    };

    $scope.mostraTela = false;
    $scope.NomeGenero = $stateParams.nome;
    $scope.TipoResultado = $stateParams.tipo;
    var urlGet = null;

    $scope.showLoading();

    if ($scope.TipoResultado == 1) {
        urlGet = SERVIDOR + "pessoa/lista-genero/" + $stateParams.id;
    } else if ($scope.TipoResultado == 2) {
        urlGet = SERVIDOR + "pessoa/lista-instrumento/" + $stateParams.id;
    }
        $http({
            method: "GET",
            url: urlGet,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        }).success(function (data) {
            $ionicLoading.hide();
            $scope.listaUsuario = data;
            $scope.mostraTela = true;
            console.log(data);
        }).error(function (data, statusCode) {
            $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
        });
    

    

});