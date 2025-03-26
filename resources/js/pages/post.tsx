import MainLayout from '@/layouts/MainLayout'
import { Head, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown';

interface Post {
    id: string
    title: string
    body: string
    published_at: Date
    author_name: string
}
function Post() {
    const { post } = usePage<{ post: Post }>().props
    const formattedDate = format(new Date(post.published_at), 'MMM d, yyyy')
    return (
        <MainLayout>
            <Head title={`Post | ${post.title}`} />
            <h1 className="text-3xl font-bold my-4">{post.title}</h1>

            <div className="text-sm text-gray-500 mb-2">
                Published by {post.author_name} on {formattedDate}
            </div>

            <ReactMarkdown>{post.body}</ReactMarkdown>
        </MainLayout>
    )
}

export default Post
