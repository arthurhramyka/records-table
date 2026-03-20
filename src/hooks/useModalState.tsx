import { useState, useCallback } from 'react'

export const useModalState = <T,>() => {
  const [isOpen, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)

  const openModal = useCallback((item?: T) => {
    setEditingItem(item ?? null)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setEditingItem(null)
  }, [])

  return { isOpen, editingItem, openModal, closeModal }
}
