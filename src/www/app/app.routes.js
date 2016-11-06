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

    .state('app.publicacao', {
        url: '/publicacao',
        abstract: true,
        views: {
            'menuContent': {
                templateUrl: 'app/publicacao/publicacao.html',
                //controller: 'PublicacaoCtrl'
            }
        }
    })

    .state('app.publicacao.texto', {
        url: '/texto',
        views: {
            'tabPublicacaoTexto': {
                templateUrl: 'app/publicacao/texto.html',
                controller: 'TextoCtrl'
            }
        }
    })

    .state('app.publicacao.imagem', {
        url: '/imagem',
        views: {
            'tabPublicacaoImagem': {
                templateUrl: 'app/publicacao/imagem.html',
                controller: 'ImagemCtrl'
            }
        }
    })

    .state('app.publicacao.video', {
        url: '/video',
        views: {
            'tabPublicacaoVideo': {
                templateUrl: 'app/publicacao/video.html',
                controller: 'VideoCtrl'
            }
        }
    })

    /* Bandas */

    .state('app.bandas', {
        url: '/bandas',
        views: {
            'menuContent': {
                templateUrl: 'app/bandas/bandas.html',
                controller: 'BandasCtrl'
            }
        }
    })

    .state('app.lista-bandas', {
        url: '/bandas/lista',
        views: {
            'menuContent': {
                templateUrl: 'app/bandas/lista.html',
                controller: 'ListaBandasCtrl'
            }
        },
        params: {
            id: null,
            nome: null
        }
    })

    .state('app.criar-banda', {
        url: '/bandas/criar',
        views: {
            'menuContent': {
                templateUrl: 'app/bandas/criar-banda.html',
                controller: 'CriarBandaCtrl'
            }
        }
    })

    .state('app.minhas-bandas', {
        url: '/bandas/minhas-bandas',
        views: {
            'menuContent': {
                templateUrl: 'app/bandas/minhas-bandas.html',
                controller: 'MinhasBandasCtrl'
            }
        }
    })

    .state('app.perfil-banda', {
        url: '/bandas/perfil',
        views: {
            'menuContent': {
                templateUrl: 'app/bandas/perfil.html',
                controller: 'PerfilBandaCtrl'
            }
        },
        params: {
            id: null
        }
    })

    .state('app.perfil-pessoa', {
        url: '/pessoas/perfil',
        views: {
            'menuContent': {
                templateUrl: 'app/pessoas/perfil.html',
                controller: 'PerfilPessoaCtrl'
            }
        },
        params: {
            id: null
        }
    })

    ;

    $urlRouterProvider.otherwise('/app/login');

});