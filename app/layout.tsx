import { Glass } from '@/components/UI/Glass';
import '../styles/global.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={'h-screen w-screen mesh p-10'}>
        <Glass>{children}</Glass>
      </body>
    </html>
  );
}
