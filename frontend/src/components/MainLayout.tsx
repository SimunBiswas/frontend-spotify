'use client'
import React, { useEffect, useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import { LeftSideBar } from './LeftSideBar';
import FriendsActivity from './FriendsActivity';
import AudioPlayer from './AudioPlayer';
import PlayBackPanelControls from './PlayBackPanelControls';

export default function MainLayout ({ children }: { children: React.ReactNode }) {
  const [isMobile, setisMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setisMobile(window.innerWidth <= 768);
      }

      checkMobile(); // Initial check
      window.addEventListener('resize', checkMobile);

      return () => window.removeEventListener('resize', checkMobile);
    })


  return (
    <div className='h-screen bg-black text-white flex flex-col p-4'>
      {/* <header>My Header</header> */}
      {/* <main>{children}</main>
      <footer>My Footer</footer> */}
      <ResizablePanelGroup direction="horizontal" className='flex-1 flex h-full overflow-hidden p-2'>
        <AudioPlayer/>
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
            <LeftSideBar />
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

        <ResizablePanel  defaultSize={isMobile ? 80 : 60}>
            {children}
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

        {!isMobile && (
          <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
            <FriendsActivity/>
          </ResizablePanel>
        )}
        
      </ResizablePanelGroup>

      <PlayBackPanelControls />
    </div>
  );
};

