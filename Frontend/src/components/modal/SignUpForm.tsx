import { FaApple, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import OauthButton from "../ui/buttons/OauthButton";
import { useState } from "react";
import LoadingIcon from "../ui/customIcons/Loading";
import { useNavigate } from "react-router-dom";
import useModalStore from "../../stores/zustand/ModalStore";
import handleGoogleAuth from "../../utils/GoogleLogin";

interface SignUpFormProps {
  changeForm: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ changeForm }) => {
  const [type, setType] = useState('password');
  const [username, setUsername] = useState<String>('')
  const [email, setEmail] = useState<String>('')
  const [password, setPassword] = useState<String>('')
  const [passwordRepeat, setPasswordRepeat] = useState<String>('')
  const [errorMessage, setErrorMessage] = useState<String>('')
  const [loading, setLoading] = useState<Boolean>(false)

  const { setModalOpen } = useModalStore()

  const navigate = useNavigate()

  const signUpUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (passwordRepeat != password) {
      setErrorMessage('Le password non coincidono')
    }
    else {

      try {
        setLoading(true)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'auth/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
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
          //navigate('/dashboard')
        }

        setErrorMessage('')
        setLoading(false)
        setModalOpen(false)
      }
      catch (error) {
        setErrorMessage('Utente già registrato')
        setLoading(false)
      }
    }
  }


  const changeTypePassword = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Effettua la registrazione
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={signUpUser} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nome Utente
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input-style"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Indirizzo Email
              </label>
              <div className="mt-1">
                <input
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
              </div>
              <div className="mt-1 relative">
                <input
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
                    <FaRegEye size={20} className="text-gray-400" />
                  ) : (
                    <FaRegEyeSlash size={20} className="text-gray-400" />
                  )}
                </div>
              </div>

            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Ripeti Password
                </label>
              </div>
              <div className="mt-1 relative">
                <input
                  name="password-repeat"
                  type={type}
                  required
                  autoComplete="current-password"
                  className="input-style pl-11"
                  onChange={(event) => setPasswordRepeat(event.target.value)}
                />
                <div
                  onClick={changeTypePassword}
                  className="absolute top-[10px] left-4"
                >
                  {type === 'password' ? (
                    <FaRegEye size={20} className="text-gray-400" />
                  ) : (
                    <FaRegEyeSlash size={20} className="text-gray-400" />
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
                Registrati
                <LoadingIcon loading={true} isFocused={true} width={loading ? "18" : "0"} height="18" color="text-white" />

              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm/6 text-gray-500">
            Sei già iscritto?{' '}
            <a
              onClick={changeForm}
              className="font-semibold text-[#E29C00] hover:text-[#E29C00] cursor-pointer"
            >
              Accedi
            </a>
          </p>
          <div className="mt-6">
            <OauthButton onClick={handleGoogleAuth}>
              <FcGoogle />
              Accedi con Google
            </OauthButton>
          </div>
          <div className="mt-1">
            <OauthButton onClick={() => { }}>
              <FaApple />
              Accedi con Apple
            </OauthButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
