import { RecordModal } from '@/components/RecordsTable/RecordModal'
import { RecordsTable } from '@/components/RecordsTable'
import { useModalState } from '@/hooks/useModalState'
import { useTableOperations } from '@/hooks/useTableOperations'
import type { TableRecord, TableRecordFormData } from '@/types/types'

const initialRecords: TableRecord[] = [
  { id: 1, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
  { id: 2, name: 'Pastyr Andersen', date: '2000-01-20', value: 15100.5 },
  { id: 3, name: 'Vanya Antohin', date: '2011-02-02', value: 150.5 },
  { id: 4, name: 'Petr Dinosaur', date: '2026-03-19', value: 15004.5 },
  { id: 5, name: 'Cracker Pavlov', date: '2026-03-19', value: 20.5 },
  { id: 6, name: 'Venuta Debuta', date: '2026-03-19', value: 5500.5 },
  { id: 7, name: 'Zelezniy Beton', date: '2026-03-19', value: 3500.5 },
  { id: 8, name: 'Sasha', date: '2001-01-01', value: 8500.51 },
]

function App() {
  const {
    data,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSearch,
  } = useTableOperations(initialRecords)

  const { isOpen, editingItem, openModal, closeModal } =
    useModalState<TableRecord>()

  const handleSubmit = async (formData: TableRecordFormData) => {
    if (editingItem) {
      await handleUpdate(editingItem.id, formData)
    } else {
      await handleCreate(formData)
    }
    closeModal()
  }

  return (
    <>
      <RecordsTable
        loading={loading}
        title="Records table"
        data={data}
        onAdd={() => openModal()}
        onDelete={handleDelete}
        onEdit={openModal}
        onSearch={handleSearch}
      />
      <RecordModal
        isOpen={isOpen}
        initialData={editingItem}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default App
