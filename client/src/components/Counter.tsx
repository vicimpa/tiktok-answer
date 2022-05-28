import { useGiftCount } from "hooks/useGiftCount";
import { FC } from "react";

import { AnimatedNumber } from "./AnimatedNumber";

interface ICounter {
  giftId: string;
  color?: string;
  description?: string;
}

export const Counter: FC<ICounter> = ({ color, giftId, description }) => {
  const count = useGiftCount(giftId);

  return (
    <div className="counter" style={{ backgroundColor: color }}>
      <h3>{description}</h3>
      <h1>
        <AnimatedNumber value={count} />
      </h1>
    </div>
  );
};