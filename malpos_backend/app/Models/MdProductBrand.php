<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProductBrand extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_product_brand_id';
    protected $guarded = ['md_product_brand_id'];

    public function product(){
        return $this->belongsTo(MdProduct::class, 'md_product_id');
    }
    public function brand(){
        return $this->belongsTo(CdBrand::class, 'cd_brand_id');
    }
}
