<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
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
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'domaines_id' => 'required|exists:domaines,id', // Assuming you want to validate the domaines_id
            'cv_path' => 'nullable|string',
            'phone' => 'nullable|string', // Nullable CV path
            // Add other fields as needed
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'domaines_id' => $request->domaines_id,
            'cv_path' => $request->cv_path,
            'phone' => $request->phone,
            // Add other fields as needed
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('internship.index', absolute: false));
    }
}
