app.controller('VagasCtrl', function($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false);
    
    $scope.mostraTela = false;
    $scope.ehAdminBanda = false;
    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "banda/minhas-bandas-admin",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        //$scope.listaInstrumento = data;
        if (data.length > 0) {
            $scope.ehAdminBanda = true;
        }
        //console.log(data.length);
        $scope.mostraTela = true;
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

});