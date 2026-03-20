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
    <Card style={{ margin: '24px auto', maxWidth: '1200px' }}>
      <Title level={3} style={{ marginBottom: '24px' }}>
        {title}
      </Title>

      <Flex wrap={true} gap={'5px'} style={{ marginBottom: '5px' }}>
        <Button type="primary" onClick={onAdd}>
          Add row
        </Button>
        <Input.Search
          placeholder="Search by name..."
          allowClear
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: '100%', maxWidth: '300px' }}
        />
      </Flex>

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
