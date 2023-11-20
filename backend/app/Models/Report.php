<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $table = 'reports';
    protected $fillable = [
        'user_id',
        'category',
        'item_id',
        'subject',
        'message'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }


    public function reportresponses()
    {
        return $this->hasMany(ReportResponse::class);
    }

    public function viewReports()
    {
        return $this->hasMany(ViewReport::class, 'report_id');
    }
}
