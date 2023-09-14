import { LeftSidebar } from '@/components/LeftSidebar';
import { TopPanel } from '@/components/TopPanel';


export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LeftSidebar />
      <div className="w-full h-full flex flex-col">
        <TopPanel />
        <div className="h-[calc(100%-75px)] m-6 mobile:m-0">
          {children}
        </div>
      </div>
    </>
  );
}