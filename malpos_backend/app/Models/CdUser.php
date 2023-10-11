<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CdUser extends Model
{
    use HasFactory;

    protected $primaryKey = 'cd_user_id';
    protected $guarded = ['cd_user_id'];
}
