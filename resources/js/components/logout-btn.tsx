import { Link } from "@inertiajs/react"

const LogoutBtn = () => {
    return (
        <Link href="/logout" method="post" as="button" className="btn btn-sm btn-error btn-soft">Logout</Link>
    )
}

export default LogoutBtn
