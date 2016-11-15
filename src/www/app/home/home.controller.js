app.controller('HomeCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.aplicarInfoUsuario();
    
    $scope.fazerPublicacao = function () {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('app.publicacao.texto');
    }

    $scope.mostraTela = false;
    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "publicacao/lista-follow",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.listaPublicacao = data;
        $scope.mostraTela = true;
        console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });


});