<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::orderBy('created_at', 'desc')->paginate(5);

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
