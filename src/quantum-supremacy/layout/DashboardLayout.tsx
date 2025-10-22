import React from 'react'

function DashboardLayout({ leftSection, rightSection }: { leftSection: React.ReactNode, rightSection: React.ReactNode }) {
    return (
        <div className='grid grid-cols-12 min-h-screen'>
            <div className='col-span-2 border-r-[1.5px] border-gray-700'>{leftSection}</div>
            <div className='col-span-10 p-3'>{rightSection}</div>
        </div>
    )
}

export default DashboardLayout
