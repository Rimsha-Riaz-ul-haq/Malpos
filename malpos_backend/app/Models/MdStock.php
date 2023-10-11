<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdStock extends Model
{
    use HasFactory;
    protected $guarded = [];
    
    public function product(){
        return $this->hasOne(MdProduct::class, 'md_product_id',"md_product_id");
    }
    public function supply(){
        return $this->belongsTo(MdSupply::class, 'id');
    }
    public function storage(){
        return $this->hasOne(MdStorage::class, 'id',"md_storage_id");
    }
}
