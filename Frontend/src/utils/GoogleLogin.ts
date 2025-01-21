const handleGoogleAuth = () => {
  window.location.href = import.meta.env.VITE_BACKEND_URL + 'auth/google';
};

export default handleGoogleAuth;
