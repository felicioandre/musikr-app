app.controller('HomeCtrl', function($scope,
    $timeout,
    $state,
    $stateParams,
    ionicMaterialInk,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false)

    $scope.$parent.clearFabs();

    ionicMaterialInk.displayEffect();

    
    $scope.algumaVar = "Feed de Notícias"
   
});