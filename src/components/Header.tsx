import React from 'react';
import { Search, Bell, User, Sparkles, TrendingUp, Menu, X, Globe, DollarSign } from 'lucide-react';
import { MarketCategory } from '../types';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  onOpenAuth: () => void;
  onOpenUpgrade: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  isLiveStream: boolean;
  onToggleLiveStream: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenNotifications,
  unreadCount,
  onOpenAuth,
  onOpenUpgrade,
  onOpenWatchlist,
  watchlistCount,
  isLiveStream,
  onToggleLiveStream,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'products', label: 'Products' },
    { id: 'community', label: 'Community' },
    { id: 'markets', label: 'Markets' },
    { id: 'news', label: 'News' },
    { id: 'brokers', label: 'Brokers' },
  ];

  return (
    <header className="bg-white text-[#0049db] font-['IBM Plex Sans'] w-full h-[60px] border-b border-[#E0E3EB] sticky top-0 z-40 px-6 mx-auto flex justify-between items-center transition-colors">
      <div className="flex items-center gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => onSelectTab('markets')}
          className="text-2xl font-bold text-[#0049db] tracking-tight flex items-center gap-1.5 focus:outline-none"
        >
          <span>MarketPulse</span>
        </button>

        {/* Search Bar - triggers Ctrl+K */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center bg-[#f1f4fb] hover:bg-[#ebeef5] rounded-lg px-3 py-1.5 border border-[#E0E3EB] hover:border-[#0049db] transition-all text-left text-sm text-[#5a5e6b] w-52 group cursor-pointer shadow-xs"
        >
          <Search className="w-4 h-4 text-[#5a5e6b] mr-2 group-hover:text-[#0049db] transition-colors" />
          <span className="flex-1 text-[#5a5e6b] font-normal">Search</span>
          <kbd className="hidden sm:inline-block text-[11px] font-mono text-[#737687] bg-white border border-[#E0E3EB] px-1.5 py-0.5 rounded shadow-2xs">
            Ctrl+K
          </kbd>
        </button>

        {/* Main Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 ml-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`py-1 text-sm font-medium transition-colors cursor-pointer relative ${
                  isActive
                    ? 'text-[#0049db] border-b-2 border-[#0049db] font-semibold'
                    : 'text-[#5a5e6b] hover:text-[#181c21]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Live Simulator Ticker Indicator */}
        <button
          onClick={onToggleLiveStream}
          title={isLiveStream ? 'Live Market Feed Active (Click to pause)' : 'Market Feed Paused (Click to resume)'}
          className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
            isLiveStream
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-zinc-100 border-zinc-200 text-zinc-600'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isLiveStream ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'
            }`}
          />
          <span>{isLiveStream ? 'Live Ticker' : 'Paused'}</span>
        </button>

        {/* Watchlist Quick Button */}
        <button
          onClick={onOpenWatchlist}
          className="relative text-[#5a5e6b] hover:text-[#0049db] transition-colors p-2 rounded-lg hover:bg-[#f1f4fb] flex items-center justify-center cursor-pointer"
          title="Open Watchlist"
        >
          <TrendingUp className="w-5 h-5" />
          {watchlistCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#0049db] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {watchlistCount}
            </span>
          )}
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative text-[#5a5e6b] hover:text-[#0049db] transition-colors p-2 rounded-lg hover:bg-[#f1f4fb] flex items-center justify-center cursor-pointer"
          title="Notifications & Alerts"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#f23645] rounded-full ring-2 ring-white" />
          )}
        </button>

        {/* Profile / Account */}
        <button
          onClick={onOpenAuth}
          className="text-[#5a5e6b] hover:text-[#0049db] transition-colors p-2 rounded-lg hover:bg-[#f1f4fb] flex items-center justify-center cursor-pointer"
          title="User Account"
        >
          <User className="w-5 h-5" />
        </button>

        {/* Action Buttons */}
        <button
          onClick={onOpenAuth}
          className="hidden md:block bg-transparent text-[#0049db] border border-[#E0E3EB] hover:bg-[#f1f4fb] px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer"
        >
          Get Started
        </button>

        <button
          onClick={onOpenUpgrade}
          className="bg-[#2962ff] text-white hover:bg-[#0049db] px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Upgrade</span>
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#5a5e6b] hover:text-[#181c21] rounded-lg hover:bg-[#f1f4fb]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 w-full bg-white border-b border-[#E0E3EB] shadow-lg p-4 flex flex-col gap-3 z-50">
          <button
            onClick={() => {
              onOpenSearch();
              setMobileMenuOpen(false);
            }}
            className="flex items-center w-full bg-[#f1f4fb] rounded-lg px-3 py-2 text-sm text-[#5a5e6b] border border-[#E0E3EB]"
          >
            <Search className="w-4 h-4 mr-2" />
            <span>Search markets, tickers...</span>
          </button>
          <div className="flex flex-col gap-1 border-t border-[#E0E3EB] pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeTab === item.id ? 'bg-[#f1f4fb] text-[#0049db] font-semibold' : 'text-[#5a5e6b]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 pt-2 border-t border-[#E0E3EB]">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-semibold text-[#0049db] border border-[#E0E3EB] rounded-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => {
                onOpenUpgrade();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-semibold bg-[#2962ff] text-white rounded-lg shadow-xs"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
