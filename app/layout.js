export const metadata = {
  title: 'Get Source Code ByPann',
  description: 'Ambil source code asli HTML, CSS, JS dari URL manapun.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#111827', color: '#fff', fontFamily: 'monospace' }}>
        {children}
      </body>
    </html>
  );
}