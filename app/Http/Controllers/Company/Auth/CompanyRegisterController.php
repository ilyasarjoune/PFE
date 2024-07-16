<?php
namespace App\Http\Controllers\Company\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class CompanyRegisterController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Company/Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:company',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'descripion' => 'required|string|max:1000',
            'location' => 'required|string|max:255',
            'domaines_id' => 'required|exists:domaines,id',
            'site_web_url' => 'nullable|url|max:255',
            
        ]);

        $company = Company::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'descripion' => $request->descripion,
            'location' => $request->location,
           'domaines_id' => $request->domaines_id,
            'site_web_url' => $request->site_web_url,
            
        ]);

        event(new Registered($company));

        Auth::guard('company')->login($company);

        return redirect(route('offer.index'));
    }
}
