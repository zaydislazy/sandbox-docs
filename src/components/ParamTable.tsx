import type { Param } from '../types/docs'

interface ParamTableProps {
  params: Param[]
}

export function ParamTable({ params }: ParamTableProps) {
  if (params.length === 0) {
    return <p className="text-sm text-ink-faint">No parameters.</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-surface-overlay text-ink-muted">
          <tr>
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param) => (
            <tr key={param.name} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-accent">
                {param.name}
                {param.optional ? '?' : ''}
              </td>
              <td className="px-3 py-2 font-mono text-ink-muted">{param.type}</td>
              <td className="px-3 py-2 text-ink-muted">{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
