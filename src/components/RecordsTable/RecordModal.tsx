import { useEffect, useState } from 'react'
import { Form, Input, InputNumber, DatePicker, message } from 'antd'
import dayjs from 'dayjs'
import { GenericModal } from '@/components/generic/GenericModal'
import type { TableRecord, TableRecordFormData } from '@/types/types'

interface RecordModalProps {
  isOpen: boolean
  initialData: TableRecord | null
  onClose: () => void
  onSubmit: (data: TableRecordFormData) => Promise<void>
}

export const RecordModal = ({
  isOpen,
  initialData,
  onClose,
  onSubmit,
}: RecordModalProps) => {
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = !!initialData

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.setFieldsValue({
          name: initialData.name,
          value: initialData.value,
          date: dayjs(initialData.date),
        })
      } else {
        form.resetFields()
      }
    }
  }, [initialData])

  const handleFinish = async (values: any) => {
    setIsSubmitting(true)
    try {
      const formattedData: TableRecordFormData = {
        name: values.name,
        value: values.value,
        date: values.date.format('YYYY-MM-DD'),
      }
      await onSubmit(formattedData)
      onClose()
    } catch {
      message.error('Submit failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <GenericModal
      title={isEditing ? 'Update Record' : 'Add record'}
      open={isOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={isSubmitting}
      okText={isEditing ? 'Save' : 'Add'}
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Name is required' },
            { min: 3, message: 'Minimum length 3 symbols' },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Value"
          name="value"
          rules={[
            { required: true, message: 'Enter value' },
            { type: 'number', message: 'Value must be number' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Enter value" />
        </Form.Item>
      </Form>
    </GenericModal>
  )
}
