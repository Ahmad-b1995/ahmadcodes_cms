import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Article } from '@/types/api'

type ArticlesDialogType = 'create' | 'edit' | 'delete'

interface ArticlesContextType {
  open: ArticlesDialogType | null
  setOpen: (str: ArticlesDialogType | null) => void
  currentRow: Article | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Article | null>>
}

const ArticlesContext = React.createContext<ArticlesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ArticlesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ArticlesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Article | null>(null)

  return (
    <ArticlesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ArticlesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useArticlesContext = () => {
  const articlesContext = React.useContext(ArticlesContext)

  if (!articlesContext) {
    throw new Error('useArticlesContext has to be used within <ArticlesContext>')
  }

  return articlesContext
} 