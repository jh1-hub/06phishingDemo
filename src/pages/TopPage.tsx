import { Link } from 'react-router-dom';
import { Lock, Speech, Landmark, UserPlus, Building2, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import WarningBanner from '../components/WarningBanner';
import StolenInfoTracker from '../components/StolenInfoTracker';
import FakeAddressBar from '../components/FakeAddressBar';
import { usePhishing } from '../context/PhishingContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const { isCompleted, resetSimulation, stolenInfo } = usePhishing();
  const stolenCount = Object.keys(stolenInfo).length;

  // Analysis of risks based on stolen data
  const getRiskAnalysis = (key: string) => {
    switch (key) {
      case 'customerNumber': return '口座へのログインを試みるための第1キーとなります。';
      case 'loginPassword': return 'これを知られると、あなたになりすましてログインが可能になります。';
      case 'fullName': return '身分称称や、さらなるフィッシング攻撃の信憑性を高めるために悪用されます。';
      case 'birthDate': return '暗証番号の推測や、電話窓口での本人確認の突破に使われます。';
      case 'phoneNumber': return 'SMSでのさらなる詐欺（スミッシング）や、電話による勧誘・詐欺の標的になります。';
      case 'address': return '身分証明書の偽造や、ダイレクトメールによる詐欺の材料になります。';
      case 'transactionPassword': return '【極めて危険】実際に送金を実行するために必要な最後の砦です。送金被害に直結します。';
      case 'creditCardNumber': return 'ネットショッピング等での不正決済に直接利用されます。';
      case 'ccExpiry': return 'カード決済を有効化するために必要な情報です。';
      case 'ccCvv': return '【極めて危険】カードの本人確認をバイパスし、決済を確定させるために使われます。';
      default: return '';
    }
  };

  const infoLabels: Record<string, string> = {
    customerNumber: 'お客様番号',
    loginPassword: 'ログインパスワード',
    fullName: '氏名',
    birthDate: '生年月日',
    phoneNumber: '電話番号',
    address: '住所',
    transactionPassword: '取引実行パスワード',
    creditCardNumber: 'カード番号',
    ccExpiry: '有効期限',
    ccCvv: 'セキュリティコード',
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#111] text-white font-sans p-4 md:p-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full"
        >
          {/* Official looking Report Header */}
          <div className="border-b-2 border-red-600 pb-6 mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
             <div>
               <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-red-600 mb-2">SECURITY AUDIT REPORT</h1>
               <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                 <ShieldCheck className="w-4 h-4 text-red-500" />
                 <span>LEVEL: CRITICAL SYSTEM COMPROMISE</span>
                 <span className="hidden md:inline">|</span>
                 <span>ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
               </div>
             </div>
             <div className="text-right">
               <div className="text-3xl font-bold bg-red-600 text-white px-4 py-1 inline-block mb-1">DANGER</div>
               <p className="text-xs text-gray-500">GENERATED ON: {new Date().toLocaleDateString()}</p>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Summary */}
            <div className="md:col-span-1 space-y-6">
               <div className="bg-[#222] border border-red-900/30 p-6 rounded-lg shadow-2xl">
                 <p className="text-sm font-bold text-gray-400 mb-1 uppercase tracking-widest">Total Stolen Items</p>
                 <div className="text-6xl font-black text-red-500">{stolenCount} <span className="text-2xl">/ 10</span></div>
                 <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                   短時間の操作で、あなたのデジタルアイデンティティのほぼ全てが攻撃者の手に渡りました。
                 </p>
               </div>

               <div className="space-y-2">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">被害想定シナリオ</h3>
                 <div className="bg-[#1a1a1a] p-4 border-l-4 border-red-600 text-sm leading-relaxed text-gray-300">
                    攻撃者は取得したログイン情報を使い、あなたの口座へ数分以内にアクセスします。
                    さらに取引パスワードがあるため、預金は即座に外部口座へ送金され、回収は困難を極めます。
                 </div>
                 <div className="bg-[#1a1a1a] p-4 border-l-4 border-yellow-600 text-sm leading-relaxed text-gray-300">
                    カード情報（CVV含む）により、海外サイト等で限度額上限までの不正買い物が繰り返されます。
                 </div>
               </div>
            </div>

            {/* Right: Detailed List */}
            <div className="md:col-span-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">抜き取られた情報の詳細</h3>
              <div className="space-y-3">
                {Object.entries(stolenInfo).map(([key, val]) => (
                  <motion.div 
                    key={key}
                    layout
                    className="group bg-[#1a1a1a] border border-gray-800 p-4 hover:border-red-600 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-black text-red-500 uppercase">{infoLabels[key] || key}</span>
                      <span className="text-[10px] text-gray-600 font-mono">STATUS: EXFILTRATED</span>
                    </div>
                    <div className="font-mono text-lg break-all mb-2 text-white">
                      {val}
                    </div>
                    <div className="text-xs text-gray-400 bg-black/40 p-2 rounded border border-gray-900 leading-relaxed italic">
                      「{getRiskAnalysis(key)}」
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white text-black p-8 md:p-12 rounded-2xl shadow-inner border-4 border-red-600">
             <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-black mb-6 text-center">💡 これを防ぐためにできること</h2>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="bg-green-100 p-3 rounded-full h-fit flex-shrink-0"><ShieldCheck className="text-green-700 w-6 h-6" /></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">「お急ぎください」は詐欺の合言葉</h4>
                        <p className="text-gray-600 text-sm italic">銀行がメールやSMSで「口座の制限」を理由にログインを急かすことはありません。不審なメッセージ内のURLは決してクリックせず、必ず公式アプリやブックマークからアクセスしてください。</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="bg-blue-100 p-3 rounded-full h-fit flex-shrink-0"><Lock className="text-blue-700 w-6 h-6" /></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">二要素認証（トークン）を正しく使う</h4>
                        <p className="text-gray-600 text-sm italic">本物のサイトでは、ログイン直後に重要なパスワードやカード情報を複数ページにわたって入力させることは稀です。不自然な入力フォームには常に疑問を持ってください。</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="bg-red-100 p-3 rounded-full h-fit flex-shrink-0"><AlertTriangle className="text-red-700 w-6 h-6" /></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">パスワードはサイトごとに変える</h4>
                        <p className="text-gray-600 text-sm italic">万が一1つのサイトで漏洩しても、他のサービスが守られるよう、パスワードの使い回しは絶対に避けましょう。</p>
                      </div>
                   </div>
                </div>

                <div className="mt-12 flex flex-col items-center gap-6 border-t pt-10">
                   <p className="text-sm font-bold text-gray-400">体験いただきありがとうございました。</p>
                   <button 
                     onClick={resetSimulation}
                     className="bg-green-700 text-white px-12 py-5 rounded-full font-bold text-2xl hover:bg-green-800 transition-all flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95"
                   >
                     <RefreshCw className="w-6 h-6" /> 最初から体験し直す
                   </button>
                </div>
             </div>
          </div>

          <div className="mt-20 text-center text-gray-600 text-xs pb-10">
             <p>© 2026 Phishing Education Project | This is a safe simulation context.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans text-gray-800 relative">
      <FakeAddressBar />
      <WarningBanner />
      <Header />
      <StolenInfoTracker />
      
      {/* Background that mimics the screenshot's gradient/color */}
      <div className="bg-[#EFDE97] w-full pt-8 pb-12">
        <main className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
          
          {/* Left Content (Banner/Notices) */}
          <div className="flex-1 flex flex-col gap-4">
            
            {/* Main Campaign Banner (Mock) */}
            <div className="bg-white rounded-none p-8 relative overflow-hidden shadow-sm flex flex-col justify-center min-h-[380px] border">
              <div className="z-10 relative">
                <div className="flex items-center gap-4 mb-4">
                   <div className="flex items-center gap-1 font-bold text-xl tracking-widest text-green-800">
                     <span className="italic">JP</span>
                     <span>ゆうちょ銀行</span>
                   </div>
                   <span className="text-xl">×</span>
                   <div className="text-red-500 font-bold text-2xl tracking-tighter">docomo</div>
                </div>
                
                <h2 className="text-3xl font-bold text-[#b58b42] mb-1">29歳以下限定GOLDカード</h2>
                
                <h1 className="text-5xl font-black text-[#5c4a2a] my-2 tracking-tighter">d CARD GOLD U</h1>
                
                <div className="bg-[#b58b42] text-white font-bold inline-block px-8 py-2 rounded-full mt-2 mb-8 text-xl shadow-md">
                   ゆうちょ銀行デザイン
                </div>

                <div className="bg-red-600 text-white p-4 relative text-center shadow-lg mt-4 transform -rotate-1">
                   {/* Ribbons */}
                   <div className="absolute -left-4 top-1/2 -mt-4 w-8 h-8 bg-red-800 transform rotate-45 -z-10"></div>
                   <div className="absolute -right-4 top-1/2 -mt-4 w-8 h-8 bg-red-800 transform rotate-45 -z-10"></div>
                   
                   <p className="font-bold text-xl mb-1 mt-1">ゆうちょ限定の特典で、さらにおトク！</p>
                   <p className="text-5xl font-black tracking-tighter shadow-sm text-white">3,000円プレゼント</p>
                </div>

                <p className="text-sm mt-6 text-gray-800 font-medium text-center">
                  ※年会費、特典の条件等について詳細はdカードWebサイトをご確認ください。<br/>
                  ※年会費:3,300円(税込) ※入会審査あり<br/>
                  ※入会申込み日時時点で満18歳以上(高校生除く)29歳以下の方が対象
                </p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 bg-white border-2 border-red-500 rounded-full w-24 h-24 flex items-center justify-center text-center text-red-500 font-bold leading-tight shadow-md transform rotate-12">
                 年会費<br/>実質無料
              </div>
              <div className="absolute top-20 right-20 w-64 h-40 bg-[#d4af37] rounded-lg shadow-xl transform rotate-6 border border-yellow-200 opacity-90">
                 {/* Fake credit card details */}
                 <div className="h-8 bg-yellow-600/30 w-full mt-6"></div>
                 <div className="text-white font-bold opacity-50 px-4 mt-8 flex justify-between">
                    <span>d CARD</span>
                    <span>VISA</span>
                 </div>
              </div>
            </div>
            
          </div>

          {/* Right Sidebar (Login Box) */}
          <div className="w-full md:w-[340px] flex flex-col gap-4">
            
            {/* Login Box */}
            <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200">
              <h3 className="text-xl font-black italic text-green-800 mb-3 tracking-tighter flex items-center justify-center py-2 bg-green-50">
                 <span className="text-2xl mr-1 text-[#00873C]">ゆうちょ</span>ダイレクト
              </h3>
              
              <Link to="/login" className="bg-[#F37600] text-white w-full py-3 flex justify-center items-center font-bold text-lg shadow-sm border-b-2 border-orange-800 hover:bg-[#D96A00] transition-colors mb-3">
                <Lock className="w-5 h-5 mr-2" /> ログイン
              </Link>
              
              <button className="w-full bg-white text-green-800 font-bold py-2 border-2 border-green-600 hover:bg-green-50 transition-colors shadow-sm mb-1 px-4">
                新規申込・サービス内容
              </button>
            </div>
            
            {/* Chat Button */}
            <button className="bg-white border-2 border-green-500 rounded-lg py-2 px-4 flex justify-center items-center text-green-700 font-bold hover:bg-green-50 shadow-sm mt-1 mx-2">
               <Speech className="w-5 h-5 mr-2" /> チャットで質問する (chatbot)
            </button>
            
            {/* Quick Links Grid */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="bg-white border-2 border-green-600 p-4 flex flex-col items-center justify-center text-green-800 hover:bg-green-50 cursor-pointer shadow-sm relative group overflow-hidden">
                <Landmark className="w-8 h-8 mb-2 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-center leading-tight">店舗・ATM<br/>検索 <span className="text-[10px] border p-px ml-1">↗</span></span>
              </div>
              <div className="bg-white border-2 border-green-600 p-4 flex flex-col items-center justify-center text-green-800 hover:bg-green-50 cursor-pointer shadow-sm relative group overflow-hidden">
                <UserPlus className="w-8 h-8 mb-2 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-center leading-tight">予約サービス</span>
              </div>
              <div className="bg-white border-2 border-green-600 p-4 flex flex-col items-center justify-center text-green-800 hover:bg-green-50 cursor-pointer shadow-sm relative group overflow-hidden">
                <Building2 className="w-8 h-8 mb-2 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-center leading-tight">各種料金・<br/>金利</span>
              </div>
              <div className="bg-white border-2 border-green-600 p-4 flex flex-col items-center justify-center text-green-800 hover:bg-green-50 cursor-pointer shadow-sm relative group overflow-hidden">
                <Building2 className="w-8 h-8 mb-2 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-center leading-tight">他行との送金<br/>店番・口座番号</span>
              </div>
            </div>
            
          </div>
          
        </main>
      </div>
      
      {/* Footer Area with notices */}
      <div className="max-w-6xl mx-auto px-4 w-full -mt-6 z-20">
         {/* Important Notices */}
         <div className="border border-red-500 rounded-none p-4 bg-white shadow-sm">
            <ul className="space-y-3 text-red-600 font-bold text-sm md:text-base">
               <li className="flex items-start gap-2 hover:underline cursor-pointer group">
                 <AlertTriangle className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                 令和8年岩手県大槌町の林野火災に関するお知らせ
               </li>
               <li className="flex items-start gap-2 hover:underline cursor-pointer group">
                 <AlertTriangle className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                 【お客さま情報の提出等のお願い】窓口・ATMでのご案内や、お客さま情報管理センターからお送りするお手紙等によりお取引目的等の確認をお願いしています
               </li>
               <li className="flex items-start gap-2 hover:underline cursor-pointer group">
                 <AlertTriangle className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                 在留カード・在留期間の情報更新に関する案内をご覧になられたお客さまへ
               </li>
               <li className="flex items-start gap-2 hover:underline cursor-pointer group">
                 <AlertTriangle className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                 ！ゆうちょダイレクトを狙った犯罪にご注意ください！
               </li>
            </ul>
         </div>
         
         {/* Action Buttons */}
         <div className="flex flex-col md:flex-row gap-4 mt-6 mb-12">
           <button className="flex-1 bg-[#00873C] text-white font-bold py-6 rounded-none hover:bg-green-700 flex justify-center items-center shadow-md text-xl">
             <Landmark className="w-8 h-8 mr-4" /> 総合口座開設
           </button>
           <button className="flex-1 bg-white border-2 border-[#00873C] text-[#00873C] font-bold py-6 rounded-none hover:bg-green-50 flex justify-center items-center shadow-md text-xl">
             <Building2 className="w-8 h-8 mr-4" /> 投資信託口座開設
           </button>
         </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-8 mt-auto">
        <div className="max-w-6xl mx-auto text-sm text-center text-gray-400">
          <p className="font-bold text-red-400 mb-2">【警告】本サイトはフィッシング詐欺の学習・体験用サイトであり、実際の金融機関（ゆうちょ銀行など）とは一切関係ありません。</p>
          <p>This is an educational phishing simulation. Do not enter any real information.</p>
          <p className="mt-4">Copyright (C) Phishing Simulation Project. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
