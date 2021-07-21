<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('posts', PostController::class);
Route::resource('posts.comments', CommentController::class);