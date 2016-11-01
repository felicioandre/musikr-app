app.controller('EsqueciSenhaCtrl', function($scope,
    $timeout,
    $state,
    $ionicPopup,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading) {

    $scope.fundoLogin = "images/login" + (Math.floor(Math.random() * 10) + 1) + ".jpg";
    
    $ionicSideMenuDelegate.canDragContent(false);    

    //$scope.email = 'teste@teste.com';
    $scope.dados = {};
    $scope.dados.email = null;

    $scope.esqueciSenha = function() {
        $ionicLoading.show({
            content: 'Carregando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        //console.log($scope.dados);
        /*$http.get(SERVIDOR + "account/testemetodo")
        .success(function(data) {
            alert(JSON.stringify(data));
        })
        .error(function(data){
        });*/

        if(!verifyEmpty($scope.dados.email)){



            $http.post(SERVIDOR + "account/esqueci-senha", $scope.dados)
                .success(function(data) {
                    $ionicLoading.hide();
                    $scope.showAlert('Senha redefinida com sucesso!', 'Verifique seu e-mail.')

                })
                .error(function(data, statusCode) {
                    $ionicLoading.hide();
                    if (statusCode == 400) {
                        if (data.Message == 1) {
                            $scope.showAlert('E-mail inválido!', 'Por favor, tente novamente.')
                        }
                    } else {
                        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
                    }

                });
        } else{
            $ionicLoading.hide();
            $scope.showAlert('E-mail inváldo!', 'Por favor, tente novamente.')
        }
    };

    
});