import { RecordModal } from '@/components/RecordsTable/RecordModal'
import { RecordsTable } from '@/components/RecordsTable'
import { useModalState } from '@/hooks/useModalState'
import { useTableOperations } from '@/hooks/useTableOperations'
import type { TableRecord, TableRecordFormData } from '@/types/types'

const initialRecords: TableRecord[] = [
  { id: 1, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
  { id: 2, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
  { id: 3, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
  { id: 4, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
  { id: 5, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
  { id: 6, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
  { id: 7, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
  { id: 8, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
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
