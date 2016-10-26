app.controller('step01Ctrl', function($scope,
    $timeout,
    $state,
    $ionicPopup,
    $stateParams,
    ionicMaterialInk,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicActionSheet) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.$parent.clearFabs();


    ionicMaterialInk.displayEffect();


    $scope.listaSexo = [{
        text: "Masculino",
        value: "M"
    }, {
        text: "Feminino",
        value: "F"
    }, ];

    $scope.dados = {};
    $scope.dados.DataNascimento = null;
    $scope.dados.Sexo = null;
    //$scope.tirouFoto = false;
    $scope.FotoPerfil = SERVIDOR + 'Content/user-default.jpg';

    $scope.finalizarStep01 = function() {
        /*$http.get(SERVIDOR + "account/testemetodo")
        .success(function(data) {
        alert(JSON.stringify(data));
        })
        .error(function(data){
        });*/

        $ionicLoading.show({
            content: 'Carregando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        //console.log($scope.dados);

        $http({
                method: "POST",
                url: SERVIDOR + "primeiro-acesso/step01",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                data: $scope.dados
            })
            .success(function(data) {
                $ionicLoading.hide();
                $state.go("app.primeiroacesso-step02");
                //alert(JSON.stringify(data));
            })
            .error(function(data, statusCode) {
                $ionicLoading.hide();
                if (statusCode == 400) {
                    if (data.ModelState) {
                        $scope.showAlert('Alguns erros foram encontrados!', parseErrors(data));
                    }
                } else {
                    $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
                }
            });

        /*$scope.showLoading = function() {
            $ionicLoading.show({
                template: 'Loading...'
            }).then(function() {
                console.log("The loading indicator is now displayed");
            });
        };

        $scope.hideLoading = function() {
            $ionicLoading.hide().then(function() {
                console.log("The loading indicator is now hidden");
            });
        };*/

    }


    //upload de foto
    $scope.novaFotoAlbum = function() {
        navigator.camera.getPicture($scope.Success, $scope.Fail, {
            quality: 70,
            targetWidth: 720,
            targetHeight: 720,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: navigator.camera.DestinationType.FILE_URI
        });
    }

    $scope.novaFotoCamera = function() {
        navigator.camera.getPicture($scope.Success, $scope.Fail, {
            quality: 70,
            targetWidth: 720,
            targetHeight: 720,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            destinationType: navigator.camera.DestinationType.FILE_URI
        });
    }

    $scope.Success = function(img) {
        $ionicLoading.show();
        //console.log(img);
        $scope.uploadPhoto(img);
        
    }

    $scope.Fail = function() {
        $ionicLoading.hide();
    }

    $scope.uploadPhoto = function(imagemTirada) {
        //var params = new Object();
        //params.value1 = window.localStorage.getItem("idLogado");
        //var dt = new Date();
        //var time = dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear() + "-" + dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds();

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = window.localStorage.getItem("idUsuario") + ".jpeg";
        options.mimeType = "image/jpeg";
        //options.params = params;
        options.headers = {
            Authorization: "Bearer " + window.localStorage.getItem("token")
        };
        options.chunkedMode = false;
        options.method = "POST";
        //console.log(options);
        var ft = new FileTransfer();
        ft.upload(
            imagemTirada,
            encodeURI(SERVIDOR + "perfil/alterar-foto"),
            $scope.onFileUploadSuccess,
            $scope.onFileTransferFail,
            options);
    }

    $scope.onFileUploadSuccess = function(linkImagem) {
        console.log(linkImagem.response);
        $scope.FotoPerfil = linkImagem.response;
        $ionicLoading.hide();
    }

    $scope.onFileTransferFail = function() {
        $ionicLoading.hide();
        $scope.showAlert('Ocorreu um erro ao tentar alterar sua foto!', 'Por favor, tente novamente mais tarde.');
    }

    $scope.showActionSheet = function() {

        $ionicActionSheet.show({
            buttons: [{
                text: '<i class="icon ion-android-camera balanced"></i> Usar Câmera'
            }, {
                text: '<i class="icon ion-images positive"></i> Galeria de Fotos'
            }],
            titleText: 'Escolher Foto de Perfil',
            cancelText: 'Cancelar',
            buttonClicked: function(index) {
                if (index == 0) {
                    $scope.novaFotoCamera();
                } else if (index == 1) {
                    $scope.novaFotoAlbum();
                }
                return true;
            }
        });

    };
});