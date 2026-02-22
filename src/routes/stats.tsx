import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { useShots } from '@/features/shotGraph/api/get-shots'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { quantile, standardDeviation } from 'simple-statistics'
import * as Plot from '@observablehq/plot'

export const Route = createFileRoute('/stats')({
  component: RouteComponent,
})

function RouteComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [date, setDate] = useState<DateRange | undefined>()
  const [filter, setFilter] = useState<Record<string, any> | null>()

  const { data } = useShots({
    startDate: date?.from,
    endDate: date?.to,
  })
  const shots = data?.shots || []
  const filteredShots = shots.filter(
    (shot) => filter == null || shot.club_name in filter,
  )

  const clubs: Record<string, number> = {} // maps a club to the number of shots hit with it

  shots.forEach((shot) => {
    if (clubs[shot.club_name]) {
      clubs[shot.club_name]++
    } else {
      clubs[shot.club_name] = 1
    }
  })

  const dispersionRange = [0, 0]
  const carryDistanceRange = [Infinity, 0]

  const offlineData: number[] = []
  const carryDistanceData: number[] = []

  filteredShots.forEach((shot) => {
    offlineData.push(shot.offline)
    carryDistanceData.push(shot.carry_distance)

    if (shot.offline > dispersionRange[1]) {
      dispersionRange[1] = shot.offline
    } else if (shot.offline < dispersionRange[0]) {
      dispersionRange[0] = shot.offline
    }

    if (shot.carry_distance < carryDistanceRange[0]) {
      carryDistanceRange[0] = shot.carry_distance
    } else if (shot.carry_distance > carryDistanceRange[1]) {
      carryDistanceRange[1] = shot.carry_distance
    }
  })

  // set up the dispersion box plot
  useEffect(() => {
    if (offlineData.length === 0 || containerRef.current === null) {
      return
    }
    const plot = Plot.plot({
      width: 900,
      height: 200,
      marks: [
        Plot.boxX(offlineData, {
          r: 4,
          fill: 'steelblue',
          stroke: 'black',
        }),
      ],
      title: 'Shot Dispersion (yards)',
    })

    containerRef.current.append(plot)
    return () => {
      plot.remove()
    }
  }, [offlineData])

  return (
    <>
      <div className="m-4">
        <DatePickerWithRange date={date} setDate={setDate} />
        <h2>Filter by club</h2>
        {Object.entries(clubs).map(([club, count]) => (
          <Toggle
            key={club}
            variant="outline"
            onClick={() => {
              const newFilter = filter || {}
              club in newFilter
                ? delete newFilter[club]
                : (newFilter[club] = true)
              setFilter({ ...newFilter })
            }}
          >
            {club}: {count} shots
          </Toggle>
        ))}
        <Button key="all" variant="outline" onClick={() => setFilter(null)}>
          All clubs: {shots.length} shots
        </Button>

        <p>
          Dispersion Range: {dispersionRange[1]}L -{' '}
          {Math.abs(dispersionRange[0])}R yards
        </p>
        {offlineData.length > 0 && (
          <>
            <p>Median Dispersion: {quantile(offlineData, 0.5)}</p>
            <p>
              Dispersion Standard Deviation:{' '}
              {standardDeviation(offlineData).toFixed(2)} yards
            </p>
          </>
        )}
        <p>
          Carry Distance Range: {carryDistanceRange[0]} -{' '}
          {carryDistanceRange[1]} yards
        </p>
        <div ref={containerRef}></div>
      </div>
    </>
  )
}
