<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GdCountry extends Model
{
    use HasFactory;

    protected $primaryKey = 'gd_country_id';
    protected $guarded = ['gd_country_id'];

}
