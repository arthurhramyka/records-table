import { Table, Typography, Card, Button } from 'antd'
import type { TableProps } from 'antd'
import type { TableRecord } from '@/types/types'
import { useTableColumns } from '@/hooks/useTableColumns'

const { Title } = Typography

interface DataTableProps {
  data: TableRecord[]
  loading?: boolean
  title: string
  onEdit: (record: TableRecord) => void
  onDelete: (record: TableRecord) => void
  onAdd: () => void
  tableProps?: Partial<TableProps<TableRecord>>
}

export const RecordsTable = ({
  data = [],
  loading = false,
  title,
  onEdit,
  onDelete,
  onAdd,
  tableProps,
}: DataTableProps) => {
  const columns = useTableColumns(onEdit, onDelete)

  return (
    <Card style={{ margin: '24px auto', maxWidth: '1200px' }}>
      <Title level={3} style={{ marginBottom: '24px' }}>
        {title}
      </Title>
      <Button type="primary" onClick={onAdd}>
        Add row
      </Button>
      <Table<TableRecord>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{ x: 800 }}
        bordered
        {...tableProps}
      />
    </Card>
  )
}

export default RecordsTable
