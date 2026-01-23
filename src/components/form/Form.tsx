import { FC, ReactNode, FormEvent } from "react";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

const Form: FC<FormProps> = ({ onSubmit, children, className }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault(); 
        onSubmit(event);
      }}
      className={`border-[#D3D3D3] dark:border-gray-800 ${className}`} 
    >
      {children}
    </form>
  );
};

export default Form;
