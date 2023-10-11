<?php

namespace App\Http\Controllers;

use App\Models\MdMenuSection;
use App\Models\MdMenuSectionProduct;
use Illuminate\Http\Request;

class MdMenuSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $id = null)
    {
        //
        // if($id =! null){
        //     $data = MdMenuSection::where('md_menu_id', $id)->get();
        //     return response()->json($data);
        // }
        // else{
        //     $data = MdMenuSection::all();
        //     return response()->json($data);
        // }
        $search = $request->input('search');
        $query = MdMenuSection::query();
        if ($id !== null) {
            $query->where('md_menu_id', $id);
        }
        if ($search) {
            $query->where(function ($innerQuery) use ($search) {
                $innerQuery->where('name', 'LIKE', "%$search%");
            });
        }
        $data = $query->paginate(10);
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
        $data = new MdMenuSection();
        $data->name = $request->name;
        $data->start_date = $request->start_date;
        $data->end_date = $request->end_date;
        $data->start_time = $request->start_time;
        $data->end_time = $request->end_time;
        $data->md_menu_id = $request->md_menu_id;
        $data->cd_client_id = $request->cd_client_id;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->is_active = $request->is_active ?? '1';
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();
        $product = $request->products;
        $latestMenuSection = MdMenuSection::max('md_menu_section_id');

           
        foreach ($product as $itemData) {
            $submodifier = new MdMenuSectionProduct();
            $submodifier->md_menu_section_id = $latestMenuSection;
            $submodifier->md_product_id = $itemData['md_product_id'];
            $submodifier->td_currency_id = $itemData['td_currency_id'];
            $submodifier->price = $itemData['price'];
           // $submodifier->md_modifier_id = $latestMenuSection; // Assuming you have a foreign key relationship
            $submodifier->save();
        }
        return response()->json(['menus_section'=>$data, 'menu_section_producy'=>$submodifier]);
    }

    /**
     * Display the specified resource.
     */
    public function show(MdMenuSection $mdMenuSection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $data = MdMenuSection::with('menu_section_product.product','menu_section_product.currency')->where('md_menu_section_id', $id)->get();
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $data =  MdMenuSection::find($id);
        $data->name = $request->name;
        $data->start_date = $request->start_date;
        $data->end_date = $request->end_date;
        $data->start_time = $request->start_time;
        $data->end_time = $request->end_time;
        $data->md_menu_id = $request->md_menu_id;
        $data->cd_client_id = $request->cd_client_id;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->is_active = $request->is_active ?? '1';
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();
        $product = $request->products;
        $delete = MdMenuSectionProduct::where('md_menu_section_id', $id)->delete();

           
        foreach ($product as $itemData) {
            $submodifier = MdMenuSectionProduct::new();
            $submodifier->md_menu_section_id = $id;
            $submodifier->md_product_id = $itemData['md_product_id'];
            $submodifier->td_currency_id = $itemData['td_currency_id'];
            $submodifier->price = $itemData['price'];
           // $submodifier->md_modifier_id = $latestMenuSection; // Assuming you have a foreign key relationship
            $submodifier->save();
        }
        return response()->json(['menus_section'=>$data, 'menu_section_producy'=>$submodifier]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
        $data = MdMenuSection::find($id);
        $data->delete();
        return response()->json($data);
    }
}
