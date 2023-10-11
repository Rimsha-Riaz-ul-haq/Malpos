<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CdRole extends Model
{
    use HasFactory;

    protected $primaryKey = 'cd_role_id';
    protected $guarded = ['cd_role_id'];
    

}
