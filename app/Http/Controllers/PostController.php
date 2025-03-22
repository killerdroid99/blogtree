<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function show(Request $request, string $id): Response
    {
        try {
            $post = Post::with('author')->findOrFail($id);

            return Inertia::render('post', [
                'post' => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'author_name' => $post->author->name,
                    'published_at' => $post->created_at,
                ]
            ]);
        } catch (ModelNotFoundException $e) {
            abort(404, 'Post not found');
        }
    }

    public function paginate(Request $request): Response
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
                    'published_at' => $post->created_at,
                ];
            });

        return Inertia::render('welcome', ['posts' => $posts]);
    }
}
