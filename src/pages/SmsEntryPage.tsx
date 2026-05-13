import { useState, useEffect } from 'react';
import { Smartphone, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function SmsEntryPage() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center sm:p-4">
      {/* Smartphone Frame - adapted for mobile */}
      <div className="w-full h-screen sm:w-[300px] sm:h-[600px] bg-gray-900 sm:rounded-[3rem] border-0 sm:border-4 border-gray-800 relative shadow-2xl overflow-hidden flex flex-col transition-all">
        {/* Notch - only visible on desktop view to simulate phone */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
        
        {/* Screen Content */}
        <div className="flex-1 bg-gray-200 relative flex flex-col p-4 pt-6 sm:pt-10">
          <div className="flex justify-between items-center text-[10px] font-bold text-gray-800 mb-4 px-2">
            <span>{formatTime(time)}</span>
            <div className="flex gap-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* SMS Notification */}
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-300 mb-4 cursor-pointer hover:bg-white transition-colors"
            onClick={() => navigate('/home')}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <div className="bg-green-600 rounded-full p-1">
                  <Smartphone className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-bold">メッセージ</span>
              </div>
              <span className="text-[8px] text-gray-500">現在</span>
            </div>
            <p className="text-[10px] font-bold text-gray-900 leading-tight">
              【ゆうちょ銀行】お客様の口座で異常なログインが検知されました。本人確認を行わない場合、口座が利用停止されます。以下より至急ご確認ください。
            </p>
            <p className="text-[10px] text-blue-600 underline mt-1 truncate">
              https://jp-bank.japanpost-security.at/login
            </p>
          </motion.div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-gray-300 rounded-2xl mb-4 flex items-center justify-center text-gray-400">
                <Info className="w-8 h-8" />
             </div>
             <p className="text-xs text-gray-500 font-medium">通知が1件あります。</p>
          </div>

          {/* Mobile Instruction Modal Overlay */}
          <div className="sm:hidden absolute inset-0 bg-black/60 z-[30] p-6 flex items-center justify-center pointer-events-none">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow-2xl relative pointer-events-auto"
            >
              <h2 className="text-xl font-black mb-3 text-green-500">STEP 0: 罠の始まり</h2>
              <p className="text-gray-300 text-xs leading-relaxed mb-4">
                フィッシング詐欺は、多くの場合このような**「緊急性を煽るSMSやメール」**から始まります。<br/><br/>
                スマートフォンの通知をクリックして、シミュレーションを開始しましょう。
              </p>
              <div className="flex items-center gap-2 text-[10px] text-green-500 font-bold animate-pulse">
                <span>画面上の通知をタップしてください</span>
                <ChevronRight className="w-3 h-3 rotate-90" />
              </div>
            </motion.div>
          </div>

          {/* Dock */}
          <div className="bg-white/40 backdrop-blur-md h-16 rounded-2xl mt-auto flex justify-around items-center p-2">
             <div className="w-10 h-10 bg-green-500 rounded-xl"></div>
             <div className="w-10 h-10 bg-blue-500 rounded-xl"></div>
             <div className="w-10 h-10 bg-amber-500 rounded-xl"></div>
             <div className="w-10 h-10 bg-red-500 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* Instructions - Desktop only */}
      <div className="mt-8 lg:mt-0 lg:ml-12 max-w-md text-white px-4 hidden sm:block">
        <h2 className="text-2xl lg:text-3xl font-black mb-4 text-green-500">STEP 0: 罠の始まり</h2>
        <p className="text-gray-400 text-sm lg:text-base leading-relaxed bg-gray-900 p-6 rounded-xl border border-gray-800">
          フィッシング詐欺は、多くの場合このような**「緊急性を煽るSMSやメール」**から始まります。<br/><br/>
          <span className="text-white font-bold">「口座の異常」「利用停止」「キャンペーンの受け取り」</span>など、ついクリックしたくなる言葉で巧みに誘導します。
          <br/><br/>
          スマートフォンの通知をクリックして、シミュレーションを開始しましょう。
        </p>
        <div className="mt-8 flex items-center gap-2 text-sm text-green-500 font-bold animate-bounce justify-center lg:justify-start">
           <ChevronRight className="w-5 h-5 rotate-180 hidden lg:block" /> 
           <span>画面上のスマホ画面をクリック</span>
        </div>
      </div>
    </div>
  );
}
