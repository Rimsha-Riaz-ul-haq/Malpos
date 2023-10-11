<?php

namespace App\Http\Controllers;

use App\Models\MdPreparation;
use App\Models\MdIngredient;
use App\Models\MdPreparationIngredient;


use Illuminate\Http\Request;

class MdPreparationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        // $data = MdPreparation::all();
        // return response()->json($data);

    $search = $request->input('search');
    $query = MdPreparation::query();
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
        $data = new MdPreparation();
        $data->name = $request->name;
        $data->md_ingredient_category_id = $request->md_ingredient_category_id;
        $data->recipe_output = $request->recipe_output;
        $data->description = $request->description;
        $data->deleting_method = $request->deleting_method;
        $data->total_weight = $request->total_weight;
        $data->total_cost = $request->total_cost;
        $data->cd_client_id = $request->cd_client_id;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->is_active = $request->is_active ?? '1';
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();

        $preparation_id = MdPreparation::latest()->value('md_preparation_id');

        foreach($request->ingredients as $ingredient){
            $cdata = new MdPreparationIngredient();
            $cdata->md_preparation_id = $preparation_id;
            $cdata->md_ingredient_id = $ingredient['md_ingredient_id'];
            $cdata->save();
        }
        return response()->json(['preparation'=> $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(MdPreparation $mdPreparation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
        $data = MdPreparation::with('preparation_ingredient.ingredient')->where('md_preparation_id', $id)->get();
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $data = MdPreparation::find($id);
        $data->name = $request->name;
        $data->md_ingredient_category_id = $request->md_ingredient_category_id;
        $data->recipe_output = $request->recipe_output;
        $data->description = $request->description;
        $data->deleting_method = $request->deleting_method;
        $data->total_weight = $request->total_weight;
        $data->total_cost = $request->total_cost;
        $data->cd_client_id = $request->cd_client_id;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->is_active = $request->is_active ?? '1';
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();

        $preparation_id = MdPreparation::latest()->value('md_preparation_id');
        $preparation_ingredient = MdPreparationIngredient::where('md_preparation_id', $id)->delete();

        foreach($request->ingredients as $ingredient){
            $cdata = new MdPreparationIngredient();
            $cdata->md_preparation_id = $preparation_id;
            $cdata->md_ingredient_id = $ingredient['md_ingredient_id'];
            $cdata->save();
        }
        return response()->json(['preparation'=> $data]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        $data = MdPreparation::find($id);
        $data->delete();
        return response()->json($data);
    }
}
