<?php
namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::all();
        return response()->json($subjects);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:subjects,name',
        ]);

        $subject = Subject::create([
            'name' => $request->name,
            'approved' => false, // Admin approval required
        ]);

        return response()->json($subject, 201);
    }
}
