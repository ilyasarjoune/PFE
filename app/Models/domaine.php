<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domaine extends Model
{
    use HasFactory;
    
    protected $fillable = ['name'];
    protected $guarded = ['id'];
    public $timestamps = true;
    protected $primaryKey = 'id';
    protected $table = 'domaines'; // Make sure this matches your table name
}

