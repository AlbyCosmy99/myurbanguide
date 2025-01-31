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
      className=" xl:px-20 md:px-10 sm:px-4 px-4 py-14 border-gray-200 border-b"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="row max-w-[1440px] mx-auto">{children}</div>
    </section>
  );
};

export default SectionContainer;
