<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdUomsConversion;

class MdUOMConversionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = MdUomsConversion::paginate(10);
        return response()->json(["data"=>$data],200);
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
            
            "md_uom_id" => ["required" , "string"],
            "uom_to_name" => ["required" , "string",Rule::unique('md_uoms_conversions')
                ->where("cd_client_id",$request->cd_client_id)
            ],
            "multiply_rate" => ["required" , "string"],
            "divide_rate" => ["required" , "string"],

            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        // dd($data);
        // $data["type"] = "user_defined";
        $data["is_active"] = "1";
        $uomc = MdUomsConversion::create($data);
        return response()->json(['message' => 'UOM Conversion Created Successfully',"data"=>MdUomsConversion::where("md_uoms_conversions_id",$uomc->id)->first()],200);

    }

    /**
     * Display the specified resource.
     */
    public function show(MdUomsConversion $mdUnitOfMeasurement)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data = MdUomsConversion::where("md_uoms_conversions_id",$id)->first();
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
        if(!MdUomsConversion::where("md_uoms_conversions_id",$id)->first()){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        $validator = Validator::make($request->all(), [
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            
            "md_uom_id" => ["required" , "string"],
            "uom_to_name" => ["required" , "string",Rule::unique('md_uoms_conversions')
                ->where("cd_client_id",$request->cd_client_id)
                ->whereNot("md_uoms_conversions_id",$id)
            ],
            "multiply_rate" => ["required" , "string"],
            "divide_rate" => ["required" , "string"],

            "updated_by" => ['nullable',"string"],
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        MdUomsConversion::where("md_uoms_conversions_id",$id)->update($data);
        return response()->json(['message' => 'UOM Conversion Updated Successfully',"data"=>MdUomsConversion::where("md_uoms_conversions_id",$id)->first()],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if(!MdUomsConversion::where("md_uoms_conversions_id",$id)->first()){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        MdUomsConversion::where("md_uoms_conversions_id",$id)->update(["is_active" => 0]);
        return response()->json(['message' => 'UOM Deleted Successfully'],200);
    }
}
