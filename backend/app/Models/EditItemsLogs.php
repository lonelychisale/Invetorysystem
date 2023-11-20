<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EditItemsLogs extends Model
{
    use HasFactory;

    protected $table = 'edit_items_logs';

    protected $fillable = [
        'user_id',
        'edited_item_id',
        'category'
    ];


    public function editinguser(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function editeditem(){
        return $this->belongsTo(Item::class,'edited_item_id');
    }
}
