<?php

namespace App\Http\Controllers;

use App\Models\TdTaxCategory;
use Illuminate\Http\Request;

class TdTaxCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id = null)
    {
     if($id != null){
            $tax_category = TdTaxCategory::where('td_tax_category_id', $id)->get();
        }
        else{
            $tax_category = TdTaxCategory::all();
            // $order_detail = OrderDetail::all();
        }
        return response()->json(['tax_category'=>$tax_category]);
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
        $data = new TdTaxCategory();
    
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->name = $request->name;
        $data->description = $request->description;
        $data->save();
        return response()->json($data);

    }

    /**
     * Display the specified resource.
     */
    public function show(TdTaxCategory $tdTaxCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
        $data = TdTaxCategory::find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $data =  TdTaxCategory::find($id);
    
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->name = $request->name;
        $data->description = $request->description;
        $data->save();
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
        $data = TdTaxCategory::find($id);
        $data->delete();
        return response()->json($data);
    }
}
