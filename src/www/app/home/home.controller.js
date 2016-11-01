app.controller('HomeCtrl', function($scope,
    $timeout,
    $state,
    $stateParams,
    $ionicSideMenuDelegate,
    $http,
    $ionicLoading,
    $ionicViewSwitcher) {

    $ionicSideMenuDelegate.canDragContent(false)

    
    $scope.algumaVar = "Feed de Notícias"
   
});