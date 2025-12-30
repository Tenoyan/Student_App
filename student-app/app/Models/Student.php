<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // Allow mass assignment for these fields
    protected $fillable = [
        'name',
        'address',
        'tel',
        'grade',
        'photo',
        
    ];

    // Add this so it appends photo_url to JSON
    protected $appends = ['photo_url'];

    // Accessor to get full photo URL
    public function getPhotoUrlAttribute()
    {
        return $this->photo 
            ? asset('storage/photos/' . $this->photo) 
            : null;
    }
}
