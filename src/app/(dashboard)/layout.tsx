import React from 'react'
import {Sidebar} from './sidebar'
interface DashboardLayoutProps {
  children:React.ReactNode
}

const DashboardLayout = ({children}:DashboardLayoutProps) => {
  return (
    <div className={'bg-muted h-full'}>
      <Sidebar/>
      {children}
    </div>
  )
}

export default DashboardLayout