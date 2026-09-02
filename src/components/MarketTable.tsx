import React, { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Star, Search, ArrowUpDown, ChevronDown, Filter } from 'lucide-react';
import { MarketItem, MarketCategory } from '../types';
import { Sparkline } from './Sparkline';

interface MarketTableProps {
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  watchlist: string[];
  onToggleWatchlist: (item: MarketItem) => void;
  activeCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
}

type FilterType = 'all' | 'gainers' | 'losers' | 'active';
type SortField = 'symbol' | 'price' | 'changePercent' | 'volume';

export const MarketTable: React.FC<MarketTableProps> = ({
  items,
  onSelectItem,
  watchlist,
  onToggleWatchlist,
  activeCategory,
  onSelectCategory,
}) => {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('volume');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let list = items.filter((item) => {
      // Category match
      if (activeCategory !== 'indices' && activeCategory !== 'heatmap') {
        if (item.category !== activeCategory) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSymbol = item.symbol.toLowerCase().includes(q);
        const matchesName = item.name.toLowerCase().includes(q);
        if (!matchesSymbol && !matchesName) return false;
      }

      // Filter sub-type
      if (filterType === 'gainers') return item.changePercent > 0;
      if (filterType === 'losers') return item.changePercent < 0;
      return true;
    });

    // Sorting
    list.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'volume') {
        // approximate parse for sorting
        valA = parseFloat(a.volume.replace(/[^0-9.]/g, '')) * (a.volume.includes('B') ? 1e9 : a.volume.includes('M') ? 1e6 : 1);
        valB = parseFloat(b.volume.replace(/[^0-9.]/g, '')) * (b.volume.includes('B') ? 1e9 : b.volume.includes('M') ? 1e6 : 1);
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [items, activeCategory, filterType, searchQuery, sortField, sortDirection]);

  const categories: { id: MarketCategory; label: string }[] = [
    { id: 'stocks', label: 'Stocks' },
    { id: 'indices', label: 'All Indices' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'futures', label: 'Futures & Commodities' },
    { id: 'bonds', label: 'Bonds' },
  ];

  return (
    <section className="bg-white border border-[#E0E3EB] rounded-2xl p-5 shadow-2xs mb-14">
      {/* Category Pills & Subfilter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E0E3EB]">
        {/* Category switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0049db] text-white shadow-xs'
                    : 'bg-[#f1f4fb] hover:bg-[#ebeef5] text-[#5a5e6b]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Gainers/Losers Tab */}
        <div className="flex items-center gap-2.5">
          <div className="flex bg-[#f1f4fb] p-0.5 rounded-lg border border-[#E0E3EB]">
            {(['all', 'gainers', 'losers'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-2.5 py-1 text-xs font-semibold capitalize rounded-md transition-all cursor-pointer ${
                  filterType === f
                    ? 'bg-white text-[#0049db] shadow-2xs'
                    : 'text-[#5a5e6b] hover:text-[#181c21]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#5a5e6b] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter table..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#f1f4fb] focus:bg-white text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#E0E3EB] focus:border-[#0049db] focus:outline-none w-36 sm:w-44 transition-all placeholder-[#5a5e6b]"
            />
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E0E3EB] text-[11px] font-bold text-[#5a5e6b] uppercase tracking-wider bg-[#f7f9ff]">
              <th className="py-3 px-3 w-8"></th>
              <th
                onClick={() => handleSort('symbol')}
                className="py-3 px-3 cursor-pointer hover:text-[#0049db]"
              >
                <div className="flex items-center gap-1">
                  <span>Symbol & Name</span>
                  <ArrowUpDown className="w-3 h-3 text-[#737687]" />
                </div>
              </th>
              <th
                onClick={() => handleSort('price')}
                className="py-3 px-3 text-right cursor-pointer hover:text-[#0049db]"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Last Price</span>
                  <ArrowUpDown className="w-3 h-3 text-[#737687]" />
                </div>
              </th>
              <th
                onClick={() => handleSort('changePercent')}
                className="py-3 px-3 text-right cursor-pointer hover:text-[#0049db]"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>24h Change</span>
                  <ArrowUpDown className="w-3 h-3 text-[#737687]" />
                </div>
              </th>
              <th className="py-3 px-3 text-right hidden sm:table-cell">Day High / Low</th>
              <th
                onClick={() => handleSort('volume')}
                className="py-3 px-3 text-right hidden md:table-cell cursor-pointer hover:text-[#0049db]"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Volume</span>
                  <ArrowUpDown className="w-3 h-3 text-[#737687]" />
                </div>
              </th>
              <th className="py-3 px-4 text-right hidden lg:table-cell">Trend (7D)</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E0E3EB]/70 text-sm font-['IBM Plex Sans']">
            {filteredAndSortedItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-sm text-[#5a5e6b]">
                  No instruments match your criteria.
                </td>
              </tr>
            ) : (
              filteredAndSortedItems.map((item) => {
                const isPositive = item.change >= 0;
                const isWatched = watchlist.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className="hover:bg-[#f7f9ff] cursor-pointer transition-colors group"
                  >
                    {/* Watchlist star */}
                    <td
                      className="py-3 px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(item);
                      }}
                    >
                      <button
                        className="text-[#c3c5d8] hover:text-amber-500 transition-colors p-1"
                        title={isWatched ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            isWatched ? 'fill-amber-500 text-amber-500' : ''
                          }`}
                        />
                      </button>
                    </td>

                    {/* Symbol & Name */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        {item.badgeNumber && (
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px]"
                            style={{ backgroundColor: item.badgeColor || '#0088cc' }}
                          >
                            {item.badgeNumber}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-[#181c21] group-hover:text-[#0049db] font-mono transition-colors">
                            {item.symbol}
                          </div>
                          <div className="text-xs text-[#5a5e6b] line-clamp-1">{item.name}</div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#181c21] tabular-nums">
                      {item.price.toLocaleString('en-US', {
                        minimumFractionDigits: item.price < 2 ? 4 : 2,
                        maximumFractionDigits: item.price < 2 ? 4 : 2,
                      })}
                    </td>

                    {/* Change % */}
                    <td className="py-3 px-3 text-right font-mono tabular-nums">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-semibold ${
                          isPositive
                            ? 'bg-[#089981]/10 text-[#089981]'
                            : 'bg-[#f23645]/10 text-[#f23645]'
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {isPositive ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </span>
                    </td>

                    {/* Day Range */}
                    <td className="py-3 px-3 text-right text-xs font-mono tabular-nums text-[#5a5e6b] hidden sm:table-cell">
                      <span>{item.high.toLocaleString()}</span>
                      <span className="text-[#c3c5d8] mx-1">/</span>
                      <span>{item.low.toLocaleString()}</span>
                    </td>

                    {/* Volume */}
                    <td className="py-3 px-3 text-right text-xs font-mono tabular-nums text-[#5a5e6b] hidden md:table-cell">
                      {item.volume}
                    </td>

                    {/* Sparkline Trend */}
                    <td className="py-3 px-4 text-right hidden lg:table-cell">
                      <div className="inline-block">
                        <Sparkline
                          data={item.sparkline}
                          width={90}
                          height={24}
                          isPositive={isPositive}
                          strokeWidth={1.5}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
