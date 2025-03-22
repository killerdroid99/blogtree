import Header from '@/components/Header'
import { SharedData } from '@/types'
import { usePage } from '@inertiajs/react'
import React from 'react'

interface Props {
    children: React.ReactNode
}
function MainLayout({ children }: Props) {
    const { auth } = usePage<SharedData>().props
    return (
        <div>
            <Header user={auth.user} />
            <main className='px-[15dvw] pt-5'>{children}</main>
        </div>
    )
}

export default MainLayout
