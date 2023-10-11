<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdStock;
use App\Models\MdSupply;
use App\Models\MdProduct;
use App\Models\MdSuppliesLine;
use App\Models\MdProductCost;
use App\Models\MdProductUnit;
use App\Models\MdUomsConversion;

class MdSupplyController extends Controller
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
            "supplies_lines.product:md_product_id,product_name"
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

            "invoice_no" => ['nullable',"string",Rule::unique('md_supplies')],
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
            "lines.*.uom_id" => ['required',"numeric"],
            "lines.*.uom_type" => ['required',"string"],
            "lines.*.cost" => ['required',"numeric"],
            "lines.*.discount_percent" => ['nullable',"numeric"],
            "lines.*.tax" => ['nullable',"numeric"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        if(!$data["invoice_no"]){
            $old = MdSupply::max("invoice_no");
            $data["invoice_no"] = "1";
            if($old){
                $data["invoice_no"] = intval($old);
                $data["invoice_no"]++;
                $data["invoice_no"] = strval($data["invoice_no"]);
            }
        }
        $lines = $data["lines"];
        unset($data["lines"]);
        // dd($data,$lines);

        $supply = MdSupply::create($data);
        foreach($lines as $line){
            // ------------------conversion- -------------------------
            $product_base_unit = MdProductUnit::where("md_product_id",$line["md_product_id"])
            ->where('type',"unit")->first();
            if(!$product_base_unit){
                return response()->json("no base unit found");
                // do it later, delete created
            }
            $qty = $line["qty"];

            if($line["uom_type"] == "conversion"){
                $unit=MdUomsConversion::where("md_uoms_conversions_id",$line["uom_id"])->first();
                $qty*=$unit->multiply_rate;
            }

            // if($product_base_unit->id != $line["md_product_unit_id"]){
            //     $unit = MdProductUnit::where("id",$line["md_product_unit_id"])->select("md_uom_conversion_id")
            //     ->with("conversion:md_uoms_conversions_id,multiply_rate,divide_rate")->first();
            //     $qty*=$unit->conversion["multiply_rate"];
            // }

            // add line_amount and total in table lines
            // -------------------oldcost---------------------------
            // $oldcost = MdSuppliesLine::where("md_product_id",$line["md_product_id"])
            // ->groupBy("md_product_id")
            // ->selectRaw("md_product_id,sum(cost) as total_cost")
            // ->first();
            // --------------------------stock-----------------------------------

            $stock = MdStock::where('md_product_id',$line["md_product_id"])
            ->where("cd_client_id", $request->cd_client_id)
            ->where("cd_brand_id", $request->cd_brand_id)
            // apply ->when on branch
            ->where("cd_branch_id", $request->cd_branch_id)
            ->where("md_storage_id", $request->md_storage_id)
            ->first();

            $cost = MdProductCost::where("md_product_id",$line["md_product_id"])
            ->where("cd_client_id", $request->cd_client_id)
            ->where("cd_brand_id", $request->cd_brand_id)
            // apply ->when on branch
            ->where("cd_branch_id", $request->cd_branch_id)
            ->first();

            $oldcostperpiece = $cost?$cost->current_cost:$line["cost"];
            
            if($stock){
                $avg_cost = (($oldcostperpiece*$stock->current_qty+$qty*$line["cost"])/($stock->current_qty+$qty));
            }else{
                $avg_cost = $line["cost"];
            }
            if($data["status"] == "approved"){
                if($stock){
                MdStock::where("id",$stock->id)->update(["md_uom_id" =>  $product_base_unit->md_uom_id,"current_qty"=>$stock->current_qty+$qty]);
                MdStock::where("id",$stock->id)->update(["md_uom_id" =>  $product_base_unit->md_uom_id,"current_qty"=>$stock->current_qty+$qty]);
                // return response()->json([
                //     ((($oldcost)."*".$stock->current_qty."+".$qty."*".$line["cost"])."/".($stock->current_qty."+".$qty)),
                //     round($avg_cost,2)
                // ]);
                    MdStock::where("id",$stock->id)->update(["md_uom_id" =>  $product_base_unit->md_uom_id,"current_qty"=>$stock->current_qty+$qty]);
                // return response()->json([
                //     ((($oldcost)."*".$stock->current_qty."+".$qty."*".$line["cost"])."/".($stock->current_qty."+".$qty)),
                //     round($avg_cost,2)
                // ]);
                }else{
                    MdStock::create([
                        "cd_client_id" =>  $request->cd_client_id,
                        "cd_brand_id" =>  $request->cd_brand_id,
                        "cd_branch_id" =>  $request->cd_branch_id,
                        "md_uom_id" =>  $product_base_unit->md_uom_id,

                        // "md_supply_id" => $supply->id,
                        "md_storage_id" => $request->md_storage_id,
                        "current_qty" => $qty,
                        "md_product_id" => $line["md_product_id"],
                    ]);
                }
                // -----------------------------cost-----------------------------------
                if($cost){
                    MdProductCost::where('id',$cost->id)->update([
                        "current_cost" => $avg_cost,
                    ]);
                }else{
                    MdProductCost::create([
                        "current_cost" => $avg_cost,
                        "cd_client_id" =>  $request->cd_client_id,
                        "cd_brand_id" =>  $request->cd_brand_id,
                        "cd_branch_id" =>  $request->cd_branch_id,
                        "md_product_id" => $line["md_product_id"]
                    ]);
                }
                //------------------------------------------------------------------
            }
            $line["md_supply_id"] = $supply->id;
            $line["line_amount"] = $qty*$line["cost"];
            $line["qty"] = $qty;
            $line["avg_cost"] = $avg_cost;

            MdSuppliesLine::create($line);
        }
        return response()->json(['message' => 'Supply Created Successfully',"data"=>MdSupply::getSupply($supply->id)],200);
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
    public function update(Request $request, $id){
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
            // "lines.*.md_product_unit_id" => ['required',"numeric"],
            "lines.*.uom_id" => ['required',"numeric"],
            "lines.*.uom_type" => ['required',"string"],
            "lines.*.cost" => ['required',"numeric"],
            "lines.*.discount_percent" => ['nullable',"numeric"],
            "lines.*.tax" => ['nullable',"numeric"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        $lines = $data["lines"];
        unset($data["lines"]);

        $old_supp = MdSupply::where("id",$id)->first();
        $s_lines = MdSuppliesLine::where("is_deleted",0)->where("md_supply_id",$id)->get();
        $check = [];
        $oldstocks = [];
        foreach($s_lines as $s_line){
            $oldstock = MdStock::where('md_product_id',$s_line["md_product_id"])
            // ->where("cd_client_id", $old_supp->cd_client_id)
            // ->where("cd_brand_id", $old_supp->cd_brand_id)
            // // apply ->when on branch
            // ->where("cd_branch_id", $old_supp->cd_branch_id)
            ->where("md_storage_id", $old_supp->md_storage_id)
            ->select("id","current_qty")
            ->first();

            if($oldstock->current_qty >= $s_line["qty"]){
                $s_line["stock_id"] = $oldstock->id;
                $s_line["stock_oldqty"] = $oldstock->current_qty;

                array_push($oldstocks,$s_line);
                array_push($check,1);
            }else{
                array_push($check,0);
            }
        }
        if(array_product($check) == 1){
            foreach($oldstocks as $s_line){
                $oldavgcost = MdSuppliesLine::where("is_deleted",0)->whereNot("md_supply_id",$id)
                ->where("md_product_id",$s_line["md_product_id"])
                ->orderByDesc("id")->first();

                if($oldavgcost){
                    $oavg_cost = $oldavgcost->avg_cost;
                }else{
                    $oavg_cost = 0;
                }
                if($old_supp["status"] == "approved"){
                    MdStock::where('id',$s_line["stock_id"])
                    ->update([
                        "current_qty" => $s_line["stock_oldqty"] - $s_line['qty']
                    ]);
                    MdProductCost::where('md_product_id',$s_line["md_product_id"])
                    ->where("cd_client_id", $old_supp->cd_client_id)
                    ->where("cd_brand_id", $old_supp->cd_brand_id)
                    // apply ->when on branch
                    ->where("cd_branch_id", $old_supp->cd_branch_id)
                    ->update([
                        "current_cost" => $oavg_cost,
                    ]);
                }

                $s_lines = MdSuppliesLine::where("md_supply_id",$id)->delete();
            }
        }else{
            return response()->json(["data"=>"Sorry this Supply is not editable because negative stocks are not possible"], 401);
        }
        // ---------------------------------------------------------------------------------------------------
        $supply = MdSupply::where("id",$id)->update($data);
        foreach($lines as $line){
            // ------------------conversion- -------------------------
            $product_base_unit = MdProductUnit::where("md_product_id",$line["md_product_id"])
            ->where('type',"unit")->first();
            if(!$product_base_unit){
                return response()->json("no base unit found");
                // do it later, delete created
            }
            $qty = $line["qty"];
            if($line["uom_type"] == "conversion"){
                $unit=MdUomsConversion::where("md_uoms_conversions_id",$line["uom_id"])->first();
                $qty*=$unit->multiply_rate;
            }
            // if($product_base_unit->id != $line["md_product_unit_id"]){
            //     $unit = MdProductUnit::where("id",$line["md_product_unit_id"])->select("md_uom_conversion_id")
            //     ->with("conversion:md_uoms_conversions_id,multiply_rate,divide_rate")->first();
            //     $qty*=$unit->conversion["multiply_rate"];
            // }
            // --------------------------stock-----------------------------------
            $stock = MdStock::where('md_product_id',$line["md_product_id"])
            // ->where("cd_client_id", $request->cd_client_id)
            // ->where("cd_brand_id", $request->cd_brand_id)
            // // apply ->when on branch
            // ->where("cd_branch_id", $request->cd_branch_id)
            ->where("md_storage_id", $request->md_storage_id)
            ->first();

            $cost = MdProductCost::where("md_product_id",$line["md_product_id"])
            ->where("cd_client_id", $request->cd_client_id)
            ->where("cd_brand_id", $request->cd_brand_id)
            // apply ->when on branch
            ->where("cd_branch_id", $request->cd_branch_id)
            ->first();

            $oldcostperpiece = $cost?$cost->current_cost:$line["cost"];
            if($stock){
                $avg_cost = (($oldcostperpiece*$stock->current_qty+$qty*$line["cost"])/($stock->current_qty+$qty));
            }else{
                $avg_cost = $line["cost"];
            }

            if($data["status"] == "approved"){
                if($stock){
                MdStock::where("id",$stock->id)->update(["md_uom_id" =>  $product_base_unit->md_uom_id,"current_qty"=>$stock->current_qty+$qty]);
                MdStock::where("id",$stock->id)->update(["md_uom_id" =>  $product_base_unit->md_uom_id,"current_qty"=>$stock->current_qty+$qty]);
                // return response()->json([
                //     ((($oldcost)."*".$stock->current_qty."+".$qty."*".$line["cost"])."/".($stock->current_qty."+".$qty)),
                //     round($avg_cost,2)
                // ]);
                    MdStock::where("id",$stock->id)->update(["md_uom_id" =>  $product_base_unit->md_uom_id,"current_qty"=>$stock->current_qty+$qty]);
                // return response()->json([
                //     ((($oldcost)."*".$stock->current_qty."+".$qty."*".$line["cost"])."/".($stock->current_qty."+".$qty)),
                //     round($avg_cost,2)
                // ]);
                }else{
                    MdStock::create([
                        "cd_client_id" =>  $request->cd_client_id,
                        "cd_brand_id" =>  $request->cd_brand_id,
                        "cd_branch_id" =>  $request->cd_branch_id,
                        "md_uom_id" =>  $product_base_unit->md_uom_id,

                        // "md_supply_id" => $supply->id,
                        "md_storage_id" => $request->md_storage_id,
                        "current_qty" => $qty,
                        "md_product_id" => $line["md_product_id"],
                    ]);
                }
                // -----------------------------cost-----------------------------------
                if($cost){
                    MdProductCost::where('id',$cost->id)->update([
                        "current_cost" => $avg_cost,
                    ]);
                }else{
                    MdProductCost::create([
                        "current_cost" => $avg_cost,
                        "cd_client_id" =>  $request->cd_client_id,
                        "cd_brand_id" =>  $request->cd_brand_id,
                        "cd_branch_id" =>  $request->cd_branch_id,
                        "md_product_id" => $line["md_product_id"]
                    ]);
                }
                //------------------------------------------------------------------
            }

            $line["md_supply_id"] = $id;
            $line["line_amount"] = $qty*$line["cost"];
            $line["qty"] = $qty;
            $line["avg_cost"] = $avg_cost;

            MdSuppliesLine::create($line);
        }
        return response()->json(['message' => 'Supply Updated Successfully',"data"=>MdSupply::getSupply($id)],200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        if(!MdSupply::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        $old_supp = MdSupply::where("id",$id)->first();
        $s_lines = MdSuppliesLine::where("is_deleted",0)->where("md_supply_id",$id)->get();
        $check = [];
        $oldstocks = [];
        foreach($s_lines as $s_line){
            $oldstock = MdStock::where('md_product_id',$s_line["md_product_id"])
            // ->where("cd_client_id", $old_supp->cd_client_id)
            // ->where("cd_brand_id", $old_supp->cd_brand_id)
            // // apply ->when on branch
            // ->where("cd_branch_id", $old_supp->cd_branch_id)
            ->where("md_storage_id", $old_supp->md_storage_id)
            ->select("id","current_qty")
            ->first();

            if($oldstock->current_qty >= $s_line["qty"]){
                $s_line["stock_id"] = $oldstock->id;
                $s_line["stock_oldqty"] = $oldstock->current_qty;

                array_push($oldstocks,$s_line);
                array_push($check,1);
            }else{
                array_push($check,0);
            }
            // array_push()
        }
            // return response()->json($oldstocks, 200);
        if(array_product($check) == 1){
            foreach($oldstocks as $s_line){
                $oldavgcost = MdSuppliesLine::where("is_deleted",0)->whereNot("md_supply_id",$id)
                ->where("md_product_id",$s_line["md_product_id"])
                ->orderByDesc("id")->first();

                if($oldavgcost){
                    $oavg_cost = $oldavgcost->avg_cost;
                }else{
                    $oavg_cost = 0;
                }

                if($old_supp["status"] == "approved"){
                    MdStock::where('id',$s_line["stock_id"])
                    ->update([
                        "current_qty" => $s_line["stock_oldqty"] - $s_line['qty']
                    ]);
                    MdProductCost::where('md_product_id',$s_line["md_product_id"])
                    ->where("cd_client_id", $old_supp->cd_client_id)
                    ->where("cd_brand_id", $old_supp->cd_brand_id)
                    // apply ->when on branch
                    ->where("cd_branch_id", $old_supp->cd_branch_id)
                    ->update([
                        "current_cost" => $oavg_cost,
                    ]);
                }
            }
        }else{
            return response()->json(["data"=>"Sorry this Supply is not Delete-able because negative stocks are not possible"], 401);
        }
        // -------------------------------------------
        MdSupply::where("id",$id)->update(["status"=>'deleted']);
        MdSuppliesLine::where("md_supply_id",$id)->update(["is_deleted"=>1]);

        return response()->json(['message' => 'Supply Deleted Successfully'],200);
    }
}
