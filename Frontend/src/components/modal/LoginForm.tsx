import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import OauthButton from '../ui/buttons/OauthButton';
import LoadingIcon from '../ui/customIcons/Loading';
import useModalStore from '../../stores/zustand/ModalStore';
import handleGoogleAuth from '../../utils/GoogleLogin';
import handleGithubAuth from '../../utils/GithubLogin';

interface LoginFormProps {
  changeForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ changeForm }) => {
  const [type, setType] = useState('password');
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [errorMessage, setErrorMessage] = useState<String>('');
  const [loading, setLoading] = useState<Boolean>(false);

  const { setModalOpen } = useModalStore();

  const changeTypePassword = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + 'auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      if (!response.ok) {
        setErrorMessage('Credenziali errate');
        setLoading(false);
      } else {
        const token = await response.json();
        localStorage.setItem('token', token);

        if (token) {
          setErrorMessage('');
          setLoading(false);
          setModalOpen(false);
          //navigate('/dashboard')
          window.location.reload();
        }
      }
    } catch (error) {
      setErrorMessage("Non è stato possibile effettuare l'accesso");
      setLoading(false);
    }
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
                  onChange={event => setEmail(event.target.value)}
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
                  onChange={event => setPassword(event.target.value)}
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
                className="bg-[#E29C00] py-2 px-6 text-white rounded-2xl font-bold w-full flex justify-center items-center gap-3"
              >
                Accedi
                <LoadingIcon
                  loading={true}
                  isFocused={true}
                  width={loading ? '18' : '0'}
                  height="18"
                  color="text-white"
                />
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
            <OauthButton onClick={handleGoogleAuth}>
              <FcGoogle />
              Accedi con Google
            </OauthButton>
          </div>
          <div className="mt-1">
            <OauthButton onClick={handleGithubAuth}>
              <FaGithub />
              Accedi con GitHub
            </OauthButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
