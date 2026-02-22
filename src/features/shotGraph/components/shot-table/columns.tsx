import type { Shot } from '@/types/shot'
import type { ColumnDef } from '@tanstack/react-table'
import { DirectionFormatter } from '../../utils/shot-utils'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

export const columns: ColumnDef<Shot>[] = [
  {
    accessorKey: 'club_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Club Name" />
    ),
  },
  {
    accessorKey: 'ball_speed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ball Speed (mph)" />
    ),
  },
  {
    accessorKey: 'carry_distance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Carry Distance (yards)" />
    ),
  },
  {
    accessorKey: 'total_distance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Distance (yards)" />
    ),
  },
  {
    accessorKey: 'offline',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Offline (yards)" />
    ),
    cell: (info) => <div>{DirectionFormatter(info.getValue() as number)}</div>,
  },
  {
    accessorKey: 'peak_height',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Peak Height (yards)" />
    ),
  },
  {
    accessorKey: 'descent_angle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descent Angle" />
    ),
    cell: (info) => <div>{info.getValue() as number}°</div>,
  },
  {
    accessorKey: 'horizontal_launch_angle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Horizontal Launch Angle" />
    ),
    cell: (info) => (
      <div>{DirectionFormatter(info.getValue() as number, '°')}</div>
    ),
  },
  {
    accessorKey: 'vertical_launch_angle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vertical Launch Angle" />
    ),
    cell: (info) => <div>{info.getValue() as number}°</div>,
  },
  {
    accessorKey: 'back_spin',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Back Spin (rpm)" />
    ),
  },
  {
    accessorKey: 'spin_axis',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Spin Axis (°)" />
    ),
    cell: (info) => (
      <div>{DirectionFormatter(info.getValue() as number, '°')}</div>
    ),
  },
  {
    accessorKey: 'club_speed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Club Speed (mph)" />
    ),
  },
]
