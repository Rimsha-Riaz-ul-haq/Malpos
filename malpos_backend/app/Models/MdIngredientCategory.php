<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdIngredientCategory extends Model
{
    use HasFactory;
    protected $primaryKey = 'md_ingredient_category_id';
    protected $guarded = ['md_ingredient_category_id'];
}
