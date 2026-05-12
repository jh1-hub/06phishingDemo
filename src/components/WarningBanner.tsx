import { AlertTriangle } from 'lucide-react';

export default function WarningBanner() {
  return (
    <div className="bg-red-600 text-white p-3 flex items-center justify-center font-bold sticky top-0 z-50 text-sm md:text-base px-4 text-center shadow-lg">
      <AlertTriangle className="w-6 h-6 mr-2 flex-shrink-0 animate-pulse" />
      <p>
        【重要】これはフィッシング詐欺の体験・学習用サイトです。実際のパスワードや個人情報は絶対に入力しないでください。
      </p>
    </div>
  );
}
