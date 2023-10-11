<?php

namespace App\Http\Controllers;

use App\Models\CdUser;
use Illuminate\Http\Request;

class CdUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data =  CdUser::all();
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
        $data = new CdUser();
        $data->name = $request->name;
        $data->email = $request->email;
        $data->role = $request->role;
        $data->actions = $request->actions;
        $data->is_active = $request->is_active;
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();
        
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(CdUser $cdUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $data = CdUser::find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data =  CdUser::find($id);
        $data->name = $request->name;
        $data->email = $request->email;
        $data->role = $request->role;
        $data->actions = $request->actions;
        $data->is_active = $request->is_active;
        $data->created_by = $request->created_by;
        $data->updated_by = $request->updated_by;
        $data->save();
        
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = CdUser::find($id);
        $data->delete();
        return response()->json($data);
    }
}
