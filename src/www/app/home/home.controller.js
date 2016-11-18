app.controller('HomeCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $filter,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.aplicarInfoUsuario();

    $scope.fazerPublicacao = function () {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('app.publicacao.texto');
    }

    $scope.mostraTela = false;
    $scope.showLoading();

    $scope.publicacoes = null;
    
    $http({
        method: "GET",
        url: SERVIDOR + "publicacao/lista-follow",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.listaPublicacao = data;
        $scope.publicacoes = data;
        $scope.mostraTela = true;

        //console.log(data);
        //console.log($scope.publicacoes);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

    $scope.verPerfil = function (perfilId, ehBanda, nomePerfil) {
        if (ehBanda) {
            $state.go('app.perfil-banda', { id: perfilId, nome: nomePerfil });
        }
        else {
            $state.go('app.perfil-pessoa', { id: perfilId, nome: nomePerfil, menu: false });
        }
    }


    $scope.curtirPublicacao = function (id) {
        $scope.showLoading();
        $http({
            method: "POST",
            url: SERVIDOR + "publicacao/curtir/" + id,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        })
                .success(function (data) {
                    var publicacao = $filter('filter')($scope.listaPublicacao, function (d) { return d.IdPublicacao === id; })[0]
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