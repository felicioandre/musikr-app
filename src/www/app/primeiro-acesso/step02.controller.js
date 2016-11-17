app.controller('step02Ctrl', function ($scope,
                                      $timeout,
                                      $state,
                                      $ionicPopup,
                                      $stateParams,
                                      $ionicSideMenuDelegate,
                                      $http,
                                      $ionicLoading) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.mostraTela = false;

    $scope.showLoading();

    $scope.dados = {};
    $scope.checkItemsGeneroMusical = [];

    $http({
        method: "GET",
        url: SERVIDOR + "genero-musical/lista-genero-musical",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }).success(function (data) {
        $scope.listaGenero = data;
        $scope.mostraTela = true;
        for (i in data) {
            if (data[i].checked == true) {
                console.log(data[i]);
                $scope.checkItemsGeneroMusical[data[i].value] = true;
            }
        }
        $ionicLoading.hide();
    }).error(function (data, statusCode) {
        $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.')
    });

    
    //$scope.dados.GeneroMusical = null;
    

    $scope.finalizarStep02 = function () {
        /*$http.get(SERVIDOR + "account/testemetodo")
        .success(function(data) {
        alert(JSON.stringify(data));
        })
        .error(function(data){
        });*/

        $scope.showLoading();

        $scope.dados.GeneroMusical = [];

        //var array = [];
        for (i in $scope.checkItemsGeneroMusical) {
            if ($scope.checkItemsGeneroMusical[i] == true) {
                //array.push(i);
                $scope.dados.GeneroMusical.push(i);
            }
        }

        //console.log($scope.dados);

        //$scope.dados.GeneroMusical = array;

        $http({
            method: "POST",
            url: SERVIDOR + "primeiro-acesso/step02",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            data: $scope.dados
        })
            .success(function (data) {
                $ionicLoading.hide();
                $state.go("app.primeiroacesso-step03");
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