'use client'

import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { cn } from '@/lib/utils'
import { Post } from '@/lib/types'

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent
} from 'novel'

import { ImageResizer, handleCommandNavigation, handleImageDrop, handleImagePaste } from 'novel'

import {
  slashCommand,
  suggestionItems
} from '@/components/editor/slash-command'
import EditorMenu from '@/components/editor/editor-menu'
import { uploadFn } from '@/components/editor/image-upload'
import { defaultExtensions } from '@/components/editor/extensions'
import { TextButtons } from '@/components/editor/selectors/text-buttons'
import { LinkSelector } from '@/components/editor/selectors/link-selector'
import { NodeSelector } from '@/components/editor/selectors/node-selector'
import { MathSelector } from '@/components/editor/selectors/math-selector'
import { ColorSelector } from '@/components/editor/selectors/color-selector'

import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

const hljs = require('highlight.js')

const extensions = [...defaultExtensions, slashCommand]

export const defaultEditorContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

interface EditorProps {
  post?: Post
  editable?: boolean
  setContent?: (content: JSONContent) => void
  autoSave?: boolean
  storageKey?: string
}

export default function Editor({
  post,
  editable = true,
  setContent,
  autoSave = true,
  storageKey = 'editor-content'
}: EditorProps) {
  const [saveStatus, setSaveStatus] = useState('Saved')
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ words: 0, characters: 0 })
  const [error, setError] = useState<string | null>(null)

  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openAI, setOpenAI] = useState(false)

  const initialContent = post?.content
    ? JSON.parse(post.content)
    : defaultEditorContent

  // Auto-save functionality
  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      try {
        const json = editor.getJSON()
        const stats = editor.storage.characterCount
        setStats({
          words: stats.words(),
          characters: stats.characters()
        })
        
        if (autoSave) {
          window.localStorage.setItem(
            `${storageKey}-novel-content`,
            JSON.stringify(json)
          )
          // Only try to save markdown if the extension is available
          if (editor.storage.markdown) {
            window.localStorage.setItem(
              `${storageKey}-markdown`,
              editor.storage.markdown.getMarkdown()
            )
          }
          setSaveStatus('Saved')
          setError(null)
        }
      } catch (err) {
        console.error('Error saving content:', err)
        setError('Failed to save content. Please try again.')
        setSaveStatus('Error')
      }
    },
    1000
  )

  // Load saved content on mount
  useEffect(() => {
    try {
      if (autoSave) {
        const savedContent = window.localStorage.getItem(`${storageKey}-novel-content`)
        if (savedContent) {
          setContent?.(JSON.parse(savedContent))
        }
      }
      setIsLoading(false)
    } catch (err) {
      console.error('Error loading saved content:', err)
      setError('Failed to load saved content. Starting fresh.')
      setIsLoading(false)
    }
  }, [autoSave, storageKey])

  // Apply Codeblock Highlighting
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, 'text/html')
    doc.querySelectorAll('pre code').forEach(el => {
      // @ts-ignore
      hljs.highlightElement(el)
    })
    return new XMLSerializer().serializeToString(doc)
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-screen-lg space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-[450px] w-full" />
      </div>
    )
  }

  return (
    <div className='relative w-full max-w-screen-lg space-y-4'>
      {/* Editor Instructions */}
      <Alert className="bg-muted/50">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <p className="text-sm text-muted-foreground">
            Start typing to begin. Use the toolbar above for formatting. Press{' '}
            <kbd className="rounded bg-muted px-2 py-1 text-xs">Ctrl/Cmd + S</kbd>{' '}
            to save manually.
          </p>
        </AlertDescription>
      </Alert>

      <EditorRoot>
        <EditorContent
          immediatelyRender={false}
          initialContent={initialContent}
          extensions={extensions}
          className={cn(
            'relative w-full max-w-screen-lg bg-background',
            editable
              ? 'min-h-[450px] max-h-[600px] overflow-y-auto rounded-md border border-input shadow-sm p-4'
              : 'min-h-[500px]'
          )}
          editorProps={{
            handleDOMEvents: {
              keydown: (view, event) => {
                // Handle keyboard shortcuts
                if ((event.metaKey || event.ctrlKey) && event.key === 's') {
                  event.preventDefault()
                  setSaveStatus('Saving...')
                  return true
                }
                return handleCommandNavigation(event)
              }
            },
            handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: `prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full ${
                editable ? 'cursor-text text-sm' : 'cursor-default !p-0'
              }`,
              'data-placeholder': 'Type / for commands...'
            }
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor)
            setSaveStatus('Unsaved')
            if (setContent) setContent(editor.getJSON())
          }}
          onCreate={({ editor }) => {
            if (!editable) editor.setEditable(editable)
          }}
          slotAfter={<ImageResizer />}
        >
          <div className="absolute bottom-2 right-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{stats.words} words</span>
            <span>•</span>
            <span>{stats.characters} characters</span>
            <span>•</span>
            <span className={cn(
              saveStatus === 'Error' && 'text-red-500',
              saveStatus === 'Unsaved' && 'text-yellow-500',
              saveStatus === 'Saved' && 'text-green-500'
            )}>
              {saveStatus}
            </span>
          </div>

          {error && (
            <div className="absolute top-2 right-2">
              <Alert variant="destructive" className="bg-destructive/10">
                <AlertDescription className="text-xs">
                  {error}
                </AlertDescription>
              </Alert>
            </div>
          )}

          <EditorCommand className='z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
            <EditorCommandEmpty className='px-2 text-muted-foreground'>
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item: any) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val: any) => item.command?.(val)}
                  className='flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent'
                  key={item.title}
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
                    {item.icon}
                  </div>
                  <div>
                    <p className='font-medium'>{item.title}</p>
                    <p className='text-xs text-muted-foreground'>
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorMenu open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation='vertical' />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation='vertical' />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation='vertical' />
            <MathSelector />
            <Separator orientation='vertical' />
            <TextButtons />
            <Separator orientation='vertical' />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorMenu>
        </EditorContent>
      </EditorRoot>
    </div>
  )
}