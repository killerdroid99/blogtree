import MainLayout from '@/layouts/MainLayout'
import { Head, usePage } from '@inertiajs/react'
import { useMemo } from 'react'

interface Post {
    id: string
    title: string
    body: string
    published_at: Date
    author_name: string
}
function Post() {
    const { post } = usePage<{ post: Post }>().props
    const formattedDate = useMemo(() => {
        return new Date(post.published_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
    }, [post.published_at]);
    return (
        <MainLayout>
            <Head title={`Post | (${post.title})`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <h1 className="text-3xl font-bold my-4">{post.title}</h1>

            <div className="text-sm text-gray-500 mb-2">
                Published by {post.author_name} on {formattedDate}
            </div>

            <p className='text-lg leading-relaxed mt-5'>
                {post.body}
            </p>
        </MainLayout>
    )
}

export default Post
