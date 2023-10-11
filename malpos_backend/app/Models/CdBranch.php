<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CdBranch extends Model
{
    use HasFactory;
    protected $primaryKey = 'cd_branch_id';
    protected $guarded = ['cd_branch_id'];

    public function brand(){
        return $this->belongsTo(CdBranch::class, 'branch_id');
    }

    public function country(){
        return $this->belongsTo(GdCountry::class, 'gd_country_id');
    } 

    public function region(){
        return $this->belongsTo(GdRegion::class, 'gd_region_id');
    } 
    
    public function currency(){
        return $this->belongsTo(TdCurrency::class, 'td_currnecy_id');
    }
}
