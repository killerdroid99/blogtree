import MainLayout from "@/layouts/MainLayout"
import { SharedData } from "@/types"
import { Head, usePage } from "@inertiajs/react"

function Profile() {
    const { auth } = usePage<SharedData>().props
    console.log(auth.user)
    return (
        <MainLayout>
            <Head>
                <title>Profile</title>
            </Head>
            Profile
        </MainLayout>
    )
}

export default Profile
