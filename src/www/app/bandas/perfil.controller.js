app.controller('PerfilBandaCtrl', function($scope,
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
        $ionicHistory.goBack();
    };
   
});