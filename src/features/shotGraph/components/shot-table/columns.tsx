import type { Shot } from '@/types/shot'
import type { ColumnDef } from '@tanstack/react-table'
import { TickFormatter } from '../../utils/shot-utils'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

export const columns: ColumnDef<Shot>[] = [
  {
    accessorKey: 'club_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Club Name" />
    ),
  },
  {
    accessorKey: 'club_speed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Club Speed (mph)" />
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
    cell: (info) => <div>{TickFormatter(info.getValue() as number)}</div>,
  },
]
