import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchIndex, type SearchEntry } from '../data/searchIndex'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return searchIndex.slice(0, 12)
    return searchIndex
      .filter(
        (entry) =>
          entry.title.toLowerCase().includes(q) ||
          entry.description.toLowerCase().includes(q) ||
          entry.keywords.some((k) => k.includes(q)),
      )
      .slice(0, 20)
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setVisible(true)
      window.setTimeout(() => inputRef.current?.focus(), 0)
      return
    }
    const timer = window.setTimeout(() => setVisible(false), 160)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter') {
        const hit = results[activeIndex]
        if (hit) {
          e.preventDefault()
          navigate(hit.href)
          onClose()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, activeIndex, navigate, onClose])

  if (!visible) return null

  function go(entry: SearchEntry) {
    navigate(entry.href)
    onClose()
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] ${
        open ? 'search-backdrop-in' : 'search-backdrop-out'
      }`}
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 cursor-default bg-black/65"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        className={`relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-2xl shadow-black/50 ${
          open ? 'search-dialog-in' : 'search-dialog-out'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg
            aria-hidden
            className="h-4 w-4 shrink-0 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, resources, exports…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
            aria-autocomplete="list"
            aria-controls="search-results"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-ink-faint">
            Esc
          </kbd>
        </div>
        <ul id="search-results" role="listbox" className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-ink-faint">No matches.</li>
          ) : (
            results.map((entry, index) => (
              <li key={`${entry.href}-${entry.title}`} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  className={`flex w-full flex-col rounded-xl px-3 py-2.5 text-left transition ${
                    index === activeIndex ? 'bg-accent-soft' : 'hover:bg-surface-overlay/70'
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => go(entry)}
                >
                  <span className={`text-sm font-medium ${index === activeIndex ? 'text-accent' : 'text-ink'}`}>
                    {entry.title}
                  </span>
                  <span className="text-xs text-ink-faint">{entry.description}</span>
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-border px-4 py-2 text-[0.7rem] text-ink-faint">
          ↑↓ navigate · Enter open · Esc close · / or Ctrl K to open
        </p>
      </div>
    </div>
  )
}
