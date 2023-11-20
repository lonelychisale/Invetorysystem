<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnassignItemsLog extends Model
{
    use HasFactory;

    protected $table = 'unassign_items_logs';
    protected $fillable = [
       'user_id',
       'unassigned_item_id'
    ];

    public function unassigninguser(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function unassigneditem(){
        return $this->belongsTo(AssignItem::class,'unassigned_item_id');
    }
}
