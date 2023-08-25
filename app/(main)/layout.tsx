import { LeftSidebar } from '@/components/LeftSidebar';
import TopPanel from '@/components/TopPanel';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LeftSidebar />
      <div className="w-full h-full flex-col">
        <TopPanel />
        <div className="w-full h-5/6 flex items-center justify-center">{children}</div>
      </div>
    </>
  );
}
