<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Request $request, Post $post)
    {
        $comments = $post->comments->sortByDesc('id')->values();

        return response()->json(['comments' => $comments], 200);
    }

    public function store(Request $request, Post $post)
    {
        $post->comments()->create([
            'content' => $request->get('content')
        ]);

        $comment = $post->comments->sortBy('id');

        return response()->json(['comment' => $comment], 200);
    }

    public function destroy(Request $request, Post $post, Comment $comment)
    {
        $comment->delete();

        return response()->json([], 200);
    }
}
