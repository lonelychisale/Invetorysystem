<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewRequest extends Model
{
    use HasFactory;

    protected $table = 'view_requests';
    protected $fillable =[
        'request_id',
        'user_id'
    ];


    public function request()
{
    return $this->belongsTo(Request::class, 'request_id');
}

public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}



}
