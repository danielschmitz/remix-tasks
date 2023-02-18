import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {

  const [theme, setTheme] = useState<string>('dark');

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <div style={{textAlign: 'center'}}>
        <a href="#" onClick={()=>setTheme('dark')}>Dark</a>&nbsp;|&nbsp;
        <a href="#" onClick={()=>setTheme('light')}>Light</a>
        </div>
      </body>
    </html>
  );
}
