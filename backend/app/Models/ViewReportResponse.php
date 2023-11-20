<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewReportResponse extends Model
{
    use HasFactory;

    protected $table = 'view_report_responses';
    protected $fillable =[
        'report_response_id',
        'user_id'
    ];


    public function request()
{
    return $this->belongsTo(ReportResponse::class, 'report_response_id');
}

public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}
}
