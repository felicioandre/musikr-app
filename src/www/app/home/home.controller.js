app.controller('HomeCtrl', function($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.aplicarInfoUsuario();    
    
    $scope.fazerPublicacao = function(){
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('app.publicacao.texto');
    }
   
});