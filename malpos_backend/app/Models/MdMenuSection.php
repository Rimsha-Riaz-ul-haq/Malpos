<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdMenuSection extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_menu_section_id';
    protected $guarded = ['md_menu_section_id'];

    public function branch(){
        return $this->belongsTo(CdBranch::class, 'cd_branch_id');
    }
    public function brand(){
        return $this->belongsTo(CdBrand::class, 'cd_brand_id');
    }
    public function client(){
        return $this->belongsTo(CdClient::class, 'cd_client_id');
    }
    public function menu(){
        return $this->belongsTo(MdMenu::class, 'md_menu_id');
    }
    public function menu_section_product(){
        return $this->hasMany(MdMenuSectionProduct::class, 'md_menu_section_id');
    }


}
