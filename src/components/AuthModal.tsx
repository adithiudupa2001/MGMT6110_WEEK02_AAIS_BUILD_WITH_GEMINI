import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl w-full max-w-md overflow-hidden text-[#181c21]">
        {/* Header */}
        <div className="p-5 border-b border-[#E0E3EB] flex items-center justify-between bg-[#f7f9ff]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#0049db]">MarketPulse</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5a5e6b] hover:bg-[#ebeef5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#089981] mx-auto animate-bounce" />
              <h3 className="text-lg font-bold">Welcome to MarketPulse!</h3>
              <p className="text-xs text-[#5a5e6b]">Your session has been initialized.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold">
                  {isSignUp ? 'Create your free account' : 'Sign in to MarketPulse'}
                </h2>
                <p className="text-xs text-[#5a5e6b] mt-1">
                  Access real-time stream data, personalized watchlists, and market alerts.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-xs font-semibold text-[#181c21] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#737687] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-[#f1f4fb] focus:bg-white text-sm pl-9 pr-3 py-2 rounded-lg border border-[#E0E3EB] focus:border-[#0049db] outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#181c21] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#737687] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="trader@marketpulse.com"
                      className="w-full bg-[#f1f4fb] focus:bg-white text-sm pl-9 pr-3 py-2 rounded-lg border border-[#E0E3EB] focus:border-[#0049db] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181c21] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#737687] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#f1f4fb] focus:bg-white text-sm pl-9 pr-3 py-2 rounded-lg border border-[#E0E3EB] focus:border-[#0049db] outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0049db] hover:bg-[#2962ff] text-white font-semibold text-sm rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <span>{isSignUp ? 'Get Started Free' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-5 text-center text-xs text-[#5a5e6b]">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#0049db] font-semibold hover:underline cursor-pointer"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up Free'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
