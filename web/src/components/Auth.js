import React, { useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const Auth = ({ setShowPopup }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });
    const [message, setMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegister
            ? 'http://127.0.0.1:8000/api/register/'
            : 'http://127.0.0.1:8000/api/login/';
        const body = isRegister
            ? { username: formData.username, password: formData.password, email: formData.email }
            : { username: formData.username, password: formData.password };

        try {
            const response = await axios.post(url, body);
            if (!isRegister) {
                const token = response.data.access; // Acessando o token
                const isSuperuser = response.data.is_superuser; // Acessando o status de superusuário
                localStorage.setItem('token', token);
                localStorage.setItem('is_superuser', isSuperuser); // Salva o status no localStorage
                console.log('Token:', token);
                console.log('Superusuário:', isSuperuser);

                // Redirecionamento baseado no status de superusuário
                if (isSuperuser) {
                    window.location.href = '/admin'; // Exemplo de rota para superusuário
                } else {
                    window.location.href = '/curriculo'; // Exemplo de rota para usuário normal
                }
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.detail || 'Algo deu errado, tente novamente.');
            } else {
                setMessage('Erro de conexão com o servidor.');
            }
        }

    };

    const toggleAuthMode = (mode) => {
        setIsRegister(mode);
        setFormData({
            username: '',
            password: '',
            email: '',
        });
        setMessage(null);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md relative">
                {/* Título e Botão Fechar */}
                <div className="flex justify-center items-center mb-8">
                    <h2 className="text-2xl font-bold text-blue-500 flex-1 text-center" style={{ fontFamily: "Roboto Flex, serif", fontWeight: 800 }}>
                        {isRegister ? 'Registro' : 'Login'}
                    </h2>
                    <CloseIcon
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => setShowPopup(false)}
                    />
                </div>

                {message && (
                    <div
                        className={`mb-6 p-4 rounded-lg text-center font-medium ${message.includes('sucesso')
                            ? 'bg-green-100 text-green-700 border border-green-500'
                            : 'bg-red-100 text-red-700 border border-red-500'
                            }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                            Nome de usuário
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                            placeholder="Digite seu nome de usuário"
                            required
                        />
                    </div>

                    {isRegister && (
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                                placeholder="Digite seu email"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-blue-600 transition-all duration-200"
                    >
                        {isRegister ? 'Registrar' : 'Entrar'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    {isRegister ? (
                        <>
                            Já tem uma conta?{' '}
                            <button
                                type="button"
                                onClick={() => toggleAuthMode(false)}
                                className="text-blue-500 hover:underline font-medium"
                            >
                                Faça login
                            </button>
                        </>
                    ) : (
                        <>
                            Não tem uma conta?{' '}
                            <button
                                type="button"
                                onClick={() => toggleAuthMode(true)}
                                className="text-blue-500 hover:underline font-medium"
                            >
                                Registre-se
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Auth;
