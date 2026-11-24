import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { flatNav, navGroups } from '../data/navigation'
import { PageMotion } from './PageMotion'
import type { TocHeading } from './TableOfContents'
import { SearchDialog } from './SearchDialog'
import { TableOfContents } from './TableOfContents'

interface DocLayoutProps {
  children?: ReactNode
}

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('sandbox-docs-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    localStorage.setItem('sandbox-docs-theme', theme)
  }, [theme])

  return { theme, setTheme }
}

export function DocLayout({ children }: DocLayoutProps) {
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [headings, setHeadings] = useState<TocHeading[]>([])
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (!location.hash) return
    const id = decodeURIComponent(location.hash.slice(1))
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }, [location.pathname, location.hash])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    // wipe old TOC so it doesn't bleed onto the next page
    setHeadings([])

    let cancelled = false
    let frame2 = 0

    const readHeadings = () => {
      if (cancelled) return
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>('.prose-docs h2[id], .prose-docs h3[id]'),
      )
      setHeadings(
        nodes.map((node) => ({
          id: node.id,
          text: node.textContent ?? node.id,
          level: node.tagName === 'H3' ? 3 : 2,
        })),
      )
    }

    // page content mounts a tick late, so we poke twice
    const frame1 = window.requestAnimationFrame(() => {
      frame2 = window.requestAnimationFrame(readHeadings)
    })
    const timeout = window.setTimeout(readHeadings, 50)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame1)
      window.cancelAnimationFrame(frame2)
      window.clearTimeout(timeout)
    }
  }, [location.pathname])

  const current = flatNav.find((item) => item.href === location.pathname)

  function navLinkEnd(href: string) {
    // without end, /architecture stays lit on /architecture/exports
    if (href === '/') return true
    return flatNav.some((other) => other.href !== href && other.href.startsWith(`${href}/`))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-surface"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
        <div className="flex h-16 items-center gap-3 px-4 lg:px-5">
          <button
            type="button"
            className="rounded-md border border-border px-2.5 py-1.5 text-sm text-ink-muted transition hover:border-accent/40 lg:hidden"
            aria-label="Toggle navigation"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            Menu
          </button>

          <Link to="/" className="flex min-w-0 items-center gap-3 transition hover:opacity-90">
            <img
              src="/logo.png"
              alt="Sandbox Roleplay"
              className="h-10 w-auto max-w-[200px] object-contain object-left sm:h-11 sm:max-w-[240px]"
            />
            <span className="hidden rounded-md border border-accent/30 bg-accent-soft px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-accent uppercase md:inline">
              Docs
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-2 hidden min-w-0 flex-1 items-center gap-3 rounded-xl border border-border bg-surface-raised px-3 py-2 text-left text-sm text-ink-faint transition hover:border-accent/40 hover:bg-surface-overlay md:flex lg:mx-8 lg:max-w-md"
          >
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
            <span className="truncate">Quick search docs, resources, exports…</span>
            <kbd className="ml-auto hidden rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] lg:inline">
              Ctrl K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <button
              type="button"
              className="rounded-md border border-border px-2 py-1.5 text-sm text-ink-muted transition hover:border-accent/40 md:hidden"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              Search
            </button>
            <button
              type="button"
              className="rounded-md border border-border px-2 py-1.5 text-sm text-ink-muted transition hover:border-accent/40"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto border-r border-border bg-surface pt-16 transition-transform duration-300 ease-out lg:sticky lg:top-16 lg:z-0 lg:block lg:h-[calc(100vh-4rem)] lg:w-64 lg:shrink-0 lg:translate-x-0 lg:pt-0 xl:w-72 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="border-b border-border px-4 py-4 lg:hidden">
            <img src="/logo.png" alt="" className="h-9 w-auto object-contain" />
            <p className="mt-2 text-xs text-ink-faint">Sandbox framework docs</p>
          </div>

          <nav aria-label="Documentation" className="space-y-7 p-4 pb-10">
            <p className="px-2 text-xs leading-relaxed text-ink-faint">
              New here? Start with{' '}
              <NavLink to="/setup" className="text-accent transition hover:text-accent-gold">
                Setup Guide
              </NavLink>
              .
            </p>
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-2.5 px-2 text-xs font-semibold tracking-wide text-ink-faint uppercase">
                  {group.title}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <NavLink
                        to={item.href}
                        end={navLinkEnd(item.href)}
                        className={({ isActive }) =>
                          `block rounded-md px-2.5 py-2 text-sm leading-snug transition-colors duration-150 ${
                            isActive
                              ? 'bg-accent-soft font-medium text-accent'
                              : 'text-ink-muted hover:bg-surface-overlay hover:text-ink'
                          }`
                        }
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-black/60 transition-opacity lg:hidden"
            aria-label="Close menu overlay"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-1">
            <main id="main" className="min-w-0 flex-1 px-5 py-10 md:px-10 lg:px-12">
              {current ? (
                <p className="mb-3 text-xs tracking-wide text-accent uppercase">{current.group}</p>
              ) : null}
              <PageMotion>{children ?? <Outlet />}</PageMotion>
            </main>

            <aside className="hidden w-52 shrink-0 px-4 py-10 xl:block 2xl:w-56">
              <TableOfContents headings={headings} />
            </aside>
          </div>

          <footer className="mt-auto border-t border-border bg-surface-raised/60 px-5 py-8 md:px-10 lg:px-12">
            <div className="flex max-w-3xl flex-col gap-4 text-sm text-ink-muted">
              <p>
                Docs for Sandbox Roleplay. Maintained by{' '}
                <a
                  href="https://github.com/zaydislazy"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-accent transition hover:text-accent-gold"
                >
                  zaydislazy
                </a>
                . Framework:{' '}
                <a
                  href="https://github.com/AutLaaw/sandbox-fivem"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent transition hover:text-accent-gold"
                >
                  AutLaaw/sandbox-fivem
                </a>
                . Want to help? See{' '}
                <Link to="/contribute" className="text-accent transition hover:text-accent-gold">
                  Contributing
                </Link>
                .
              </p>
              <p className="text-xs text-ink-faint">© {new Date().getFullYear()} zaydislazy</p>
            </div>
          </footer>
        </div>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
