import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StolenInfo {
  activeTarget?: string;
  customerNumber?: string;
  loginPassword?: string;
  fullName?: string;
  birthDate?: string;
  phoneNumber?: string;
  address?: string;
  transactionPassword?: string;
  creditCardNumber?: string;
  ccExpiry?: string;
  ccCvv?: string;
}

interface PhishingContextType {
  stolenInfo: StolenInfo;
  updateStolenInfo: (info: Partial<StolenInfo>) => void;
  isCompleted: boolean;
  setCompleted: (value: boolean) => void;
  resetSimulation: () => void;
}

const PhishingContext = createContext<PhishingContextType | undefined>(undefined);

export function PhishingProvider({ children }: { children: ReactNode }) {
  const [stolenInfo, setStolenInfo] = useState<StolenInfo>({});
  const [isCompleted, setCompleted] = useState(false);

  const updateStolenInfo = (info: Partial<StolenInfo>) => {
    setStolenInfo((prev) => ({ ...prev, ...info }));
  };

  const resetSimulation = () => {
    setStolenInfo({});
    setCompleted(false);
    window.location.hash = '/'; // Go back to Step 0 (SmsEntryPage)
  };

  return (
    <PhishingContext.Provider value={{ stolenInfo, updateStolenInfo, isCompleted, setCompleted, resetSimulation }}>
      {children}
    </PhishingContext.Provider>
  );
}

export function usePhishing() {
  const context = useContext(PhishingContext);
  if (context === undefined) {
    throw new Error('usePhishing must be used within a PhishingProvider');
  }
  return context;
}
