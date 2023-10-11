<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdIngredient extends Model
{
    use HasFactory;
    protected $primaryKey = 'md_ingredient_id';
    protected $guarded = ['md_ingredient_id'];

    public function preparation_ingredient(){
        return $this->hasMany(MdPreparationIngredient::class, 'md_ingredient_id');
    }
    
    public function branch(){
        return $this->belongsTo(CdBranch::class, 'cd_branch_id');
    }
    public function brand(){
        return $this->belongsTo(CdBrand::class, 'cd_brand_id');
    }
    public function client(){
        return $this->belongsTo(CdClient::class, 'cd_client_id');
    }
}
