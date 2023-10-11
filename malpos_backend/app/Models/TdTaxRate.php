<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TdTaxRate extends Model
{
    use HasFactory;
    protected $primaryKey = 'td_tax_rate_id';
    protected $guarded = ['td_tax_rate_id'];
    public function tax_category(){
        return $this->belongsTo(TdTaxCategory::class, 'td_tax_category_id');
    }
}
