<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdMenuSectionProduct extends Model
{
    use HasFactory;
    public function product(){
        return $this->belongsTo(MdProduct::class, 'md_product_id');
    }
    public function menu_section(){
        return $this->belongsTo(MdMenuSection::class, 'md_menu_section_id');
    }
    public function currency(){
        return $this->belongsTo(TdCurrency::class, 'td_currency_id');
    }
    
}
