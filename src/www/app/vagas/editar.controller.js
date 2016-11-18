app.controller('EditarVagaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.mostraTela = false;

    $scope.showLoading();

    //$stateParams.id = 11;

    $scope.dados = {};
    //$scope.dados.Banda = null;
    //$scope.dados.Instrumento = null;
    //$scope.dados.Descricao = null;
    //$scope.dados.Titulo = null;

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
        //console.log(data);
        //console.log($scope.listaInstrumento);
        //$scope.mostraTela = true;
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

    $http({
        method: "GET",
        url: SERVIDOR + "banda/minhas-bandas-admin",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        //
        if (data.length < 1) {
            $ionicLoading.hide();
            $scope.showAlert('Um erro foi encontrado!',
                            'Para divulgar uma vaga, você precisa ser administrador de uma banda.', null, null, true)
        } else {
            $scope.listaBandas = data;
            if (data.length < 2) {
                $scope.dados.Banda = data[0].id;
            }
            //$scope.mostraTela = true;
        }
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

    $http({
        method: "GET",
        url: SERVIDOR + "vagas/editar/" + $stateParams.id,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.dados.Instrumento = data.instrumento;
        $scope.dados.Banda = data.banda;
        $scope.dados.Titulo = data.titulo;
        $scope.dados.Descricao = data.descricao;
        //console.log(data);
        //console.log($scope.listaInstrumento);
        $scope.mostraTela = true;
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });
   

    
    $scope.criarVaga = function () {

        //console.log($scope.dados);
        $scope.showLoading();

        $http({
            method: "POST",
            url: SERVIDOR + "vagas/criar/" + $stateParams.id,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        }).success(function (data) {
            $ionicLoading.hide();
            $scope.showAlert('OK!', 'Vaga alterada com sucesso!', 'app.vagas');
            //$scope.showAlert('OK!', 'Vaga alterada com sucesso!');
        })
            .error(function (data, statusCode) {
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