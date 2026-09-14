import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import { ThemeProvider } from '../context/ThemeContext'
import { AuthProvider } from '../features/auth/AuthContext'
import { ModalProvider } from '../context/ModalContext'
import { GroupsProvider } from '../context/GroupsContext'
import { CalendarProvider } from '../context/CalendarContext'
import { SocialProvider } from '../context/SocialContext'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TrackPal - Enterprise ROSCA & Paluwagan Ledger',
      },
      {
        name: 'description',
        content:
          'Next-generation transparent and dispute-free rotating savings and credit association (ROSCA) ledger.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[#F8F9FA] dark:bg-[#0D0F12] text-neutral-950 dark:text-neutral-100 antialiased">
        <ThemeProvider>
          <AuthProvider>
            <ModalProvider>
              <GroupsProvider>
                <CalendarProvider>
                  <SocialProvider>{children}</SocialProvider>
                </CalendarProvider>
              </GroupsProvider>
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
