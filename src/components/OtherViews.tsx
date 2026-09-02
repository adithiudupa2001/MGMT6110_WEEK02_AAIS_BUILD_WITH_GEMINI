import React from 'react';
import { Sparkles, Terminal, Activity, Smartphone, FileSpreadsheet, Users, MessageSquare, ThumbsUp, TrendingUp, Newspaper, ExternalLink, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import { MOCK_NEWS, MOCK_EVENTS } from '../data/mockMarketData';

export const ProductsView: React.FC<{ onOpenUpgrade: () => void }> = ({ onOpenUpgrade }) => {
  const products = [
    {
      icon: Terminal,
      title: 'MarketPulse Pro Terminal',
      description: 'Ultra-low latency institutional execution terminal with Level 2 DOM order books and tick analytics.',
      badge: 'Flagship',
    },
    {
      icon: Activity,
      title: 'Global Screener & Scanner',
      description: 'Filter 50,000+ global equities across 120+ technical and fundamental indicators in real-time.',
      badge: 'Popular',
    },
    {
      icon: Zap,
      title: 'Real-Time WebSocket Stream API',
      description: 'Sub-millisecond market data feed via JSON/Protobuf websockets and REST endpoints.',
      badge: 'Developer',
    },
    {
      icon: Smartphone,
      title: 'MarketPulse Mobile (iOS & Android)',
      description: 'Institutional analysis on the go with custom price push notifications and gesture charts.',
      badge: 'Free',
    },
    {
      icon: FileSpreadsheet,
      title: 'Excel & Google Sheets Add-in',
      description: 'Direct formula integrations (=PULSE("AAPL", "PRICE")) directly into your spreadsheets.',
      badge: 'Utility',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto mb-10 pt-4">
        <h2 className="text-3xl font-bold text-[#181c21] mb-2">MarketPulse Product Ecosystem</h2>
        <p className="text-sm text-[#5a5e6b]">
          High-performance tools built for professional traders, quantitative researchers, and individual investors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((prod) => {
          const IconComponent = prod.icon;
          return (
            <div
              key={prod.title}
              className="bg-white border border-[#E0E3EB] hover:border-[#0049db] rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f1f4fb] group-hover:bg-[#0049db] group-hover:text-white text-[#0049db] flex items-center justify-center transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f1f4fb] text-[#5a5e6b]">
                    {prod.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#181c21] mb-1.5">{prod.title}</h3>
                <p className="text-xs text-[#5a5e6b] leading-relaxed">{prod.description}</p>
              </div>

              <button
                onClick={onOpenUpgrade}
                className="mt-5 text-xs font-semibold text-[#0049db] group-hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Learn more & launch</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CommunityView: React.FC = () => {
  const ideas = [
    {
      author: 'AlexV_Quant',
      reputation: '4.8k Rep',
      title: 'S&P 500 Bull Flag Breakout Setup with Volume Confirmation',
      symbol: 'SPX',
      likes: 342,
      comments: 58,
      time: '2h ago',
    },
    {
      author: 'MacroVisionary',
      reputation: '12.1k Rep',
      title: 'US 10-Year Treasury Yield vs Tech Valuation Multiples: What to Expect in Q4',
      symbol: 'US10Y',
      likes: 512,
      comments: 94,
      time: '4h ago',
    },
    {
      author: 'SatoshiPulse',
      reputation: '8.4k Rep',
      title: 'Bitcoin Institutional Inflow Wave: On-Chain Analysis & Support Bands',
      symbol: 'BTC/USD',
      likes: 720,
      comments: 130,
      time: '6h ago',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E0E3EB]">
        <div>
          <h2 className="text-2xl font-bold text-[#181c21]">Community Market Ideas</h2>
          <p className="text-xs text-[#5a5e6b]">Explore trading strategies and analytical write-ups from verified market contributors.</p>
        </div>
        <button className="bg-[#0049db] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#2962ff] shadow-xs cursor-pointer">
          + Publish Trade Idea
        </button>
      </div>

      <div className="space-y-4">
        {ideas.map((idea) => (
          <div
            key={idea.title}
            className="bg-white border border-[#E0E3EB] hover:border-[#0049db] rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs text-[#5a5e6b] mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#181c21]">{idea.author}</span>
                <span className="text-[10px] bg-[#f1f4fb] px-1.5 py-0.5 rounded text-[#0049db] font-semibold">
                  {idea.reputation}
                </span>
                <span>• {idea.time}</span>
              </div>
              <span className="font-mono font-bold text-[#0049db] bg-[#f1f4fb] px-2 py-0.5 rounded">
                {idea.symbol}
              </span>
            </div>

            <h3 className="text-base font-bold text-[#181c21] mb-3 hover:text-[#0049db] transition-colors">
              {idea.title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-[#5a5e6b] pt-3 border-t border-[#E0E3EB]/60">
              <span className="flex items-center gap-1 hover:text-[#0049db]">
                <ThumbsUp className="w-3.5 h-3.5" /> {idea.likes} Agree
              </span>
              <span className="flex items-center gap-1 hover:text-[#0049db]">
                <MessageSquare className="w-3.5 h-3.5" /> {idea.comments} Comments
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NewsView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Breaking News Feed */}
      <div>
        <h2 className="text-2xl font-bold text-[#181c21] mb-4">Latest Financial News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_NEWS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E0E3EB] hover:border-[#0049db] rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between text-xs text-[#5a5e6b] mb-2">
                <span className="font-semibold text-[#0049db]">{item.source}</span>
                <span>{item.timeAgo}</span>
              </div>
              <h3 className="text-sm font-bold text-[#181c21] mb-3 leading-snug">{item.title}</h3>
              <div className="flex items-center gap-2">
                {item.relatedTickers?.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono font-semibold bg-[#f1f4fb] text-[#181c21] px-2 py-0.5 rounded border border-[#E0E3EB]"
                  >
                    ${t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Economic Calendar */}
      <div>
        <h3 className="text-xl font-bold text-[#181c21] mb-3">Today's Economic Calendar</h3>
        <div className="bg-white border border-[#E0E3EB] rounded-2xl overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1f4fb] font-semibold text-[#5a5e6b] uppercase border-b border-[#E0E3EB]">
              <tr>
                <th className="p-3">Time</th>
                <th className="p-3">Cur</th>
                <th className="p-3">Event</th>
                <th className="p-3 text-right">Actual</th>
                <th className="p-3 text-right">Forecast</th>
                <th className="p-3 text-right">Previous</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]/70 font-mono">
              {MOCK_EVENTS.map((ev) => (
                <tr key={ev.id} className="hover:bg-[#f7f9ff]">
                  <td className="p-3 text-[#5a5e6b]">{ev.time}</td>
                  <td className="p-3 font-bold text-[#0049db]">{ev.currency}</td>
                  <td className="p-3 font-medium font-sans text-[#181c21]">{ev.event}</td>
                  <td className="p-3 text-right font-bold text-[#089981]">{ev.actual}</td>
                  <td className="p-3 text-right text-[#5a5e6b]">{ev.forecast}</td>
                  <td className="p-3 text-right text-[#5a5e6b]">{ev.previous}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const BrokersView: React.FC = () => {
  const brokers = [
    { name: 'Interactive Brokers', latency: '4ms', status: 'Connected', rating: '4.9/5' },
    { name: 'Charles Schwab / thinkorswim', latency: '12ms', status: 'Verified API', rating: '4.8/5' },
    { name: 'Robinhood Markets', latency: '8ms', status: 'Zero Commission', rating: '4.7/5' },
    { name: 'Fidelity Investments', latency: '15ms', status: 'Direct Routing', rating: '4.8/5' },
    { name: 'Alpaca Trading API', latency: '3ms', status: 'Algo Ready', rating: '4.9/5' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-[#181c21] mb-2">Direct Broker Integrations</h2>
        <p className="text-sm text-[#5a5e6b]">
          Connect your existing brokerage accounts to trade directly from MarketPulse charts with bank-grade encryption.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brokers.map((b) => (
          <div
            key={b.name}
            className="bg-white border border-[#E0E3EB] rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#089981] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {b.status}
                </span>
                <span className="text-xs font-mono text-[#5a5e6b]">Ping: {b.latency}</span>
              </div>
              <h3 className="text-base font-bold text-[#181c21]">{b.name}</h3>
              <p className="text-xs text-[#5a5e6b] mt-1">Institutional rating: {b.rating}</p>
            </div>

            <button className="mt-5 w-full py-2 bg-[#f1f4fb] hover:bg-[#0049db] hover:text-white text-[#0049db] text-xs font-semibold rounded-lg transition-colors cursor-pointer">
              Connect Account
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
