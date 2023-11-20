<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;
    protected $table = 'departments';
    protected $fillable = ['branch','name','leader'];
    

    public function user(){
        return $this->hasMany(User::class,'department_id');
    }
}
