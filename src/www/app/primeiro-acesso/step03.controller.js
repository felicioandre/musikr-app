app.controller('step03Ctrl', function($scope, 
                                     $timeout, 
                                     $state, 
                                     $ionicPopup, 
                                     $stateParams, 
                                     $ionicSideMenuDelegate, 
                                     $http,
                                     $ionicLoading,
                                     $ionicHistory) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.mostraTela = false;

    $scope.showLoading();

    $http({
        method: "GET",
        url: SERVIDOR + "instrumento/lista-instrumento",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function(data) {
        $ionicLoading.hide();
        $scope.listaInstrumento = data;
        $scope.mostraTela = true;
    }).error(function(data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

    $scope.dados = {};
    //$scope.dados.GeneroMusical = null;
    $scope.dados.cantor = false;
    $scope.dados.Instrumento = [];
    $scope.checkItems = { };

    $scope.finalizarStep03 = function() {

        $scope.showLoading();

        for(i in $scope.checkItems) {
            console.log($scope.checkItems[i]);
            if($scope.checkItems[i] == true) {
                $scope.dados.Instrumento.push(i);
            }
        }

        $http({
                method: "POST",
                url: SERVIDOR + "primeiro-acesso/step03",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                data: $scope.dados
            })
            .success(function(data) {
                $ionicLoading.hide();
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go("app.home");
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

    }
});