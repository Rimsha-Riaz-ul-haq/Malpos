<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdStation extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_station_id';
    protected $guarded = ['md_station_id'];

    public function branch(){
        return $this->belongsTo(CdBranch::class, 'cd_branch_id');
    }
    public function brand(){
        return $this->belongsTo(CdBrand::class, 'cd_brand_id');
    }
    public function client(){
        return $this->belongsTo(CdClient::class, 'cd_client_id');
    }

    public function station_product(){
        return $this->hasMany(MdStationProduct::class, 'md_station_id');
    }


}
