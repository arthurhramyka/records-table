export interface TableRecord {
  id: number
  name: string
  date: string
  value: number
}

export type TableRecordFormData = Omit<TableRecord, 'id'>
