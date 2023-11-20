<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'users';
    protected $fillable = [
        'department_id',
        'fullname',
        'email',
        'role',
        'password',
    ];


    public function department(){
        return $this->belongsTo(Department::class,'department_id','id');
    }

    public function items(){
        return $this->hasMany(Item::class,'createdBy','id');
    }


    public function assignedItems()
    {
        return $this->hasMany(AssignedItem::class, 'user_id');
    }

    public function assignedbyItems()
    {
        return $this->hasMany(AssignedItem::class, 'assignedby_id');
    }

    public function requestItems()
    {
        return $this->hasMany(RequestItem::class, 'user_id');
    }

    public function reportItems()
    {
        return $this->hasMany(Report::class, 'user_id');
    }
    public function viewRequests()
    {
        return $this->hasMany(ViewRequest::class, 'user_id');
    }
    
    public function viewReports()
    {
        return $this->hasMany(ViewReport::class, 'user_id');
    }

    public function viewreportresponse()
    {
        return $this->hasMany(ViewReportResponse::class, 'user_id');
    }

    public function viewrequestresponse()
    {
        return $this->hasMany(ViewRequestResponse::class, 'user_id');
    }

    public function deleteduserlog(){
        return $this->hasMany(DeleteLogs::class,'deleted_user_id');
    }

    public function deletinguserlog(){
        return $this->hasMany(DeleteLogs::class,'user_id');
    }

    public function editeduserlog(){
        return $this->hasMany(EditLogs::class,'edited_user_id');
    }

    public function editinguserlog(){
        return $this->hasMany(EditLogs::class,'user_id');
    }


    public function deletingitemserlog(){
        return $this->hasMany(DeleteItemsLogs::class,'user_id');
    }

    public function deleteditemlog(){
        return $this->hasMany(DeleteItemsLogs::class,'deleted_item_id');
    }

    public function editeditemlog(){
        return $this->hasMany(EditItemsLogs::class,'edited_item_id');
    }

    public function editingitemuserlog(){
        return $this->hasMany(EditItemsLogs::class,'user_id');
    }

    public function unassigningitemluserlog(){
        return $this->hasMany(UnassignItemsLog::class,'user_id');
    }




    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
