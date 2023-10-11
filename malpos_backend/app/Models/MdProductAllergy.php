<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProductAllergy extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_product_allergy_id';
    protected $guarded = ['md_product_allergy_id'];

    public function product(){
        return $this->belongsTo(MdProduct::class, 'md_product_id');
    }
    public function allergy(){
        return $this->belongsTo(MdAllergy::class, 'md_allergy_id');
    }
}
