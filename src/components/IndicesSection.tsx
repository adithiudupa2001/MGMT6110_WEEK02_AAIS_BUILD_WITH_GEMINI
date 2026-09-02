import React from 'react';
import { ChevronRight, ArrowUpRight, ArrowDownRight, SlidersHorizontal, BarChart3 } from 'lucide-react';
import { MarketItem } from '../types';
import { Sparkline } from './Sparkline';

interface IndicesSectionProps {
  indices: MarketItem[];
  onSelectIndex: (index: MarketItem) => void;
  selectedRegion?: string;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  onSelectIndex,
  selectedRegion = 'United States',
}) => {
  const [showAllIndices, setShowAllIndices] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'rich' | 'minimal'>('rich');

  // Filter indices based on region or default top 3 (S&P 500, Nasdaq 100, Dow 30)
  const displayIndices = showAllIndices ? indices : indices.slice(0, 3);

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <button
          onClick={() => setShowAllIndices(!showAllIndices)}
          className="text-left font-['IBM Plex Sans'] text-2xl md:text-3xl font-bold text-[#181c21] hover:text-[#0049db] flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <span>Indices</span>
          <ChevronRight
            className={`w-7 h-7 text-[#5a5e6b] group-hover:text-[#0049db] transition-transform duration-200 ${
              showAllIndices ? 'rotate-90' : 'group-hover:translate-x-1'
            }`}
          />
        </button>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'rich' ? 'minimal' : 'rich')}
            className="flex items-center gap-1.5 text-xs font-medium text-[#5a5e6b] bg-white border border-[#E0E3EB] hover:border-[#0049db] px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Toggle card detail level"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#5a5e6b]" />
            <span>{viewMode === 'rich' ? 'Detailed View' : 'Minimal View'}</span>
          </button>

          {/* Toggle show all */}
          <button
            onClick={() => setShowAllIndices(!showAllIndices)}
            className="text-xs font-semibold text-[#0049db] hover:underline px-2 py-1 cursor-pointer"
          >
            {showAllIndices ? 'Show Top 3' : `View All (${indices.length})`}
          </button>
        </div>
      </div>

      {/* Primary Indices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayIndices.map((item, index) => {
          const isFirstCard = index === 0;
          const isPositive = item.change >= 0;

          return (
            <div
              key={item.id}
              onClick={() => onSelectIndex(item)}
              className={`rounded-xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer group relative overflow-hidden ${
                isFirstCard
                  ? 'bg-[#f1f4fb] border border-transparent hover:border-[#E0E3EB] shadow-2xs hover:shadow-xs'
                  : 'bg-white border border-[#E0E3EB] hover:border-[#0049db] shadow-2xs hover:shadow-md'
              }`}
            >
              {/* Top Row: Badge + Name */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-2xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: item.badgeColor || '#0088cc' }}
                  >
                    {item.badgeNumber || item.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#181c21] group-hover:text-[#0049db] transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-xs font-mono text-[#5a5e6b]">
                      {item.symbol} • {item.country || 'Global'}
                    </span>
                  </div>
                </div>

                {viewMode === 'rich' && (
                  <span
                    className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-semibold tabular-nums ${
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
                )}
              </div>

              {/* Detailed metrics when in rich view */}
              {viewMode === 'rich' ? (
                <div className="mt-2 pt-3 border-t border-[#E0E3EB]/60 flex items-end justify-between">
                  <div>
                    <div className="text-xl font-bold font-mono text-[#181c21] tabular-nums">
                      {item.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-xs text-[#5a5e6b] tabular-nums flex items-center gap-1.5 mt-0.5">
                      <span className={isPositive ? 'text-[#089981]' : 'text-[#f23645]'}>
                        {isPositive ? '+' : ''}
                        {item.change.toFixed(2)}
                      </span>
                      <span>• Vol {item.volume}</span>
                    </div>
                  </div>

                  {/* Sparkline mini-graph */}
                  <div className="w-[100px] h-[32px] flex items-center justify-end">
                    <Sparkline
                      data={item.sparkline}
                      width={100}
                      height={32}
                      isPositive={isPositive}
                      strokeWidth={1.75}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-xs text-[#5a5e6b] flex items-center justify-between mt-2 pt-2 border-t border-transparent">
                  <span>Click to view chart</span>
                  <BarChart3 className="w-4 h-4 text-[#737687] group-hover:text-[#0049db] transition-colors" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
