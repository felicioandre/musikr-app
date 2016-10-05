app.controller('EsqueciSenhaCtrl', function($scope, 
                                            $timeout, 
                                            $state, 
                                            $ionicPopup, 
                                            $stateParams, 
                                            ionicMaterialInk, 
                                            $ionicSideMenuDelegate, 
                                            $http,
                                            $ionicLoading) {
    $scope.fundoLogin = "images/login" + (Math.floor(Math.random() * 10) + 1) + ".jpg";

//$scope.email = 'teste@teste.com';
    $scope.dados = {};
    $scope.dados.email = null;
    $scope.esqueciSenha = function(){
        $ionicLoading.show({
    content: 'Carregando...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
        console.log($scope.dados);
        /*$http.get(SERVIDOR + "account/testemetodo")
        .success(function(data) {
            alert(JSON.stringify(data));
        })
        .error(function(data){
        });*/

        $http.post(SERVIDOR + "account/esqueci-senha", $scope.dados)
        .success(function(data) {
            $ionicLoading.hide();
           $scope.showAlert('Senha redefinida com sucesso!', 'Verifique seu e-mail.', null) 

       })
        .error(function(data, statusCode){
            $ionicLoading.hide();
            if(statusCode == 400){
             if(data.Message == 1){
                $scope.showAlert('E-mail inválido!', 'Por favor, tente novamente.', null)
            } 
        } else{
            $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.', null) 
        }

    });
    };

    $scope.showAlert = function(titulo, conteudo, action) {
        var alertPopup = $ionicPopup.alert({
            title: titulo,
            template: conteudo
        });
    };
});