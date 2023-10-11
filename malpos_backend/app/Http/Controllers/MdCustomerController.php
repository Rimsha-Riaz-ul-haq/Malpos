<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MdCustomer;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MdCustomerController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data =  MdCustomer::all();
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
            "address" => ['nullable',"string"],
            "md_customer_group_id" => ['nullable',"numeric"],
            "phone" => ['required',"string"],
            "is_active" => ['nullable',"string"],
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            "email" => ['nullable',"email",
                Rule::unique('md_customers')
                ->where("cd_client_id",$request->cd_client_id)
                ->where("cd_brand_id",$request->cd_brand_id)
                ->where("cd_branch_id",$request->cd_branch_id)],
            "dob" => ['nullable',"string"],
            "gender" => ['nullable',"string"],
            "description" => ['nullable',"string"],
            "country" => ['nullable',"string"],
            "city" => ['nullable',"string"],
            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        MdCustomer::create($data);
        
        return response()->json(["message"=>"Customer Created Succesfully!","data"=>$data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(MdCustomer $MdCustomer)
    {
        //
        return 'show';

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $data = MdCustomer::where("id",$id)->first();
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
     
        if(!MdCustomer::where("id",$id)->first()){
            return response()->json(["error"=>"Sorry no record Found!"]);
        }

        $validator = Validator::make($request->all(), [
            "name" => ['required',"string"],
            "address" => ['nullable',"string"],
            "md_customer_group_id" => ['nullable',"numeric"],
            "phone" => ['required',"string"],
            "is_active" => ['nullable',"string"],
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            "email" => ['nullable',"email",Rule::unique('md_customers')
            ->where("cd_client_id",$request->cd_client_id)
            ->where("cd_brand_id",$request->cd_brand_id)
            ->where("cd_branch_id",$request->cd_branch_id)->ignore($id)],
            "dob" => ['nullable',"string"],
            "gender" => ['nullable',"string"],
            "description" => ['nullable',"string"],
            "country" => ['nullable',"string"],
            "city" => ['nullable',"string"],
            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        MdCustomer::where("id",$id)->update($data);
        
        return response()->json(["message"=>"Customer Updated Succesfully!","data" => MdCustomer::where("id",$id)->first()]);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if(!MdCustomer::where("id",$id)->first()){
            return response()->json(["error"=>"Sorry no record Found!"]);
        }
        $data = MdCustomer::where("id",$id)->delete();
        return response()->json(["message"=>"Customer Deleted Succesfully!"]);
    }
}
