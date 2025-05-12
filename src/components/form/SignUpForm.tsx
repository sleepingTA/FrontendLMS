import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, googleProvider, signInWithPopup } from '../../config/firebase';
import AuthService from '../../services/AuthService';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { FcGoogle } from 'react-icons/fc';
import { AuthResponse } from '../../types/auth';

interface SignUpFormProps {
  onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginStart());

    try {
      await AuthService.register(email, password, fullName);
      alert('Registration successful! Please check your email to verify.');
      navigate('/login');
      onClose();
    } catch (error: any) {
      dispatch(loginFailure(error));
      alert(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    dispatch(loginStart());

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response: AuthResponse = await AuthService.googleLogin(idToken);
      if (!response.user || !response.accessToken || !response.refreshToken) {
        throw new Error('Invalid Google login response: Missing user or tokens');
      }
      dispatch(
        loginSuccess({
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );
      navigate('/home');
      onClose();
    } catch (error: any) {
      dispatch(loginFailure(error));
      alert(`Google sign-up failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] h-[500px] relative flex flex-col">
      <span className="flex items-center font-extrabold text-3xl px-[120px] py-[20px]">Sign Up</span>
      <form onSubmit={handleSubmit} className="py-[30px] flex flex-col gap-[30px]">
        <input
          type="text"
          placeholder="Full Name"
          className="w-[350px] h-[40px] rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 py-[20px]"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-[350px] h-[40px] rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 py-[20px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-[350px] h-[40px] rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 py-[20px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="button-primary flex items-center justify-center w-[350px] h-[40px] rounded-md bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className="flex flex-col gap-[30px]">
        <button
          className="google-btn flex items-center justify-center w-[350px] h-[40px] rounded-md border border-gray-300 hover:bg-gray-100 transition duration-200"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle />
          <span>Continue with Google</span>
        </button>
        <span className="flex items-center px-[40px] opacity-40 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-500 font-bold px-[5px]">
            Log in here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;