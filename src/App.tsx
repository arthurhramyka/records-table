import { useCallback } from 'react'
import { RecordModal } from '@/components/RecordsTable/RecordModal'
import { RecordsTable } from '@/components/RecordsTable'
import { useModalState } from '@/hooks/useModalState'
import { useTableOperations } from '@/hooks/useTableOperations'
import type { TableRecord, TableRecordFormData } from '@/types/types'

const initialRecords: TableRecord[] = [
  { id: 1, name: 'John Doe', date: '2026-03-19', value: 1500.5 },
]

function App() {
  const { data, loading, handleCreate, handleUpdate, handleDelete } =
    useTableOperations(initialRecords)

  const { isOpen, editingItem, openModal, closeModal } =
    useModalState<TableRecord>()

  const handleOpenCreate = useCallback(() => {
    openModal()
  }, [openModal])

  const handleOpenEdit = useCallback(
    (record: TableRecord) => {
      openModal(record)
    },
    [openModal]
  )

  const handleSubmit = useCallback(
    async (formData: TableRecordFormData) => {
      if (editingItem) {
        await handleUpdate(editingItem.id, formData)
        return
      }

      await handleCreate(formData)
    },
    [editingItem, handleCreate, handleUpdate]
  )

  const handleDeleteRecord = useCallback(
    (record: TableRecord) => {
      void handleDelete(record)
    },
    [handleDelete]
  )

  return (
    <>
      <RecordsTable
        loading={loading}
        title="Records table"
        data={data}
        onAdd={handleOpenCreate}
        onDelete={handleDeleteRecord}
        onEdit={handleOpenEdit}
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
