<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Company;
use App\Models\Internship;
use App\Models\OfferRequest;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    

    public function showUsers()
    {
        $users = User::all();
        return inertia('Admin/Users', ['users' => $users]);
    }

    public function dashboard()
    {
        $userCount = User::count();
        $internshipCount = Internship::count();
        $Companycount = Company::count();

        return inertia('Admin/Dashboard', [
            'userCount' => $userCount,
            'internshipCount' => $internshipCount,
            'CompanyCount' => $Companycount
        ]);
    }

    public function showCompanies()
    {
        $company = Company::all();
        return inertia('Admin/Company', ['company' => $company]);
    }

    public function showInternships()
    {
        $internships = Internship::all();
        return inertia('Admin/Internships', ['internships' => $internships]);
    }

    public function showRequestedOfferrs()
    {
        $RequestedOfferrs = OfferRequest::all();
        return inertia('Admin/requests', ['OfferRequests' => $RequestedOfferrs]);
    }

    public function deleteUser($id)
    {
        User::findOrFail($id)->delete();
        return redirect()->route('admin.users');
    }

    public function deleteCompany($id)
    {
        Company::findOrFail($id)->delete();
        return redirect()->route('admin.company');
    }

    public function deleteInternship($id)
    {
        Internship::findOrFail($id)->delete();
        return redirect()->route('admin.internships');
    }
}