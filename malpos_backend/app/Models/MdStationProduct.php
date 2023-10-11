<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdStationProduct extends Model
{
    use HasFactory;
    protected $primaryKey = 'md_station_product_id';
    protected $guarded = ['md_station_product_id'];

    public function station(){
        return $this->belongsTo(MdStation::class, 'md_station_id');
    }

    public function product(){
        return $this->belongsTo(MdProduct::class, 'md_product_id');
    }
}
