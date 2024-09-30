import React, { ReactNode } from 'react';

interface FormProps {
  onSubmit: (data: any) => void;
  children: ReactNode; // <-- Add this line
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    onSubmit(data);
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default Form;
