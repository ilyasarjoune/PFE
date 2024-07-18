<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfferRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'company_id',
        'company_name',
        'location',
        'date',
        'domaines_id',
        'description',
        'paid',
        'duration',
        'type',
    ];

    /**
     * Get the company that owns the offer request.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the domain associated with the offer request.
     */
    public function domain()
    {
        return $this->belongsTo(Domain::class, 'domaines_id');
    }
}
