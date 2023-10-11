<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProductDiet extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_product_diet_id';
    protected $guarded = ['md_product_diet_id'];

    public function product(){
        return $this->belongsTo(MdProduct::class, 'md_product_id');
    }
    public function diet(){
        return $this->belongsTo(MdDiet::class, 'md_diet_id');
    }
}
