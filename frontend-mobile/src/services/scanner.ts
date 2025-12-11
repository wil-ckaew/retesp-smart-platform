import { scanSeal } from "./api";

export async function handleScan(qr: string) {
  // You can enrich this with location, device info, etc.
  return await scanSeal(qr, { scannerId: "mobile", scanType: "field" });
}
