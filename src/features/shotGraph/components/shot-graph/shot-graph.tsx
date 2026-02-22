import { useShots } from '../../api/get-shots';
import { useEffect, useRef, useState } from 'react';
import * as Plot from '@observablehq/plot';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { TickFormatter } from '../../utils/shot-utils';

export function ShotGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Record<string, any> | 'all'>('all');
  const [date, setDate] = useState<DateRange | undefined>();

  const { data } = useShots({
    startDate: date?.from,
    endDate: date?.to,
  });
  const shots = data?.shots || [];
  const filteredShots = shots.filter(
    (shot) => filter == 'all' || shot.club_name in filter,
  );

  const clubs: Record<string, number> = {}; // maps a club to the number of shots hit with it

  shots.forEach((shot) => {
    if (clubs[shot.club_name]) {
      clubs[shot.club_name]++;
    } else {
      clubs[shot.club_name] = 1;
    }
  });

  useEffect(() => {
    if (data === undefined || containerRef.current === null) return;
    const plot = Plot.plot({
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
        Plot.hull(filteredShots, {
          x: 'carry_distance',
          y: 'offline',
          stroke: 'club_name',
          fillOpacity: 0.1,
        }),
        Plot.dot(filteredShots, {
          x: 'carry_distance',
          y: 'offline',
          fill: 'club_name',
          title: (d) =>
            `${d.club_name}\nCarry: ${d.carry_distance} yards\nOffline: ${d.offline} yards`,
          tip: true,
        }),
      ],
      title: `Shot Carry Distance vs. Offline`,
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [filteredShots]);

  return (
    <>
      <div className="mt-4">
        <DatePickerWithRange date={date} setDate={setDate} />
        <div className="mt-4">
          {Object.entries(clubs).map(([club, count]) => (
            <Toggle
              key={club}
              pressed={filter === 'all' ? true : club in filter}
              variant="outline"
              onClick={() => {
                const newFilter = filter === 'all' ? {} : filter || {};
                club in newFilter
                  ? delete newFilter[club]
                  : (newFilter[club] = true);
                setFilter({ ...newFilter });
              }}
            >
              {club}: {count} shots
            </Toggle>
          ))}
          <Button
            key="all"
            variant="outline"
            onClick={() =>
              filter === 'all' ? setFilter({}) : setFilter('all')
            }
          >
            {filter === null
              ? `Select all ${shots.length} shots`
              : `Deselect all ${shots.length} shots`}
          </Button>
        </div>
        <div className="mt-4" ref={containerRef}></div>
      </div>
    </>
  );
}
