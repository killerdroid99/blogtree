import { User } from "@/types"
import { Link } from "@inertiajs/react"
import GoogleLoginBtn from "./google-login-btn"
import LogoutBtn from "./logout-btn"
import { Plus } from "lucide-react"

interface Props {
    user?: User
}
function Header({ user }: Props) {
    return (
        <header className="py-4 px-[13dvw] flex items-center justify-between">
            <Link href="/" className="text-2xl font-semibold">
                <span>Blog</span>
                <span className="text-primary">Tree</span>
            </Link>

            <nav className="flex items-center gap-2">
                {
                    user ?
                        <>
                            <Link
                                as="button"
                                href="/profile"
                                className="avatar cursor-pointer">
                                <div className="w-7 rounded-full">
                                    <img src={user.google_avatar} alt="avatar" />
                                </div>
                            </Link>
                            <LogoutBtn />
                            <Link as="button" href="/create-post" className="btn btn-sm btn-accent">
                                <Plus className="w-4" />
                                Create post
                            </Link>
                        </>
                        :
                        <>
                            <GoogleLoginBtn />
                        </>
                }
            </nav>
        </header>
    )
}

export default Header
