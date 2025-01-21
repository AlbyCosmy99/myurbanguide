import { ReactNode } from 'react';

interface OauthButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const OauthButton: React.FC<OauthButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center gap-2 bg-white py-2 px-6 text-gray-800 rounded-full font-bold w-full border border-gray-600"
    >
      {children}
    </button>
  );
};

export default OauthButton;
