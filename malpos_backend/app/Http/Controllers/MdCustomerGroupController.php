<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MdCustomerGroup;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MdCustomerGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(MdCustomerGroup::all(),200);
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
            "discount" => ['required',"numeric"],

            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            "group_name" => ['required',"string",Rule::unique('md_customer_groups')
            ->where("cd_client_id",$request->cd_client_id)
            ->where("cd_brand_id",$request->cd_brand_id)
            ->where("cd_branch_id",$request->cd_branch_id)],

            "type" => ['nullable',"string"],
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
        MdCustomerGroup::create($data);
        return response()->json(['message' => 'Customer Group Created Successfully'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(MdCustomerGroup $MdCustomerGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        if(!MdCustomerGroup::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        return response()->json(MdCustomerGroup::where('id',$id)->first(),200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if(!MdCustomerGroup::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        $validator = Validator::make($request->all(), [
            "discount" => ['required',"numeric"],

            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],

            "group_name" => ['required',"string", Rule::unique('md_customer_groups')
            ->where("cd_client_id",$request->cd_client_id)
            ->where("cd_brand_id",$request->cd_brand_id)
            ->where("cd_branch_id",$request->cd_branch_id)->ignore($id)],

            "type" => ['nullable',"string"],
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
        $updated = MdCustomerGroup::where('id',$id)->update($data);
        return response()->json(['message' => 'Customer Group Updated Successfully',"data" => MdCustomerGroup::where('id',$id)->first()],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        if(!MdCustomerGroup::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        MdCustomerGroup::where('id',$id)->delete();
        return response()->json(['message' => 'Customer Group Deleted Successfully'],200);
    }
}
