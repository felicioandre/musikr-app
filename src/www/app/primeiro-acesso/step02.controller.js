app.controller('step02Ctrl', function($scope, 
                                      $timeout, 
                                      $state, 
                                      $ionicPopup, 
                                      $stateParams, 
                                      $ionicSideMenuDelegate, 
                                      $http,
                                      $ionicLoading) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.mostraTela = false;

    $ionicLoading.show({
        content: 'Carregando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $http({
        method: "GET",
        url: SERVIDOR + "genero-musical/lista-genero-musical",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function(data) {
        $ionicLoading.hide();
        $scope.listaGenero = data;
        $scope.mostraTela = true;
    }).error(function(data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

    $scope.dados = {};
    //$scope.dados.GeneroMusical = null;
    $scope.dados.GeneroMusical = [];
    $scope.checkItems = { };

    $scope.finalizarStep02 = function() {
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

        //var array = [];
        for(i in $scope.checkItems) {
            console.log($scope.checkItems[i]);
            if($scope.checkItems[i] == true) {
                //array.push(i);
                $scope.dados.GeneroMusical.push(i);
            }
        }

        //$scope.dados.GeneroMusical = array;

        $http({
                method: "POST",
                url: SERVIDOR + "primeiro-acesso/step02",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                data: $scope.dados
            })
            .success(function(data) {
                $ionicLoading.hide();
                $state.go("app.primeiroacesso-step03");
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

    }

    /*$scope.listaGenero = [{
        text: "Rock",
        value: 1,
        checked: false
    }, {
        text: "Pop",
        value: 2,
        checked: true
    }, {
        text: "Indie",
        value: 3,
        checked: false
    }, {
        text: "Reggae",
        value: 4,
        checked: false
    }, {
        text: "Jazz",
        value: 5,
        checked: false
    }, ];*/
});