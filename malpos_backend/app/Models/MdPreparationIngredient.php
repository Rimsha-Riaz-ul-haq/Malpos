<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdPreparationIngredient extends Model
{
    use HasFactory;


    protected $primaryKey = 'md_preparation_ingredient_id';
    protected $guarded = ['md_preparation_ingredient_id'];


    public function ingredient(){
        return $this->belongsTo(MdIngredient::class, 'md_ingredient_id');
    }
    public function preparation(){
        return $this->belongsTo(MdPreparation::class, 'md_preparation_id');
    }

}
