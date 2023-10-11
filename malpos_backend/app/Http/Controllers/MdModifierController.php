<?php

namespace App\Http\Controllers;

use App\Models\MdModifier;
use App\Models\MdSubModifier;

use Illuminate\Http\Request;

class MdModifierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $id = null)
    {
        // if($id != null){
        //        $modifier = MdModifier::where('md_modifier_id', $id)->get();
        //    }
        //    else{
        //        $modifier = MdModifier::with('client','brand', 'branch', 'sub_modifier')->get();
        //        // $order_detail = OrderDetail::all();
        //    }
        //    return response()->json(['modifier'=>$modifier]);
        $search = $request->input('search');
        $query = MdModifier::with('client', 'brand', 'branch','sub_modifier');
    
        if ($id !== null) {
            $query->where('md_modifier_id', $id);
        }
    
        if ($search) {
            $query->where(function ($innerQuery) use ($search) {
                $innerQuery->where('name', 'LIKE', "%$search%");
            });
        }
    
        $modifier = $query->paginate(10);
    
        return response()->json(['modifier' => $modifier]);
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
        $data = new MdModifier();
        $data->name = $request->input('name');
        $data->modifier_type = $request->input('modifier_type');
        $data->min_select = $request->input('min_select');
        $data->max_select = $request->input('max_select');
        $data->cd_client_id = $request->input('cd_client_id');
        $data->cd_brand_id = $request->input('cd_brand_id');
        $data->cd_branch_id = $request->input('cd_branch_id');
        $data->is_active = $request->input('is_active', '1');
        $data->created_by = $request->input('created_by');
        $data->updated_by = $request->input('updated_by');
        $data->save();
        $latestMdModifier = MdModifier::latest()->first()->md_modifier_id;
        $submodifierData = $request->input('submodifierData');
           
        foreach ($submodifierData as $itemData) {
            $submodifier = new MdSubModifier();
            $submodifier->name = $itemData['name'];
            $submodifier->min = $itemData['min'];
            $submodifier->max = $itemData['max'];
            $submodifier->price = $itemData['price'];
            $submodifier->md_modifier_id = $latestMdModifier; // Assuming you have a foreign key relationship
            $submodifier->save();
        }
        $cdata = MdSubModifier::with('modifier')->where('md_modifier_id', $latestMdModifier)->get();
        return response()->json(['modifier'=>$data, 'submodifier'=>$cdata]);
 
    }

    /**
     * Display the specified resource.
     */
    public function show(MdModifier $mdModifier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
           $data = MdModifier::with('sub_modifier')->find($id);
           return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        //
        $data =  MdModifier::find($id);
        $data->name = $request->input('name');
        $data->modifier_type = $request->input('modifier_type');
        $data->min_select = $request->input('min_select');
        $data->max_select = $request->input('max_select');
        $data->cd_client_id = $request->input('cd_client_id');
        $data->cd_brand_id = $request->input('cd_brand_id');
        $data->cd_branch_id = $request->input('cd_branch_id');
        $data->is_active = $request->input('is_active', '1');
        $data->created_by = $request->input('created_by');
        $data->updated_by = $request->input('updated_by');
        $data->save();
        $deleteMdModifier = MdSubModifier::where('md_modifier_id', $id)->delete();
        $latestMdModifier = MdModifier::latest()->first()->md_modifier_id;
        $submodifierData = $request->input('submodifierData');
           
        foreach ($submodifierData as $itemData) {
            $submodifier = new MdSubModifier();
            $submodifier->name = $itemData['name'];
            $submodifier->min = $itemData['min'];
            $submodifier->max = $itemData['max'];
            $submodifier->price = $itemData['price'];
            $submodifier->md_modifier_id = $latestMdModifier; // Assuming you have a foreign key relationship
            $submodifier->save();
        }
        $cdata = MdSubModifier::with('modifier')->where('md_modifier_id', $latestMdModifier)->get();
        return response()->json(['modifier'=>$data, 'submodifier'=>$cdata]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
        $data = MdModifier::find($id);
        $data->delete();
        $sub_modifier = MdSubModifier::where('md_modifier_id',$id)->delete();
        return response()->json($data);
    }
}
