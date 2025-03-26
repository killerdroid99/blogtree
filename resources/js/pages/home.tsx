import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';

export default function Welcome() {
    const { posts } = usePage<SharedData>().props;

    return (
        <MainLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className='grid gap-4'>
                <p className='text-sm'>Showing {posts.from} to {posts.to} of {posts.total} results</p>
                {posts.data.map(post => (
                    <Link href={`/post/${post.id}`} key={post.id} className="card card-side card-md card-border hover:bg-primary-content/50 mb-4">
                        <div className="card-body">
                            <h2 className="card-title">{post.title}</h2>
                            <p>
                                {post.body.length > 50 ? post.body.slice(0, 50) + "..." : post.body}
                            </p>
                            <div className="mt-2">
                                <div
                                    className="avatar cursor-pointer items-center my-2">
                                    {
                                        post.author_avatar ?
                                            <div className="w-5 rounded-full">
                                                <img src={post.author_avatar ?? post.author_name} alt="avatar" />
                                            </div>
                                            :
                                            <div className="w-5 rounded-full">
                                                {post.author_name[0]}
                                            </div>
                                    }
                                    <span className='text-sm ml-2'>{post.author_name}</span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Published on {format(new Date(post.published_at), 'MMM d, yyyy')}
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
