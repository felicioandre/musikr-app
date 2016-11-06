app.controller('LoginCtrl', function($scope,
    $timeout,
    $state,
    $stateParams,
    //ionicMaterialInk,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher,
    $ionicHistory) {

    $ionicHistory.nextViewOptions({
        disableBack: true
    });

    $ionicSideMenuDelegate.canDragContent(false);
    
    if (window.localStorage.getItem("token") != null) {
        $http({
                method: "POST",
                url: SERVIDOR + "account/is-alive",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                }
            })
            .success(function(data) {
                $scope.aplicarInfoUsuario();

                if(data.step == 1){
                    $state.go("app.primeiroacesso-step01");    
                } else if(data.step == 2){
                    $state.go("app.primeiroacesso-step02");
                } else if(data.step == 3){
                    $state.go("app.primeiroacesso-step03");
                } else{
                    $state.go("app.home");
                }
            })
            .error(function(data) {
                //            console.log(window.localStorage.getItem("token"));
                window.localStorage.removeItem("token");
            });
        //

    }

    /*$ionicSideMenuDelegate.canDragContent(false)

    $scope.$parent.clearFabs();

    ionicMaterialInk.displayEffect();*/

    $scope.fundoLogin = "images/login" + (Math.floor(Math.random() * 10) + 1) + ".jpg";

    $timeout(function(){
        $scope.showFields = true;
    }, 500);

    $scope.dados = {};
    $scope.dados.email = null;
    $scope.dados.senha = null;

    $scope.login = function() {
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
        $http.post(SERVIDOR + "account/login", $scope.dados)
            .success(function(data) {
                //alert(JSON.stringify(data));
                $ionicLoading.hide();
                //console.log(data == 2);
                console.log(data);
                if (data.token != null) {
                    window.localStorage.setItem("token", data.token.access_token);
                    window.localStorage.setItem("nomeUsuario", data.token.userName);
                    window.localStorage.setItem("idUsuario", data.token.idUser);
                    window.localStorage.setItem("fotoPerfil", data.token.fotoPerfil);
                    //console.log(window.localStorage.getItem("nomeUsuario"));
                    //window.localStorage.setItem("expireDate", data.)
                    $ionicViewSwitcher.nextDirection("forward");
                    $scope.aplicarInfoUsuario();
                    if(data.trocaSenha == 1){
                        $state.go("app.recuperarsenha");
                    } else if(data.step == 1){
                        $state.go("app.primeiroacesso-step01");    
                    } else if(data.step == 2){
                        $state.go("app.primeiroacesso-step02");
                    } else if(data.step == 3){
                        $state.go("app.primeiroacesso-step03");
                    } else{
                        $state.go("app.home");
                    }
                    
                }
                /*else if(JSON.stringify(data) == 0){
                console.log(0);
                $scope.showAlert('E-mail ou Senha inválidos!', 'Por favor, tente novamente.', null)
            }*/

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
    };

   
});