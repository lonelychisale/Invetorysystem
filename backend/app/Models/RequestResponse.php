<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestResponse extends Model
{
    use HasFactory;
    protected $table = 'request_responses';
    protected $fillable = ['request_id','user_id','message'];
    

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function request()
    {
        return $this->belongsTo(RequestItem::class,'request_id');
    }

    public function viewRequestResponse()
{
    return $this->hasMany(ViewRequestResponse::class, 'request_response_id');
}
}
