import React from 'react';
import { X, Trash2, ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, ExternalLink } from 'lucide-react';
import { MarketItem } from '../types';
import { Sparkline } from './Sparkline';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistItems: MarketItem[];
  onRemoveItem: (item: MarketItem) => void;
  onSelectItem: (item: MarketItem) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistItems,
  onRemoveItem,
  onSelectItem,
}) => {
  if (!isOpen) return null;

  // Calculate synthetic aggregate performance
  const totalChangePercent = watchlistItems.length > 0
    ? watchlistItems.reduce((acc, curr) => acc + curr.changePercent, 0) / watchlistItems.length
    : 0;

  const isPos = totalChangePercent >= 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-[#E0E3EB] flex flex-col overflow-hidden text-[#181c21]">
        {/* Header */}
        <div className="p-5 border-b border-[#E0E3EB] flex items-center justify-between bg-[#f7f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0049db] text-white flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#181c21]">My Watchlist</h2>
              <span className="text-xs text-[#5a5e6b]">
                {watchlistItems.length} instrument{watchlistItems.length === 1 ? '' : 's'} tracked
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#ebeef5] text-[#5a5e6b] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Watchlist Overview Banner */}
        {watchlistItems.length > 0 && (
          <div className="p-4 bg-[#f1f4fb] border-b border-[#E0E3EB] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#5a5e6b] block">Average 24h Performance</span>
              <span
                className={`text-base font-bold font-mono tabular-nums ${
                  isPos ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {isPos ? '+' : ''}
                {totalChangePercent.toFixed(2)}%
              </span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-white border border-[#E0E3EB] rounded text-[#5a5e6b]">
              Live Tracked
            </span>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {watchlistItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-full bg-[#f1f4fb] flex items-center justify-center mx-auto mb-3 text-[#737687]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#181c21]">Your watchlist is empty</h3>
              <p className="text-xs text-[#5a5e6b] mt-1 max-w-xs mx-auto">
                Click the star icon next to any index or stock to monitor price changes and receive instant market alerts.
              </p>
            </div>
          ) : (
            watchlistItems.map((item) => {
              const itemPos = item.change >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="bg-white border border-[#E0E3EB] hover:border-[#0049db] rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all hover:shadow-xs group"
                >
                  <div className="flex items-center gap-3">
                    {item.badgeNumber ? (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{ backgroundColor: item.badgeColor || '#0088cc' }}
                      >
                        {item.badgeNumber}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-[#f1f4fb] border border-[#E0E3EB] flex items-center justify-center font-bold text-xs text-[#0049db]">
                        {item.symbol.slice(0, 2)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-sm font-mono text-[#181c21] group-hover:text-[#0049db] transition-colors">
                        {item.symbol}
                      </div>
                      <div className="text-xs text-[#5a5e6b] truncate max-w-[130px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right font-mono">
                      <div className="text-sm font-bold tabular-nums">
                        ${item.price.toLocaleString('en-US', {
                          minimumFractionDigits: item.price < 2 ? 4 : 2,
                        })}
                      </div>
                      <div
                        className={`text-xs font-semibold tabular-nums ${
                          itemPos ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {itemPos ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(item);
                      }}
                      className="text-[#c3c5d8] hover:text-[#f23645] p-1.5 rounded-md hover:bg-red-50 transition-colors"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E0E3EB] bg-[#f7f9ff] flex items-center justify-between">
          <span className="text-xs text-[#5a5e6b]">Updated continuously</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-white border border-[#E0E3EB] hover:bg-[#ebeef5] rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
