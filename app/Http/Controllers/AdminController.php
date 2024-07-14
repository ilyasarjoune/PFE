<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use App\Models\Internship;
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
        return inertia('Admin/Dashboard');
    }
  /*  public function showCompanies()
    {
        $companies = Company::all();
        return inertia('Admin/Companies', ['companies' => $companies]);
    }*/

    public function showInternships()
    {
        $internships = Internship::all();
        return inertia('Admin/Internships', ['internships' => $internships]);
    }

    public function deleteUser($id)
    {
        User::findOrFail($id)->delete();
        return redirect()->route('admin.users');
    }

    /*public function deleteCompany($id)
    {
        Company::findOrFail($id)->delete();
        return redirect()->route('admin.companies');
    }*/

    public function deleteInternship($id)
    {
        Internship::findOrFail($id)->delete();
        return redirect()->route('admin.internships');
    }
}
