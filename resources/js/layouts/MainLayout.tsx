import Header from '@/components/Header'
import React from 'react'

interface Props {
    children: React.ReactNode
}
function MainLayout({ children }: Props) {
    return (
        <div>
            <Header />
            <main className='px-[15dvw] pt-5'>{children}</main>
        </div>
    )
}

export default MainLayout
