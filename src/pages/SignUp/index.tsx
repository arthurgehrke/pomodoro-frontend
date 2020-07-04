import React from 'react';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useToast } from '../../context/ToastContext';
import Input from '../../components/Input';
import { Button } from '../../components/Button';

import { useSignUp } from '../../context/SignUpContext';

import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { ReactComponent as LoginImage } from '../../assets/img/login_img.svg';

const defaultValues = {
  name: '',
  email: '',
  password: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .max(255, 'O nome não pode ultrapassar 255 caracteres')
    .required('O nome é obrigatório'),

  email: yup
    .string()
    .email('Email inválido, por favor escolha outro')
    .required('O email é obrigatório'),

  password: yup
    .string()
    .min(6, 'Sua senha precisa ter ao menos 6 caracteres')
    .required(),
});

const SignUp: React.FC = () => {
  const { register, setValue, handleSubmit, reset, errors } = useForm();

  const { addToast } = useToast();

  const { signUpUser } = useSignUp();

  const onSubmit = async (data: any): Promise<void> => {
    try {
      console.log(data);
      await signUpUser({ ...data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white font-family-karla h-screen">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24" />

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <Logo className="w-48 mx-auto mb-3 h-20" />
            <span className="mx-auto font-bold text-lg">PomoDone</span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col pt-3 md:pt-8"
            >
              <div className="flex flex-col pt-4">
                <label htmlFor="name" className="text-base mb-1">
                  Insira seu nome
                </label>
                <Input
                  type="name"
                  id="text"
                  name="name"
                  placeholder="seu nome"
                  error={errors}
                  register={register}
                  inputClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label className="text-base mb-1">
                  Escolha o seu melhor email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  name="email"
                  error={errors}
                  register={register}
                  inputClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label className="text-base mb-1">Escolha uma senha</label>
                <Input
                  type="password"
                  id="password"
                  placeholder="sua senha"
                  name="password"
                  error={errors}
                  register={register}
                  inputClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <Button
                type="submit"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              >
                Começar a Estudar
              </Button>
            </form>
          </div>
        </div>

        <div className="w-1/2 shadow-2xl">
          <LoginImage className="object-cover w-full h-screen hidden md:block" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;