import { Search, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white">
      {/* Top green bar */}
      <div className="bg-[#00873C] text-white p-2 flex justify-between items-center h-16 px-4 md:px-8">
        <div className="flex items-center gap-2 cursor-pointer">
           <div className="flex items-center gap-1 font-bold text-2xl tracking-widest leading-none mt-1">
             <span className="italic font-serif">JP</span>
             <span className="font-sans">ゆうちょ銀行</span>
           </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4 bg-white/10 px-4 py-1 rounded">
           <span className="text-sm font-bold tracking-widest">進化するぬくもり。</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex bg-white text-black p-1 rounded items-center border border-gray-300">
            <input type="text" placeholder="検索キーワードを入力" className="px-2 outline-none text-sm w-48" />
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 flex items-center text-sm rounded-sm transition-colors">
              <Search className="w-4 h-4 mr-1"/> 検索
            </button>
          </div>
          <Link to="/login" className="bg-[#F37600] text-white px-4 py-2 flex items-center font-bold rounded-sm border border-orange-800 hover:bg-[#D96A00] transition-colors ml-4 text-sm md:text-base cursor-pointer shadow-sm">
            <Lock className="w-4 h-4 mr-1" /> ログイン
          </Link>
        </div>
      </div>
      
      {/* Links below green bar */}
      <div className="text-xs flex justify-between items-center px-4 md:px-8 py-2 border-b">
         <div className="font-medium text-gray-700">金融機関コード：9900</div>
         <div className="flex gap-6 text-green-700 font-medium">
           <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline flex items-center"><span className="text-green-500 mr-1">▶</span> よくあるご質問</a>
           <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline flex items-center"><span className="text-green-500 mr-1">▶</span> お問い合わせ</a>
           <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline flex items-center"><span className="text-green-500 mr-1">▶</span> English TOP</a>
         </div>
      </div>
      
      {/* Main Nav Tabs */}
      <div className="flex text-sm text-green-800 font-bold border-b-2 border-green-700 mt-2 px-2">
        <div onClick={(e) => e.preventDefault()} className="bg-[#00873C] text-white px-8 py-2.5 rounded-t-lg ml-2 cursor-pointer transition-colors">個人のお客さま</div>
        <div onClick={(e) => e.preventDefault()} className="hover:bg-gray-100 px-8 py-2.5 cursor-pointer border-t border-l border-r border-transparent hover:border-gray-200 rounded-t-lg transition-colors">法人のお客さま</div>
        <div onClick={(e) => e.preventDefault()} className="hover:bg-gray-100 px-8 py-2.5 cursor-pointer border-t border-l border-r border-transparent hover:border-gray-200 rounded-t-lg transition-colors">IR情報</div>
        <div onClick={(e) => e.preventDefault()} className="hover:bg-gray-100 px-8 py-2.5 cursor-pointer border-t border-l border-r border-transparent hover:border-gray-200 rounded-t-lg transition-colors">企業情報</div>
        <div onClick={(e) => e.preventDefault()} className="hover:bg-gray-100 px-8 py-2.5 cursor-pointer border-t border-l border-r border-transparent hover:border-gray-200 rounded-t-lg transition-colors">採用情報</div>
        <div onClick={(e) => e.preventDefault()} className="hover:bg-gray-100 px-8 py-2.5 cursor-pointer border-t border-l border-r border-transparent hover:border-gray-200 rounded-t-lg flex items-center transition-colors">サステナビリティ <span className="ml-1 text-xs border p-0.5 rounded border-green-800">↗</span></div>
      </div>
      
      {/* Sub Nav (Green Bar) */}
      <div className="bg-[#00873C] text-white flex justify-between px-2 md:px-8 py-2 text-sm font-bold text-center">
        <div className="flex-1 flex flex-col justify-center items-center py-1 border-r border-green-500 hover:bg-green-700 cursor-pointer transition-colors relative group">店舗・ATM<span className="text-xs opacity-80 mt-0.5">▼</span></div>
        <div className="flex-1 flex flex-col justify-center items-center py-1 border-r border-green-500 hover:bg-green-700 cursor-pointer transition-colors relative group">貯金<span className="text-xs opacity-80 mt-0.5">▼</span></div>
        <div className="flex-1 flex flex-col justify-center items-center py-1 border-r border-green-500 hover:bg-green-700 cursor-pointer transition-colors relative group">送金・支払<span className="text-xs opacity-80 mt-0.5">▼</span></div>
        <div className="flex-1 flex flex-col justify-center items-center py-1 border-r border-green-500 hover:bg-green-700 cursor-pointer transition-colors relative group">給与・<br/>年金受取り<span className="text-xs opacity-80 mt-0.5">▼</span></div>
        <div className="flex-1 flex flex-col justify-center items-center py-1 border-r border-green-500 hover:bg-green-700 cursor-pointer transition-colors relative group">キャッシュレス<br/>サービス<span className="text-xs opacity-80 mt-0.5">▼</span></div>
        <div className="flex-1 flex flex-col justify-center items-center py-1 border-r border-green-500 hover:bg-green-700 cursor-pointer transition-colors relative group">資産運用<span className="text-xs opacity-80 mt-0.5">▼</span></div>
        <div className="flex-1 flex flex-col justify-center items-center py-1 border-r border-green-500 hover:bg-green-700 cursor-pointer transition-colors relative group">ローン・貸付け<span className="text-xs opacity-80 mt-0.5">▼</span></div>
        <div className="flex-1 flex flex-col justify-center items-center py-1 hover:bg-green-700 cursor-pointer transition-colors relative group">アプリの<br/>ご案内<span className="text-xs opacity-80 mt-0.5">▼</span></div>
      </div>
    </header>
  );
}
