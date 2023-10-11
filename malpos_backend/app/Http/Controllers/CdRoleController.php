<?php

namespace App\Http\Controllers;

use App\Models\CdRole;
use Illuminate\Http\Request;

class CdRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data =  CdRole::where('role_type', 'super_admin_role')->get();
        return response()->json($data);
    }

    public function client_roles()
    {
        //
        $data =  CdRole::where('role_type', 'client_role')->get();
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
       // return $request;
        $data = new CdRole();
        $data->name = $request->name;
        $data->description = $request->description;
        $data->role_type = $request->role_type;
        $data->is_active = $request->is_active;
        $data->created_by = '1';
        $data->updated_by = '1';
        $data->save();

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(CdRole $cdRole)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
        $data = CdRole::find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $data =  CdRole::find($id);
        $data->name = $request->name;
        $data->description = $request->description;
        $data->role_type = $request->role_type;
        $data->is_active = $request->is_active;
        $data->created_by = '1';
        $data->updated_by = '1';
        $data->save();

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
        $data = CdRole::find($id);
        $data->delete();
        return response()->json($data);
    }
}
