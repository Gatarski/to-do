'use client';
import { FormikProvider, useFormik } from 'formik';
import { Input } from './UI/Input';
import { useState } from 'react';
import Button from './UI/Button';
import { AuthFormData } from '@/types/types';
import {
  FIELD_MAX_20_CHARS_VALIDATION_MESSAGE,
  FIELD_MAX_50_CHARS_VALIDATION_MESSAGE,
  FIELD_REQUIRED_VALIDATION_MESSAGE,
} from '@/constants/messages';
import { MAX_20_CHARS, MAX_50_CHARS } from '@/constants/sizes';
import Link from 'next/link';
import * as Yup from 'yup';
import { loginUserAPI, registerUserAPI } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { Loader } from './UI/Loader';
import { useValidationMessage } from '@/utils/client-utils';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  authMode: AuthMode;
}

const initialLoginValues: AuthFormData = {
  email: '',
  password: '',
};

const initialRegisterValues: AuthFormData = {
  email: '',
  password: '',
  name: '',
};

const loginFormContent = {
  linkUrl: '/register',
  linkText: `Don't have an account?`,
  buttonText: 'Log in',
  header: 'Login',
  subheader: 'Enter your credentials to access your account',
};

const registerContent = {
  linkUrl: '/login',
  linkText: 'Already have an account?',
  buttonText: 'Register',
  header: 'Create a new Account',
  subheader: 'Just a few things to get started',
};

const LOGIN_SCHEMA = [
  {
    labelText: 'Email',
    name: 'email',
    id: 'email',
    placeholder: 'Email Address',
  },
  {
    labelText: 'Password',
    name: 'password',
    id: 'password',
    placeholder: 'Password',
    type: 'password',
  },
];

const REGISTER_SCHEMA = [
  ...LOGIN_SCHEMA,
  {
    labelText: 'Display name (optional)',
    name: 'name',
    id: 'name',
    placeholder: 'Your name',
  },
];
const PASSWORD_VALIDATION_MESSAGE = 'Password should contain at least 6 characters';
const EMAIL_VALIDATION_MESSAGE = 'Invalid email';

export const AuthForm = ({ authMode }: AuthFormProps) => {
  const [apiError, setApiError] = useState('');
  const [isApiLoading, setIsApiLoading] = useState(false);
  const router = useRouter();

  const initialValues = getInitialValues(authMode);
  const formSchema = getFormSchema(authMode);
  const { linkUrl, buttonText, linkText, header, subheader } = getFormContent(authMode);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      const formValues = formik.values;
      const authErrorResponse = await formSubmit(authMode, formValues, setIsApiLoading);
      setApiError(authErrorResponse.error);
      if (!apiError) {
        router.refresh();
      }
    },
  });
  const isButtonDisabled = !formik.values.email || !formik.values.password;
  useValidationMessage(apiError, 'error', setApiError);

  return (
    <div className="w-1/2 text-center">
      <FormikProvider value={formik}>
        <div>
          <h2 className="text-3xl mb-2">{header}</h2>
          <p className="text-lg text-black/25 mobile:hidden">{subheader}</p>
        </div>
        <div className={`${isApiLoading && 'text-center p-3'}`}>
          {!isApiLoading ? (
            <div>
              <div className="text-center p-3">
                <form onSubmit={formik.handleSubmit}>
                  {formSchema.map(({ labelText, name, id, placeholder, type }, index) => {
                    return (
                      <Input
                        key={index}
                        labelText={labelText}
                        name={name}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                      />
                    );
                  })}
                  <Button isDisabled={isButtonDisabled} htmlType="submit" buttonText={buttonText} />
                </form>
              </div>

              <span className="m-3 p-3">
                <Link href={linkUrl} className="text-blue-600 font-bold text-sm">
                  {linkText}
                </Link>
              </span>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </FormikProvider>
    </div>
  );
};

const getInitialValues = (authMode: AuthMode): AuthFormData => {
  switch (authMode) {
    case 'login':
      return initialLoginValues;
    case 'register':
      return initialRegisterValues;
  }
};

const getFormContent = (authMode: AuthMode) => {
  switch (authMode) {
    case 'login':
      return loginFormContent;
    case 'register':
      return registerContent;
  }
};

const getFormSchema = (authMode: AuthMode) => {
  switch (authMode) {
    case 'login':
      return LOGIN_SCHEMA;
    case 'register':
      return REGISTER_SCHEMA;
  }
};

const formSubmit = async (authMode: AuthMode, values: AuthFormData, setIsApiLoading: Function) => {
  setIsApiLoading(true);
  const apiResult =
    authMode === 'login' ? await loginUserAPI(values) : await registerUserAPI(values);
  setIsApiLoading(false);
  return apiResult;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(EMAIL_VALIDATION_MESSAGE)
    .required(FIELD_REQUIRED_VALIDATION_MESSAGE)
    .max(MAX_50_CHARS, FIELD_MAX_50_CHARS_VALIDATION_MESSAGE.replace('[fieldName]', 'Email')),
  password: Yup.string()
    .min(6, PASSWORD_VALIDATION_MESSAGE)
    .required(FIELD_REQUIRED_VALIDATION_MESSAGE)
    .max(MAX_50_CHARS, FIELD_MAX_50_CHARS_VALIDATION_MESSAGE.replace('[fieldName]', 'Password')),
  name: Yup.string().max(
    MAX_20_CHARS,
    FIELD_MAX_20_CHARS_VALIDATION_MESSAGE.replace('[fieldName]', 'Name'),
  ),
});
