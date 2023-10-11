<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProductCategory extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_product_category_id';
    protected $guarded = ['md_product_category_id'];

    public function branch(){
        return $this->belongsTo(CdBranch::class, 'cd_branch_id');
    }
    public function brand(){
        return $this->belongsTo(CdBrand::class, 'cd_brand_id');
    }
    public function client(){
        return $this->belongsTo(CdClient::class, 'cd_client_id');
    }

    public function getProductCategoryImageAttribute()
{
    return asset('img/product_category_image/'.$this->attributes['product_category_image']);
}
}
