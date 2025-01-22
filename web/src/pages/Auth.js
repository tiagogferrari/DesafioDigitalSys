import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '', // Apenas para registro
    });
    const [message, setMessage] = useState(null); // Para exibir mensagens de sucesso ou erro

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
            setMessage(isRegister ? 'Registrado com sucesso!' : 'Login realizado com sucesso!');

            if (!isRegister) {
                // Armazene o token para autenticação
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log('Token:', token); // Substitua por redirecionamento, se necessário
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {isRegister ? 'Registro' : 'Login'}
                </h2>

                {message && (
                    <div
                        className={`mb-4 p-2 rounded text-center ${message.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                            Nome de usuário
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {isRegister && (
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        {isRegister ? 'Registrar' : 'Entrar'}
                    </button>
                </form>

                <p className="text-gray-600 mt-4 text-center">
                    {isRegister ? (
                        <>
                            Já tem uma conta?{' '}
                            <button
                                type="button"
                                onClick={() => toggleAuthMode(false)}
                                className="text-blue-500 hover:underline focus:outline-none"
                            >
                                Logar
                            </button>
                        </>
                    ) : (
                        <>
                            Não tem uma conta?{' '}
                            <button
                                type="button"
                                onClick={() => toggleAuthMode(true)}
                                className="text-blue-500 hover:underline focus:outline-none"
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
