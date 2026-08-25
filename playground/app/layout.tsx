import type { ReactNode } from "react";
import "../../src/styles.css";

export const metadata = {
  title: "betterschool-shared-ui playground",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
