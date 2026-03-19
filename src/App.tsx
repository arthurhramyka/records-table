import { RecordsTable } from '@/components/RecordsTable'
import type { TableRecord } from '@/types/types'

function App() {
  const mockData: TableRecord[] = [
    { id: 1, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
    { id: 2, name: 'Jane Smith', date: '2026-03-18', value: 840.0 },
    { id: 3, name: 'Alice Johnson', date: '2026-03-17', value: 2300.75 },
    { id: 4, name: 'Alice Johnson', date: '2026-03-17', value: 2300.75 },
    { id: 5, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
    { id: 6, name: 'Jane Smith', date: '2026-03-18', value: 840.0 },
    { id: 7, name: 'Alice Johnson', date: '2026-03-17', value: 2300.75 },
    { id: 8, name: 'Alice Johnson', date: '2026-03-17', value: 2300.75 },
    { id: 9, name: 'Alice Johnson', date: '2026-03-17', value: 2300.75 },
    { id: 10, name: 'Alice Johnson', date: '2026-03-17', value: 2300.75 },
    { id: 11, name: 'Alice Johnson', date: '2026-03-17', value: 2300.75 },
  ]

  return (
    <RecordsTable
      loading={false}
      title="Records table"
      data={mockData}
      onAdd={() => {}}
      onDelete={() => {}}
      onEdit={() => {}}
    />
  )
}

export default App
