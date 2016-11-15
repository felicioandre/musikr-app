app.controller('BuscaPessoaNomeCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.fezBusca = false;
    $scope.dados = {};
    $scope.dados.nome = null;
    
    $scope.buscarUsuario = function () {
        $scope.showLoading();

        $http({
            method: "POST",
            url: SERVIDOR + "pessoa/lista-nome/",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        }).success(function (data) {
            $ionicLoading.hide();
            $scope.listaUsuario = data;
            $scope.fezBusca = true;
            console.log(data);
        }).error(function (data, statusCode) {
            $ionicLoading.hide();
            if (statusCode == 400) {
                if (data.ModelState) {
                    $scope.showAlert('Alguns erros foram encontrados!', parseErrors(data));
                }
            } else {
                $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
            }
        });

    }
   
});



app.controller('BuscaPessoaInstrumentoCtrl', function ($scope,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.mostraTela = false;

    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "instrumento/lista-instrumento",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.listaInstrumento = data;
        $scope.mostraTela = true;
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

});


app.controller('BuscaPessoaGeneroCtrl', function ($scope,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.mostraTela = false;

    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "genero-musical/lista-genero-musical",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.listaGenero = data;
        $scope.mostraTela = true;
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

});