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
    $scope.dados.GeneroMusical = [];
    $scope.checkItemsGeneroMusical = {};

    $scope.criarBanda = function () {

        $scope.showLoading();

        for (i in $scope.checkItemsGeneroMusical) {
            //console.log($scope.checkItems[i]);
            if ($scope.checkItemsGeneroMusical[i] == true) {
                //array.push(i);
                $scope.dados.GeneroMusical.push(i);
            }
        }

        $http({
            method: "POST",
            url: SERVIDOR + "banda/criar",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        })
            .success(function (data) {
                $ionicLoading.hide();
                $state.go("app.minhas-bandas");
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

        $ionicActionSheet.show({
            buttons: [{
                text: '<i class="icon ion-android-camera balanced"></i> Usar Câmera'
            }, {
                text: '<i class="icon ion-images positive"></i> Galeria de Fotos'
            }],
            titleText: 'Escolher Foto de Perfil',
            cancelText: 'Cancelar',
            buttonClicked: function (index) {
                if (index == 0) {
                    $scope.novaFotoCamera();
                } else if (index == 1) {
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
        //console.log(img);
        //$scope.uploadPhoto(img);
        $scope.dados.LogoBase64 = img;
        $ionicLoading.hide();
        console.log($scope.dados.LogoBase64);
    }

    $scope.SuccessFoto = function (img) {
        $ionicLoading.show();
        //console.log(img);
        //$scope.uploadPhoto(img);
        $scope.dados.FotoBase64 = img;
        $ionicLoading.hide();
        console.log($scope.dados.FotoBase64);
    }

    $scope.Fail = function () {
        $ionicLoading.hide();
    }

    //$scope.uploadPhoto = function (imagemTirada) {
    //    //var params = new Object();
    //    //params.value1 = window.localStorage.getItem("idLogado");
    //    //var dt = new Date();
    //    //var time = dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear() + "-" + dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds();

    //    var options = new FileUploadOptions();
    //    options.fileKey = "file";
    //    options.fileName = window.localStorage.getItem("idUsuario") + ".jpeg";
    //    options.mimeType = "image/jpeg";
    //    //options.params = params;
    //    options.headers = {
    //        Authorization: "Bearer " + window.localStorage.getItem("token")
    //    };
    //    options.chunkedMode = false;
    //    options.method = "POST";
    //    //console.log(options);
    //    var ft = new FileTransfer();
    //    ft.upload(
    //        imagemTirada,
    //        encodeURI(SERVIDOR + "perfil/alterar-foto"),
    //        $scope.onFileUploadSuccess,
    //        $scope.onFileTransferFail,
    //        options);
    //}

    //$scope.onFileUploadSuccess = function (linkImagem) {
    //    console.log(linkImagem.response);
    //    $scope.FotoPerfil = linkImagem.response;
    //    $ionicLoading.hide();
    //}

    //$scope.onFileTransferFail = function () {
    //    $ionicLoading.hide();
    //    $scope.showAlert('Ocorreu um erro ao tentar alterar sua foto!', 'Por favor, tente novamente mais tarde.');
    //}
});