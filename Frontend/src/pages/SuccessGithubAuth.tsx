import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../stores/zustand/AuthStore';
import SectionContainer from '../components/SectionContainer';

const SuccessGithubAuth = () => {
  const [params] = useSearchParams();
  const code = params.get('code');
  const { updateUser } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      if (!code) {
        console.error('Authorization code not found');
        return;
      }
      console.log(code);
      try {
        const response = await fetch(
          'http://localhost:3030/api/auth/github/callback',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          },
        );

        if (!response.ok) {
          throw new Error('Failed to authenticate with GitHub');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);

        updateUser({
          id: data.id,
          username: data.username,
          email: data.email,
        });
        navigate('/dashboard');
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };

    authenticateUser();
  }, []);

  return (
    <SectionContainer>
      <p>Login in corso...</p>
    </SectionContainer>
  );
};

export default SuccessGithubAuth;
