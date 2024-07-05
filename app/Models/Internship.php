<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'company', 'location', 'date', 'link' , 'domain'];
    protected $guarded = ['id'];

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $table = 'internships';

    protected $unique = ['link'];
}
