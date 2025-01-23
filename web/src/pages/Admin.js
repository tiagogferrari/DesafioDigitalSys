import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import axios from 'axios';

const Admin = () => {
    const [curriculos, setCurriculos] = useState([]); // Estado para armazenar os currículos
    const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a paginação
    const [itemsPerPage] = useState(6); // Quantidade de itens por página
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para tratar erros
    const [selectedCurriculo, setSelectedCurriculo] = useState(null); // Estado para armazenar o currículo selecionado
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal

    // Função para buscar os currículos da API
    useEffect(() => {
        const fetchCurriculos = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://127.0.0.1:8000/api/curriculums/', config);
                setCurriculos(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCurriculos();
    }, []);

    // Lógica para paginação
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = curriculos.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Função para abrir o modal com os detalhes do currículo
    const openModal = (curriculo) => {
        setSelectedCurriculo(curriculo);
        setIsModalOpen(true);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCurriculo(null);
    };

    // Exibir mensagem de carregamento ou erro
    if (loading) {
        return <div className="text-center mt-8">Carregando currículos...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">Erro ao carregar currículos: {error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-500 to-blue-300 text-white pb-6 pt-5 text-center">
                <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playwrite IN', serif", fontWeight: 600 }}>
                    Pegho Admin
                </h1>
            </header>

            {/* Main Content */}
            <div className="flex-grow bg-gray-50 flex flex-col">
                <div className="max-w-6xl mx-auto rounded-lg pt-5 pb-8 flex-grow">
                    <h1 className='text-4xl font-bold pb-3'>Currículos Cadastrados</h1>
                    <p className="text-gray-700 text-lg mb-6">
                        Visualize e gerencie todos os currículos cadastrados no sistema.
                    </p>

                    {/* Cards de currículos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((curriculo) => (
                            <div key={curriculo.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h2 className="text-xl font-semibold mb-2">{curriculo.nome}</h2>
                                <button
                                    type='button'
                                    onClick={() => openModal(curriculo)}
                                    className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
                                >
                                    Ver detalhes
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Paginação */}
                <div className="max-w-6xl mx-auto w-full py-6">
                    <div className="flex justify-center">
                        <button
                            type='button'
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="mx-1 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                        >
                            <HiChevronLeft />
                        </button>
                        {[...Array(Math.ceil(curriculos.length / itemsPerPage)).keys()].map((number) => (
                            <button
                                type='button'
                                key={number + 1}
                                onClick={() => paginate(number + 1)}
                                className={`mx-1 px-4 py-2 ${
                                    currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                } rounded`}
                            >
                                {number + 1}
                            </button>
                        ))}
                        <button
                            type='button'
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(curriculos.length / itemsPerPage)}
                            className="mx-1 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                        >
                            <HiChevronRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal para exibir detalhes do currículo */}
            {isModalOpen && selectedCurriculo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">{selectedCurriculo.nome}</h2>

                        {/* Informações pessoais */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Informações Pessoais</h3>
                            <p><strong>Data de Nascimento:</strong> {selectedCurriculo.data_nascimento}</p>
                            <p><strong>Gênero:</strong> {selectedCurriculo.genero}</p>
                            <p><strong>Nacionalidade:</strong> {selectedCurriculo.nacionalidade}</p>
                        </div>

                        {/* Contatos */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Contatos</h3>
                            {selectedCurriculo.contatos.map((contato) => (
                                <div key={contato.id} className="mb-4">
                                    <p><strong>Email:</strong> {contato.email}</p>
                                    <p><strong>Telefone:</strong> {contato.telefone}</p>
                                    <p><strong>Endereço:</strong> {contato.endereco}</p>
                                </div>
                            ))}
                        </div>

                        {/* Experiências */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Experiências</h3>
                            {selectedCurriculo.experiencias.map((experiencia) => (
                                <div key={experiencia.id} className="mb-4">
                                    <p><strong>Cargo:</strong> {experiencia.cargo}</p>
                                    <p><strong>Empresa:</strong> {experiencia.empresa}</p>
                                    <p><strong>Período:</strong> {experiencia.data_inicio} até {experiencia.data_fim}</p>
                                </div>
                            ))}
                        </div>

                        {/* Formações */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Formações</h3>
                            {selectedCurriculo.formacoes.map((formacao) => (
                                <div key={formacao.id} className="mb-4">
                                    <p><strong>Curso:</strong> {formacao.curso}</p>
                                    <p><strong>Instituição:</strong> {formacao.instituicao}</p>
                                    <p><strong>Nível:</strong> {formacao.nivel}</p>
                                    <p><strong>Período:</strong> {formacao.data_inicio} até {formacao.data_conclusao}</p>
                                </div>
                            ))}
                        </div>

                        {/* Botão para fechar o modal */}
                        <button
                            type='button'
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer
                className="bg-gray-50 text-black text-center p-4"
                style={{ fontFamily: "Roboto Flex, serif", fontWeight: 400 }}
            >
                <p>&copy; 2025 Pegho | Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Admin;