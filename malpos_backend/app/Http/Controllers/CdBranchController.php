<?php

namespace App\Http\Controllers;

use App\Models\CdBranch;
use Illuminate\Http\Request;

class CdBranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data =  CdBranch::all();
        return response()->json($data);
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
        $data =  new CdBranch();
        $data->name = $request->name;
        $data->is_active = $request->is_active;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->gd_country_id = $request->gd_country_id;
        $data->gd_region_id = $request->gd_region_id;
        $data->td_currency_id = $request->td_currency_id;
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();
        
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(CdBranch $cdBranch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data = CdBranch::with('brand', 'country', 'region', 'currency')->where('cd_branch_id', $id)->get();
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $data =  CdBranch::find($id);
        $data->name = $request->name;
        $data->is_active = $request->is_active;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->gd_country_id = $request->gd_country_id;
        $data->gd_region_id = $request->gd_region_id;
        $data->td_currency_id = $request->td_currency_id;
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();
        
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
        $data = CdBranch::find($id);
        $data->delete();
        return response()->json($data);
    }
}
