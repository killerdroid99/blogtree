import MainLayout from "@/layouts/MainLayout"
import { cn } from "@/lib/utils"
import { Head, useForm } from "@inertiajs/react"
import { FormEvent } from "react"

function CreatePost() {
    const { data, setData, processing, post, errors, setError } = useForm({
        title: '',
        body: ''
    })

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        post('/post')
    }
    return (
        <MainLayout>
            <Head title="Create post" />
            <h2>Publish you post</h2>
            <form onSubmit={submit} className="grid gap-5 max-w-[58rem] mx-auto mt-20">
                <div className="flex flex-col-reverse gap-1.5">
                    {errors.title && <small className="text-red-500">{errors.title}</small>}
                    <input
                        id="title"
                        type="text"
                        placeholder="✒️ Pen an elegant title"
                        value={data.title}
                        onFocus={() => setError('title', '')}
                        onInput={() => setError('title', '')}
                        className={cn("outline-none border-none p-2 rounded text-lg ring w-full focus-visible:ring-success focus-visible:ring-2 hover:ring-success transition-all ease-in peer", {
                            "ring-error focus-visible:ring-error hover:ring-error": errors.title
                        })}
                        onChange={(e) => setData('title', e.target.value)} />
                    <label htmlFor="title" className={cn("text-sm font-semibold peer-focus-visible:text-success", { "text-error peer-focus-visible:text-error": errors.title })}>Title</label>
                </div>
                <div className="flex flex-col-reverse gap-1.5">
                    {errors.body && <small className="text-red-500">{errors.body}</small>}
                    <textarea
                        id="body"
                        placeholder="🎼And your main content will go here..."
                        value={data.body}
                        onFocus={() => setError('body', '')}
                        onInput={() => setError('body', '')}
                        className={cn("outline-none border-none p-2 rounded ring w-full resize-none h-80 focus-visible:ring-2 focus-visible:ring-success hover:ring-success transition-all ease-in peer", {
                            "ring-error focus-visible:ring-error hover:ring-error": errors.body
                        })}
                        onChange={(e) => setData('body', e.target.value)} />
                    <label htmlFor="body" className={cn("text-sm font-semibold peer-focus-visible:text-success", { "text-error peer-focus-visible:text-error": errors.body })}>Body (Markdown supported)</label>
                </div>
                <button type="submit" disabled={processing} className="btn btn-wide btn-success justify-self-center">Submit</button>
            </form>
        </MainLayout>
    )
}

export default CreatePost
