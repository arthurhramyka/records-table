import { ActionButtons } from '@/components/generic/ActionButtons'
import type { TableRecord } from '@/types/types'
import type { TableColumnType } from 'antd'
import { useMemo } from 'react'

export const useTableColumns = (
  onEdit: (rec: TableRecord) => void,
  onDelete: (rec: TableRecord) => void
): TableColumnType<TableRecord>[] => {
  return useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 300,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        sorter: (a, b) => a.value - b.value,
      },
      {
        title: 'Actions',
        key: 'actions',
        align: 'center',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
          <ActionButtons
            record={record}
            onEdit={() => onEdit(record)}
            onDelete={() => onDelete(record)}
          />
        ),
      },
    ],
    [onEdit, onDelete]
  )
}
