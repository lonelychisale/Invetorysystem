<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EditLogs extends Model
{
    use HasFactory;

    protected $table = 'edit_logs';

    protected $fillable = [
        'user_id',
        'edited_user_id',
        'category'
    ];


    public function editinguser(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function editeduser(){
        return $this->belongsTo(User::class,'edited_user_id');
    }
}
