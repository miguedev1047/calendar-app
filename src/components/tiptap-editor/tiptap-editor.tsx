import '@/styles/tiptap-styles.css'
import StarterKit from '@tiptap/starter-kit'

import { Placeholder } from '@tiptap/extensions'
import { useEditor, EditorContent } from '@tiptap/react'
import { ToolbarEditor } from '@/components/tiptap-editor'

interface TiptapEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
}

export function TiptapEditor({
  content = '',
  onChange,
  placeholder = 'Start writing...'
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder
      }),
      StarterKit.configure({
        heading: {
          levels: [1, 2]
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false
        }
      })
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-full p-4 max-w-none'
      }
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    }
  })

  if (!editor) return null

  return (
    <div className="border border-border rounded-lg overflow-hidden h-full flex flex-col min-h-[300px]">
      <ToolbarEditor editor={editor} />

      <div className="flex-1 overflow-auto min-h-0">
        <EditorContent editor={editor} className="h-full min-h-[200px]" />
      </div>
    </div>
  )
}
