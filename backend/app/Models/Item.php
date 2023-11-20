<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $table = 'items';

    protected $fillable = [
        'itemname',
        'itemcategory',
        'idnumber',
        'serialnumber',
        'itemmanufuctureddate',
        'itemlifespan',
        'branch',
        'price',
        'itemstatus',
        'itempossesionstatus',
        'createdBy'
    ];

    public function user(){
        return $this->belongsTo(User::class,'createdBy','id');
    }
    public function assignedItems()
    {
        return $this->hasMany(AssignedItem::class, 'item_id');
    }



    public function reportItems()
    {
        return $this->hasMany(Report::class, 'item_id');
    }

}
