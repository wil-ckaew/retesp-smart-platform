import React, { createContext, useContext, useState } from "react";

type ScannerContextType = {
  lastScan: any | null;
  setLastScan: (v: any) => void;
  scanning: boolean;
  setScanning: (v: boolean) => void;
};

const ScannerContext = createContext<ScannerContextType | undefined>(undefined);

export const ScannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastScan, setLastScan] = useState<any | null>(null);
  const [scanning, setScanning] = useState(false);

  return (
    <ScannerContext.Provider value={{ lastScan, setLastScan, scanning, setScanning }}>
      {children}
    </ScannerContext.Provider>
  );
};

export const useScanner = () => {
  const ctx = useContext(ScannerContext);
  if (!ctx) throw new Error("useScanner must be used within ScannerProvider");
  return ctx;
};
