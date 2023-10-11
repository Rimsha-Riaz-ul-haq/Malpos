<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProductModifier extends Model
{
    use HasFactory;
    protected $primaryKey = 'md_product_modifier_id';
    protected $guarded = ['md_product_modifier_id'];
    public function product(){
        return $this->belongsTo(MdProduct::class, 'md_product_id');
    }

    public function modifier(){
        return $this->belongsTo(MdModifier::class, 'md_modifier_id');
    }

}
