app.controller('EditarPerfilPessoaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicActionSheet,
    $ionicViewSwitcher,
    $ionicHistory,
    $filter) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.mostraTela = false;
    $scope.showLoading();

    $scope.dados = {};
    $scope.listaSexo = [{
        text: "Masculino",
        value: "M"
    }, {
        text: "Feminino",
        value: "F"
    }, ];

    $scope.dados.FotoBase64 = null;

    $http({
        method: "GET",
        url: SERVIDOR + "perfil/editar/",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        var dataNascimento = new Date(data.aniversario);
        var localTime = dataNascimento.getTime();
        var localOffset = dataNascimento.getTimezoneOffset() * 60000;
        var dataFormatada = new Date(localTime + localOffset);

        console.log(data);
        $scope.dados.CaminhoFoto = data.foto;
        $scope.dados.Nome = data.nome;
        $scope.dados.Email = data.email;
        $scope.dados.DataNascimento = dataFormatada;
        $scope.dados.Sexo = data.sexo;
        $scope.mostraTela = true;
        $ionicLoading.hide();
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

    

    $scope.enviarForm = function () {

        $scope.showLoading();

        $http({
            method: "POST",
            url: SERVIDOR + "perfil/editar/",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        })
            .success(function (data) {
                $ionicLoading.hide();
                $scope.showAlert('OK!', 'Perfil alterado com sucesso!', null, null, true);
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
        //console.log($scope.dados.FotoBase64);
    }

    $scope.Fail = function () {
        $ionicLoading.hide();
    }

});


app.controller('EditarGenerosPessoaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicActionSheet,
    $ionicViewSwitcher,
    $ionicHistory) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.mostraTela = false;

    $scope.showLoading();
    $scope.dados = {};
    $scope.checkItemsGeneroMusical = [];

    $http({
        method: "GET",
        url: SERVIDOR + "perfil/editar-generos/",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $scope.listaGenero = data;
        console.log(data);
        $scope.mostraTela = true;
        for (i in data) {
            if (data[i].checked == true) {
                console.log(data[i]);
                $scope.checkItemsGeneroMusical[data[i].value] = true;
            }
        }
        $ionicLoading.hide();
        

        //console.log($scope.checkItemsGeneroMusical)
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });



    $scope.enviarForm = function () {

        $scope.showLoading();
        //console.log($scope.checkItemsGeneroMusical);
        $scope.dados.GeneroMusical = [];

        for (i in $scope.checkItemsGeneroMusical) {
            if ($scope.checkItemsGeneroMusical[i] == true) {
                //array.push(i);
                $scope.dados.GeneroMusical.push(i);
            }
        }

        //console.log($scope.dados);

        $http({
            method: "POST",
            url: SERVIDOR + "perfil/editar-generos/",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        })
            .success(function (data) {
                $ionicLoading.hide();
                $scope.showAlert('OK!', 'Gêneros musicais alterados com sucesso!', null, null, true);
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

app.controller('EditarInstrumentosPessoaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicHistory,
    $ionicLoading,
    $ionicActionSheet,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.mostraTela = false;

    $scope.showLoading();
    $scope.dados = {};
    $scope.checkItemsInstrumentos = [];

    $http({
        method: "GET",
        url: SERVIDOR + "perfil/editar-instrumentos/",
        //url: SERVIDOR + "banda/editar/13",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        //$scope.dados = data;
        $scope.listaInstrumento = data.instrumentos;
        $scope.dados.cantor = data.ehCantor;
        console.log(data);
        $scope.mostraTela = true;
        $ionicLoading.hide();
        for (i in data.instrumentos) {
            if (data.instrumentos[i].checked == true) {
                console.log(data.instrumentos[i]);
                $scope.checkItemsInstrumentos[data.instrumentos[i].value] = true;
            }
        }
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });


    $scope.enviarForm = function () {

        $scope.showLoading();
        console.log($scope.checkItemsInstrumentos);
        $scope.dados.Instrumento = [];

        for (i in $scope.checkItemsInstrumentos) {
            if ($scope.checkItemsInstrumentos[i] == true) {
                $scope.dados.Instrumento.push(i);
            }
        }

        console.log($scope.dados);

        $http({
            method: "POST",
            url: SERVIDOR + "perfil/editar-instrumentos/",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        })
           .success(function (data) {
               $ionicLoading.hide();
               $scope.showAlert('OK!', 'Instrumentos alterados com sucesso!', null, null, true);
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

    };
});


app.controller('EditarSenhaPessoaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicHistory,
    $ionicLoading,
    $ionicActionSheet,
    $ionicViewSwitcher) {

    $scope.dados = {};
    $scope.dados.SenhaAtual = null;
    $scope.dados.SenhaNova = null;

    $scope.enviarForm = function () {

        $scope.showLoading();

        console.log($scope.dados);

        $http({
            method: "POST",
            url: SERVIDOR + "perfil/editar-senha/",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        })
           .success(function (data) {
               $ionicLoading.hide();
               $scope.showAlert('OK!', 'Senha alterada com sucesso!', null, null, true);
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
    };
});