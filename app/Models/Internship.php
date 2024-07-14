<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'company', 
        'location', 
        'date', 
        'link', 
        'domain', 
        'description', 
        'applies', 
        'paid',       // New field
        'duration',   // New field
        'type'        // New field
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($internship) {
            $users = User::where('domaines_id', $internship->domain)->get();

            foreach ($users as $user) {
                Notification::create([
                    'user_id' => $user->id,
                    'title' => $internship->title,
                    'company' => $internship->company,
                    'internship_id' => $internship->id,
                ]);
            }
        });
    }

    protected $guarded = ['id'];

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $table = 'internships';

    protected $unique = ['link'];
}
