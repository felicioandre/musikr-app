app.controller('PerfilBandaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicHistory,
    $ionicViewSwitcher,
    $ionicPopover,
    $ionicPopup) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.voltarPagina = function () {
        $ionicHistory.goBack();
    };

    $scope.mostraTela = false;
    $scope.NomeBanda = $stateParams.nome;
    $scope.dadosBanda = null;
    $scope.showLoading();

    $http({
        method: "GET",
        //url: SERVIDOR + "banda/detalhe/" + $stateParams.id,
        url: SERVIDOR + "banda/detalhe/13",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.dadosBanda = data;
        $scope.mostraTela = true;
        //console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

    //popover button
    // .fromTemplate() method
    $ionicPopover.fromTemplateUrl('app/bandas/popover-perfil.html', {
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

    //// execute action on hide popover
    //$scope.$on('popover.hidden', function () {
    //    // execute action
    //});

    //// execute action on remove popover
    //$scope.$on('popover.removed', function () {
    //    // execute action
    //});

    $scope.excluirBanda = function () {
        //console.log("stoy aqui");
        $scope.closePopover();

        var confirmPopup = $ionicPopup.confirm({
            title: "Você tem certeza que deseja excluir sua banda?",
            template: "Todos os dados serão perdidos."
        });
        confirmPopup.then(function (res) {
            if (res) {
                $scope.showLoading();

                $http({
                    method: "POST",
                    url: SERVIDOR + "banda/deletar/" + $stateParams.id,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem("token")
                    }
                })
                .success(function (data) {
                    $ionicLoading.hide();
                    $scope.showAlert('OK!', 'Sua banda foi deletada com sucesso!', 'app.minhas-bandas', 'back');
                })
                .error(function (data, statusCode) {
                    $ionicLoading.hide();
                    $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.');
                });
            }
        });
    }

    $scope.alterarBanda = function () {
        console.log("stoy aqui");
        $scope.closePopover();
        $state.go('app.editar-banda');
    };
});