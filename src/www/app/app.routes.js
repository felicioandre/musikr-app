app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'app/menu/menu.html',
        controller: 'AppCtrl'
    })

   

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.criarconta', {
        url: '/criar-conta',
        views: {
            'menuContent': {
                templateUrl: 'app/criar-conta/criar-conta.html',
                controller: 'CriarContaCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.esquecisenha', {
        url: '/esqueci-senha',
        views: {
            'menuContent': {
                templateUrl: 'app/esqueci-senha/esqueci-senha.html',
                controller: 'EsqueciSenhaCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});