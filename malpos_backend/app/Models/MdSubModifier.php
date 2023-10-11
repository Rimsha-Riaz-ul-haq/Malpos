<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdSubModifier extends Model
{
    use HasFactory;

    protected $primaryKey = 'md_sub_modifier_id';
    protected $guarded = ['md_sub_modifier_id'];

    public function modifier(){
        return $this->belongsTo(MdModifier::class, 'md_modifier_id');
    }
}
