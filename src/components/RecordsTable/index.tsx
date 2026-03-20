import { useState, useEffect } from 'react'
import { Table, Typography, Card, Button, Input, Flex } from 'antd'
import type { TableProps } from 'antd'
import type { TableRecord } from '@/types/types'
import { useTableColumns } from '@/hooks/useTableColumns'
import { useDebounce } from '@/hooks/useDebounce'

const { Title } = Typography

interface DataTableProps {
  data: TableRecord[]
  loading?: boolean
  title: string
  onEdit: (record: TableRecord) => void
  onDelete: (record: TableRecord) => void
  onAdd: () => void
  onSearch: (query: string) => void
  tableProps?: Partial<TableProps<TableRecord>>
}

export const RecordsTable = ({
  data = [],
  loading = false,
  title,
  onEdit,
  onDelete,
  onAdd,
  onSearch,
  tableProps,
}: DataTableProps) => {
  const columns = useTableColumns(onEdit, onDelete)

  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    onSearch(debouncedSearchValue)
  }, [debouncedSearchValue])

  return (
    <Card className="table-card">
      <Title level={3} className="table-title">
        {title}
      </Title>

      <Flex wrap={true} gap={'5px'} className="table-controls">
        <Button type="primary" onClick={onAdd}>
          Add row
        </Button>
        <Input
          placeholder="Search by everything"
          allowClear
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="table-search"
        />
      </Flex>

      <Table<TableRecord>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{ x: 800, y: 400 }}
        bordered
        {...tableProps}
      />
    </Card>
  )
}

export default RecordsTable
