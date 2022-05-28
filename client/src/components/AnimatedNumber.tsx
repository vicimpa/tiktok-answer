import { FC, useEffect, useState } from "react";

interface IProps {
  value?: number;
}

export const AnimatedNumber: FC<IProps> = ({ value = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count != value) {
        setCount(v => v + 1);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [count, value]);

  useEffect(() => {
    console.log('Mounted');
  }, []);

  useEffect(() => {
    console.log('Update');
  }, [value]);

  return (
    <>
      {count}
    </>
  );
};