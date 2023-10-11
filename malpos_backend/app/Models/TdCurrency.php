<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TdCurrency extends Model
{
    use HasFactory;
    protected $primaryKey = 'td_currency_id';
    protected $guarded = ['td_currency_id'];
}
