app.controller('EditarBandaCtrl', function ($scope,
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
    //$stateParams.id = 15;
    $scope.dados = {};
    $scope.checkItemsGeneroMusical = [];

    $http({
        method: "GET",
        url: SERVIDOR + "banda/editar/" + $stateParams.id,
        //url: SERVIDOR + "banda/editar/13",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        
        //$scope.dados = data;
        
        $scope.listaGenero = data.generosMusicais;
        $scope.dados.nomeBanda = data.nome;
        $scope.dados.CaminhoLogo = data.logotipo;
        $scope.dados.CaminhoFoto = data.foto;
        console.log(data);
        $scope.mostraTela = true;

        for (i in data.generosMusicais) {
            if (data.generosMusicais[i].checked == true) {
                console.log(data.generosMusicais[i]);
                $scope.checkItemsGeneroMusical[data.generosMusicais[i].value] = true;
            }
        }

        $ionicLoading.hide();
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });
    
    //$scope.dados.GeneroMusical = null;
    $scope.dados.FotoBase64 = null;
    $scope.dados.LogoBase64 = null;

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
            url: SERVIDOR + "banda/criar/" + $stateParams.id,
            //url: SERVIDOR + "banda/criar/13",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        })
            .success(function (data) {
                $ionicLoading.hide();
                $scope.showAlert('OK!', 'Sua banda foi alterada com sucesso!', 'app.minhas-bandas');
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

    $scope.SuccessLogo = function (img) {
        $ionicLoading.show();
        //console.log(img);
        //$scope.uploadPhoto(img);
        $scope.dados.CaminhoLogo = null;
        $scope.dados.LogoBase64 = img;
        console.log($scope.dados);
        $ionicLoading.hide();
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
        //console.log(img);
        //$scope.uploadPhoto(img);
        $scope.dados.CaminhoFoto = null;
        $scope.dados.FotoBase64 = img;
        $ionicLoading.hide();
        console.log($scope.dados.FotoBase64);
    }

    $scope.Fail = function () {
        $ionicLoading.hide();
    }
});