import React from 'react';
import { X, Bell, CheckCircle2, TrendingUp, AlertTriangle, Calendar } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-2xs flex justify-end md:justify-center lg:justify-end items-start pt-16 pr-4 md:pr-12 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl w-full max-w-sm overflow-hidden text-[#181c21]">
        {/* Header */}
        <div className="p-4 border-b border-[#E0E3EB] flex items-center justify-between bg-[#f7f9ff]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0049db]" />
            <h3 className="text-sm font-bold">Market Alerts & Updates</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-[#0049db] font-semibold hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#5a5e6b] hover:bg-[#ebeef5]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[360px] overflow-y-auto divide-y divide-[#E0E3EB]/60">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 hover:bg-[#f7f9ff] transition-colors cursor-pointer ${
                notif.unread ? 'bg-[#f1f4fb]/60' : ''
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5">
                  {notif.type === 'price_alert' && (
                    <TrendingUp className="w-4 h-4 text-[#0049db]" />
                  )}
                  {notif.type === 'market_open' && (
                    <Calendar className="w-4 h-4 text-[#089981]" />
                  )}
                  {notif.type === 'news' && (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#181c21]">{notif.title}</h4>
                    <span className="text-[10px] text-[#737687]">{notif.time}</span>
                  </div>
                  <p className="text-xs text-[#5a5e6b] mt-0.5 leading-relaxed">
                    {notif.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E0E3EB] bg-[#f7f9ff] text-center">
          <span className="text-xs text-[#5a5e6b]">Real-time Push Notifications Enabled</span>
        </div>
      </div>
    </div>
  );
};
