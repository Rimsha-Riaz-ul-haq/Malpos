<?php

namespace App\Http\Controllers;

use App\Models\CdClient;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class CdClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data =  CdClient::all();
        return response()->json($data);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return 'create';

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => ['required',"string"],
            "email" => ['required',"email",Rule::unique('cd_clients')],
            "address" => ['required',"string"],
            "phone_no" => ['required',"string"],
            "client_role" => ['required',"string"],
            "is_active" => ['required',"string"],
            "country_id" => ['required',"string"],
            "city_id" => ['required',"string"],
            "created_by" => ['required',"string"],
            "updated_by" => ['required',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        CdClient::create($data);
        
        return response()->json(["message"=>"Client Created Succesfully!","data"=>$data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CdClient $cdClient)
    {
        //
        return 'show';

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $data = CdClient::where("cd_client_id",$id)->first();
        if(!$data){
            return response()->json(["error"=>"Sorry no record Found!"]);
        }
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
     
        if(!CdClient::where("cd_client_id",$id)->first()){
            return response()->json(["error"=>"Sorry no record Found!"]);
        }

        $validator = Validator::make($request->all(), [
            "name" => ['required',"string"],
            "email" => ['required',"email",Rule::unique('cd_clients')->whereNot("cd_client_id",$id)],
            "address" => ['required',"string"],
            "phone_no" => ['required',"string"],
            "client_role" => ['required',"string"],
            "is_active" => ['required',"string"],
            "country_id" => ['required',"string"],
            "city_id" => ['required',"string"],
            "created_by" => ['required',"string"],
            "updated_by" => ['required',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        CdClient::where("cd_client_id",$id)->update($data);
        
        return response()->json(["message"=>"Client Updated Succesfully!","data"=>$data]);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = CdClient::where("cd_client_id",$id)->delete();
        return response()->json(["message"=>"Client Deleted Succesfully!"]);
    }
    public function client_details(){
        
    }
}
