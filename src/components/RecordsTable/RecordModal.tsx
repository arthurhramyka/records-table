import { useEffect, useState } from 'react'
import { DatePicker, Form, Input, InputNumber, message } from 'antd'
import type { FormProps } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import { GenericModal } from '@/components/generic/GenericModal'
import type { TableRecord, TableRecordFormData } from '@/types/types'

interface RecordModalProps {
  isOpen: boolean
  initialData: TableRecord | null
  onClose: () => void
  onSubmit: (data: TableRecordFormData) => Promise<void>
}

interface RecordModalFormValues {
  name: string
  date: Dayjs
  value: number
}

export const RecordModal = ({
  isOpen,
  initialData,
  onClose,
  onSubmit,
}: RecordModalProps) => {
  const [form] = Form.useForm<RecordModalFormValues>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = !!initialData

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        value: initialData.value,
        date: dayjs(initialData.date),
      })
    } else {
      form.resetFields()
    }
  }, [form, initialData, isOpen])

  const handleFinish: FormProps<RecordModalFormValues>['onFinish'] = async (
    values
  ) => {
    setIsSubmitting(true)

    try {
      const formattedData: TableRecordFormData = {
        name: values.name,
        value: values.value,
        date: values.date.format('YYYY-MM-DD'),
      }

      await onSubmit(formattedData)
      form.resetFields()
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
          rules={[{ required: true, message: 'Date is required' }]}
        >
          <DatePicker className="full-width-input" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Value"
          name="value"
          rules={[
            { required: true, message: 'Enter value' },
            { type: 'number', message: 'Value must be a number' },
          ]}
        >
          <InputNumber className="full-width-input" placeholder="Enter value" />
        </Form.Item>
      </Form>
    </GenericModal>
  )
}
