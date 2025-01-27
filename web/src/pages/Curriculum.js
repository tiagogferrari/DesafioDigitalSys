import React, { useState, useEffect, useRef } from 'react';
import { HiChevronDown, HiCheck } from 'react-icons/hi';
import axios from 'axios';
import Swal from 'sweetalert2'

const Curriculo = () => {
    const [expandedSection, setExpandedSection] = useState(null);

    const [dadosPessoais, setDadosPessoais] = useState({
        nome: '',
        data_nascimento: '',
        genero: '',
        nacionalidade: '',
    });
    const [contato, setContato] = useState({
        email: '',
        telefone: '',
        endereco: '',
    });
    const [experiencia, setExperiencia] = useState({
        cargo: '',
        empresa: '',
        data_inicio: '',
        data_fim: '',
    });
    const [formacao, setFormacao] = useState({
        curso: '',
        instituicao: '',
        nivel: '',
        data_inicio: '',
        data_conclusao: '',
    });

    const dadosPessoaisCompletos = () => {
        return (
            dadosPessoais.nome &&
            dadosPessoais.data_nascimento &&
            dadosPessoais.genero &&
            dadosPessoais.nacionalidade
        );
    };
    const contatoCompleto = () => {
        return (
            contato.email &&
            contato.telefone &&
            contato.endereco
        );
    };
    const experienciaCompleta = () => {
        return (
            experiencia.empresa &&
            experiencia.cargo &&
            experiencia.data_inicio &&
            experiencia.data_fim
        );
    };
    const formacaoCompleta = () => {
        return (
            formacao.instituicao &&
            formacao.curso &&
            formacao.nivel &&
            formacao.data_inicio &&
            formacao.data_conclusao
        );
    };

    const toggleSection = (section) => {
        setExpandedSection((prev) => (prev === section ? null : section));
    };

    const executadoRef = useRef(false); // Ref para rastrear se a função já foi executada

    useEffect(() => {
        const buscarCurriculoUsuario = async () => {
            if (executadoRef.current) return; // Evita execuções repetidas
            executadoRef.current = true; // Marca como executado

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token não encontrado');
                    return;
                }

                const verificarResponse = await axios.get('http://127.0.0.1:8000/api/curriculums/verificar_curriculo/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (verificarResponse.data.detail === "Você ainda não tem um currículo cadastrado.") {
                    Swal.fire({
                        title: '<h1 class="text-4xl font-bold" style="font-family: \'Playwrite IN\', serif; font-weight: 600; color: rgb(37, 99, 235);">Pegho</h1>',
                        html: '<p style="font-size: 18px;">Parece que você ainda não tem um currículo cadastrado em nosso site. Pressione OK para cadastrar o seu currículo.</p>',
                        icon: 'info',
                        iconColor: 'rgb(37, 99, 235)',
                        confirmButtonText: 'OK',
                        confirmButtonColor: 'rgb(37, 99, 235)',
                        customClass: {
                            popup: 'swal-popup',
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.close();
                        }
                    });
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/curriculums/meu_curriculo/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data) {
                    setDadosPessoais(response.data.curriculum || {
                        nome: '',
                        data_nascimento: '',
                        genero: '',
                        nacionalidade: '',
                    });

                    setContato(response.data.contatos[0] || {
                        email: '',
                        telefone: '',
                        endereco: '',
                    });

                    setExperiencia(response.data.experiencias[0] || {
                        cargo: '',
                        empresa: '',
                        data_inicio: '',
                        data_fim: '',
                    });

                    setFormacao(response.data.formacoes[0] || {
                        curso: '',
                        instituicao: '',
                        nivel: '',
                        data_inicio: '',
                        data_conclusao: '',
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar currículo:', error);
                if (error.response) {
                    console.error('Resposta do servidor:', error.response.data);
                }
            }
        };

        buscarCurriculoUsuario();
    }, []);

    const salvarOuEditarDadosPessoais = async () => {
        const token = localStorage.getItem('token');

        try {
            let response;
            if (dadosPessoais.id) {
                // Atualiza os dados pessoais (PUT)
                response = await axios.put(
                    `http://127.0.0.1:8000/api/curriculums/${dadosPessoais.id}/`,
                    dadosPessoais, // Envia apenas os dados pessoais
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                // Cria novos dados pessoais (POST)
                response = await axios.post(
                    'http://127.0.0.1:8000/api/curriculums/',
                    dadosPessoais, // Envia apenas os dados pessoais
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            Swal.fire({
                icon: 'success',
                title: 'Dados pessoais salvos/atualizados com sucesso!',
                showConfirmButton: false,
                timer: 800,
                timerProgressBar: false,
            });

            setDadosPessoais(response.data);
        } catch (error) {
            console.log("Dados sendo enviados:", dadosPessoais);

            if (error.response && error.response.status === 400) {
                // Erro de validação (campo obrigatório ou inválido)
                const erros = error.response.data; // Erros de validação do backend
                let mensagemErro = 'Verifique os seguintes erros: ';

                // Concatena as mensagens de erro
                // biome-ignore lint/complexity/noForEach: <explanation>
                Object.keys(erros).forEach((campo) => {
                    mensagemErro += `\n${campo}: ${erros[campo].join(', ')}`;
                });

                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados pessoais.',
                    text: mensagemErro,
                    showConfirmButton: true, // Exibe o botão de confirmação
                });
            } else {
                // Erro genérico
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados pessoais.',
                    text: 'Verifique o console para mais detalhes.',
                    showConfirmButton: false,
                    timer: 800,
                    timerProgressBar: false,
                });
            }
        }
    };

    /*
        const salvarOuEditarContato = async () => {
            const token = localStorage.getItem('token');
    
            try {
                let response;
                if (contato.id) {
                    // Atualiza o contato (PUT)
                    response = await axios.put(
                        `http://127.0.0.1:8000/api/contatos/${contato.id}/`,
                        contato, // Envia apenas o contato
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                } else {
                    // Cria um novo contato (POST)
                    response = await axios.post(
                        'http://127.0.0.1:8000/api/contatos/',
                        contato, // Envia apenas o contato
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }
    
                Swal.fire({
                    icon: 'success',
                    title: 'Dados de contato salvos/atualizados com sucesso!',
                    showConfirmButton: false, // Remove o botão de confirmação
                    timer: 800, // Alerta desaparece após 2 segundos
                    timerProgressBar: false, // Mostra uma barra de progresso enquanto o tempo passa
                });
    
                // Atualiza o estado com os novos dados
                setContato(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados de contato.',
                    text: 'Verifique o console para mais detalhes.',
                    showConfirmButton: false, // Remove o botão de confirmação
                    timer: 800, // Alerta desaparece após 3 segundos
                    timerProgressBar: false, // Mostra uma barra de progresso enquanto o tempo passa
                });
            }
        };
    
        const salvarOuEditarExperiencia = async () => {
            const token = localStorage.getItem('token');
    
            try {
                let response;
                if (experiencia.id) {
                    // Atualiza a experiência existente (PUT)
                    response = await axios.put(
                        `http://127.0.0.1:8000/api/experiencias/${experiencia.id}/`,
                        experiencia, // Envia apenas a experiência
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                } else {
                    // Cria uma nova experiência (POST)
                    response = await axios.post(
                        'http://127.0.0.1:8000/api/experiencias/',
                        experiencia, // Envia apenas a experiência
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }
    
                Swal.fire({
                    icon: 'success',
                    title: 'Dados de experiência salvos/atualizados com sucesso!',
                    showConfirmButton: false, // Remove o botão de confirmação
                    timer: 800, // Alerta desaparece após 2 segundos
                    timerProgressBar: false, // Mostra uma barra de progresso enquanto o tempo passa
                });
    
                // Atualiza o estado com os dados da nova experiência
                setExperiencia(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados de experiência.',
                    text: 'Verifique o console para mais detalhes.',
                    showConfirmButton: false, // Remove o botão de confirmação
                    timer: 800, // Alerta desaparece após 3 segundos
                    timerProgressBar: false, // Mostra uma barra de progresso enquanto o tempo passa
                });
            }
        };
    
        const salvarOuEditarFormacao = async () => {
            const token = localStorage.getItem('token');
    
            try {
                let response;
                if (formacao.id) {
                    // Atualiza a formação existente (PUT)
                    response = await axios.put(
                        `http://127.0.0.1:8000/api/formacoes/${formacao.id}/`,
                        formacao, // Envia a formação inteira
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                } else {
                    // Cria uma nova formação (POST)
                    response = await axios.post(
                        'http://127.0.0.1:8000/api/formacoes/',
                        formacao, // Envia a formação inteira
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }
    
                Swal.fire({
                    icon: 'success',
                    title: 'Dados de formação salvos/atualizados com sucesso!',
                    showConfirmButton: false, // Remove o botão de confirmação
                    timer: 800, // Alerta desaparece após 2 segundos
                    timerProgressBar: false, // Mostra uma barra de progresso enquanto o tempo passa
                });
    
                // Atualiza o estado com os dados da nova formação
                setFormacao(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados da formação.',
                    text: 'Verifique o console para mais detalhes.',
                    showConfirmButton: false, // Remove o botão de confirmação
                    timer: 800, // Alerta desaparece após 3 segundos
                    timerProgressBar: false, // Mostra uma barra de progresso enquanto o tempo passa
                });
            }
        };
    */

    const salvarOuEditarContato = async () => {
        const token = localStorage.getItem('token');

        try {
            let response;
            if (contato.id) {
                // Atualiza o contato (PUT)
                response = await axios.put(
                    `http://127.0.0.1:8000/api/contatos/${contato.id}/`,
                    contato,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                // Cria um novo contato (POST)
                response = await axios.post(
                    'http://127.0.0.1:8000/api/contatos/',
                    contato,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            Swal.fire({
                icon: 'success',
                title: 'Dados de contato salvos/atualizados com sucesso!',
                showConfirmButton: false,
                timer: 800,
                timerProgressBar: false,
            });

            setContato(response.data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const erros = error.response.data;
                let mensagemErro = 'Verifique os seguintes erros: ';

                // biome-ignore lint/complexity/noForEach: <explanation>
                Object.keys(erros).forEach((campo) => {
                    mensagemErro += `\n${campo}: ${erros[campo].join(', ')}`;
                });

                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados de contato.',
                    text: mensagemErro,
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados de contato.',
                    text: 'Verifique o console para mais detalhes.',
                    showConfirmButton: false,
                    timer: 800,
                    timerProgressBar: false,
                });
            }
        }
    };

    const salvarOuEditarExperiencia = async () => {
        const token = localStorage.getItem('token');

        try {
            let response;
            if (experiencia.id) {
                response = await axios.put(
                    `http://127.0.0.1:8000/api/experiencias/${experiencia.id}/`,
                    experiencia,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                response = await axios.post(
                    'http://127.0.0.1:8000/api/experiencias/',
                    experiencia,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            Swal.fire({
                icon: 'success',
                title: 'Dados de experiência salvos/atualizados com sucesso!',
                showConfirmButton: false,
                timer: 800,
                timerProgressBar: false,
            });

            setExperiencia(response.data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const erros = error.response.data;
                let mensagemErro = 'Verifique os seguintes erros: ';

                // biome-ignore lint/complexity/noForEach: <explanation>
                Object.keys(erros).forEach((campo) => {
                    mensagemErro += `\n${campo}: ${erros[campo].join(', ')}`;
                });

                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados de experiência.',
                    text: mensagemErro,
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados de experiência.',
                    text: 'Verifique o console para mais detalhes.',
                    showConfirmButton: false,
                    timer: 800,
                    timerProgressBar: false,
                });
            }
        }
    };

    const salvarOuEditarFormacao = async () => {
        const token = localStorage.getItem('token');

        try {
            let response;
            if (formacao.id) {
                response = await axios.put(
                    `http://127.0.0.1:8000/api/formacoes/${formacao.id}/`,
                    formacao,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                response = await axios.post(
                    'http://127.0.0.1:8000/api/formacoes/',
                    formacao,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            Swal.fire({
                icon: 'success',
                title: 'Dados de formação salvos/atualizados com sucesso!',
                showConfirmButton: false,
                timer: 800,
                timerProgressBar: false,
            });

            setFormacao(response.data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const erros = error.response.data;
                let mensagemErro = 'Verifique os seguintes erros: ';

                // biome-ignore lint/complexity/noForEach: <explanation>
                Object.keys(erros).forEach((campo) => {
                    mensagemErro += `\n${campo}: ${erros[campo].join(', ')}`;
                });

                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados da formação.',
                    text: mensagemErro,
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar/editar dados da formação.',
                    text: 'Verifique o console para mais detalhes.',
                    showConfirmButton: false,
                    timer: 800,
                    timerProgressBar: false,
                });
            }
        }
    };

    //Funções de exclusão
    const excluirDadosPessoais = async () => {
        const token = localStorage.getItem('token');

        Swal.fire({
            title: 'Atenção!',
            text: 'Excluir os dados pessoais irá excluir TODO o seu currículo! Se desejar excluir apenas um módulo como contato ou experiência, vá até o botão excluir do módulo correspondente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Compreendi, excluir mesmo assim!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(
                        `http://127.0.0.1:8000/api/curriculums/${dadosPessoais.id}/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    Swal.fire({
                        icon: 'success',
                        title: 'Dados pessoais excluídos com sucesso!',
                        showConfirmButton: false,
                        timer: 800,
                    });

                    // Limpa o estado após a exclusão
                    setDadosPessoais({
                        nome: '',
                        data_nascimento: '',
                        genero: '',
                        nacionalidade: '',
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao excluir dados pessoais.',
                        text: 'Verifique o console para mais detalhes.',
                        showConfirmButton: false,
                        timer: 800,
                    });
                }
            }
        });
    };

    const excluirContato = async () => {
        const token = localStorage.getItem('token');

        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Esta ação não pode ser desfeita! Essa ação irá excluir apenas suas informações de contato',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(
                        `http://127.0.0.1:8000/api/contatos/${contato.id}/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    Swal.fire({
                        icon: 'success',
                        title: 'Contato excluído com sucesso!',
                        showConfirmButton: false,
                        timer: 800,
                    });

                    // Limpa o estado após a exclusão
                    setContato({
                        email: '',
                        telefone: '',
                        endereco: '',
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao excluir contato.',
                        text: 'Verifique o console para mais detalhes.',
                        showConfirmButton: false,
                        timer: 800,
                    });
                }
            }
        });
    };

    const excluirExperiencia = async () => {
        const token = localStorage.getItem('token');

        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Esta ação não pode ser desfeita! Essa ação irá excluir apenas suas informações de experiência',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(
                        `http://127.0.0.1:8000/api/experiencias/${experiencia.id}/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    Swal.fire({
                        icon: 'success',
                        title: 'Experiência excluída com sucesso!',
                        showConfirmButton: false,
                        timer: 800,
                    });

                    // Limpa o estado após a exclusão
                    setExperiencia({
                        cargo: '',
                        empresa: '',
                        data_inicio: '',
                        data_fim: '',
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao excluir experiência.',
                        text: 'Verifique o console para mais detalhes.',
                        showConfirmButton: false,
                        timer: 800,
                    });
                }
            }
        });
    };

    const excluirFormacao = async () => {
        const token = localStorage.getItem('token');

        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Esta ação não pode ser desfeita! Essa ação irá excluir apenas suas informações de formação',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(
                        `http://127.0.0.1:8000/api/formacoes/${formacao.id}/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    Swal.fire({
                        icon: 'success',
                        title: 'Formação excluída com sucesso!',
                        showConfirmButton: false,
                        timer: 800,
                    });

                    // Limpa o estado após a exclusão
                    setFormacao({
                        curso: '',
                        instituicao: '',
                        nivel: '',
                        data_inicio: '',
                        data_conclusao: '',
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao excluir formação.',
                        text: 'Verifique o console para mais detalhes.',
                        showConfirmButton: false,
                        timer: 800,
                    });
                }
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-500 to-blue-300 text-white pb-6 pt-5 text-center">
                <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playwrite IN', serif", fontWeight: 600 }}>
                    Pegho
                </h1>
            </header>

            {/* Main Content */}
            <div className="flex-grow bg-gray-50">
                <div className="max-w-6xl mx-auto rounded-lg pt-5 pb-0 mt-6">
                    <h1 className='text-4xl font-bold pb-3'>Meu currículo</h1>
                    <p className="text-gray-700 text-lg mb-6">
                        Preencha os blocos com seus dados e mantenha seu currículo atualizado para se candidatar às vagas. Caso realize alterações, estes ajustes serão <strong>replicados para todas as suas candidaturas ativas.</strong>
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Blocos expansíveis */}
                    <div className="max-w-6xl mx-auto space-y-6">
                        {/* Bloco: Dados pessoais */}
                        <div className="bg-white rounded-lg shadow-lg">
                            <button
                                type="button"
                                className="h-28 w-full text-left p-4 text-xl font-bold bg-white text-gray-700 rounded-lg flex justify-between items-center relative"
                                onClick={() => toggleSection('personalInfo')}
                            >
                                <div className="flex items-center">
                                    Dados Pessoais
                                </div>
                                {dadosPessoaisCompletos() && (
                                    <div className="absolute left-[200px] top-1/2 transform -translate-y-1/2">
                                        <div className="bg-green-500 rounded-full p-1">
                                            <HiCheck className="text-white" size={15} />
                                        </div>
                                    </div>
                                )}
                                <HiChevronDown
                                    size={28}
                                    className={`transform transition-transform duration-300 text-gray-500 ${expandedSection === 'personalInfo' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden ${expandedSection === 'personalInfo' ? 'max-h-[1000px]' : 'max-h-0'}`}
                            >
                                {expandedSection === 'personalInfo' && (
                                    <div className="p-4 border-t space-y-4">
                                        <form>
                                            <div className="space-y-4 border p-4 rounded-lg mb-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="fullName" className="block text-gray-700 text-lg">Nome completo *</label>
                                                        <input
                                                            id="fullName"
                                                            type="text"
                                                            placeholder='Insira seu nome completo'
                                                            value={dadosPessoais.nome}
                                                            onChange={(e) => setDadosPessoais({ ...dadosPessoais, nome: e.target.value })}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="dob" className="block text-gray-700 text-lg">Data de nascimento *</label>
                                                        <input
                                                            id="dob"
                                                            type="date"
                                                            value={dadosPessoais.data_nascimento}
                                                            onChange={(e) => setDadosPessoais({ ...dadosPessoais, data_nascimento: e.target.value })}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 mt-3">
                                                    <div>
                                                        <label htmlFor="gender" className="block text-gray-700 text-lg">Gênero *</label>
                                                        <select
                                                            id="gender"
                                                            value={dadosPessoais.genero}
                                                            onChange={(e) => setDadosPessoais({ ...dadosPessoais, genero: e.target.value })}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        >
                                                            <option value="">Selecione</option>
                                                            <option value="Masculino">Masculino</option>
                                                            <option value="Feminino">Feminino</option>
                                                            <option value="Outro">Outro</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="nationality" className="block text-gray-700 text-lg">Nacionalidade *</label>
                                                        <select
                                                            id="nationality"
                                                            value={dadosPessoais.nacionalidade} // Vinculado ao estado
                                                            onChange={(e) => setDadosPessoais({ ...dadosPessoais, nacionalidade: e.target.value })} // Atualiza o estado
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        >
                                                            <option value="">Selecione</option>
                                                            <option value="Brasil">Brasil</option>
                                                            <option value="Estados Unidos">Estados Unidos</option>
                                                            <option value="Argentina">Argentina</option>
                                                            <option value="Portugal">Portugal</option>
                                                            <option value="França">França</option>
                                                            <option value="Alemanha">Alemanha</option>
                                                            <option value="Outra">Outra</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex justify-end items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => excluirDadosPessoais()} // Chama a função de exclusão dos dados pessoais
                                                            className="w-32 h-10 bg-gradient-to-r from-red-700 to-red-500 text-white px-4 py-2 mt-6 rounded-lg shadow-lg text-md font-semibold transition hover:from-red-700 hover:to-red-600"
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={salvarOuEditarDadosPessoais} // Chama a função específica
                                                    className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition hover:from-blue-700 hover:to-blue-500"
                                                    style={{ fontFamily: "Roboto Flex, serif", fontWeight: 300 }}
                                                >
                                                    {dadosPessoais.id ? 'Salvar Alterações' : 'Salvar e Continuar'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bloco: Contato */}
                        <div className="bg-white rounded-lg shadow-lg">
                            <button
                                type="button"
                                className="h-28 w-full text-left p-4 text-xl font-bold bg-white text-gray-700 rounded-lg flex justify-between items-center relative"
                                onClick={() => toggleSection('contact')}
                            >
                                <div className="flex items-center">
                                    Contato
                                </div>
                                {contatoCompleto() && (
                                    <div className="absolute left-[200px] top-1/2 transform -translate-y-1/2">
                                        <div className="bg-green-500 rounded-full p-1">
                                            <HiCheck className="text-white" size={15} />
                                        </div>
                                    </div>
                                )}
                                <HiChevronDown
                                    size={28}
                                    className={`transform transition-transform duration-300 text-gray-500 ${expandedSection === 'contact' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden ${expandedSection === 'contact' ? 'max-h-[1000px]' : 'max-h-0'}`}
                            >
                                {expandedSection === 'contact' && (
                                    <div className="p-4 border-t space-y-4">
                                        <form>
                                            <div className="space-y-4 border p-4 rounded-lg mb-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="email" className="block text-gray-700 text-lg">E-mail *</label>
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            placeholder='Insira o seu melhor e-mail'
                                                            value={contato.email}
                                                            onChange={(e) => setContato({ ...contato, email: e.target.value })}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="phone" className="block text-gray-700 text-lg">Telefone *</label>
                                                        <input
                                                            id="phone"
                                                            type="tel"
                                                            value={contato.telefone}
                                                            onChange={(e) => setContato({ ...contato, telefone: e.target.value })}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 mt-3">
                                                    <div>
                                                        <label htmlFor="address" className="block text-gray-700 text-lg">Endereço completo *</label>
                                                        <input
                                                            id="address"
                                                            type="text"
                                                            placeholder='Insira seu endereço completo'
                                                            value={contato.endereco}
                                                            onChange={(e) => setContato({ ...contato, endereco: e.target.value })}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex justify-end items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => excluirContato()}
                                                            className="w-32 h-10 bg-gradient-to-r from-red-700 to-red-500 text-white px-4 py-2 mt-6 rounded-lg shadow-lg text-md font-semibold transition hover:from-red-700 hover:to-red-600"
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={salvarOuEditarContato} // Chama a função específica
                                                    className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition hover:from-blue-700 hover:to-blue-500"
                                                    style={{ fontFamily: "Roboto Flex, serif", fontWeight: 300 }}
                                                >
                                                    {contato.id ? 'Salvar Alterações' : 'Salvar e Continuar'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bloco: Experiência */}
                        <div className="bg-white rounded-lg shadow-lg">
                            <button
                                type="button"
                                className="h-28 w-full text-left p-4 text-xl font-bold bg-white text-gray-700 rounded-lg flex justify-between items-center relative"
                                onClick={() => toggleSection('experience')}
                            >
                                <div className="flex items-center">
                                    Experiência
                                </div>
                                {experienciaCompleta() && (
                                    <div className="absolute left-[200px] top-1/2 transform -translate-y-1/2">
                                        <div className="bg-green-500 rounded-full p-1">
                                            <HiCheck className="text-white" size={15} />
                                        </div>
                                    </div>
                                )}
                                <HiChevronDown
                                    size={28}
                                    className={`transform transition-transform duration-300 text-gray-500 ${expandedSection === 'experience' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden ${expandedSection === 'experience' ? 'max-h-[1000px]' : 'max-h-0'}`}
                            >
                                {expandedSection === 'experience' && (
                                    <div className="p-4 border-t space-y-6">
                                        <form>
                                            {/* Apenas uma experiência, sem map */}
                                            <div className="space-y-4 border p-4 rounded-lg mb-4">
                                                {/* Título Dinâmico */}
                                                <h2 className="text-xl font-bold text-gray-800">
                                                    {experiencia.empresa || 'Experiência'}
                                                </h2>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="company-0" className="block text-gray-700 text-lg">Empresa *</label>
                                                        <input
                                                            id="company-0"
                                                            type="text"
                                                            placeholder="Insira o nome da empresa"
                                                            value={experiencia.empresa}
                                                            onChange={(e) => {
                                                                setExperiencia({ ...experiencia, empresa: e.target.value });
                                                            }}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="role-0" className="block text-gray-700 text-lg">Cargo *</label>
                                                        <input
                                                            id="role-0"
                                                            type="text"
                                                            placeholder="Insira o cargo exercido"
                                                            value={experiencia.cargo}
                                                            onChange={(e) => {
                                                                setExperiencia({ ...experiencia, cargo: e.target.value });
                                                            }}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 mt-3 items-center">
                                                    <div>
                                                        <label htmlFor="startDate-0" className="block text-gray-700 text-lg">Data de Início *</label>
                                                        <input
                                                            id="startDate-0"
                                                            type="date"
                                                            value={experiencia.data_inicio}
                                                            onChange={(e) => {
                                                                setExperiencia({ ...experiencia, data_inicio: e.target.value });
                                                            }}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="endDate-0" className="block text-gray-700 text-lg">Data de Término *</label>
                                                        <input
                                                            id="endDate-0"
                                                            type="date"
                                                            value={experiencia.data_fim}
                                                            onChange={(e) => {
                                                                setExperiencia({ ...experiencia, data_fim: e.target.value });
                                                            }}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                    {/* Botão de Excluir com Estilo Vermelho e Menor */}
                                                    <div className="flex justify-end items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => excluirExperiencia()}
                                                            className="w-32 h-10 bg-gradient-to-r from-red-700 to-red-500 text-white px-4 py-2 mt-6 rounded-lg shadow-lg text-md font-semibold transition hover:from-red-700 hover:to-red-600"
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end space-x-4">
                                                <button
                                                    type="button"
                                                    onClick={salvarOuEditarExperiencia} // Apenas uma experiência para salvar/editar
                                                    className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition hover:from-blue-700 hover:to-blue-500"
                                                >
                                                    {experiencia?.id ? 'Salvar Alterações' : 'Salvar e Continuar'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bloco: Formação */}
                        <div className="bg-white rounded-lg shadow-lg">
                            <button
                                type="button"
                                className="h-28 w-full text-left p-4 text-xl font-bold bg-white text-gray-700 rounded-lg flex justify-between items-center relative"
                                onClick={() => toggleSection('formacao')}
                            >
                                <div className="flex items-center">
                                    Formação
                                </div>
                                {formacaoCompleta() && (
                                    <div className="absolute left-[200px] top-1/2 transform -translate-y-1/2">
                                        <div className="bg-green-500 rounded-full p-1">
                                            <HiCheck className="text-white" size={15} />
                                        </div>
                                    </div>
                                )}
                                <HiChevronDown
                                    size={28}
                                    className={`transform transition-transform duration-300 text-gray-500 ${expandedSection === 'formacao' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden ${expandedSection === 'formacao' ? 'max-h-[1000px]' : 'max-h-0'}`}
                            >
                                {expandedSection === 'formacao' && (
                                    <div className="p-4 border-t space-y-6">
                                        <form>
                                            {/* Apenas uma formação, sem map */}
                                            <div className="space-y-4 border p-4 rounded-lg mb-4">
                                                {/* Título Dinâmico */}
                                                <h2 className="text-xl font-bold text-gray-800">
                                                    {formacao.instituicao || 'Formação'}
                                                </h2>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="institution-0" className="block text-gray-700 text-lg">Instituição *</label>
                                                        <input
                                                            id="institution-0"
                                                            type="text"
                                                            placeholder="Insira o nome da instituição"
                                                            value={formacao.instituicao}
                                                            onChange={(e) => {
                                                                setFormacao({ ...formacao, instituicao: e.target.value });
                                                            }}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="course-0" className="block text-gray-700 text-lg">Curso *</label>
                                                        <input
                                                            id="course-0"
                                                            type="text"
                                                            placeholder="Insira o nome do curso"
                                                            value={formacao.curso}
                                                            onChange={(e) => {
                                                                setFormacao({ ...formacao, curso: e.target.value });
                                                            }}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <label htmlFor="level-0" className="block text-gray-700 text-lg">Nível de Formação *</label>
                                                        <select
                                                            id="level-0"
                                                            value={formacao.nivel}
                                                            onChange={(e) => {
                                                                setFormacao({ ...formacao, nivel: e.target.value });
                                                            }}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        >
                                                            <option value="">Selecione</option>
                                                            <option value="graduacao">Graduação</option>
                                                            <option value="tecnologo">Tecnólogo</option>
                                                            <option value="pos_graduacao">Pós-graduação</option>
                                                            <option value="mestrado">Mestrado</option>
                                                            <option value="doutorado">Doutorado</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="startDate-0" className="block text-gray-700 text-lg">Data de Início *</label>
                                                        <input
                                                            id="startDate-0"
                                                            type="date"
                                                            value={formacao.data_inicio}
                                                            onChange={(e) => {
                                                                setFormacao({ ...formacao, data_inicio: e.target.value });
                                                            }}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <label htmlFor="endDate-0" className="block text-gray-700 text-lg">Data de Término *</label>
                                                        <input
                                                            id="endDate-0"
                                                            type="date"
                                                            value={formacao.data_conclusao}
                                                            onChange={(e) => {
                                                                setFormacao({ ...formacao, data_conclusao: e.target.value });
                                                            }}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                    {/* Botão de Excluir com Estilo Vermelho e Menor */}
                                                    <div className="flex justify-end items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => excluirFormacao()}
                                                            className="w-32 h-10 bg-gradient-to-r from-red-700 to-red-500 text-white px-4 py-2 mt-6 rounded-lg shadow-lg text-md font-semibold transition hover:from-red-700 hover:to-red-600"
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end space-x-4">
                                                <button
                                                    type="button"
                                                    onClick={salvarOuEditarFormacao} // Apenas uma formação para salvar/editar
                                                    className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition hover:from-blue-700 hover:to-blue-500"
                                                >
                                                    {formacao?.id ? 'Salvar Alterações' : 'Salvar e Continuar'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer
                className="bg-gray-50 text-black text-center p-4 "
                style={{ fontFamily: "Roboto Flex, serif", fontWeight: 400 }}
            >
                <p>&copy; 2025 Pegho | Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Curriculo;
