import "./globals.css";
import '../node_modules/boxicons/css/boxicons.min.css'


export const viewport = {
  width: 'device-width',
  initialScale: 1,
}



export default function RootLayout({ children }) {

  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
