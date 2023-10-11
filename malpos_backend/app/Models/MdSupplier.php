<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdSupplier extends Model
{
    use HasFactory;
    protected $guarded = [];
    
    public function supply(){
        return $this->belongsTo(MdSupply::class, 'md_supplier_id');
    }
}
