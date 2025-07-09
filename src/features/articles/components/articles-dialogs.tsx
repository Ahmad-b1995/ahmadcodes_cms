import { useArticlesContext } from '../context/articles-context'
import { ArticlesActionDialog } from './articles-action-dialog'
import { ArticlesDeleteDialog } from './articles-delete-dialog'

export function ArticlesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useArticlesContext()
  
  return (
    <>
      <ArticlesActionDialog
        key='article-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <ArticlesActionDialog
            key={`article-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ArticlesDeleteDialog
            key={`article-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
} 