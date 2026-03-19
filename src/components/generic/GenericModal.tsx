import { Modal } from 'antd'
import type { ModalProps } from 'antd'

export const GenericModal = ({ children, ...props }: ModalProps) => {
  return (
    <Modal destroyOnHidden {...props}>
      {children}
    </Modal>
  )
}
