<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TdSaleOrder extends Model
{
    use HasFactory;
    protected $primaryKey = 'td_sale_order_id';
    protected $guarded = ['td_sale_order_id'];
    public function getCreatedAtAttribute()
    {
        $start = Carbon::parse($this->attributes['created_at'])->format('M d');
        $end = Carbon::parse($this->attributes['created_at'])->format('y');
        return $start.' - '.$end;
    }

    public function order_detail(){
        return $this->hasMany(TdSaleOrderDetail::class, 'td_sale_order_id');
    }

    public function td_sale_order_item(){
        return $this->hasMany(TdSaleOrderItem::class, 'td_sale_order_id');
    }

    public function td_payment_detail(){
        return $this->hasMany(TdPaymentDetail::class, 'td_sale_order_id');
    }

    public function td_payment_transaction(){
        return $this->hasMany(TdPaymentTransaction::class, 'td_sale_order_id');
    }

    public function TdSaleOrderCode()
    {
        $check = TdSaleOrder::where('td_sale_order_code','like','%#%' )->latest()->first()->td_sale_order_code ?? null;
        $max=1;
        if($check != null){
            $var = (explode("#",$check));
            $max1 = $var[0];
            $max2 = $var[1] ;
            $max = $max2+1;
        }
        $user_id = 1;
        $latestOrderId = TdSaleOrder::latest('td_sale_order_id')->pluck('td_sale_order_id')->first();
    $id = $latestOrderId + 1;
        $value = 'DOC#'.$id;
        return  $value;
    }
}
