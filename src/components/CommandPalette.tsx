import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { MarketItem } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = items.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.symbol.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        onSelectItem(filteredItems[selectedIndex]);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden text-[#181c21]">
        {/* Search Header */}
        <div className="p-4 border-b border-[#E0E3EB] flex items-center gap-3 bg-[#f7f9ff]">
          <Search className="w-5 h-5 text-[#0049db]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all markets, indices, stocks, crypto (e.g. S&P 500, NVDA, BTC)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-base border-none outline-none placeholder-[#737687] text-[#181c21]"
          />
          <kbd className="hidden sm:inline-block text-xs font-mono text-[#737687] bg-white border border-[#E0E3EB] px-2 py-0.5 rounded shadow-2xs">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#5a5e6b] hover:bg-[#ebeef5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[#E0E3EB]/50">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#5a5e6b]">
              No instruments found for "{query}". Try searching "Nasdaq", "Apple", or "Bitcoin".
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isPos = item.change >= 0;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#f1f4fb] border-l-4 border-[#0049db]' : 'hover:bg-[#f7f9ff]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.badgeNumber ? (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{ backgroundColor: item.badgeColor || '#0088cc' }}
                      >
                        {item.badgeNumber}
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-[#e0e3eb] flex items-center justify-center text-[#5a5e6b] font-bold text-xs">
                        {item.symbol.slice(0, 2)}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-sm">{item.symbol}</span>
                        <span className="text-[11px] uppercase tracking-wide px-1.5 py-0.2 bg-white border border-[#E0E3EB] rounded text-[#737687]">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-[#5a5e6b]">{item.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <div className="text-right">
                      <div className="text-sm font-bold tabular-nums">
                        ${item.price.toLocaleString('en-US', {
                          minimumFractionDigits: item.price < 2 ? 4 : 2,
                        })}
                      </div>
                      <div
                        className={`text-xs font-semibold tabular-nums ${
                          isPos ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPos ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    {isSelected && <CornerDownLeft className="w-4 h-4 text-[#0049db]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-[#E0E3EB] bg-[#f7f9ff] flex items-center justify-between text-xs text-[#737687]">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="flex items-center gap-1 text-[#0049db] font-medium">
            <Sparkles className="w-3.5 h-3.5" /> MarketPulse Precision Search
          </span>
        </div>
      </div>
    </div>
  );
};
