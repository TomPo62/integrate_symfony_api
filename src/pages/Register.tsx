import axios from 'axios'
import React, { useState } from 'react'
import Layout from './layout'

function Register() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [pwdToText, setPwdToText] = useState<string>('password')

  const validateEmail = (email: string) => {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Veuillez saisir une adresse mail valide, ex:john.doe@monsite.fr');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password: string) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$!%*.?&]{9,}$/.test(password)) {
      setPasswordError('Veuillez saisir un mot de passe valide');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios.post(
      'https://localhost:8000/api/register',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/ld+json',
        }
      }
    );

    if (response.data) {
      setMessage('User created successfully! Please check your email to confirm your registration.');
    } else {
      setMessage(`Error: ${response.data.message}`);
    }
  };

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const togglePwdToText = () => {
    setPwdToText(pwdToText === 'password' ? 'text' : 'password');
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen w-full items-center">
        <h2 className="text-3xl font-bold text-blue-500">Register</h2>
        <form className="h-max flex flex-col w-max justify-center items-center ">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-blue-500 rounded-lg px-2"
            />
            <p>{emailError}</p>
          </div>
          <div className="flex flex-col relative">
            <label>Password:</label>
            <input
              type={pwdToText}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-blue-500 rounded-lg px-2"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2"
              onClick={togglePwdToText}
            >
              Eye
            </button>
            <p>{passwordError}</p>
          </div>
          <button
            className="border-2 border-blue-500 self-start rounded-lg mt-4 px-4 py-1"
            onClick={onButtonClick}
          >
            Register
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </Layout>
  );
}

export default Register;
