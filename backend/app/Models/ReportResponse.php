<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportResponse extends Model
{
    use HasFactory;
    protected $table = 'report_responses';
    protected $fillable = ['report_id','user_id','message'];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    

    public function report()
    {
        return $this->belongsTo(Report::class, 'report_id');
    }
    
    public function viewReportResponse()
{
    return $this->hasMany(ViewReportResponse::class, 'report_response_id');
}
}
