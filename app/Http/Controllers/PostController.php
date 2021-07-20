<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->get();

        return response()->json(['posts' => $posts], 200);
    }

    public function store(Request $request)
    {
        $post = Post::create([
            'title' => $request->get('title'),
            'content' => $request->get('content')
        ]);
  
        return response()->json(['post' => $post], 200);
    }

    public function show(Request $request, Post $post)
    {
        return response()->json(['post' => $post], 200);
    }

    public function update(Request $request, Post $post)
    {
        $post->update([
            'title' => $request->get('title'),
            'content' => $request->get('content')
        ]);

        return response()->json(['post' => $post], 200);
    }

    public function destroy(Request $request, Post $post)
    {
        $post->delete();

        return response()->json([], 200);
    }
}
