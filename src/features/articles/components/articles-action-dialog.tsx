'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Article } from '@/types/api'
import { useCreateArticle, useUpdateArticle } from '@/services/articles'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
})

type ArticleForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Article
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ArticlesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const createArticle = useCreateArticle()
  const updateArticle = useUpdateArticle()

  const form = useForm<ArticleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          title: currentRow.title,
          content: currentRow.content,
          imageSrc: currentRow.image?.src || '',
          imageAlt: currentRow.image?.alt || '',
        }
      : {
          title: '',
          content: '',
          imageSrc: '',
          imageAlt: '',
        },
  })

  const onSubmit = async (values: ArticleForm) => {
    try {
      // Create image object if src is provided
      const image = values.imageSrc ? {
        src: values.imageSrc,
        alt: values.imageAlt || values.title
      } : undefined

      if (isEdit && currentRow) {
        await updateArticle.mutateAsync({
          id: currentRow.id,
          data: {
            title: values.title,
            content: values.content,
            image: image,
          },
        })
      } else {
        // Create article - image is optional
        await createArticle.mutateAsync({
          title: values.title,
          content: values.content,
          image: image,
        })
      }
      
      form.reset()
      onOpenChange(false)
    } catch (error) {
      // Error handling is done in the service hooks
      console.error('Failed to save article:', error)
    }
  }

  const isLoading = createArticle.isPending || updateArticle.isPending

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!isLoading) {
          form.reset()
          onOpenChange(state)
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit Article' : 'Create New Article'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the article details. ' : 'Create a new article for your content management system. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[32rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='article-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter article title'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right pt-2'>
                      Content
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter article content'
                        className='col-span-4 min-h-32 resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='imageSrc'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Image URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='https://example.com/image.jpg'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='imageAlt'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Image Alt Text
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Descriptive text for the image'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button 
            type='submit' 
            form='article-form'
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Article'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 