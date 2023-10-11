<?php

namespace App\Http\Controllers;

use App\Models\TdTaxRate;
use Illuminate\Http\Request;

class TdTaxRateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id = null)
    {
     if($id != null){
            $tax_rate = TdTaxRate::where('td_tax_rate_id', $id)->get();
        }
        else{
            $tax_rate = TdTaxRate::all();
            // $order_detail = OrderDetail::all();
        }
        return response()->json(['tax_rate'=>$tax_rate]);
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
        $data = new TdTaxRate();

        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->td_tax_category_id = $request->td_tax_category_id;
        $data->name = $request->name;
        $data->description = $request->description;
        $data->valid_form = $request->valid_form;
        $data->type = $request->type;
        $data->rate = $request->rate;
        $data->gd_country_id = $request->gd_country_id;
        $data->gd_region_id = $request->gd_region_id;
        $data->save();
        return response()->json($data);

    }

    /**
     * Display the specified resource.
     */
    public function show(TdTaxRate $TdTaxRate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
        $data = TdTaxRate::find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $data =  TdTaxRate::find($id);

        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->td_tax_category_id = $request->td_tax_category_id;
        $data->name = $request->name;
        $data->description = $request->description;
        $data->valid_form = $request->valid_form;
        $data->type = $request->type;
        $data->rate = $request->rate;
        $data->gd_country_id = $request->gd_country_id;
        $data->gd_region_id = $request->gd_region_id;
        $data->save();
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
        $data = TdTaxRate::find($id);
        $data->delete();
        return response()->json($data);
    }
}
