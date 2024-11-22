import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface SignUpFormProps {
    changeForm: () => void
}

const SignUpForm: React.FC<SignUpFormProps> = ({ changeForm }) => {

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Effettua la registrazione
                    </h2>
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Nome Utente
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-full border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#E29C00] sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Indirizzo Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-full border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#E29C00] sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-full border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#E29C00] sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="bg-[#E29C00] py-2 px-6 text-white rounded-full font-bold w-full"
                            >
                                Registrati
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm/6 text-gray-500">
                        Sei già iscritto?{' '}
                        <a onClick={changeForm} className="font-semibold text-[#E29C00] hover:text-[#E29C00] cursor-pointer">
                            Accedi
                        </a>
                    </p>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="flex justify-center items-center gap-2 bg-white py-2 px-6 text-gray-800 rounded-full font-bold w-full border border-gray-600"
                        >
                            <FcGoogle />
                            Accedi con Google
                        </button>
                    </div>
                    <div className="mt-1">
                        <button
                            type="submit"
                            className="flex justify-center items-center gap-2 bg-white py-2 px-6 text-gray-800 rounded-full font-bold w-full border border-gray-600"
                        >
                            <FaApple />
                            Accedi con Apple
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default SignUpForm