<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProductDetail extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_product_detail_id';
    protected $guarded = ['md_product_detail_id'];
    public function product(){
        return $this->belongsTo(MdProductroduct::class, 'md_product_id');
    }
}
