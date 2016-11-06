app.controller('ListaBandasCtrl', function($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false)

    
    $scope.NomeGenero = $stateParams.nome;
    $scope.IdGenero = $stateParams.id;
   
});