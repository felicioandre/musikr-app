app.controller('TextoCtrl', function ($scope,
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

    $http({
        method: "GET",
        url: SERVIDOR + "banda/minhas-bandas-admin",
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

    $scope.nomeUsuario = window.localStorage.getItem("nomeUsuario");
    $scope.fotoUsuario = window.localStorage.getItem("fotoPerfil");
    $scope.dados = {};
    $scope.dados.texto = null;
    $scope.dados.tipoPublicacao = 1;
    $scope.dados.bandaId = 0;

    $scope.enviarPublicacao = function () {

        //console.log($scope.dados);
        $scope.showLoading();

        $http({
            method: "POST",
            url: SERVIDOR + "publicacao/criar",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        }).success(function (data) {
            $ionicLoading.hide();
            $scope.showAlert('OK!', 'Publicação criada com sucesso!', null);
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

app.controller('VideoCtrl', function ($scope,
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

    $http({
        method: "GET",
        url: SERVIDOR + "banda/minhas-bandas-admin",
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

    $scope.nomeUsuario = window.localStorage.getItem("nomeUsuario");
    $scope.fotoUsuario = window.localStorage.getItem("fotoPerfil");
    $scope.dados = {};
    $scope.dados.texto = null;
    $scope.dados.video = null;
    $scope.dados.tipoPublicacao = 3;
    $scope.dados.bandaId = 0;

    $scope.enviarPublicacao = function () {

        //console.log($scope.dados);
        $scope.showLoading();

        $http({
            method: "POST",
            url: SERVIDOR + "publicacao/criar",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        }).success(function (data) {
            $ionicLoading.hide();
            $scope.showAlert('OK!', 'Publicação criada com sucesso!', null);
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

app.controller('ImagemCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher,
    $ionicActionSheet) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.mostraTela = false;

    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "banda/minhas-bandas-admin",
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

    $scope.nomeUsuario = window.localStorage.getItem("nomeUsuario");
    $scope.fotoUsuario = window.localStorage.getItem("fotoPerfil");
    $scope.dados = {};
    $scope.dados.texto = null;
    $scope.dados.ImagemBase64 = null;
    $scope.dados.tipoPublicacao = 2;
    $scope.dados.bandaId = 0;

    $scope.enviarPublicacao = function () {

        //console.log($scope.dados);
        $scope.showLoading();

        $http({
            method: "POST",
            url: SERVIDOR + "publicacao/criar",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        }).success(function (data) {
            $ionicLoading.hide();
            $scope.showAlert('OK!', 'Publicação criada com sucesso!', null);
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



    //escolher imagem
    $scope.showActionSheet = function () {

        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: '<i class="icon ion-android-camera balanced"></i> Usar Câmera'
            }, {
                text: '<i class="icon ion-images positive"></i> Galeria de Fotos'
            }],
            titleText: 'Escolher Foto de Perfil',
            cancelText: 'Cancelar',
            buttonClicked: function (index) {
                if (index == 0) {
                    hideSheet();
                    $scope.novaFotoCamera();
                } else if (index == 1) {
                    hideSheet();
                    $scope.novaFotoAlbum();
                }
                return true;
            }
        });

    };

    $scope.novaFotoAlbum = function () {
        navigator.camera.getPicture($scope.SuccessFoto, $scope.Fail, {
            quality: 50,
            targetWidth: 720,
            targetHeight: 720,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            allowEdit: true
        });
    }

    $scope.novaFotoCamera = function () {
        navigator.camera.getPicture($scope.SuccessFoto, $scope.Fail, {
            quality: 50,
            targetWidth: 720,
            targetHeight: 720,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            allowEdit: true
        });
    }

    $scope.SuccessFoto = function (img) {
        $ionicLoading.show();
        $scope.dados.ImagemBase64 = img;
        $ionicLoading.hide();
        //console.log($scope.dados.ImagemBase64);
    }

    $scope.Fail = function () {
        $ionicLoading.hide();
    }

});