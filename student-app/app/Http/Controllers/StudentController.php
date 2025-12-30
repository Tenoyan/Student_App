<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    // List all students
    public function index()
    {
        $students = Student::all();

        // Append photo_url for each student
        $students->each(function($student) {
            $student->photo_url = $student->photo 
                ? asset('storage/photos/' . $student->photo) 
                : null;
        });

        return response()->json($students);
    }

    // Show a single student
    public function show($id)
    {
        $student = Student::findOrFail($id);

        $student->photo_url = $student->photo 
            ? asset('storage/photos/' . $student->photo) 
            : null;

        return response()->json($student);
    }

    // Store new student (same as before)
    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'tel'     => 'required|string|max:50',
            'grade'   => 'required|string|max:50',
            'photo'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $data = $request->only(['name', 'address', 'tel', 'grade']);

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('photos/', $filename);
            $data['photo'] = $filename;
        }

        $student = Student::create($data);
        $student->photo_url = $student->photo 
            ? asset('storage/photos/' . $student->photo) 
            : null;

        return response()->json($student, 201);
    }

    // Update student (same as before)
    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $request->validate([
            'name'    => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string|max:500',
            'tel'     => 'sometimes|required|string|max:50',
            'grade'   => 'sometimes|required|string|max:50',
            'photo'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $data = $request->only(['name', 'address', 'tel', 'grade']);

        if ($request->hasFile('photo')) {
            // delete old photo
            if ($student->photo && Storage::exists('public/photos/' . $student->photo)) {
                Storage::delete('photos/' . $student->photo);
            }

            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('photos/', $filename);
            $data['photo'] = $filename;
        }

        $student->update($data);
        $student->photo_url = $student->photo 
            ? asset('storage/photos/' . $student->photo) 
            : null;

        return response()->json([
            'message' => 'Student updated successfully',
            'student' => $student
        ]);
    }

    // Delete student (same as before)
    public function destroy($id)
    {
        $student = Student::findOrFail($id);

        if ($student->photo && Storage::exists('photos/' . $student->photo)) {
            Storage::delete('photos/' . $student->photo);
        }

        $student->delete();

        return response()->json([
            'message' => 'Student deleted successfully'
        ]);
    }
}
