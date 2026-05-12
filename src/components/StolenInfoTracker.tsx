import { usePhishing } from '../context/PhishingContext';
import { ShieldAlert, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function StolenInfoTracker() {
  const { stolenInfo } = usePhishing();
  const [isExpanded, setIsExpanded] = useState(true);

  const infoKeys = [
    { key: 'customerNumber', label: 'お客様番号' },
    { key: 'loginPassword', label: 'ログインパスワード' },
    { key: 'fullName', label: '氏名' },
    { key: 'birthDate', label: '生年月日' },
    { key: 'phoneNumber', label: '電話番号' },
    { key: 'address', label: '住所' },
    { key: 'transactionPassword', label: '取引実行パスワード' },
    { key: 'creditCardNumber', label: 'カード番号' },
    { key: 'ccExpiry', label: '有効期限' },
    { key: 'ccCvv', label: 'セキュリティコード' },
  ] as const;

  const stolenCount = Object.keys(stolenInfo).length;

  if (stolenCount === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-72 md:w-80 font-sans">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-red-500 overflow-hidden">
        <div 
          className="bg-red-600 text-white p-3 flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            <span className="font-bold text-sm">現在盗み取られた情報 ({stolenCount})</span>
          </div>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 bg-red-50 space-y-2 max-h-80 overflow-y-auto">
                <p className="text-[10px] text-red-700 font-bold mb-2">
                  ※あなたが入力した内容は、このようにリアルタイムで攻撃者のサーバーに送信されています。
                </p>
                {infoKeys.map(({ key, label }) => {
                  const val = stolenInfo[key as keyof typeof stolenInfo];
                  return (
                    <div key={key} className="flex flex-col border-b border-red-200 pb-1 last:border-0">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-600">{label}</span>
                        {val ? (
                          <CheckCircle2 className="w-4 h-4 text-red-600" />
                        ) : (
                          <span className="text-[10px] text-gray-400">未取得</span>
                        )}
                      </div>
                      {val && (
                        <div className="text-sm font-mono text-red-700 break-all bg-white px-1 rounded border border-red-100 mt-0.5">
                          {val}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
