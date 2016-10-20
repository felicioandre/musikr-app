//angular.module('musikrApp.controllers', [])
app.controller('AppCtrl', function($scope, 
                                   $ionicModal, 
                                   $ionicPopover, 
                                   $timeout, 
                                   $ionicPopup,
                                   $state,
                                   $ionicViewSwitcher) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    //Exibir Alert (recebe titulo, conteudo, action que redirecionara, e a direcao)
    $scope.showAlert = function(titulo, conteudo, action, direction) {
        var alertPopup = $ionicPopup.alert({
            title: titulo,
            template: conteudo
        });
        //redirecionamento depois do alert --opcional
        alertPopup.then(function(res) {
            if (!verifyEmpty(action)) {
                if(verifyEmpty(direction))
                    direction = 'forward'
                $ionicViewSwitcher.nextDirection(direction);
                $state.go(action);
            }
        });
    };

});

//Funcao para listar erros vindos do servidor
function parseErrors(response) {
    var errors = "";
    for (var key in response.ModelState) {
        for (var i = 0; i < response.ModelState[key].length; i++) {
            errors += response.ModelState[key][i] + '<br/>';
        }
    }
    return errors;
}

//Verifica se string esta vazia
function verifyEmpty(string){
    if(string != '' && string != null && string != undefined)
        return false;
    return true;
};