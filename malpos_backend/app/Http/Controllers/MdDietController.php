<?php

namespace App\Http\Controllers;

use App\Models\MdDiet;
use Illuminate\Http\Request;

class MdDietController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        // $data = MdDiet::all();
        // return response()->json($data);
        $search = $request->input('search');
        $query = MdDiet::query();
        if ($search) {
            $query->where(function ($innerQuery) use ($search) {
                $innerQuery->where('diet_name', 'LIKE', "%$search%");
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
        $data = new MdDiet();
        $data->diet_name = $request->diet_name;
        $data->cd_client_id = $request->cd_client_id;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->is_active = $request->is_active ?? '1';
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(MdDiet $mdDiet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
        $data = MdDiet::find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $data =  MdDiet::find($id);
        $data->diet_name = $request->diet_name;
        $data->cd_client_id = $request->cd_client_id;
        $data->cd_brand_id = $request->cd_brand_id;
        $data->cd_branch_id = $request->cd_branch_id;
        $data->is_active = $request->is_active ?? '1';
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
        $data = MdDiet::find($id);
        $data->delete();
        return response()->json($data);
    }
}
