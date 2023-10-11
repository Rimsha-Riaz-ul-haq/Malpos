<?php

namespace App\Http\Controllers;

use App\Models\GdCity;
use App\Models\City;
use Illuminate\Http\Request;

class GdCityController extends Controller
{
    public function get_country(){
        return City::groupBy("country")->select("country")->get()->pluck("country");
    }
    public function get_city($country){
        return City::where("country",$country)->select("city")->get()->pluck("city");
    }
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
    public function show(GdCity $gdCity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GdCity $gdCity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GdCity $gdCity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GdCity $gdCity)
    {
        //
    }
}
