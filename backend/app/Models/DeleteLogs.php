<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeleteLogs extends Model
{
    use HasFactory;

    protected $table = 'delete_logs';

    protected $fillable = [
        'user_id',
        'deleted_user_id',
        'category'
    ];


    public function deletinguser(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function deleteduser(){
        return $this->belongsTo(User::class,'deleted_user_id');
    }

}
