<?php

namespace App\Http\Controllers;

use App\Models\MdMenu;
use Illuminate\Http\Request;

class MdMenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        // $data = MdMenu::all();
        // return response()->json($data);
        $search = $request->input('search');
        $query = MdMenu::query();
        if ($search) {
            $query->where(function ($innerQuery) use ($search) {
                $innerQuery->where('menu_name', 'LIKE', "%$search%");
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
        $data = new MdMenu();
        $data->menu_name = $request->menu_name;
        $data->md_station_id = $request->md_station_id;
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
    public function show(MdMenu $mdMenu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
        $data = MdMenu::find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        //
        $data =  MdMenu::find($id);
        $data->menu_name = $request->menu_name;
        $data->md_station_id = $request->md_station_id;
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
        $data = MdMenu::find($id);
        $data->delete();
        return response()->json($data);
    }
}
