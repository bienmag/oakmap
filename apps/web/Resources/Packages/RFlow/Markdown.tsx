type ButtonName = 'Headline' | 'Link' | 'Bold' | 'Italics' | 'List' | 'Code'

interface MarkdownButton {
  name: ButtonName
  markdown: string
}

export const allButtonTypes: MarkdownButton[] = [
  {
    name: 'Headline',
    markdown: '# Headline',
  },
  {
    name: 'Link',
    markdown: '[title](https://www.google.com)',
  },
  {
    name: 'Bold',
    markdown: '**Bold**',
  },
  {
    name: 'Italics',
    markdown: '*Italics*',
  },
  {
    name: 'List',
    markdown: '* List Item 1\n* List Item 2\n* List Item 3',
  },
  {
    name: 'Code',
    markdown: '`Code`'
  }
]

export const CBackInsertText = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  insertion: string
) => {
  const { current: textArea } = textAreaRef
  if (textArea === null) {
    return
  }
  const start = textArea.selectionStart
  const end = textArea.selectionEnd
  const text = textArea.value
  setText(text.slice(0, start) + insertion + text.slice(end) + '\n')
}
