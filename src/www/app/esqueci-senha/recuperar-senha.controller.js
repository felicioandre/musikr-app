app.controller('RecuperarSenhaCtrl', function($scope,
    $timeout,
    $state,
    $ionicPopup,
    $stateParams,
    ionicMaterialInk,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $scope.fundoLogin = "images/login" + (Math.floor(Math.random() * 10) + 1) + ".jpg";
    
    $ionicSideMenuDelegate.canDragContent(false)

    $scope.$parent.clearFabs();

    ionicMaterialInk.displayEffect();
    
    $scope.dados = {};
    $scope.dados.senha = null;
    $scope.dados.confirmacaosenha = null;

    $scope.redefinirSenha = function() {
        $ionicLoading.show({
            content: 'Carregando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        if(verifyEmpty($scope.dados.senha) || verifyEmpty($scope.dados.confirmacaosenha)){
            $ionicLoading.hide();
            $scope.showAlert('Senha inválida!', 'Por favor, tente novamente.');
        } else if($scope.dados.senha != $scope.dados.confirmacaosenha){
            $ionicLoading.hide();
            $scope.showAlert('As senhas precisam ser idênticas!', 'Por favor, tente novamente.');
        } else{

            $http({
                method: "POST",
                url: SERVIDOR + "account/redefinir-senha",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                data: $scope.dados
            })
            .success(function(data) {
                $ionicLoading.hide();
                $ionicViewSwitcher.nextDirection("forward");
                if(data.step == 1){
                        $state.go("app.primeiroacesso-step01");    
                    } else if(data.step == 2){
                        $state.go("app.primeiroacesso-step02");
                    } else if(data.step == 3){
                        $state.go("app.primeiroacesso-step03");
                    } else if(data.step == 4){
                        $state.go("app.home");
                    }
            })
            .error(function(data) {
                $ionicLoading.hide();
                $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.');
            });
        }
    };

    
});