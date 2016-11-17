app.controller('step01Ctrl', function($scope,
    $timeout,
    $state,
    $ionicPopup,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicActionSheet) {

    $ionicSideMenuDelegate.canDragContent(false);

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
    $scope.dados.FotoBase64 = null;
    //$scope.tirouFoto = false;
    $scope.FotoPerfil = SERVIDOR + 'Content/user-default.jpg';

    $scope.finalizarStep01 = function() {
        /*$http.get(SERVIDOR + "account/testemetodo")
        .success(function(data) {
        alert(JSON.stringify(data));
        })
        .error(function(data){
        });*/

        $scope.showLoading();

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
                window.localStorage.setItem("fotoPerfil", data.fotoPerfil);
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
            quality: 50,
            targetWidth: 720,
            targetHeight: 720,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            allowEdit: true
        });
    }

    $scope.novaFotoCamera = function() {
        navigator.camera.getPicture($scope.Success, $scope.Fail, {
            quality: 50,
            targetWidth: 720,
            targetHeight: 720,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            allowEdit: true
        });
    }

    $scope.Success = function(img) {
        $ionicLoading.show();
        $scope.FotoPerfil = null;
        $scope.dados.FotoBase64 = img;
        console.log(img);
        $ionicLoading.hide();
    }

    $scope.Fail = function() {
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
});