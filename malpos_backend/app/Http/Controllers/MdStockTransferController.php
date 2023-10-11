<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use App\Models\MdStock;
use App\Models\MdStockTransfer;
use App\Models\MdStockTransferLine;
// use App\Models\MdStockTransferLine;
use Illuminate\Validation\Rule;

class MdStockTransferController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(MdSupply::
        with([
            "supplier:id,supplier_name",
            "storage:id,name,is_active",
            // "supply_lines",
            "supply_lines.product:md_product_id,product_name"
        ])
        ->simplePaginate(10),200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],

            "operation_time" => ['required',"string"],
            "md_from_storage_id" => ['required',"numeric"],
            "md_to_storage_id" => ['required',"numeric"],

            "reason" => ['nullable',"string"],

            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
            // 
            // "lines.*.md_supply_id" => ['required',"numeric"],
            "lines.*.md_product_id" => ['required',"numeric"],
            "lines.*.qty" => ['required',"numeric"],
            "lines.*.uom_id" => ['required',"string"],
            "lines.*.uom_type" => ['required',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        $lines = $data["lines"];
        unset($data["lines"]);
        // dd($data,$lines);
        $check1 = [];
        $check2 = [];
        $oldstocks = [];
        foreach($lines as $line){
            $oldstock = MdStock::where("md_storage_id",$data["md_from_storage_id"])
            ->where("md_product_id",$line["md_product_id"])->where("is_deleted",0)->first();
            if($oldstock){
                array_push($check2,1);
                if($oldstock->current_qty >= $line["qty"]){
                    $line["stock_id"] = $oldstock->id;
                    $line["stock_qty"] = $oldstock->current_qty;
                    array_push($oldstocks,$line);
                    array_push($check1,1);
                }else{
                    array_push($check1,0);
                }
                return response()->json([$oldstock,$line["qty"]],200);
            }else{
                array_push($check2,0);
            }
            // MdStock::create([
            //     "cd_client_id" =>  $request->cd_client_id,
            //     "cd_brand_id" =>  $request->cd_brand_id,
            //     "cd_branch_id" =>  $request->cd_branch_id,

            //     "md_stock_transfer_id" => $transfer->id,
            //     "md_product_id" => $line["md_product_id"],
            //     "md_storage_id" => $request->md_to_storage_id,
            //     "stock_type" => "transfer",
            //     "qty" => ($line["qty"]),
            //     "unit" => $line["unit"],
            //     // "cost" => $line["cost"],
            // ]);
            // MdStockTransferLine::create([
            //     "md_product_id" => $line["md_product_id"],
            //     "qty" => $line["qty"],
            //     "uom_id" => $line["uom_id"],
            //     "uom_type" => $line["uom_type"]
            // ]);
        }
        if(array_product($check1) == 1 && array_product($check2) == 1){
            $transfer = MdStockTransfer::create($data);
            foreach($oldstocks as $oline){
                MdStock::where("id",$oline["stock_id"])->update([
                    'current_qty' => $oline["stock_qty"] - $oline["qty"]
                ]);
                $newstock = MdStock::where("md_storage_id",$data["md_to_storage_id"])
                ->where("md_product_id",$line["md_product_id"])->where("is_deleted",0)->first();
                if($newstock){
                    
                }else{

                }
                // MdStockTransferLine::create([
                //     "md_product_id" => $line["md_product_id"],
                //     "qty" => $line["qty"],
                //     "uom_id" => $line["uom_id"],
                //     "uom_type" => $line["uom_type"]
                // ]);
            }
        }elseif(array_product($check1) != 1){
            return response()->json(["error"=>"Sorry no enough stock available for one of the product to transfer!"],401);
        }elseif(array_product($check2) != 1){
            return response()->json(["error"=>"Sorry no stock available for this product!"],401);
        }

        return response()->json(['message' => 'Stock Transferd Successfully',"data"=>""],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(MdSupplier $MdSupplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        if(!MdSupply::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        return response()->json(MdSupply::getSupply($id),200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if(!MdSupply::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        $validator = Validator::make($request->all(), [

            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],

            "operation_time" => ['required',"string"],
            "md_supplier_id" => ['required',"numeric"],
            "md_storage_id" => ['required',"numeric"],
            "status" => ['required',"string"],
            "balance" => ['nullable',"string"],
            "category" => ['nullable',"string"],
            "description" => ['nullable',"string"],

            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
            // 
            "lines.*.md_product_id" => ['required',"numeric"],
            "lines.*.qty" => ['required',"numeric"],
            "lines.*.total" => ['required',"numeric"],
            "lines.*.unit" => ['nullable',"string"],
            "lines.*.cost" => ['required',"numeric"],
            "lines.*.discount_percent" => ['nullable',"numeric"],
            "lines.*.tax_percent" => ['nullable',"numeric"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        $lines = $data["lines"];
        unset($data["lines"]);
        // dd($data,$lines);
        MdSupply::where("id",$id)->update($data);

        MdSupplyLine::where("md_supply_id",$id)->delete();
        MdStock::where("md_supply_id",$id)->delete();
        foreach($lines as $line){
            MdStock::create([
                "cd_client_id" =>  $request->cd_client_id,
                "cd_brand_id" =>  $request->cd_brand_id,
                "cd_branch_id" =>  $request->cd_branch_id,

                "md_supply_id" => $id,
                "md_storage_id" => $request->md_storage_id,
                "md_product_id" => $line["md_product_id"],
                "stock_type" => "supply",
                "qty" => $line["qty"],
                "cost" => $line["cost"],
            ]);
            $line["md_supply_id"] = $id;
            MdSupplyLine::create($line);
        }
        return response()->json(['message' => 'Supply Updated Successfully',"data" => MdSupply::getSupply($id)],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        if(!MdSupply::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }

        MdSupply::where("id",$id)->update(["status"=>'deleted']);
        // MdSupplyLine::where("md_supply_id",$id)->delete();
        return response()->json(['message' => 'Supply Deleted Successfully'],200);
    }
}
