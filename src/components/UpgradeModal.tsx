import React from 'react';
import { X, Check, Sparkles, Zap, Shield, Globe2, BarChart2 } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl w-full max-w-3xl overflow-hidden text-[#181c21]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0049db] to-[#2962ff] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-xs uppercase font-bold tracking-widest text-blue-100">
                MarketPulse Pro Terminal
              </span>
            </div>
            <h2 className="text-2xl font-bold">Institutional-Grade Financial Power</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f7f9ff]">
          {/* Plan Pro */}
          <div className="bg-white border-2 border-[#0049db] rounded-xl p-5 shadow-sm relative flex flex-col justify-between">
            <div className="absolute -top-3 right-4 bg-[#0049db] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#181c21]">MarketPulse Pro</h3>
              <p className="text-xs text-[#5a5e6b] mt-1">For active traders and serious market analysts</p>
              <div className="mt-4 mb-4">
                <span className="text-3xl font-bold font-mono text-[#181c21]">$29</span>
                <span className="text-xs text-[#5a5e6b]"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#181c21]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981]" />
                  <span>Real-time L1 & L2 NYSE/NASDAQ order books</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981]" />
                  <span>100+ technical indicators & custom alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981]" />
                  <span>Unlimited multi-chart layouts & heatmaps</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981]" />
                  <span>Zero latency tick-by-tick websocket feed</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2.5 bg-[#0049db] hover:bg-[#2962ff] text-white font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Plan Institutional */}
          <div className="bg-white border border-[#E0E3EB] rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#181c21]">Institutional API</h3>
              <p className="text-xs text-[#5a5e6b] mt-1">For quant funds, fintechs, and desks</p>
              <div className="mt-4 mb-4">
                <span className="text-3xl font-bold font-mono text-[#181c21]">$149</span>
                <span className="text-xs text-[#5a5e6b]"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#181c21]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981]" />
                  <span>Full Python / REST / FIX protocol API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981]" />
                  <span>Historical tick database (20+ years)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981]" />
                  <span>Dedicated server co-location (Equinix NY4)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981]" />
                  <span>24/7 Priority SLA phone support</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2.5 bg-white border border-[#E0E3EB] hover:bg-[#ebeef5] text-[#181c21] font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Contact Sales
            </button>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-4 border-t border-[#E0E3EB] bg-white flex items-center justify-between text-xs text-[#5a5e6b]">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#089981]" /> 30-day money-back guarantee. Cancel anytime.
          </span>
          <button onClick={onClose} className="hover:underline text-[#0049db]">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};
