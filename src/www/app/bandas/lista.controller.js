app.controller('ListaBandasCtrl', function($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.mostraTela = false;
    
    $scope.showLoading();

    $scope.NomeGenero = $stateParams.nome;

    $http({
        method: "GET",
        url: SERVIDOR + "banda/lista-genero/" + $stateParams.id,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.listaBandas = data;
        $scope.mostraTela = true;
        //console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });
    
    //$scope.IdGenero = $stateParams.id;
   
});