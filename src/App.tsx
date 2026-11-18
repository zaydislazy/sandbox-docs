import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DocLayout } from './components/DocLayout'
import { AdminPage } from './pages/AdminPage'
import { Architecture } from './pages/Architecture'
import { ArchitectureExports } from './pages/ArchitectureExports'
import { ArchitectureNui } from './pages/ArchitectureNui'
import { DatabasePage } from './pages/DatabasePage'
import { Differences } from './pages/Differences'
import { EventsPage } from './pages/EventsPage'
import { BestPractices } from './pages/guide/BestPractices'
import { CreatingResource } from './pages/guide/CreatingResource'
import { DatabaseGuide } from './pages/guide/DatabaseGuide'
import { GettingData } from './pages/guide/GettingData'
import { ReactNuiGuide } from './pages/guide/ReactNui'
import { UsingExports } from './pages/guide/UsingExports'
import { Introduction } from './pages/Introduction'
import { ResourceDetail } from './pages/ResourceDetail'
import { ResourcesIndex } from './pages/ResourcesIndex'
import { SetupGuide } from './pages/SetupGuide'
import { Troubleshooting } from './pages/Troubleshooting'

const ExportsPage = lazy(async () => {
  const mod = await import('./pages/ExportsPage')
  return { default: mod.ExportsPage }
})

function RouteFallback() {
  return <p className="page-enter text-sm text-ink-faint">Loading…</p>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DocLayout />}>
          <Route index element={<Introduction />} />
          <Route path="setup" element={<SetupGuide />} />
          <Route path="quick-start" element={<Navigate to="/setup#quick-path" replace />} />
          <Route path="installation" element={<Navigate to="/setup#full-install" replace />} />
          <Route path="configuration" element={<Navigate to="/setup#configuration" replace />} />
          <Route path="differences" element={<Differences />} />
          <Route path="architecture" element={<Architecture />} />
          <Route path="architecture/exports" element={<ArchitectureExports />} />
          <Route path="architecture/nui" element={<ArchitectureNui />} />
          <Route path="guide/creating-a-resource" element={<CreatingResource />} />
          <Route path="guide/exports" element={<UsingExports />} />
          <Route path="guide/react-nui" element={<ReactNuiGuide />} />
          <Route path="guide/database" element={<DatabaseGuide />} />
          <Route path="guide/getting-data" element={<GettingData />} />
          <Route path="guide/best-practices" element={<BestPractices />} />
          <Route path="resources" element={<ResourcesIndex />} />
          <Route path="resources/:name" element={<ResourceDetail />} />
          <Route
            path="exports"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ExportsPage />
              </Suspense>
            }
          />
          <Route path="events" element={<EventsPage />} />
          <Route path="database" element={<DatabasePage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="troubleshooting" element={<Troubleshooting />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
