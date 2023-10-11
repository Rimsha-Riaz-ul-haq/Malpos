<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TdPaymentTransaction extends Model
{
    use HasFactory;
    protected $primaryKey = 'td_payment_transaction_id';
    protected $guarded = ['td_payment_transaction_id'];
    public function td_sale_order(){
        return $this->belongsTo(TdSaleOrder::class, 'td_sale_order_id');
    }
    public function td_payment_detail(){
        return $this->belongsTo(TdSaleOrder::class, 'td_payment_detail_id');
    }
}
