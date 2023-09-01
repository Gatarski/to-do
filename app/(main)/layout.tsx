import { LeftSidebar } from '@/components/LeftSidebar';
import TopPanel from '@/components/TopPanel';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LeftSidebar />
      <div className="w-full h-full flex flex-col">
        <TopPanel />
        <div className="w-[95%] h-[85%] m-6">{children}</div>
      </div>
    </>
  );
}
