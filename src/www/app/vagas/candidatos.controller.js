app.controller('CandidatosVagaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher,
    $ionicHistory) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.mostraTela = false;
    //$stateParams.id = 2;
    $scope.showLoading();

        $http({
            method: "GET",
            url: SERVIDOR + "vagas/lista-candidatos/" + $stateParams.id,
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