import { Button, Space, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { TableRecord } from '@/types/types'

interface ActionButtonsProps {
  record: TableRecord
  onEdit?: (record: TableRecord) => void
  onDelete?: (record: TableRecord) => void
}

export const ActionButtons = ({
  record,
  onEdit,
  onDelete,
}: ActionButtonsProps) => {
  return (
    <Space size="middle">
      <Tooltip title="Edit record">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit?.(record)}
          aria-label={`Edit ${record.name}`}
        />
      </Tooltip>
      <Tooltip title="Delete record">
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete?.(record)}
          aria-label={`Delete ${record.name}`}
        />
      </Tooltip>
    </Space>
  )
}
