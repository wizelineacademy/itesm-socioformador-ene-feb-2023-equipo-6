import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import WizelineHeader from "./components/WizelineHeader";;
import stylesheet from "~/tailwind.css";
import ErrorMessage from "./components/Error";

export function links() {
  return [{ rel: "stylesheet", href: stylesheet }];
}

export const meta = () => ({
  charset: "utf-8",
  title: "Wizetalk",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <html>
      <head>
        <title>Error</title>
        <Meta />
        <Links />
      </head>
      <body>
        <WizelineHeader />
        <ErrorMessage title='An error ocurred.'>
          {<p>
            {error ||
              'Something went wrong. Please try again later.'}
          </p>}
          <p>Back to <Link to="/" className="font-bold underline">safety</Link>.</p>
        </ErrorMessage>
        <Scripts />
      </body>
    </html>
  );
}