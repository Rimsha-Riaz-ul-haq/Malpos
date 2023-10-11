<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdDiet extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_diet_id';
    protected $guarded = ['md_diet_id'];
}
