<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdStock;

class MdStockController extends Controller
{
    public function index(){
        $data = MdStock::simplePaginate(10);
        return response()->json($data, 200);
    }
    
    public function product_stock($product_id,$storage_id){
        // dd(auth()->user());// work on it
        $data = MdStock::where("md_product_id",$product_id)
        ->with([
            "storage:id,name,is_active",
            "product:md_product_id,product_name"
        ])
        ->first();
        return response()->json($data, 200);
    }
}
