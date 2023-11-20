<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestItem extends Model
{
    use HasFactory;

    protected $table = 'request_items';

    protected $fillable = [
        'user_id',
        'category',
        'subject',
        'message'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }



    public function requestresponses()
    {
        return $this->hasMany(RequestResponse::class);
    }

    public function viewRequests()
    {
        return $this->hasMany(ViewRequest::class, 'request_id');
    }
    
}
