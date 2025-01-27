import React, { useState, useEffect, useCallback } from 'react';
import { HiChevronDown, HiCheck } from 'react-icons/hi';
import axios from 'axios';

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
    const [experiencias, setExperiencias] = useState([
        {
            cargo: '',
            empresa: '',
            data_inicio: '',
            data_fim: '',
        },
    ]);
    const [formacoes, setFormacoes] = useState([
        {
            curso: '',
            instituicao: '',
            nivel: '',
            data_inicio: '',
            data_conclusao: '',
        },
    ]);

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
    const experienciasCompletas = () => {
        return experiencias.every(
            (exp) => exp.empresa && exp.cargo && exp.data_inicio && exp.data_fim
        );
    };
    const formacoesCompletas = () => {
        return formacoes.every(
            (formacao) =>
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

    const buscarCurriculoUsuario = useCallback(async () => {
        try {
            const token = localStorage.getItem('token'); // Recupera o token do localStorage
            if (!token) {
                console.error('Token não encontrado');
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/curriculums/meu_curriculo/', {
                headers: {
                    Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
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

                setExperiencias(response.data.experiencias || [{
                    cargo: '',
                    empresa: '',
                    data_inicio: '',
                    data_fim: '',
                }]);

                setFormacoes(response.data.formacoes || [{
                    curso: '',
                    instituicao: '',
                    nivel: '',
                    data_inicio: '',
                    data_conclusao: '',
                }]);
            }
        } catch (error) {
            console.error('Erro ao buscar currículo:', error);
            if (error.response) {
                console.error('Resposta do servidor:', error.response.data);
            }
        }
    }, []);

    useEffect(() => {
        buscarCurriculoUsuario();
    }, [buscarCurriculoUsuario]);

    console.log(dadosPessoais)

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
                                            <div className="grid grid-cols-2 gap-4 mt-3">
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
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition hover:from-blue-700 hover:to-blue-500"
                                                    style={{ fontFamily: "Roboto Flex, serif", fontWeight: 300 }}
                                                >
                                                    Salvar e continuar
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
                                            <div className="grid grid-cols-1 mt-3">
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
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition hover:from-blue-700 hover:to-blue-500"
                                                    style={{ fontFamily: "Roboto Flex, serif", fontWeight: 300 }}
                                                >
                                                    Salvar e continuar
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
                                {experienciasCompletas() && (
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
                                    <div className="p-4 border-t space-y-4">
                                        <form>
                                            {experiencias.map((exp) => (
                                                <div key={exp.id} className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label htmlFor={`company-${exp.id}`} className="block text-gray-700 text-lg">Empresa *</label>
                                                            <input
                                                                id={`company-${exp.id}`}
                                                                type="text"
                                                                placeholder='Insira o nome da empresa'
                                                                value={exp.empresa}
                                                                onChange={(e) => {
                                                                    const novasExperiencias = experiencias.map((item) =>
                                                                        item.id === exp.id ? { ...item, empresa: e.target.value } : item
                                                                    );
                                                                    setExperiencias(novasExperiencias);
                                                                }}
                                                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`role-${exp.id}`} className="block text-gray-700 text-lg">Cargo *</label>
                                                            <input
                                                                id={`role-${exp.id}`}
                                                                type="text"
                                                                placeholder='Insira o cargo exercido'
                                                                value={exp.cargo}
                                                                onChange={(e) => {
                                                                    const novasExperiencias = experiencias.map((item) =>
                                                                        item.id === exp.id ? { ...item, cargo: e.target.value } : item
                                                                    );
                                                                    setExperiencias(novasExperiencias);
                                                                }}
                                                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 mt-3">
                                                        <div>
                                                            <label htmlFor={`startDate-${exp.id}`} className="block text-gray-700 text-lg">Data de Início *</label>
                                                            <input
                                                                id={`startDate-${exp.id}`}
                                                                type="date"
                                                                value={exp.data_inicio}
                                                                onChange={(e) => {
                                                                    const novasExperiencias = experiencias.map((item) =>
                                                                        item.id === exp.id ? { ...item, data_inicio: e.target.value } : item
                                                                    );
                                                                    setExperiencias(novasExperiencias);
                                                                }}
                                                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`endDate-${exp.id}`} className="block text-gray-700 text-lg">Data de Término *</label>
                                                            <input
                                                                id={`endDate-${exp.id}`}
                                                                type="date"
                                                                value={exp.data_fim}
                                                                onChange={(e) => {
                                                                    const novasExperiencias = experiencias.map((item) =>
                                                                        item.id === exp.id ? { ...item, data_fim: e.target.value } : item
                                                                    );
                                                                    setExperiencias(novasExperiencias);
                                                                }}
                                                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition hover:from-blue-700 hover:to-blue-500"
                                                    style={{ fontFamily: "Roboto Flex, serif", fontWeight: 300 }}
                                                >
                                                    Salvar e continuar
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
                                {formacoesCompletas() && (
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
                                    <div className="p-4 border-t space-y-4">
                                        <form>
                                            {formacoes.map((formacao) => (
                                                <div key={formacao.id} className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label htmlFor={`institution-${formacao.id}`} className="block text-gray-700 text-lg">Instituição *</label>
                                                            <input
                                                                id={`institution-${formacao.id}`}
                                                                type="text"
                                                                placeholder='Insira o nome da instituição'
                                                                value={formacao.instituicao}
                                                                onChange={(e) => {
                                                                    const novasFormacoes = formacoes.map((item) =>
                                                                        item.id === formacao.id ? { ...item, instituicao: e.target.value } : item
                                                                    );
                                                                    setFormacoes(novasFormacoes);
                                                                }}
                                                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`course-${formacao.id}`} className="block text-gray-700 text-lg">Curso *</label>
                                                            <input
                                                                id={`course-${formacao.id}`}
                                                                type="text"
                                                                placeholder='Insira o nome do curso'
                                                                value={formacao.curso}
                                                                onChange={(e) => {
                                                                    const novasFormacoes = formacoes.map((item) =>
                                                                        item.id === formacao.id ? { ...item, curso: e.target.value } : item
                                                                    );
                                                                    setFormacoes(novasFormacoes);
                                                                }}
                                                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 mt-3">
                                                        <div>
                                                            <label htmlFor={`level-${formacao.id}`} className="block text-gray-700 text-lg">Nível de Formação *</label>
                                                            <select
                                                                id={`level-${formacao.id}`}
                                                                value={formacao.nivel}
                                                                onChange={(e) => {
                                                                    const novasFormacoes = formacoes.map((item) =>
                                                                        item.id === formacao.id ? { ...item, nivel: e.target.value } : item
                                                                    );
                                                                    setFormacoes(novasFormacoes);
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
                                                            <label htmlFor={`startDate-${formacao.id}`} className="block text-gray-700 text-lg">Data de Início *</label>
                                                            <input
                                                                id={`startDate-${formacao.id}`}
                                                                type="date"
                                                                value={formacao.data_inicio}
                                                                onChange={(e) => {
                                                                    const novasFormacoes = formacoes.map((item) =>
                                                                        item.id === formacao.id ? { ...item, data_inicio: e.target.value } : item
                                                                    );
                                                                    setFormacoes(novasFormacoes);
                                                                }}
                                                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 mt-3">
                                                        <div>
                                                            <label htmlFor={`endDate-${formacao.id}`} className="block text-gray-700 text-lg">Data de Término *</label>
                                                            <input
                                                                id={`endDate-${formacao.id}`}
                                                                type="date"
                                                                value={formacao.data_conclusao}
                                                                onChange={(e) => {
                                                                    const novasFormacoes = formacoes.map((item) =>
                                                                        item.id === formacao.id ? { ...item, data_conclusao: e.target.value } : item
                                                                    );
                                                                    setFormacoes(novasFormacoes);
                                                                }}
                                                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition hover:from-blue-700 hover:to-blue-500"
                                                    style={{ fontFamily: "Roboto Flex, serif", fontWeight: 300 }}
                                                >
                                                    Salvar e continuar
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
