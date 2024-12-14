import { useState } from 'react';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import OauthButton from "../ui/buttons/OauthButton";
import LoadingIcon from "../ui/customIcons/Loading";
import { useNavigate } from "react-router-dom";
import useModalStore from "../../stores/zustand/ModalStore";

interface LoginFormProps {
  changeForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ changeForm }) => {
  const [type, setType] = useState('password');
  const [email, setEmail] = useState<String>('')
  const [password, setPassword] = useState<String>('')
  const [errorMessage, setErrorMessage] = useState<String>('')
  const [loading, setLoading] = useState<Boolean>(false)

  const { setModalOpen } = useModalStore()

  const navigate = useNavigate();

  const changeTypePassword = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setLoading(true)
      const response = await fetch('http://localhost:3030/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const token = await response.json()
      localStorage.setItem('token', token)

      if (token) {
        navigate('/dashboard')
      }

      setErrorMessage('')
      setLoading(false)
      setModalOpen(false)
    }
    catch (error) {
      setErrorMessage('Credenziali errate')
      setLoading(false)
    }


  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Accedi al tuo account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={loginUser} className="space-y-4">
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
                  className="input-style"
                  onChange={(event) => setEmail(event.target.value)}
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
                  className="input-style pl-11"
                  onChange={(event) => setPassword(event.target.value)}
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
            <p className="text-red-800 text-sm font-semibold">{errorMessage}</p>
            <div>
              <button
                type="submit"
                className="bg-[#E29C00] py-2 px-6 text-white rounded-full font-bold w-full flex justify-center items-center gap-3"
              >
                Accedi
                <LoadingIcon loading={true} isFocused={true} width={loading ? "18" : "0"} height="18" color="text-white" />
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
            <OauthButton>
              <FcGoogle />
              Accedi con Google
            </OauthButton>
          </div>
          <div className="mt-1">
            <OauthButton>
              <FaApple />
              Accedi con Apple
            </OauthButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
