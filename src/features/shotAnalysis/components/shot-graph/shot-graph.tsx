import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import { TickFormatter } from '../../utils/shot-utils';
import type { Shot } from '@/types/shot';

type ShotGraphProps = {
  shots: Shot[];
};

export function ShotGraph({ shots }: ShotGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === null) return;
    const plot = Plot.plot({
      width:
        containerRef.current.parentElement?.clientWidth || window.screen.width,
      y: {
        grid: true,
        tickFormat: TickFormatter,
        reverse: true,
        label: 'Offline (yards)',
        labelAnchor: 'center',
        line: true,
      },
      x: {
        grid: true,
        label: 'Carry distance (yards)',
        labelAnchor: 'center',
        line: true,
      },
      marks: [
        Plot.ruleY([0]),
        Plot.hull(shots, {
          x: 'carry_distance',
          y: 'offline',
          stroke: 'club_name',
          fillOpacity: 0.1,
        }),
        Plot.dot(shots, {
          x: 'carry_distance',
          y: 'offline',
          fill: 'club_name',
          title: (d) =>
            `${d.club_name}\nCarry: ${d.carry_distance} yards\nOffline: ${d.offline} yards`,
          tip: true,
        }),
      ],
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [shots]);

  return (
    <>
      <div className="mt-4" ref={containerRef}></div>
    </>
  );
}
