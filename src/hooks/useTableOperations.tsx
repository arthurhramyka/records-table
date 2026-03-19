import { useState, useCallback } from 'react'
import { message } from 'antd'
import { api } from '@/api/fakeApi'
import type { TableRecord, TableRecordFormData } from '@/types/types'

export const useTableOperations = (initialData: TableRecord[] = []) => {
  const [data, setData] = useState<TableRecord[]>(initialData)
  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(async (formData: TableRecordFormData) => {
    setLoading(true)
    try {
      const newRecord = await api.create(formData)
      setData((prev) => [newRecord, ...prev])
      message.success('New record created!')
    } catch (error) {
      message.error('Error! Something wrong')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const handleUpdate = useCallback(
    async (id: number, formData: TableRecordFormData) => {
      setLoading(true)
      try {
        const updatedRecord = await api.update(id, formData)
        setData((prev) =>
          prev.map((item) => (item.id === id ? updatedRecord : item))
        )
        message.success('Record updated!')
      } catch (error) {
        message.error('Error! Something wrong!')
        throw error
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const handleDelete = useCallback(async (record: TableRecord) => {
    setLoading(true)
    try {
      await api.delete(record.id)
      setData((prev) => prev.filter((item) => item.id !== record.id))
      message.success('Record deleted!')
    } catch (error) {
      message.error('Error! Something wrong!')
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, handleCreate, handleUpdate, handleDelete }
}
