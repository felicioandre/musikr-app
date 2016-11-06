app.controller('BandasCtrl', function($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.mostraTela = false;

    $ionicLoading.show({
        content: 'Carregando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $http({
        method: "GET",
        url: SERVIDOR + "genero-musical/lista-genero-musical",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function(data) {
        $ionicLoading.hide();
        $scope.listaGenero = data;
        $scope.mostraTela = true;
    }).error(function(data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });
   
});