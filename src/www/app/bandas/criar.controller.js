app.controller('CriarBandaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicActionSheet,
    $ionicViewSwitcher) {

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


    $scope.dados = {};
    //$scope.dados.GeneroMusical = null;
    $scope.dados.nomeBanda = null;
    $scope.dados.FotoBase64 = null;
    $scope.dados.LogoBase64 = null;
    $scope.checkItemsGeneroMusical = {};

    $scope.criarBanda = function () {

        $scope.showLoading();

        $scope.dados.GeneroMusical = [];
        for (i in $scope.checkItemsGeneroMusical) {
            //console.log($scope.checkItems[i]);
            if ($scope.checkItemsGeneroMusical[i] == true) {
                //array.push(i);
                $scope.dados.GeneroMusical.push(i);
            }
        }

        $http({
            method: "POST",
            url: SERVIDOR + "banda/criar/0",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        })
            .success(function (data) {
                $ionicLoading.hide();
                $scope.showAlert('OK!', 'Sua banda foi criada com sucesso!', 'app.minhas-bandas');
                //$state.go("app.minhas-bandas");
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

    $scope.escolherLogotipo = function () {
        navigator.camera.getPicture($scope.SuccessLogo, $scope.Fail, {
            quality: 50,
            targetWidth: 720,
            targetHeight: 720,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            allowEdit: true
        });
    }

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

    $scope.SuccessLogo = function (img) {
        $ionicLoading.show();

        $scope.dados.LogoBase64 = img;
        $ionicLoading.hide();

    }

    $scope.SuccessFoto = function (img) {
        $ionicLoading.show();

        $scope.dados.FotoBase64 = img;
        $ionicLoading.hide();

    }

    $scope.Fail = function () {
        $ionicLoading.hide();
    }

});