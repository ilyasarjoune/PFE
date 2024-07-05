<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Internship;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StoreWebScrapingDataController extends Controller
{
    public function index()
{
    

}
    public function store(Request $request)
    {
        try {
            $internships = $request->all();
    
            // Log the incoming request data
            Log::info('Incoming request data', ['data' => $internships]);
    
            foreach ($internships as $internship) {
                // Validate if the keys exist
                if (!isset($internship['title'], $internship['company'], $internship['location'], $internship['date'], $internship['link'])) {
                    return response()->json(['error' => 'Invalid data structure'], 400);
                }
    
                // Check if the internship with the same title and company exists
                if (!Internship::where('title', $internship['title'])
                    ->where('company', $internship['company'])
                    ->exists()) {
                    
                    Internship::create([
                        'title' => $internship['title'],
                        'company' => $internship['company'],
                        'location' => $internship['location'],
                        'date' => $internship['date'],
                        'link' => $internship['link'],
                        'domain' => $internship['domain'],
                    ]);
                } else {
                    // Handle duplicate entry scenario if needed
                    // For example, log an error or skip insertion
                    Log::warning('Duplicate entry found for title: ' . $internship['title'] . ' and company: ' . $internship['company']);
                }
            }
    
            return response()->json(['message' => 'Internships successfully stored'], 200);
        } catch (\Exception $e) {
            Log::error('Error storing internships', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
    

}
