import React from 'react'
import { Sidebar } from './sidebar'
import { Navbar } from '@/app/(dashboard)/navbar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={'bg-muted h-full'}>
      <Sidebar />
      <div className={'lg:pl-[300px] flex flex-col h-fuu'}>
        <Navbar />
        <main className={'bg-white flex-1 overflow-auto p-8 rounded-tl-2xl'}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout