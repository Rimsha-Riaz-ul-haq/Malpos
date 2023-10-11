<?php

namespace App\Http\Controllers;

use App\Models\MdProductCategory;
use Database\Seeders\MdProductCategorySeeder;
use Illuminate\Http\Request;

class MdProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id = null)
    {
     if($id != null){
            $product_category = MdProductCategory::where('md_product_category_id', $id)->get();
        }
        else{
            $product_category = MdProductCategory::with('client','brand', 'branch')->get();
            // $order_detail = OrderDetail::all();
        }
        return response()->json(['product_category'=>$product_category]);
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
        $data = new MdProductCategory();
        $data->product_category_code = $request->product_category_code;
        $data->product_category_name = $request->product_category_name;
        $data->product_category_description = $request->product_category_description;
        $data->cd_client_id = $request->cd_client_id;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->is_active = $request->is_active;
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->td_tax_category_id = $request->td_tax_category_id;


        if ($image = $request->file('product_category_image')) {
            $destinationPath = public_path('img/product_category_image/');
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $data->product_category_image = $profileImage;
        }
        $data->save();
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(MdProductCategory $mdProductCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
        $data = MdProductCategory::find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$id)
    {
        //
        $data =  MdProductCategory::find($id);
        $data->product_category_code = $request->product_category_code;
        $data->product_category_name = $request->product_category_name;
        $data->product_category_description = $request->product_category_description;
        $data->cd_client_id = $request->cd_client_id;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->is_active = $request->is_active;
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->td_tax_category_id = $request->td_tax_category_id;


        if ($image = $request->file('product_category_image')) {
            $destinationPath = public_path('img/product_category_image/');
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $data->product_category_image = $profileImage;
        }
        $data->save();
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = MdProductCategory::find($id);
        $data->delete();
        return response()->json($data);
    }
}
