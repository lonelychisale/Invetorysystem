<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeleteItemsLogs extends Model
{
    use HasFactory;

    protected $table = 'delete_items_logs';

    protected $fillable = [
        'user_id',
        'deleted_item_id',
        'category'
    ];


    public function deletinguser(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function deleteditem(){
        return $this->belongsTo(Item::class,'deleted_item_id');
    }

    
}
