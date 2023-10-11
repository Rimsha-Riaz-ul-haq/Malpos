<?php

namespace App\Http\Controllers;

use App\Models\Kds;
use App\Models\TdSaleOrderItem;
use App\Models\TdSaleOrder;

use Illuminate\Http\Request;

class KdsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

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
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        //
        $station_id = $request->md_station_id;
        $data = TdSaleOrder::with('td_sale_order_item','td_sale_order_item.md_product.station_product')->where('md_station_id', $station_id)->get();
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */


    public function show_kds(Request $request){
        $station_id = $request->md_station_id;
        $filter = $request->filter;
        
        // $data = TdSaleOrder::with('td_sale_order_item','td_sale_order_item.md_product.station_product')->get();
        // return response($data);


            $data_qry = TdSaleOrder::with(['td_sale_order_item', 'td_sale_order_item.md_product.stations.station']);

            if($filter != null){
                $data_qry->whereHas('td_sale_order_item', function ($query) use ($filter) {
                    $query->where('order_item_status', $filter);
                });       
            }
            if($station_id){
                $data_qry->whereHas('td_sale_order_item.md_product.stations.station', function ($query) use ($station_id) {
                    $query->where('md_station_id', $station_id);
                });
            }

            $data = $data_qry->get();

            return response()->json($data);
    }


    public function edit(Kds $kds)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $order_item_id = $request->md_order_item_id;
        $status = $request->md_order_item_status;
        $responseData = [];
    
        foreach ($order_item_id as $id) {
            $data = TdSaleOrderItem::find($id);
    
            if ($data) {
                $data->order_item_status = $status;
                $data->save();
                $responseData[] = $data;
            }
        }
    
        return response()->json(['data' => $responseData]);
    }
    


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kds $kds)
    {
        //
    }
}
