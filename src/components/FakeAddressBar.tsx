import { Lock, Info, Globe } from 'lucide-react';

export default function FakeAddressBar() {
  return (
    <div className="bg-[#e7eaed] p-1.5 sm:p-2 flex items-center gap-2 sm:gap-3 border-b border-gray-300 shadow-sm sticky top-0 z-[60]">
      <div className="hidden sm:flex items-center gap-1.5 ml-2">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
      </div>
      
      <div className="flex-1 bg-white rounded-full py-1 sm:py-1.5 px-3 sm:px-4 border border-gray-300 flex items-center text-[11px] sm:text-sm overflow-hidden">
        <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600 mr-1.5 sm:mr-2 flex-shrink-0" />
        <span className="text-gray-400 hidden xs:inline">https://</span>
        <span className="text-gray-900 font-medium truncate">jp-bank.japanpost-security.at/login</span>
        
        <div className="ml-auto group relative flex-shrink-0">
          <Info className="w-4 h-4 text-orange-500 cursor-help" />
          <div className="absolute top-8 right-0 w-64 md:w-80 bg-black text-white text-[10px] p-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[70]">
            <p className="font-bold text-orange-400 mb-1">🔍 フィッシングの兆候！</p>
            実在のURLは「jp-bank.japanpost.jp」です。ドメインが「.jp」ではなく「.at」（オーストリア）など日本の法律が及びにくい外国のものになっているのは、非常に危険なサインです。
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mr-4">
        <Globe className="w-4 h-4 text-gray-500" />
      </div>
    </div>
  );
}
