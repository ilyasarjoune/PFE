<?php

namespace App\Http\Controllers;

use App\Models\OfferRequest;
use App\Models\Company;
use App\Models\Domaine;
use App\Models\Internship;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class OfferController extends Controller
{
    /**
     * Show the form for creating a new offer request.
     */

     public function accept($id)
     {
         $offerRequest = OfferRequest::findOrFail($id);
         $link = 'http://example.com/' . $offerRequest->id;
         // Example: Create a new Internship record based on the offer request
         Internship::create([
             'title' => $offerRequest->title,
             'company' => $offerRequest->company_name,
             'location' => $offerRequest->location,
             'date' => $offerRequest->date,
             'link' => $link,
             'description' => $offerRequest->description,
             
             'paid' => ($offerRequest->paid === 'yes') ? 1 : 0,
             'duration' => $offerRequest->duration,
             'type' => $offerRequest->type,
             // Ensure you fetch and insert domain name if required
             'domain' => $this->getDomainName($offerRequest->domain_id),
         ]);
 
         // Optionally, you may want to delete the offer request after acceptance
         $offerRequest->delete();
 
         return redirect()->back()->with('success', 'Offer accepted and transferred to internships.');
     }
 
     public function refuse($id)
     {
         $offerRequest = OfferRequest::findOrFail($id);
         $offerRequest->delete();
 
         return redirect()->back()->with('success', 'Offer refused and deleted.');
     }
 
     // Example method to generate link (replace with your logic)
     
 
     // Example method to fetch domain name (replace with your logic)
     private function getDomainName($domainId)
     {
         // Implement logic to fetch domain name based on $domainId
         // Example: $domain = Domain::findOrFail($domainId);
         //          return $domain->name;
         return 'Example Domain'; // Replace with actual logic
     }    public function create()
    {
        return Inertia::render('OfferRequest/Create');
    }
    public function destroy($id)
    {
        $offer = OfferRequest::find($id);

        if ($offer && $offer->company_id == auth()->user()->id) {
            $offer->delete();
            return response()->json(['message' => 'Offer deleted successfully']);
        }

        return response()->json(['message' => 'Offer not found or unauthorized'], 404);
    }
    public function getOffers()
    {
        $companyId = auth()->user()->id;
        $offers = OfferRequest::where('company_id', $companyId)->get();

        return response()->json($offers);
    }
    /**
     * Store a newly created offer request in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'paid' => 'required|in:yes,no',
            'duration' => 'required|string',
            'type' => 'required|in:PFE,OBS,FON,TEL,ALT,EMP',
        ]);

        $company = auth('company')->user();

        OfferRequest::create([
            'title' => $request->title,
            'company_id' => $company->id,
            'company_name' => $company->name,

            'location' => $company->location,
            'date' => Carbon::now()->toDateString(),
            'domaines_id' => $company->domaines_id,
            'description' => $request->description,
            'paid' => $request->paid,
            'duration' => $request->duration,
            'type' => $request->type,
        ]);

        return redirect()->route('offer.create')->with('success', 'Offer request created successfully.');
    }
    
}
