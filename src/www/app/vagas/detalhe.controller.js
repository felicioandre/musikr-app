app.controller('DetalheVagaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $filter,
    $ionicLoading,
    $ionicHistory,
    $ionicViewSwitcher,
    $ionicPopover,
    $ionicPopup) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.mostraTela = false;
    //$stateParams.id = 7;
    //$scope.NomeInstrumento = "Violão";
    $scope.NomeInstrumento = $stateParams.instrumento;
    $scope.dadosVaga = null;
    $scope.usuarioCandidato = false;
    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "vagas/detalhe/" + $stateParams.id,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.dadosVaga = data;
        $scope.mostraTela = true;
        $scope.usuarioCandidato = data.isUserCandidato;
        //console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });
    
    //popover button
    $ionicPopover.fromTemplateUrl('app/vagas/popover-detalhe.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };

    $scope.closePopover = function () {
        $scope.popover.hide();
    };

    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });

    $scope.excluirVaga = function () {
        //console.log("stoy aqui");
        $scope.closePopover();

        var confirmPopup = $ionicPopup.confirm({
            title: "Você tem certeza que deseja excluir essa vaga?",
            template: "Todos os dados registrados serão perdidos.",
            cancelText: 'Cancelar',
            okText: 'Excluir'
        });
        confirmPopup.then(function (res) {
            if (res) {
                //console.log("excluiiiii caraaai");
                $scope.showLoading();

                $http({
                    method: "POST",
                    url: SERVIDOR + "vagas/deletar/" + $stateParams.id,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem("token")
                    }
                })
                .success(function (data) {
                    $ionicLoading.hide();
                    $scope.showAlert('OK!', 'A vaga foi excluida com sucesso!', 'app.minhas-vagas', 'back');
                })
                .error(function (data, statusCode) {
                    $ionicLoading.hide();
                    $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.');
                });
            }
        });
    }

    $scope.alterarVaga = function () {
        $scope.closePopover();
        $state.go('app.editar-vaga', { id: $stateParams.id });
    };

    $scope.candidatar = function () {

        $scope.showLoading();

        $http({
            method: "POST",
            url: SERVIDOR + "vagas/adicionar-candidato/" + $stateParams.id,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        })
                .success(function (data) {
                    $ionicLoading.hide();
                    $scope.usuarioCandidato = true;
                })
                .error(function (data, statusCode) {
                    $ionicLoading.hide();
                    $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.');
                });
    };

    $scope.removerCandidato = function () {

        $scope.showLoading();

        $http({
            method: "POST",
            url: SERVIDOR + "vagas/remover-candidato/" + $stateParams.id,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        })
                .success(function (data) {
                    $ionicLoading.hide();
                    $scope.usuarioCandidato = false;
                })
                .error(function (data, statusCode) {
                    $ionicLoading.hide();
                    $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.');
                });
    };
});