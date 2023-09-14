import '../styles/global.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={'h-screen w-screen mesh'}>
       <div className='glass w-full h-full flex items-center justify-center'>{children}</div>
      </body>
    </html>
  );
}

// zastanowić się na wyrzuceniem tego p-10 i potem tych zaokręgleń