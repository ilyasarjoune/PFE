<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Internship;
use App\Http\Requests\StoreInternshipRequest;
use App\Http\Requests\UpdateInternshipRequest;
use Inertia\Inertia;

class internshipsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $internships = Internship::all();
        return Inertia::render('Home/Index', ['internships' => $internships]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function save(Request $request)
    {
        $internshipId = $request->input('internship_id');
        $user = $request->user();

        $user->savedInternships()->attach($internshipId);

        return response()->json(['message' => 'Internship saved successfully']);
    }
    public function saved(Request $request)
    {
        $user = $request->user();
        $savedInternships = $user->savedInternships;

        return Inertia::render('Home/Saved', [
            'savedInternships' => $savedInternships
        ]);
    }
    public function unsave(Request $request)
    {
        $internshipId = $request->input('internship_id');
        $user = $request->user();

        $user->savedInternships()->detach($internshipId);

        return response()->json(['message' => 'Internship unsaved successfully']);
    }
     public function create()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInternshipRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Internship $internship)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Internship $internship)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInternshipRequest $request, Internship $internship)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Internship $internship)
    {
        //
    }
    public function search(Request $request)
    {
        $query = Internship::query();
    
        if ($request->filled('query')) {
            $search = $request->input('query');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                  ->orWhere('domain', 'like', "%$search%")
                  ->orWhere('location', 'like', "%$search%");
            });
        }
    
        $internships = $query->get();
        $noResults = $internships->isEmpty();
    
        return Inertia::render('Home/Index', [
            'internships' => $internships,
            'search' => $request->only('query'),
            'noResults' => $noResults,
        ]);
    }
}
