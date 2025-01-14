const handleGithubAuth = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + 'auth/github';
};

export default handleGithubAuth;