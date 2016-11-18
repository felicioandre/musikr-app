app.controller('IntegrantesBandaCtrl', function ($scope,
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

    $scope.mostraTela = false;
    //$stateParams.id = 15;
    $scope.IdBanda = $stateParams.id;
    //$scope.NomeBanda = $stateParams.nome;
    $scope.listaIntegrantes = null;
    $scope.bandaId = $stateParams.id;
    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "banda/lista-integrantes/" + $stateParams.id,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.listaIntegrantes = data;
        $scope.mostraTela = true;
        console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });
});

app.controller('AdicionarIntegranteBandaCtrl', function ($scope,
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
    //$stateParams.id = 15;
    $scope.mostraTela = false;

    $scope.dados = {};
    $scope.dados.IsAdmin = false;
    $scope.dados.UsuarioId = null;
    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "banda/adicionar-integrante/" + $stateParams.id,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.listaSeguidores = data;
        $scope.mostraTela = true;
        console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });


    $scope.enviarForm = function () {

        console.log($scope.dados);
        $scope.showLoading();

        $http({
            method: "POST",
            url: SERVIDOR + "banda/adicionar-integrante/" + $stateParams.id,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        }).success(function (data) {
            $ionicLoading.hide();
            $scope.showAlert('OK!', 'Integrante adicionado com sucesso!', null, null, true);
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

app.controller('EditarIntegranteBandaCtrl', function ($scope,
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
    //$stateParams.id = 87;
    //$stateParams.idBanda = 15;
    $scope.mostraTela = false;
    $scope.integranteEhUsuario = false;

    if ($stateParams.id == window.localStorage.getItem("idUsuario")) {
        $scope.integranteEhUsuario = true;
    }

    $scope.dados = {};
    $scope.dados.IsAdmin = false;
    $scope.showLoading();
    $scope.fotoUsuario = null;
    $scope.nomeUsuario = null;

    $http({
        method: "GET",
        url: SERVIDOR + "banda/editar-integrante/" + $stateParams.idBanda + "/" + $stateParams.id,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $ionicLoading.hide();
        $scope.dados.IsAdmin = data.isAdmin;
        $scope.fotoUsuario = data.foto;
        $scope.nomeUsuario = data.nome;
        $scope.mostraTela = true;
        console.log(data);
    }).error(function (data, statusCode) {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });


    $scope.enviarForm = function () {

        console.log($scope.dados);
        $scope.showLoading();

        $http({
            method: "POST",
            url: SERVIDOR + "banda/editar-integrante/" + +$stateParams.idBanda + "/" + $stateParams.id,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        }).success(function (data) {
            $ionicLoading.hide();
            $scope.showAlert('OK!', 'Integrante alterado com sucesso!', null, null, true);
        })
        .error(function (data, statusCode) {
            $ionicLoading.hide();

            if (statusCode == 400) {
                if (data.ModelState) {
                    $scope.showAlert('Alguns erros foram encontrados!', parseErrors(data), null, null, true);
                }
            } else {
                $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
            }
        });
    }


    $scope.removerIntegrante = function () {

        var confirmPopup = $ionicPopup.confirm({
            title: "Você tem certeza?",
            template: "Tem certeza que deseja remover este integrante?",
            cancelText: 'Cancelar',
            okText: 'Excluir'
        });
        confirmPopup.then(function (res) {
            if (res) {
                $scope.showLoading();
                $http({
                    method: "POST",
                    url: SERVIDOR + "banda/remover-integrante/" + +$stateParams.idBanda + "/" + $stateParams.id,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem("token")
                    },
                    data: $scope.dados
                }).success(function (data) {
                    $ionicLoading.hide();
                    $scope.showAlert('OK!', 'Integrante removido com sucesso!', null, null, true);
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


    }

});