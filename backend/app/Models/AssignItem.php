<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignItem extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'item_id',
        'assignedby_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function Assignedby()
    {
        return $this->belongsTo(User::class, 'assignedby_id');
    }

    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }

    public function unassigneditemlog(){
        return $this->hasOne(UnassignItemsLog::class,'unassigned_item_id');
    }




    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($assignItem) {
            // Get the corresponding item
            $item = Item::find($assignItem->item_id);

            if ($item) {
                // Update the item's possession status to "unassigned"
                $item->update(['itempossesionstatus' => 'unassigned']);
            }
        });
    }
}
