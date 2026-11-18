import type { ReactNode } from 'react'
import { getAdjacent } from '../data/navigation'
import { PageHeader } from './PageHeader'
import { PrevNext } from './PrevNext'

interface DocPageProps {
  title: string
  description: string
  href: string
  children: ReactNode
}

export function DocPage({ title, description, href, children }: DocPageProps) {
  const { prev, next } = getAdjacent(href)
  return (
    <article className="prose-docs mx-auto max-w-2xl xl:mx-0 xl:max-w-3xl">
      <PageHeader title={title} description={description} />
      <div className="space-y-2">{children}</div>
      <PrevNext prev={prev} next={next} />
    </article>
  )
}
