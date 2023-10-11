<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdSupplier;

class MdSupplierController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(MdSupplier::simplePaginate(10),200);
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
            "supplier_name" => ['required',"string"],
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            "phone" => ['required',"string",Rule::unique('md_suppliers')
                ->where("cd_client_id",$request->cd_client_id)
                ->where("cd_brand_id",$request->cd_brand_id)
                ->where("cd_branch_id",$request->cd_branch_id)],

            "tin" => ['nullable',"string"],
            "description" => ['nullable',"string"],
            "is_active" => ['nullable',"string"],
            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        $data = array_filter($data, function ($value) {
            return $value !== null;
        });
        MdSupplier::create($data);
        return response()->json(['message' => 'Supplier Created Successfully'],200);
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
        if(!MdSupplier::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        return response()->json(MdSupplier::where('id',$id)->first(),200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if(!MdSupplier::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        $validator = Validator::make($request->all(), [
            "supplier_name" => ['required',"string"],
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            "phone" => ['required',"string",Rule::unique('md_suppliers')
            ->where("cd_client_id",$request->cd_client_id)
            ->where("cd_brand_id",$request->cd_brand_id)
            ->where("cd_branch_id",$request->cd_branch_id)->ignore($id)],

            "tin" => ['nullable',"string"],
            "description" => ['nullable',"string"],
            "is_active" => ['nullable',"string"],
            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        $data = array_filter($data, function ($value) {
            return $value !== null;
        });
        $updated = MdSupplier::where('id',$id)->update($data);
        return response()->json(['message' => 'Supplier Updated Successfully',"data" => MdSupplier::where('id',$id)->first()],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        if(!MdSupplier::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        MdSupplier::where('id',$id)->update(["status"=>"deleted"]);
        return response()->json(['message' => 'Supplier Deleted Successfully'],200);
    }
}
