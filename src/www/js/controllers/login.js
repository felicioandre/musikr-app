app.controller('LoginCtrl', function($scope, $timeout, $state, $ionicPopup, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate, $http) {

    if(window.localStorage.getItem("token") != null){
        //codigo pra mandar pra home
        //$state.go("app.criarconta"); 
        $http({
            method: "POST",
            url: SERVIDOR + "account/is-alive",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        })
        .success(function(data) {
            $state.go("app.criarconta"); 
        })
        .error(function(data) {
//            console.log(window.localStorage.getItem("token"));
window.localStorage.removeItem("token");
});
        //
        
    }

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.$parent.clearFabs();

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.fundoLogin = "img/login" + (Math.floor(Math.random() * 10) + 1) + ".jpg";

    $scope.dados = {};
    $scope.dados.email = null;
    $scope.dados.senha = null;

    $scope.login = function(){
        /*$http.get(SERVIDOR + "account/testemetodo")
        .success(function(data) {
            alert(JSON.stringify(data));
        })
        .error(function(data){
        });*/

        $http.post(SERVIDOR + "account/login", $scope.dados)
        .success(function(data) {
            //alert(JSON.stringify(data));
            console.log(data == 2);
            console.log(data);
            
            if(data.access_token != null){
                window.localStorage.setItem("token", data.access_token);
                window.localStorage.setItem("nomeUsuario", data.userName);
                console.log(window.localStorage.getItem("nomeUsuario"));
                //window.localStorage.setItem("expireDate", data.)
                $state.go("app.criarconta");    
            } else if(data.trocaSenha == 1){
                window.localStorage.setItem("idUsuario", data.idUsuario);
                $state.go("app.esquecisenha"); 
            }


             /*else if(JSON.stringify(data) == 0){
                console.log(0);
                $scope.showAlert('E-mail ou Senha inválidos!', 'Por favor, tente novamente.', null)
            }*/
            
        })
        .error(function(data, statusCode){
            if(statusCode == 400){
                if(data.ModelState){
                    $scope.showAlert('Ocorreu um erro!', parseErrors(data), null);
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
        
        /*alertPopup.then(function(res) {
            if(action == 'redirect'){
                console.log('REDIRECT AGORA');    
            }
        });*/
    };
});