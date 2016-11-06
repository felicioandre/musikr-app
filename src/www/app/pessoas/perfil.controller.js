app.controller('PerfilPessoaCtrl', function ($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
     $ionicHistory,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.voltarPagina = function () {
        //console.log('hey');
        $ionicHistory.goBack();
    }
   

   
});