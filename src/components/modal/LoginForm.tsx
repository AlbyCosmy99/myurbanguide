import { useState } from 'react';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface LoginFormProps {
  changeForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ changeForm }) => {
  const [type, setType] = useState('password');

  const changeTypePassword = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Accedi al tuo account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Indirizzo Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block rounded-full w-full border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#E29C00] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-[#E29C00] hover:text-[#E29C00] cursor-pointer"
                  >
                    Password dimenticata?
                  </a>
                </div>
              </div>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={type}
                  required
                  autoComplete="current-password"
                  className="block rounded-full w-full border-0 py-2 px-4 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#E29C00] sm:text-sm/6 autofill:bg-white autofill:border-white"
                />
                <div
                  onClick={changeTypePassword}
                  className="absolute top-[10px] left-4"
                >
                  {type === 'password' ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-[#E29C00] py-2 px-6 text-white rounded-full font-bold w-full"
              >
                Accedi
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm/6 text-gray-500">
            Non sei iscitto?{' '}
            <a
              onClick={changeForm}
              className="font-semibold text-[#E29C00] hover:text-[#E29C00] cursor-pointer"
            >
              Iscriviti subito
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
  );
};

export default LoginForm;
