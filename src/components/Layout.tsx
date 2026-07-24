import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useProgressContext } from '../App';

export default function Layout() {
  const { completedCount, totalCheckpoints } = useProgressContext();

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#F6F9FC' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b flex items-center px-6 justify-between flex-shrink-0 z-10" style={{ borderColor: '#E6EBF1', height: 56 }}>
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 80 30" width="60" height="22" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="24" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="26" fill="#635BFF">stripe</text>
            </svg>
            <span style={{ color: '#E6EBF1', fontSize: 20 }}>|</span>
            <span className="text-sm font-medium" style={{ color: '#425466' }}>Partner Solutions Lab</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#425466' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#635BFF' }}></div>
            <span>{completedCount} / {totalCheckpoints} checkpoints</span>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
