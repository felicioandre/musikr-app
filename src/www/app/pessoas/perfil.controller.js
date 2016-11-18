app.controller('PerfilPessoaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicHistory,
    $filter,
    $ionicViewSwitcher,
    $ionicPopover) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.mostraTela = false;
    $scope.NomeUsuario = $stateParams.nome;
    //$scope.NomeUsuario = "Nome do Usuario";
    $scope.LinkMenu = $stateParams.menu;
    //$stateParams.id = 66;
    $scope.IdUsuario = $stateParams.id;
    // $scope.LinkMenu = true;
    $scope.dadosUsuario = null;
    $scope.usuarioSegueUsuario = false;
    $scope.qtdSeguidores = null;

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

    $scope.alterarPerfil = function () {
        $state.go('app.editar-perfil-pessoa', { id: $stateParams.id });
    }
    $scope.alterarGenerosMusicais = function () {
        $state.go('app.editar-generos-pessoa', { id: $stateParams.id });
    }
    $scope.alterarInstrumentos = function () {
        $state.go('app.editar-instrumentos-pessoa', { id: $stateParams.id });
    }
    $scope.alterarSenha = function () {
        $state.go('app.editar-senha', { id: $stateParams.id });
    }

    //curtir publicacao
    $scope.curtirPublicacao = function (id) {
        $scope.showLoading();
        //console.log(id);

        $http({
            method: "POST",
            url: SERVIDOR + "publicacao/curtir/" + id,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        })
        .success(function (data) {
            var publicacao = $filter('filter')($scope.dadosPerfil.Publicacoes, function (d) { return d.IdPublicacao === id; })[0]
            publicacao.UsuarioJaCurtiu = !publicacao.UsuarioJaCurtiu;
            publicacao.QtdLikes = data.qtd;
            $ionicLoading.hide();
        })
        .error(function (data, statusCode) {
            $ionicLoading.hide();
            $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.');
        });
    }
});