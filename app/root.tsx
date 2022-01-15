import { LiveReload, Outlet } from 'remix'

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: So great, it's funny!</title>
      </head>
      <body>
        <Outlet />
        {process.env.NODE_ENV === "development" ? (
          <LiveReload /> // This component is set for auto-refreshing during develop.
        ) : null}
      </body>
    </html>
  )
}