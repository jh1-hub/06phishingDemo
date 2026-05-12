import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, HelpCircle, ChevronRight, Monitor } from 'lucide-react';
import Header from '../components/Header';
import WarningBanner from '../components/WarningBanner';
import StolenInfoTracker from '../components/StolenInfoTracker';
import FakeAddressBar from '../components/FakeAddressBar';
import { usePhishing } from '../context/PhishingContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { updateStolenInfo } = usePhishing();
  const [customerNumber, setCustomerNumber] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStolenInfo({ customerNumber, loginPassword });
    // Proceed to next step
    navigate('/verification/personal');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans text-gray-800">
      <FakeAddressBar />
      <WarningBanner />
      <Header />
      <StolenInfoTracker />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white border p-6 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b-2 border-green-700 pb-4">
             <h1 className="text-2xl font-bold text-green-800 flex items-center">
               <span className="mr-2">ゆうちょダイレクト</span>
               <span className="text-lg font-normal bg-green-700 text-white px-2 py-0.5 rounded text-sm">ログイン</span>
             </h1>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 mb-8 text-sm flex gap-3">
             <HelpCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
             <div>
               <p className="font-bold mb-1">【重要】 セキュリティ強化に伴うご本人確認のお知らせ</p>
               <p className="text-gray-600">
                 昨今の不正送金被害の急増に伴い、お客様のアカウントの安全性確認を行っております。<br/>
                 お手数ですが、ログインのうえ、必要情報の更新をお願いいたします。
               </p>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                  お客様番号 <span className="text-[10px] bg-red-600 text-white px-1 py-px rounded">必須</span>
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                    placeholder="1234-5678-9012"
                    className="w-full border-2 border-gray-300 p-3 focus:border-green-600 outline-none rounded"
                    required
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1 italic">※半角数字でご入力ください</p>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                  ログインパスワード <span className="text-[10px] bg-red-600 text-white px-1 py-px rounded">必須</span>
                </label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border-2 border-gray-300 p-3 focus:border-green-600 outline-none rounded"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#F37600] text-white py-4 font-bold text-xl rounded shadow hover:bg-[#D96A00] transition-colors flex justify-center items-center"
              >
                次へ <ChevronRight className="ml-2 w-6 h-6" />
              </button>

              <div className="text-xs text-green-700 font-bold space-y-2 pt-4">
                 <a href="#" className="flex items-center gap-1 hover:underline">▶ お客様番号・ログインパスワードをお忘れの方</a>
                 <a href="#" className="flex items-center gap-1 hover:underline">▶ ゆうちょダイレクトを初めてご利用になる方</a>
              </div>
            </form>

            <div className="bg-gray-50 p-6 rounded border border-gray-200">
               <h2 className="font-bold border-b border-gray-300 pb-2 mb-4 flex items-center">
                 <Monitor className="w-5 h-5 mr-2 text-gray-500" /> パソコン・スマートフォンでのログイン
               </h2>
               <p className="text-sm leading-relaxed text-gray-600">
                 トークンの生成、または認証アプリでの認証が必要です。画面の指示に従って操作してください。
               </p>
               <div className="mt-8">
                 <div className="bg-white p-4 border rounded text-xs text-center text-red-600 font-bold">
                    ご注意ください：<br/>
                    本物のようなボタンやリンクが含まれていても、URLが正規のものか必ずご確認ください。
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 border-t mt-auto">
         <div className="max-w-4xl mx-auto px-4 flex justify-between text-[10px] text-gray-500 font-bold">
            <div className="flex gap-4">
              <a href="#">約款・規定等</a>
              <a href="#">個人情報のお取り扱いについて</a>
            </div>
            <span>Copyright (C) JAPAN POST BANK Co.,Ltd. All Rights Reserved.</span>
         </div>
      </footer>
    </div>
  );
}
