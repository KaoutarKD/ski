<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('subject')->paginate(10);
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string',
            'subject' => 'required|string',
            'image' => 'required|image|max:2048',
        ]);

        $subject = Subject::firstOrCreate(['name' => $request->subject]);

        if (!$subject->approved) {
            return response()->json(['message' => 'Subject needs approval by admin'], 403);
        }

        $path = $request->file('image')->store('posts', 'public');

        $post = Post::create([
            'user_id' => auth()->id(),
            'subject_id' => $subject->id,
            'description' => $request->description,
            'image_path' => $path,
            'approved' => true,
        ]);

        return response()->json($post, 201);
    }

    public function show($id)
    {
        $post = Post::with('subject')->findOrFail($id);
        return response()->json($post);
    }

    public function approve($id)
    {
        $post = Post::findOrFail($id);
        $post->approved = true;
        $post->save();

        return response()->json(['message' => 'Post approved successfully.']);
    }

    public function like($id)
    {
        $post = Post::findOrFail($id);
        $post->likes += 1;
        $post->save();

        return response()->json(['message' => 'Post liked successfully.']);
    }


    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
