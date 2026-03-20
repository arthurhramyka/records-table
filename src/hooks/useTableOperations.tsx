import { useState, useCallback } from 'react'
import { message } from 'antd'
import { api } from '@/api/fakeApi'
import type { TableRecord, TableRecordFormData } from '@/types/types'

export const useTableOperations = (initialData: TableRecord[] = []) => {
  const [sourceData, setSourceData] = useState<TableRecord[]>(initialData)
  const [data, setData] = useState<TableRecord[]>(initialData)
  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(async (formData: TableRecordFormData) => {
    setLoading(true)
    try {
      const newRecord = await api.create(formData)
      setSourceData((prev) => [newRecord, ...prev])
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
        setSourceData((prev) =>
          prev.map((item) => (item.id === id ? updatedRecord : item))
        )
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
      await api.delete()
      setSourceData((prev) => prev.filter((item) => item.id !== record.id))
      setData((prev) => prev.filter((item) => item.id !== record.id))
      message.success('Record deleted!')
    } catch (error) {
      message.error('Error! Something wrong!')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSearch = useCallback(
    async (query: string) => {
      setLoading(true)
      try {
        const result = await api.search(query, sourceData)
        setData(result)
      } catch (error) {
        message.error('Search failed')
      } finally {
        setLoading(false)
      }
    },
    [sourceData]
  )

  return {
    data,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSearch,
  }
}
