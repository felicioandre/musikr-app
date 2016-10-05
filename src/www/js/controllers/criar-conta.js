app.controller('CriarContaCtrl', function($scope, $stateParams, $ionicPopup, ionicMaterialInk, $ionicSideMenuDelegate, $http) {
    $ionicSideMenuDelegate.canDragContent(false)

    $scope.$parent.clearFabs();

    ionicMaterialInk.displayEffect();

    $scope.fundoLogin = "img/login" + (Math.floor(Math.random() * 10) + 1) + ".jpg";

    $scope.dados = {};
    $scope.dados.nome = null;
    $scope.dados.email = null;
    $scope.dados.senha = null;

    $scope.criar = function(){
/*$http.get(SERVIDOR + "account/testemetodo")
.success(function(data) {
alert(JSON.stringify(data));
})
.error(function(data){
});*/

$http.post(SERVIDOR + "account/criar", $scope.dados)
.success(function(data) {
    $scope.showAlert('Cadastro feito com sucesso!', 'Você será redirecionado para completar seu cadastro.', 'redirect');
    //alert(JSON.stringify(data));
})
.error(function(data, statusCode){
    //erro do token expirado 401
    /*
        if(statusCode == 401){
            $scope.showAlert('Seu acesso foi expirado', 'Por favor, faça o login novamente.', null);
            window.localStorage.setItem("token", null);
        }
    */
    if(statusCode == 400){
        if(data.ModelState){
            $scope.showAlert('Ocorreu um erro inesperado!', parseErrors(data), null);
        }
} else{
    $scope.showAlert('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde.', null) 
}
});


$scope.showAlert = function(titulo, conteudo, action) {
    var alertPopup = $ionicPopup.alert({
        title: titulo,
        template: conteudo
    });

    alertPopup.then(function(res) {
        if(action == 'redirect'){
            console.log('REDIRECT AGORA');    
        }
    });
};

}
});