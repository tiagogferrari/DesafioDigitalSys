import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

const Curriculo = () => {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection((prev) => (prev === section ? null : section));
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
                                className="h-28 w-full text-left p-4 text-xl font-bold bg-white text-gray-700 rounded-lg flex justify-between items-center"
                                onClick={() => toggleSection('personalInfo')}
                            >
                                Dados pessoais
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
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="dob" className="block text-gray-700 text-lg">Data de nascimento *</label>
                                                    <input
                                                        id="dob"
                                                        type="date"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-3">
                                                <div>
                                                    <label htmlFor="gender" className="block text-gray-700 text-lg">Gênero *</label>
                                                    <select
                                                        id="gender"
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
                                className="h-28 w-full text-left p-4 text-xl font-bold bg-white text-gray-700 rounded-lg flex justify-between items-center"
                                onClick={() => toggleSection('contact')}
                            >
                                Contato
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
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="phone" className="block text-gray-700 text-lg">Telefone *</label>
                                                    <input
                                                        id="phone"
                                                        type="tel"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 mt-3">
                                                <div>
                                                    <label htmlFor="address" className="block text-gray-700 text-lg">Endereço completo*</label>
                                                    <input
                                                        id="address"
                                                        type="text"
                                                        placeholder='Insira seu endereço completo'
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
                                className="h-28 w-full text-left p-4 text-xl font-bold bg-white text-gray-700 rounded-lg flex justify-between items-center"
                                onClick={() => toggleSection('experience')}
                            >
                                Experiência
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
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="company" className="block text-gray-700 text-lg">Empresa *</label>
                                                    <input
                                                        id="company"
                                                        type="text"
                                                        placeholder='Insira o nome da empresa'
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="role" className="block text-gray-700 text-lg">Cargo *</label>
                                                    <input
                                                        id="role"
                                                        type="text"
                                                        placeholder='Insira o cargo exercido'
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-3">
                                                <div>
                                                    <label htmlFor="startDate" className="block text-gray-700 text-lg">Data de Início *</label>
                                                    <input
                                                        id="startDate"
                                                        type="date"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="endDate" className="block text-gray-700 text-lg">Data de Término *</label>
                                                    <input
                                                        id="endDate"
                                                        type="date"
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

                        {/* Bloco: Formação */}
                        <div className="bg-white rounded-lg shadow-lg">
                            <button
                                type="button"
                                className="h-28 w-full text-left p-4 text-xl font-bold bg-white text-gray-700 rounded-lg flex justify-between items-center"
                                onClick={() => toggleSection('education')}
                            >
                                Formação
                                <HiChevronDown
                                    size={28}
                                    className={`transform transition-transform duration-300 text-gray-500 ${expandedSection === 'education' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden ${expandedSection === 'education' ? 'max-h-[1000px]' : 'max-h-0'}`}
                            >
                                {expandedSection === 'education' && (
                                    <div className="p-4 border-t space-y-4">
                                        <form>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="institution" className="block text-gray-700 text-lg">Instituição *</label>
                                                    <input
                                                        id="institution"
                                                        type="text"
                                                        placeholder='Insira o nome da instituição'
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="course" className="block text-gray-700 text-lg">Curso *</label>
                                                    <input
                                                        id="course"
                                                        type="text"
                                                        placeholder='Insira o nome do curso'
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-3">
                                                <div>
                                                    <label htmlFor="level" className="block text-gray-700 text-lg">Nível de Formação *</label>
                                                    <select
                                                        id="level"
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
                                                    <label htmlFor="startDate" className="block text-gray-700 text-lg">Data de Início *</label>
                                                    <input
                                                        id="startDate"
                                                        type="date"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                                                    />

                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-3">
                                                <div>
                                                    <label htmlFor="endDate" className="block text-gray-700 text-lg">Data de Término *</label>
                                                    <input
                                                        id="endDate"
                                                        type="date"
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
