<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdBankAccount extends Model
{
    use HasFactory;
    protected $primaryKey = 'md_bank_account_id';
    protected $guarded = ['md_bank_account_id'];
}
