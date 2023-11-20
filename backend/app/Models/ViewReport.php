<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewReport extends Model
{
    use HasFactory;
    protected $table = 'view_reports';
    protected $fillable =[
        'report_id',
        'user_id'
    ];


    public function report()
{
    return $this->belongsTo(Request::class, 'report_id');
}

public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}



}
