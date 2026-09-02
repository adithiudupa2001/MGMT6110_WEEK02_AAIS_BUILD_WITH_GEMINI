import React, { useState } from 'react';
import { Shield, BookOpen, FileText, HelpCircle, Info, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const modalContent: Record<string, { title: string; body: string }> = {
    about: {
      title: 'About MarketPulse',
      body: 'MarketPulse is a modern financial market intelligence platform providing low-latency market data, precision analytics, index benchmarks, sparklines, and market depth indicators across global equities, crypto, forex, and commodities.',
    },
    features: {
      title: 'Platform Features',
      body: '• Real-Time Market Ticker & Live Price Simulation\n• Complete Index Constituents Breakdown (S&P 500, Nasdaq 100, Dow 30)\n• Multi-Timeframe Interactive Area & Candlestick Charts\n• Global Market Heatmaps with Capitalization Weighting\n• Keyboard-Driven Precision Command Palette (Ctrl+K)\n• Custom Local Watchlists with Instant Performance Tracking',
    },
    privacy: {
      title: 'Privacy Policy',
      body: 'MarketPulse respects your privacy. All watchlist preferences, alerts, and settings are stored locally in your browser cache. We do not sell or monetize personal analytical habits.',
    },
    terms: {
      title: 'Terms of Service',
      body: 'Financial data provided on MarketPulse is for informational and educational purposes only and should not be construed as investment, tax, or legal advice. Market data may be delayed according to exchange policies.',
    },
    help: {
      title: 'Help Center & Support',
      body: 'Need assistance navigating MarketPulse?\n\n• Press Ctrl+K or Cmd+K anytime to quickly jump between indices, stocks, and crypto.\n• Click any index card or table row to inspect technical indicators and historical price candles.\n• Toggle "Live Ticker" in the top bar to test continuous stream mode.',
    },
  };

  return (
    <footer className="bg-white text-[#5a5e6b] font-['IBM Plex Sans'] text-xs w-full py-10 border-t border-[#E0E3EB] mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xs font-semibold text-[#5a5e6b]">
          © 2024 MarketPulse Inc. Data provided by major exchanges.
        </div>

        <div className="flex flex-wrap items-center gap-6 justify-center text-xs">
          <button
            onClick={() => setActiveModal('about')}
            className="text-[#6A6D78] hover:text-[#181c21] hover:underline transition-all cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => setActiveModal('features')}
            className="text-[#6A6D78] hover:text-[#181c21] hover:underline transition-all cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => setActiveModal('privacy')}
            className="text-[#6A6D78] hover:text-[#181c21] hover:underline transition-all cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveModal('terms')}
            className="text-[#6A6D78] hover:text-[#181c21] hover:underline transition-all cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveModal('help')}
            className="text-[#6A6D78] hover:text-[#181c21] hover:underline transition-all cursor-pointer"
          >
            Help Center
          </button>
        </div>
      </div>

      {/* Info Dialog Modal */}
      {activeModal && modalContent[activeModal] && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl w-full max-w-lg overflow-hidden text-[#181c21]">
            <div className="p-4 border-b border-[#E0E3EB] flex items-center justify-between bg-[#f7f9ff]">
              <h3 className="text-sm font-bold text-[#181c21]">
                {modalContent[activeModal].title}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-md text-[#5a5e6b] hover:bg-[#ebeef5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 text-xs text-[#5a5e6b] leading-relaxed whitespace-pre-line">
              {modalContent[activeModal].body}
            </div>
            <div className="p-3 border-t border-[#E0E3EB] bg-[#f7f9ff] flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-[#0049db] text-white rounded-lg hover:bg-[#2962ff]"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
