import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, googleProvider, signInWithPopup } from '../../config/firebase';
import AuthService from '../../services/AuthService';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { FcGoogle } from 'react-icons/fc';
import { AuthResponse } from '../../types/auth';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
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
      const response: AuthResponse = await AuthService.login(email, password);
      if (!response.user || !response.accessToken || !response.refreshToken) {
        throw new Error('Invalid login response: Missing user or tokens');
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
      alert(`Đăng nhập thất bại: ${error.message}`);
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
      alert(`Đăng nhập bằng Google thất bại: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] h-[450px] relative flex flex-col">
      <span className="flex items-center font-extrabold text-3xl px-[120px] py-[20px]">Login</span>
      <form onSubmit={handleSubmit} className="py-[30px] flex flex-col gap-[30px]">
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
          {loading ? 'Loading...' : 'Login'}
        </button>

        
      </form>
      <div className="flex flex-col gap-[30px]">
        <button
          className="google-btn flex items-center justify-center w-[350px] h-[40px] rounded-md border border-gray-300 hover:bg-gray-100 transition duration-200"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle  />
          <span>Continue with Google</span>
        </button>
        <span className="flex items-center px-[40px] opacity-40 text-sm">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-emerald-500 font-bold px-[5px]">
            Sign up here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;