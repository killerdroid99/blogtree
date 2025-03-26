<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function show(string $id): Response
    {
        try {
            $post = Post::with('author')->findOrFail($id);

            return inertia('post', [
                'post' => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'author_name' => $post->author->name,
                    'published_at' => $post->created_at,
                ]
            ]);
        } catch (ModelNotFoundException) {
            abort(404, 'Post not found');
        }
    }

    public function paginate(): Response
    {
        $posts = Post::with('author')
            ->latest()
            ->paginate(10)
            ->through(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'author_name' => $post->author->name,
                    'author_avatar' => $post->author->google_avatar,
                    'published_at' => $post->created_at,
                ];
            });

        return inertia('home', ['posts' => $posts]);
    }

    public function create(): Response
    {
        return Inertia::render('create-post');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|min:3|max:100',
            'body' => 'required|string|min:10',
        ]);


        $post = new Post([
            'title' => $validatedData['title'],
            'body' => $validatedData['body'],
            'author_id' => Auth::id()
        ]);
        $post->save();

        return redirect()->route('post.show', $post['id']);
    }
}
