<?php

namespace App\Http\Controllers;

use App\Models\GdRegion;
use Illuminate\Http\Request;

class GdRegionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        //
        $data =  GdRegion::where('gd_country_id', $id)->get();
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
    }

    /**
     * Display the specified resource.
     */
    public function show(GdRegion $gdRegion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GdRegion $gdRegion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GdRegion $gdRegion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GdRegion $gdRegion)
    {
        //
    }
}
