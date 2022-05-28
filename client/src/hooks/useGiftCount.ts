import { giftCounts } from "model/giftCounts";
import { useSnapshot } from "valtio";

export const useGiftCount = (giftId: string) => {
  const data = useSnapshot(giftCounts);
  return data[giftId] ?? 0;
};