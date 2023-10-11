<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdModifier extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_modifier_id';
    protected $guarded = ['md_modifier_id'];

    public function branch(){
        return $this->belongsTo(CdBranch::class, 'cd_branch_id');
    }
    public function brand(){
        return $this->belongsTo(CdBrand::class, 'cd_brand_id');
    }
    public function client(){
        return $this->belongsTo(CdClient::class, 'cd_client_id');
    }
    public function sub_modifier(){
        return $this->hasMany(MdSubModifier::class, 'md_modifier_id');
    }
}
