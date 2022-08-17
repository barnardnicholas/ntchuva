import React, { Fragment, useEffect, useState } from 'react';
import usePrevious from '../hooks/usePrevious';
import { rotate } from '../utils/utils';
import Counter from './Counter';

interface SquareCountersProps {
  value: number;
}

const ringNumbers: number[][] = [
  [1], // 1
  [2], // 2
  [3], // 3
  [4], // 4
  [1, 4], // 5
  [1, 5], // 6
  [1, 6], // 7
  [2, 6], // 8
  [3, 6], // 9
  [3, 7], // 10
  [4, 7], // 11
  [4, 8], // 12
  [4, 9], // 13
  [4, 10], // 14
]; // numbers of counters in concentric rings

const d = 10;

function SquareCounters({ value }: SquareCountersProps) {
  const prevValue = usePrevious(value);

  const getAngleOffsets = (ringNumber: number[]) => {
    if (!ringNumber) return [0];
    return ringNumber.map((n: number) => Math.random() * (360 / n));
  };

  const [angleOffsets, setAngleOffsets] = useState<number[]>(
    getAngleOffsets(ringNumbers[value - 1]),
  );

  useEffect(() => {
    if (value !== prevValue && !!ringNumbers[value - 1])
      setAngleOffsets(getAngleOffsets(ringNumbers[value - 1]));
  }, [value, prevValue]);

  if (value <= 0) return null;
  if (value === 1) return <Counter top={`${50 - 10}%`} left={`${50 - 10}%`} />;

  return (
    <>
      {ringNumbers[value - 1].map((i: number, index: number) => {
        const thisRing: number[] = new Array(i).fill(0).map((_: number, j: number) => j);
        if (thisRing.length === 1)
          return <Counter key={i} top={`${50 - d}%`} left={`${50 - d}%`} />;
        return (
          <Fragment key={i}>
            {thisRing.map((j: number) => {
              let r = 12 + index * 10; // ring radius
              if (thisRing.length === 2) r -= 1;
              else if (thisRing.length === 4 && index === 0) r += 5;
              // else if (thisRing.length === 5 && index === 0) r -= 2;
              else if (value >= 8 && index === 1) r += 9;
              else if (value >= 11 && index === 0) r -= 6;

              let a = (360 / thisRing.length) * j; // angle of rotation
              if (angleOffsets[index]) a += angleOffsets[index];
              const { x, y } = rotate(50, 50, 50 - r, 50, a); // New coords
              return (
                <Counter
                  key={`${i}-${j}`}
                  top={`${Number(y - d).toFixed(1)}%`}
                  left={`${Number(x - d).toFixed(1)}%`}
                />
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}

export default SquareCounters;
