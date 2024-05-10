import ToDoImage from '../../assets/images/ToDo.png';
import Image from 'next/image';

export default async function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return (
       <div className='w-full h-full flex items-center justify-center'>
          <div className='w-full h-full flex'>
              <div className='w-1/2 mobile:hidden'>
                <div className="flex justify-center m-20 flex flex-col items-center">
                  <Image
                    src={ToDoImage}
                    alt="To do logo"
                  />
                  <div className="text-center m-20 opacity-0 transition-opacity ease-in-out fade-in">
                    <h2 className="text-4xl mb-2 p-1">Have plans to organize?</h2>
                    <p className="tex-3xl text-black/50">
                      Create simple well organized event with tasks to not miss anything
                    </p>
                  </div>
                </div>
              </div>
            {children}
          </div>
        </div>
  );
}