interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-10 border-b border-border pb-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl md:leading-tight">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg md:leading-relaxed">
        {description}
      </p>
    </header>
  )
}
