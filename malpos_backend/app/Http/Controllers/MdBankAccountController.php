<?php

namespace App\Http\Controllers;

use App\Models\MdBankAccount;
use Illuminate\Http\Request;

class MdBankAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = MdBankAccount::all();
        return response()->json(['data' => $data]);
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
        //
        $data =new MdBankAccount();
        $data->bank_account_id = $request->bank_account_id;
        $data->tender_type = $request->tender_type;
        $data->cd_client_id = $request->cd_client_id;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->is_active = $request->is_active;
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->description = $request->description;

         $data->save();
        return response()->json(['data' => $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(MdBankAccount $mdBankAccount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
        $data = MdBankAccount::find($id);
        return response()->json(['data' => $data]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        //
        $data = MdBankAccount::find($id);
        $data->bank_account_id = $request->bank_account_id;
        $data->tender_type = $request->tender_type;
        $data->cd_client_id = $request->cd_client_id;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->is_active = $request->is_active;
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->description = $request->description;

         $data->save();
        return response()->json(['data' => $data]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
        $data = MdBankAccount::find($id);
        $data->delete();
        return response()->json(['data' => $data]);
    }
}
