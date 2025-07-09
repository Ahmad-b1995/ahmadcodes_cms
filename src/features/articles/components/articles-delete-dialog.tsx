import { ConfirmDialog } from '@/components/confirm-dialog'
import { Article } from '@/types/api'
import { useDeleteArticle } from '@/services/articles'

interface Props {
  currentRow: Article
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ArticlesDeleteDialog({ currentRow, open, onOpenChange }: Props) {
  const deleteArticle = useDeleteArticle()

  const handleConfirm = async () => {
    try {
      await deleteArticle.mutateAsync(currentRow.id)
      onOpenChange(false)
    } catch (error) {
      // Error handling is done in the service hook
      console.error('Failed to delete article:', error)
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Article"
      desc={
        <div>
          Are you sure you want to delete the article{' '}
          <span className="font-semibold">&quot;{currentRow.title}&quot;</span>?{' '}
          This action cannot be undone.
        </div>
      }
      confirmText="Delete Article"
      destructive
      isLoading={deleteArticle.isPending}
      handleConfirm={handleConfirm}
    />
  )
} 