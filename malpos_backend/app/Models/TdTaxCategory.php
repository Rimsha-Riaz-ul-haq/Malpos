<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TdTaxCategory extends Model
{
    use HasFactory;
    protected $primaryKey = 'td_tax_category_id';
    protected $guarded = ['td_tax_category_id'];
    
}
