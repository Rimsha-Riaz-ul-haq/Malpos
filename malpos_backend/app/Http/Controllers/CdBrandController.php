<?php

namespace App\Http\Controllers;

use App\Models\CdBrand;
use Illuminate\Http\Request;

class CdBrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data =  CdBrand::all();
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
        $data = new CdBrand();
        $data->name = $request->name;
        $data->is_active = $request->is_active;
        $data->cd_client_id = $request->cd_client_id;
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();
        
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(CdBrand $cdBrand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
        $data = CdBrand::find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $data =  CdBrand::find($id);
        $data->name = $request->name;
        $data->is_active = $request->is_active;
        $data->cd_client_id = $request->cd_client_id;
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();
        
        return response()->json($data);
      
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $data = CdBrand::find($id);
        $data->delete();
        return response()->json($data);
    }
}
