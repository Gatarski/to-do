import '../styles/global.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={'h-screen w-screen'}>
       <div className='w-full h-full flex items-center justify-center bg-slate-300 mobile:bg-white'>
            {children}
        </div>
      </body>
    </html>
  );
}