import type { TableRecord, TableRecordFormData } from '@/types/types'

const delay = (ms: number = 800) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const api = {
  create: async (data: TableRecordFormData): Promise<TableRecord> => {
    await delay()
    return { ...data, id: Date.now() + Math.floor(Math.random() * 100 + 1) }
  },
  update: async (
    id: number,
    data: TableRecordFormData
  ): Promise<TableRecord> => {
    await delay()
    return { ...data, id }
  },
  delete: async (): Promise<void> => {
    await delay()
  },
  search: async (
    query: string,
    allData: TableRecord[]
  ): Promise<TableRecord[]> => {
    await delay()
    if (!query) return allData
    const lowerQuery = query.toLowerCase()
    return allData.filter((record) =>
      record.name.toLowerCase().includes(lowerQuery)
    )
  },
}
