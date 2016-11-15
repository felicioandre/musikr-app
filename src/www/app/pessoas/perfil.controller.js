app.controller('PerfilPessoaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicHistory,
    $sce,
    $ionicViewSwitcher,
    $ionicPopover) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.voltarPagina = function () {
        //console.log('hey');
        $ionicHistory.goBack();
    }

    $scope.mostraTela = false;
    $scope.NomeUsuario = $stateParams.nome;
    //$scope.NomeUsuario = "Nome do Usuario";
    $scope.LinkMenu = $stateParams.menu;
    //$stateParams.id = 66;
    //$scope.LinkMenu = true;
    $scope.dadosUsuario = null;
    $scope.usuarioSegueUsuario = false;
    $scope.qtdSeguidores = null;

    $scope.testeVideo = "https://www.youtube.com/embed/EfYgGKDSESw";
    $scope.testeVideo = $sce.trustAsResourceUrl($scope.testeVideo);

    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "perfil/detalhe/" + $stateParams.id,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.dadosPerfil = data;
        $scope.mostraTela = true;
        $scope.qtdSeguidores = data.TotalSeguidores;
        $scope.usuarioSegueUsuario = data.isUserFollowing;
        console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

    
    //popover
    $ionicPopover.fromTemplateUrl('app/pessoas/popover-perfil.html', {
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



    //Seguir Usuario

    $scope.followUsuario = function (tipo) {
        $scope.showLoading();
        $http({
            method: "POST",
            url: SERVIDOR + "pessoa/seguir/" + $stateParams.id + "/" + tipo,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        })
                .success(function (data) {
                    $scope.qtdSeguidores = data.seguidores;

                    if (tipo == 1) {
                        $scope.usuarioSegueUsuario = true;
                    } else {
                        $scope.usuarioSegueUsuario = false;
                    }
                    $ionicLoading.hide();
                })
                .error(function (data, statusCode) {
                    $ionicLoading.hide();
                    $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.');
                });
    }
});