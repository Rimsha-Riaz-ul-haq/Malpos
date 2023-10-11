<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProductProductCategory extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_product_product_category_id';
    protected $guarded = ['md_product_product_category_id'];

    public function product(){
        return $this->belongsTo(MdProduct::class, 'md_product_id');
    }
    public function product_category(){
        return $this->belongsTo(MdProductCategory::class, 'md_product_category_id');
    }
}
