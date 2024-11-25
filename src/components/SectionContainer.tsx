import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  color?: string;
}

const SectionContainer: React.FC<ContainerProps> = ({
  children,
  color = 'unset',
}) => {
  return (
    <section
      className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px4 py-14 border-gray-200 border-b"
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </section>
  );
};

export default SectionContainer;
