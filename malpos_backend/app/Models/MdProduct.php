<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProduct extends Model
{
    use HasFactory;

    
  
    protected $primaryKey = 'md_product_id';
    protected $guarded = ['md_product_id'];

    // public function branch(){
    //     return $this->belongsTo(CdBranch::class, 'cd_branch_id');
    // }
    // public function brand(){
    //     return $this->belongsTo(CdBrand::class, 'cd_brand_id');
    // }
    public function client(){
        return $this->belongsTo(CdClient::class, 'cd_client_id');
    }

    public function supply_lines(){
        return $this->belongsTo(MdSupplyLine::class, 'md_product_id');
    }

    // public function unit_conversions(){
    //     return $this->hasMany(MdProductUnit::class, 'md_product_id');
    // }
    public function base_unit(){
        return $this->hasOne(MdProductUnit::class, 'md_product_id');
    }
    public function product_detail(){
        return $this->hasMany(MdProductDetail::class, 'md_product_id');
    }

    public function product_modifier(){
        return $this->hasMany(MdProductModifier::class, 'md_product_id');
    }
    public function stations(){
        return $this->hasOne(MdStationProduct::class, 'md_product_id');
    }

    public function station_product(){
        return $this->hasMany(MdStationProduct::class, 'md_product_id');
    }

    public function product_allergy(){
        return $this->hasMany(MdProductAllergy::class, 'md_product_id');
    }

    public function product_branch(){
        return $this->hasMany(MdProductBranch::class, 'md_product_id');
    }

    public function product_brand(){
        return $this->hasMany(MdProductBrand::class, 'md_product_id');
    }

    public function product_diet(){
        return $this->hasMany(MdProductDiet::class, 'md_product_id');
    }

    public function product_product_category(){
        return $this->hasMany(MdProductProductcategory::class, 'md_product_id');
    }

    public function getProductImageAttribute()
    {
        return asset('img/product_image/'.$this->attributes['product_image']);
    }
}
