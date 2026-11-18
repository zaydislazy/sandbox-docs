import { Highlight, themes } from 'prism-react-renderer'
import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = 'lua', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const trimmed = code.replace(/^\n+|\n+$/g, '')

  async function copy() {
    try {
      await navigator.clipboard.writeText(trimmed)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="my-5 overflow-hidden rounded-lg border border-border bg-surface-raised">
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 text-xs text-ink-faint">
          {title ? <span className="font-medium text-ink-muted">{title}</span> : null}
          <span className="rounded bg-surface-overlay px-1.5 py-0.5 font-mono uppercase">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={() => void copy()}
          className="rounded px-2 py-1 text-xs font-medium text-ink-muted transition hover:bg-surface-overlay hover:text-ink"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <Highlight theme={themes.nightOwl} code={trimmed} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-4 text-[0.85rem] leading-relaxed`}
            style={{ ...style, background: 'transparent', margin: 0 }}
          >
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  )
}
