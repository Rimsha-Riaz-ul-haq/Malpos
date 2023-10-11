<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProductBranch extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_product_branch_id';
    protected $guarded = ['md_product_branch_id'];

    public function product(){
        return $this->belongsTo(MdProduct::class, 'md_product_id');
    }
    public function branch(){
        return $this->belongsTo(CdBranch::class, 'cd_branch_id');
    }
}
