import { ShotGraph } from '@/features/shotGraph/components/shot-graph'
import { ShotTable } from '@/features/shotGraph/components/shot-table/shot-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <ShotGraph />
      <ShotTable />
    </>
  )
}
