<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdUom;
use App\Models\MdUomsConversion;
use App\Models\MdProductUnit;

class MdUOMController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = MdUom::paginate(10);
        return response()->json(["data"=>$data],200);
    }
    
    public function get_units_by_product($product_id)
    {
        $units = [];
        $pu = MdProductUnit::where("md_product_id",$product_id)->where("is_deleted",0)->first();
        $base_unit = MdUom::where("md_uoms_id",$pu->md_uom_id)->where("is_active",1)
        ->with(["conversions"=> function ($query) {
            $query->select("md_uom_id","md_uoms_conversions_id","uom_to_name as name","multiply_rate","divide_rate");
        }])->whereHas('conversions', function ($query) {
            return $query->where('is_active', 1);
        })
        ->select(["md_uoms_id","name"])
        ->first();

        if($base_unit){
            return response()->json(["data"=>$base_unit],200);
        }else{
            return response()->json(['error' => ["Sorry no base unit found for this product"]], 401);
        }
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
            
            "code" => ["required" , "string"],
            "symbol" => ["required" , "string",Rule::unique('md_uoms')
                ->where("cd_client_id",$request->cd_client_id)
            ],
            "name" => ["required" , "string"],

            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        $data["type"] = "user_defined";
        $data["is_active"] = "1";
        $uom = MdUom::create($data);
        return response()->json(['message' => 'UOM Created Successfully',"data"=>MdUom::where("md_uoms_id",$uom->id)->first()],200);

    }

    /**
     * Display the specified resource.
     */
    public function show(MdUom $mdUnitOfMeasurement)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data = MdUom::where("md_uoms_id",$id)->first();
        if(!$data){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        return response()->json(["data"=>$data],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if(!MdUom::where("md_uoms_id",$id)->first()){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        $validator = Validator::make($request->all(), [
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            
            "code" => ["required" , "string"],
            "symbol" => ["required" , "string",
                Rule::unique('md_uoms')
                ->where("cd_client_id",$request->cd_client_id)
                ->whereNot("md_uoms_id",$id)
            ],
            "name" => ["required" , "string"],
            "updated_by" => ['nullable',"string"],
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        MdUom::where("md_uoms_id",$id)->update($data);
        return response()->json(['message' => 'UOM Updated Successfully',"data"=>MdUom::where("md_uoms_id",$id)->first()],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = MdUom::where("md_uoms_id",$id)->first();
        if(!MdUom::where("md_uoms_id",$id)->first()){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        if(MdUomsConversion::where("cd_client_id",$data->cd_client_id)->where("is_active",1)->where("md_uoms_id",$id)->first()){
            return response()->json(['message' => 'UOM Cannot be Deleted, Because it is associated to uom conversion'],200);
        }

        MdUom::where("md_uoms_id",$id)->update(["is_active" => 0]);
        return response()->json(['message' => 'UOM Deleted Successfully'],200);
    }
}
