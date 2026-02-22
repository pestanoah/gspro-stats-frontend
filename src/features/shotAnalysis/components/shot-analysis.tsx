import { useState } from 'react';
import { useShots } from '../api/get-shots';
import { ShotGraph } from './shot-graph/shot-graph';
import { ShotTable } from './shot-table/shot-table';
import type { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';

export function ShotAnalysis() {
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

  return (
    <div className="m-4 container">
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
          onClick={() => (filter === 'all' ? setFilter({}) : setFilter('all'))}
        >
          {filter === 'all'
            ? `Deselect all ${shots.length} shots`
            : `Select all ${shots.length} shots`}
        </Button>
      </div>
      <ShotGraph shots={filteredShots} />
      <ShotTable shots={filteredShots} />
    </div>
  );
}
