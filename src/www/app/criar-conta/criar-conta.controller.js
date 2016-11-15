app.controller('CriarContaCtrl', function($scope,
    $stateParams,
    $ionicPopup,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $timeout) {

    $scope.fundoLogin = "images/login" + (Math.floor(Math.random() * 10) + 1) + ".jpg";

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.dados = {};
    $scope.dados.nome = null;
    $scope.dados.email = null;
    $scope.dados.senha = null;

    $scope.criar = function() {
        /*$http.get(SERVIDOR + "account/testemetodo")
        .success(function(data) {
        alert(JSON.stringify(data));
        })
        .error(function(data){
        });*/

        $scope.showLoading();

        $http.post(SERVIDOR + "account/criar", $scope.dados)
            .success(function(data) {
                window.localStorage.setItem("token", data.access_token);
                window.localStorage.setItem("nomeUsuario", data.userName);
                window.localStorage.setItem("idUsuario", data.idUser);

                $ionicLoading.hide();
                $scope.showAlert('Cadastro feito com sucesso!', 
                                 'Você será redirecionado para completar seu cadastro.', 
                                 'app.primeiroacesso-step01');
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
});