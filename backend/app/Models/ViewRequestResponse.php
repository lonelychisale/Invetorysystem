<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewRequestResponse extends Model
{
    use HasFactory;
    protected $table = 'view_request_responses';
    protected $fillable =[
        'request_response_id',
        'user_id'
    ];


    public function request()
{
    return $this->belongsTo(RequestResponse::class, 'request_response_id');
}

public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}

}
