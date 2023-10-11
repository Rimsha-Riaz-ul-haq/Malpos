<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MdStorage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MdStorageController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(MdStorage::simplePaginate(10),200);
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
            "is_active" => ['nullable',"numeric"],
            "write_off_sequence" => ['nullable',"numeric"],
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            "name" => ['required',"string",Rule::unique('md_storages')
            ->where("cd_client_id",$request->cd_client_id)
            ->where("cd_brand_id",$request->cd_brand_id)
            ->where("cd_branch_id",$request->cd_branch_id)],
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
        MdStorage::create($data);
        return response()->json(['message' => 'Storage Created Successfully'],200);
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
        if(!MdStorage::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        return response()->json(MdStorage::where('id',$id)->first(),200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if(!MdStorage::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        $validator = Validator::make($request->all(), [
            "is_active" => ['nullable',"numeric"],
            "write_off_sequence" => ['nullable',"numeric"],
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            "name" => ['required',"string",Rule::unique('md_storages')
                ->where("cd_client_id",$request->cd_client_id)
                ->where("cd_brand_id",$request->cd_brand_id)
                ->where("cd_branch_id",$request->cd_branch_id)
                ->ignore($id)],
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
        $updated = MdStorage::where('id',$id)->update($data);
        return response()->json(['message' => 'Storage Updated Successfully',"data" => MdStorage::where('id',$id)->first()],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        if(!MdStorage::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        MdStorage::where('id',$id)->delete();
        return response()->json(['message' => 'Storage Deleted Successfully'],200);
    }
}
