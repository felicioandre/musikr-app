app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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

    .state('app.busca-bandas', {
        url: '/bandas/busca',
        views: {
            'menuContent': {
                templateUrl: 'app/bandas/busca.html',
                controller: 'BuscaBandasCtrl'
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
                templateUrl: 'app/bandas/criar.html',
                controller: 'CriarBandaCtrl'
            }
        }
    })

    .state('app.editar-banda', {
        url: '/bandas/editar',
        views: {
            'menuContent': {
                templateUrl: 'app/bandas/editar.html',
                controller: 'EditarBandaCtrl'
            }
        },
        params: {
            id: null
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
            id: null,
            nome: null
        }
    })

    .state('app.banda-seguidores', {
        url: '/bandas/perfil/lista-seguidores',
        views: {
            'menuContent': {
                templateUrl: 'app/bandas/lista-seguidores.html',
                controller: 'BandaListaSeguidoresCtrl'
            }
        },
        params: {
            id: null
        }
    })

    .state('app.integrantes-banda', {
        url: '/bandas/integrantes-minha-banda',
        views: {
            'menuContent': {
                templateUrl: 'app/bandas/integrantes.html',
                controller: 'IntegrantesBandaCtrl'
            }
        },
        params: {
            id: null
        }
    })

    .state('app.adicionar-integrante-banda', {
        url: '/bandas/integrantes-minha-banda/adicionar',
        views: {
            'menuContent': {
                templateUrl: 'app/bandas/integrantes-adicionar.html',
                controller: 'AdicionarIntegranteBandaCtrl'
            }
        },
        params: {
            id: null
        }
    })

        .state('app.editar-integrante-banda', {
            url: '/bandas/integrantes-minha-banda/editar',
            views: {
                'menuContent': {
                    templateUrl: 'app/bandas/integrantes-editar.html',
                    controller: 'EditarIntegranteBandaCtrl'
                }
            },
            params: {
                id: null,
                idBanda: null
            }
        })
    //Pessoas

    .state('app.pessoas', {
        url: '/pessoas',
        views: {
            'menuContent': {
                templateUrl: 'app/pessoas/pessoas.html',
                controller: 'PessoasCtrl'
            }
        }
    })

        .state('app.busca-pessoa-nome', {
            url: '/pessoas/busca-nome',
            views: {
                'menuContent': {
                    templateUrl: 'app/pessoas/busca-nome.html',
                    controller: 'BuscaPessoaNomeCtrl'
                }
            }
        })

        .state('app.busca-pessoa-genero', {
            url: '/pessoas/busca-genero',
            views: {
                'menuContent': {
                    templateUrl: 'app/pessoas/busca-genero.html',
                    controller: 'BuscaPessoaGeneroCtrl'
                }
            }
        })

        .state('app.busca-pessoa-instrumento', {
            url: '/pessoas/busca-instrumento',
            views: {
                'menuContent': {
                    templateUrl: 'app/pessoas/busca-instrumento.html',
                    controller: 'BuscaPessoaInstrumentoCtrl'
                }
            }
        })

        .state('app.busca-pessoa-resultado', {
            url: '/pessoas/busca',
            views: {
                'menuContent': {
                    templateUrl: 'app/pessoas/busca-resultado.html',
                    controller: 'BuscaResultadoCtrl'
                }
            },
            params: {
                id: null,
                nome: null,
                tipo: null //1 = genero musical, 2 = instrumento
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
            id: null,
            nome: null,
            menu: false
        }
    })

    .state('app.editar-perfil-pessoa', {
        url: '/pessoas/perfil/editar',
        views: {
            'menuContent': {
                templateUrl: 'app/pessoas/editar-perfil.html',
                controller: 'EditarPerfilPessoaCtrl'
            }
        },
        params: {
            id: null
        }
    })

    .state('app.editar-generos-pessoa', {
        url: '/pessoas/perfil/editar-generos',
        views: {
            'menuContent': {
                templateUrl: 'app/pessoas/editar-generos.html',
                controller: 'EditarGenerosPessoaCtrl'
            }
        },
        params: {
            id: null
        }
    })

    .state('app.editar-instrumentos-pessoa', {
        url: '/pessoas/perfil/editar-instrumentos',
        views: {
            'menuContent': {
                templateUrl: 'app/pessoas/editar-instrumentos.html',
                controller: 'EditarInstrumentosPessoaCtrl'
            }
        },
        params: {
            id: null
        }
    })

    .state('app.editar-senha', {
        url: '/pessoas/perfil/editar-senha',
        views: {
            'menuContent': {
                templateUrl: 'app/pessoas/editar-senha.html',
                controller: 'EditarSenhaPessoaCtrl'
            }
        },
        params: {
            id: null
        }
    })

    .state('app.pessoa-seguidores', {
        url: '/pessoas/perfil/lista-seguidores',
        views: {
            'menuContent': {
                templateUrl: 'app/pessoas/lista-seguidores.html',
                controller: 'ListaSeguidoresCtrl'
            }
        },
        params: {
            id: null
        }
    })

    .state('app.pessoa-seguindo', {
        url: '/pessoas/perfil/lista-seguindo',
        views: {
            'menuContent': {
                templateUrl: 'app/pessoas/lista-seguindo.html',
                controller: 'ListaSeguindoCtrl'
            }
        },
        params: {
            id: null
        }
    })

    //Pessoas

    .state('app.vagas', {
        url: '/vagas',
        views: {
            'menuContent': {
                templateUrl: 'app/vagas/vagas.html',
                controller: 'VagasCtrl'
            }
        }
    })

    .state('app.criar-vaga', {
        url: '/vagas/criar',
        views: {
            'menuContent': {
                templateUrl: 'app/vagas/criar.html',
                controller: 'CriarVagaCtrl'
            }
        }
    })

    .state('app.minhas-vagas', {
        url: '/vagas/minhas-vagas',
        views: {
            'menuContent': {
                templateUrl: 'app/vagas/minhas-vagas.html',
                controller: 'MinhasVagasCtrl'
            }
        }
    })

    .state('app.lista-vagas', {
        url: '/vagas/lista-vagas',
        views: {
            'menuContent': {
                templateUrl: 'app/vagas/lista-vagas.html',
                controller: 'ListaVagasCtrl'
            }
        },
        params: {
            instrumento: null,
            todas: false
        }
    })

    .state('app.lista-vagas-instrumentos', {
        url: '/vagas/lista-vagas-instrumentos',
        views: {
            'menuContent': {
                templateUrl: 'app/vagas/busca-instrumento.html',
                controller: 'BuscaVagaInstrumentoCtrl'
            }
        }
    })

    .state('app.detalhe-vaga', {
        url: '/vagas/detalhe',
        views: {
            'menuContent': {
                templateUrl: 'app/vagas/detalhe.html',
                controller: 'DetalheVagaCtrl'
            }
        },
        params: {
            id: null,
            instrumento: null
        }
    })
    .state('app.editar-vaga', {
        url: '/vagas/editar',
        views: {
            'menuContent': {
                templateUrl: 'app/vagas/editar.html',
                controller: 'EditarVagaCtrl'
            }
        },
        params: {
            id: null
        }
    })

    .state('app.candidatos-vaga', {
        url: '/vagas/candidatos',
        views: {
            'menuContent': {
                templateUrl: 'app/vagas/candidatos.html',
                controller: 'CandidatosVagaCtrl'
            }
        },
        params: {
            id: null
        }
    })
    ;

    $urlRouterProvider.otherwise('/app/login');

});