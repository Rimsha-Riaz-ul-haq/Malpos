<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdSuppliesLine extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function product(){
        return $this->hasOne(MdProduct::class, 'md_product_id',"md_product_id");
    }
    public function supply(){
        return $this->belongsTo(MdSupply::class, 'id');
    }
}
