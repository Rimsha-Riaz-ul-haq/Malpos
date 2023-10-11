<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdAllergy extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_allergy_id';
    protected $guarded = ['md_allergy_id'];
}
