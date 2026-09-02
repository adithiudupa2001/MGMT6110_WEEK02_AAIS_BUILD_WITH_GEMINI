/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Globe, Check, SlidersHorizontal } from 'lucide-react';
import { Header } from './components/Header';
import { IndicesSection } from './components/IndicesSection';
import { MarketTable } from './components/MarketTable';
import { MarketHeatmap } from './components/MarketHeatmap';
import { MarketDetailModal } from './components/MarketDetailModal';
import { CommandPalette } from './components/CommandPalette';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { UpgradeModal } from './components/UpgradeModal';
import { NotificationsPopover } from './components/NotificationsPopover';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { ProductsView, CommunityView, NewsView, BrokersView } from './components/OtherViews';
import {
  INITIAL_INDICES,
  MOCK_STOCKS,
  MOCK_CRYPTO,
  MOCK_FOREX,
  MOCK_FUTURES,
  MOCK_BONDS,
  MOCK_NOTIFICATIONS,
} from './data/mockMarketData';
import { MarketItem, MarketCategory } from './types';

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<string>('markets');
  const [activeMarketCategory, setActiveMarketCategory] = useState<MarketCategory>('stocks');
  const [selectedRegion, setSelectedRegion] = useState<string>('United States');
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState<boolean>(false);

  // Modals & Panels
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Watchlist stored in state
  const [watchlistIds, setWatchlistIds] = useState<string[]>(['sp500', 'nvda', 'btc']);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // Live Market Stream Simulation
  const [isLiveStream, setIsLiveStream] = useState<boolean>(true);
  const [indices, setIndices] = useState<MarketItem[]>(INITIAL_INDICES);
  const [stocks, setStocks] = useState<MarketItem[]>(MOCK_STOCKS);
  const [crypto, setCrypto] = useState<MarketItem[]>(MOCK_CRYPTO);
  const [forex, setForex] = useState<MarketItem[]>(MOCK_FOREX);
  const [futures, setFutures] = useState<MarketItem[]>(MOCK_FUTURES);
  const [bonds, setBonds] = useState<MarketItem[]>(MOCK_BONDS);

  // Combine all items for universal search & indexing
  const allMarketItems = useMemo(() => {
    return [...indices, ...stocks, ...crypto, ...forex, ...futures, ...bonds];
  }, [indices, stocks, crypto, forex, futures, bonds]);

  // Watchlist full objects
  const watchlistItems = useMemo(() => {
    return allMarketItems.filter((item) => watchlistIds.includes(item.id));
  }, [allMarketItems, watchlistIds]);

  // Watchlist toggle handler
  const handleToggleWatchlist = (item: MarketItem) => {
    setWatchlistIds((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };

  // Live data simulation tick
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      // Pick random items to micro-adjust
      const updateList = (list: MarketItem[]) => {
        return list.map((item) => {
          if (Math.random() > 0.4) return item; // 60% chance to hold

          const deltaPercent = (Math.random() - 0.49) * 0.08;
          const deltaPrice = item.price * (deltaPercent / 100);
          const newPrice = Math.max(item.price + deltaPrice, 0.0001);
          const newChange = item.change + deltaPrice;
          const newChangePercent = item.changePercent + deltaPercent;

          const newSparkline = [...item.sparkline.slice(1), newPrice];

          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            sparkline: newSparkline,
            high: Math.max(item.high, newPrice),
            low: Math.min(item.low, newPrice),
          };
        });
      };

      setIndices((prev) => updateList(prev));
      setStocks((prev) => updateList(prev));
      setCrypto((prev) => updateList(prev));
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveStream]);

  // Handle constituent select from modal
  const handleSelectConstituent = (symbol: string) => {
    const found = allMarketItems.find((item) => item.symbol === symbol);
    if (found) {
      setSelectedItem(found);
    }
  };

  const regions = [
    { id: 'United States', label: 'United States (NYSE / NASDAQ)', flag: '🇺🇸' },
    { id: 'Europe', label: 'Europe (LSE, Euronext, DAX)', flag: '🇪🇺' },
    { id: 'Asia-Pacific', label: 'Asia-Pacific (TSE, HKEX, SSE)', flag: '🌏' },
    { id: 'Americas', label: 'Americas (TSX, BM&F Bovespa)', flag: '🌎' },
    { id: 'Crypto', label: 'Digital Assets & Cryptocurrencies', flag: '⚡' },
    { id: 'Currencies', label: 'Global Foreign Exchange (Forex)', flag: '💱' },
    { id: 'Commodities', label: 'Futures, Metals & Energy', flag: '🛢️' },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9ff] text-[#181c21] font-['IBM Plex Sans'] antialiased">
      {/* Universal Header matching design */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={unreadCount}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlistIds.length}
        isLiveStream={isLiveStream}
        onToggleLiveStream={() => setIsLiveStream(!isLiveStream)}
      />

      {/* Main Body Container */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 py-8">
        {activeTab === 'markets' ? (
          <>
            {/* Hero Heading: "Markets, everywhere" matching screenshot */}
            <section className="mb-12 text-center pt-8 relative">
              <div className="inline-block relative">
                <h1
                  onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                  className="font-['IBM Plex Sans'] text-[40px] md:text-[48px] leading-[48px] md:leading-[56px] font-bold text-[#181c21] mb-2 flex items-center justify-center gap-2 cursor-pointer group select-none hover:text-[#0049db] transition-colors"
                >
                  <span>Markets, everywhere</span>
                  <ChevronDown
                    className={`w-10 h-10 text-[#181c21] group-hover:text-[#0049db] transition-transform duration-200 ${
                      isRegionDropdownOpen ? 'rotate-180' : 'group-hover:translate-y-1'
                    }`}
                  />
                </h1>

                {/* Region / Category Dropdown Menu */}
                {isRegionDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsRegionDropdownOpen(false)}
                    />
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl p-2 z-40 text-left animate-fadeIn">
                      <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#5a5e6b] border-b border-[#E0E3EB]">
                        Select Market Scope
                      </div>
                      <div className="py-1 space-y-0.5">
                        {regions.map((reg) => (
                          <button
                            key={reg.id}
                            onClick={() => {
                              setSelectedRegion(reg.id);
                              setIsRegionDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                              selectedRegion === reg.id
                                ? 'bg-[#f1f4fb] text-[#0049db]'
                                : 'text-[#181c21] hover:bg-[#f7f9ff]'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{reg.flag}</span>
                              <span>{reg.label}</span>
                            </span>
                            {selectedRegion === reg.id && (
                              <Check className="w-4 h-4 text-[#0049db]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Indices Section: Exact replica of the screenshot cards with interactive depth */}
            <IndicesSection
              indices={indices}
              onSelectIndex={(indexItem) => setSelectedItem(indexItem)}
              selectedRegion={selectedRegion}
            />

            {/* High-density Market Data Table */}
            <MarketTable
              items={allMarketItems}
              onSelectItem={(item) => setSelectedItem(item)}
              watchlist={watchlistIds}
              onToggleWatchlist={handleToggleWatchlist}
              activeCategory={activeMarketCategory}
              onSelectCategory={setActiveMarketCategory}
            />

            {/* S&P 500 Market Heatmap Section */}
            <MarketHeatmap
              onSelectSymbol={(sym) => {
                const found = allMarketItems.find((i) => i.symbol === sym);
                if (found) setSelectedItem(found);
                else handleSelectConstituent(sym);
              }}
            />
          </>
        ) : activeTab === 'products' ? (
          <ProductsView onOpenUpgrade={() => setIsUpgradeOpen(true)} />
        ) : activeTab === 'community' ? (
          <CommunityView />
        ) : activeTab === 'news' ? (
          <NewsView />
        ) : activeTab === 'brokers' ? (
          <BrokersView />
        ) : null}
      </main>

      {/* Modals and Drawers */}
      <MarketDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isWatchlisted={selectedItem ? watchlistIds.includes(selectedItem.id) : false}
        onToggleWatchlist={handleToggleWatchlist}
        onSelectConstituent={handleSelectConstituent}
      />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={allMarketItems}
        onSelectItem={(item) => setSelectedItem(item)}
      />

      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistItems={watchlistItems}
        onRemoveItem={handleToggleWatchlist}
        onSelectItem={(item) => setSelectedItem(item)}
      />

      <NotificationsPopover
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
        }
      />

      <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
