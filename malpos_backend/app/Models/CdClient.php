<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CdClient extends Model
{
    use HasFactory;

    protected $primaryKey = 'cd_client_id';
    protected $guarded = ['cd_client_id'];
}
