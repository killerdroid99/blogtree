import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';

export interface Author {
    id: string;
    name: string;
    email: string;
}

export interface Post {
    id: string;
    title: string;
    body: string;
    author_name: string;
    published_at: string;
}

export interface PaginatedPosts {
    data: Post[];
    links: { url: string; label: string; active: boolean }[];
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export default function Welcome() {
    const { posts } = usePage<{ posts: PaginatedPosts }>().props;

    return (
        <MainLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className='grid gap-4'>
                <p className='text-sm'>Showing {posts.from} to {posts.to} of {posts.total} results</p>
                {posts.data.map(post => (
                    <Link href={`/post/${post.id}`} key={post.id} className="card card-side card-md card-border mb-4">
                        <div className="card-body">
                            <h2 className="card-title">{post.title}</h2>
                            <p>
                                {post.body.length > 50 ? post.body.slice(0, 50) + "..." : post.body}
                            </p>
                            <div className="mt-2">
                                <p className="text-sm font-semibold">Author: {post.author_name}</p>
                                <p className="text-xs text-gray-500">
                                    Published: {new Date(post.published_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
                <div className="join mx-auto">
                    {
                        posts.links.map((link, index) => (
                            <Link
                                className={cn('join-item btn', { 'btn-active pointer-events-none': link.active })}
                                key={index}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))
                    }
                </div>
            </div>
        </MainLayout>
    );
}
