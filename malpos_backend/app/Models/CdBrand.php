<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CdBrand extends Model
{
    use HasFactory;
    protected $primaryKey = 'cd_brand_id';
    protected $guarded = ['cd_brand_id'];
    public function client(){
        return $this->belongsTo(CdClient::class, 'client_id');
    }
}
