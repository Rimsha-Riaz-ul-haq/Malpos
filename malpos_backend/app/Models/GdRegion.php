<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GdRegion extends Model
{
    use HasFactory;
    protected $primaryKey = 'gd_region_id';
    protected $guarded = ['gd_region_id'];
}
