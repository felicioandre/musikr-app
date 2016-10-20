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

    /* Login / Criar Conta / Recuperar Senha */

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl'
            }
        }
    })

    .state('app.criarconta', {
        url: '/criar-conta',
        views: {
            'menuContent': {
                templateUrl: 'app/criar-conta/criar-conta.html',
                controller: 'CriarContaCtrl'
            }
        }
    })

    .state('app.esquecisenha', {
        url: '/esqueci-senha',
        views: {
            'menuContent': {
                templateUrl: 'app/esqueci-senha/esqueci-senha.html',
                controller: 'EsqueciSenhaCtrl'
            }
        }
    })

    .state('app.recuperarsenha', {
        url: '/recuperar-senha',
        views: {
            'menuContent': {
                templateUrl: 'app/esqueci-senha/recuperar-senha.html',
                controller: 'RecuperarSenhaCtrl'
            }
        }
    })

    /* Primeiro Acesso */

    .state('app.primeiroacesso-step01', {
        url: '/primeiro-acesso',
        views: {
            'menuContent': {
                templateUrl: 'app/primeiro-acesso/step01.html',
                controller: 'step01Ctrl'
            }
        }
    })

    .state('app.primeiroacesso-step02', {
        url: '/primeiro-acesso/step02',
        views: {
            'menuContent': {
                templateUrl: 'app/primeiro-acesso/step02.html',
                controller: 'step02Ctrl'
            }
        }
    })

    .state('app.primeiroacesso-step03', {
        url: '/primeiro-acesso/step03',
        views: {
            'menuContent': {
                templateUrl: 'app/primeiro-acesso/step03.html',
                controller: 'step03Ctrl'
            }
        }
    })

    /* Home */

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl'
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});