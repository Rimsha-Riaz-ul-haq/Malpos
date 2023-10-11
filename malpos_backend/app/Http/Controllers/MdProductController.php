<?php

namespace App\Http\Controllers;

use App\Models\MdProduct;
use App\Models\MdProductAllergy;
use App\Models\MdProductBrand;
use App\Models\MdProductBranch;
use App\Models\MdProductCategory;
use App\Models\MdProductDetail;
use App\Models\MdProductDiet;
use App\Models\MdProductModifier;
use App\Models\MdProductProductCategory;
use Illuminate\Http\Request;
use App\Models\MdProductUnit;

class MdProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index(Request $request, $id = null)
    // {
    //  if($id != null){
    //         $query = MdProduct::where('md_product_category_id', $id)->get();
    //     }
    //     else{
    //         $query = MdProduct::with('client','brand', 'branch')->paginate(10);
    //         // $order_detail = OrderDetail::all();
    //     }
    //     return response()->json(['product'=>$query]);
    // }

    public function index(Request $request, $id = null)
{
    $search_product = $request->input('search_by_product');
    $search = $request->input('search');
    $product_id = $request->input('product_id');
    // $md_station_id = $request->input('md_station_id');
    $md_product_category_id = $request->input('md_product_category_id');
    $gift = $request->input('gift');

    $query = MdProduct::with([
        'client',
        "base_unit.conversion",
        'product_branch.branch',
        'product_brand.brand',
        'product_product_category.product_category',
        'product_detail',
        'product_modifier.modifier',
        'product_diet.diet',
        'product_allergy.allergy',
    ]);


    if ($id !== null) {
        $query->where('md_product_category_id', $id);
    }

    if ($search_product) {
        $query->where(function ($innerQuery) use ($search, $product_id, $md_product_category_id, $gift) {
            $innerQuery->where('product_name', 'LIKE', "%$search%")
                ->orWhere('md_product_id', "$product_id")
                ->orWhere('md_product_category_id', $md_product_category_id)
                ->orWhere('gift', "$gift");
        });
    }

    $products = $query->paginate(10);

    return response()->json(['products' => $products]);
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
        $data = new MdProduct();
        $data->product_code = $request->input('product_code');
        $data->product_name = $request->input('product_name');
        $data->product_price = $request->input('product_price');
        $data->deleting_method = $request->input('deleting_method');
        $data->total_weight = $request->input('total_weight');
        $data->barcode = $request->input('barcode');
        $data->maximun_day_of_product_return = $request->input('maximun_day_of_product_return');
        $data->cooking_time = $request->input('cooking_time');
        $data->description = $request->input('description');
        // $data->md_allergy_id = $request->input('md_allergy_id');
        // $data->md_diet_id = $request->input('md_diet_id');
        $data->gift = $request->input('gift');
        $data->portion = $request->input('portion');
        $data->bundle = $request->input('bundle');
        $data->not_allow_apply_discount = $request->input('not_allow_apply_discount');
        $data->sold_by_weight = $request->input('sold_by_weight');
        $data->sale_price = $request->input('sale_price');
        // $data->md_product_category_id = $request->input('md_product_category_id');
        $data->td_tax_category_id = $request->input('td_tax_category_id');
        $data->cd_client_id = $request->input('cd_client_id');
        // $data->cd_brand_id = $request->input('cd_brand_id');
        // $data->cd_branch_id = $request->input('cd_branch_id');
        $data->is_active = $request->input('is_active', '1');
        $data->created_by = $request->input('created_by');
        $data->updated_by = $request->input('updated_by');

        if ($image = $request->file('product_image')) {
            $destinationPath = public_path('img/product_image/');
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $data->product_image = $profileImage;
        }
        $data->save();
        $latestMdProductId = MdProduct::max('md_product_id');

        MdProductUnit::create([
            "cd_client_id"=> $request->input('cd_client_id'),
            // "cd_brand_id"=> $request->input('cd_brand_id'),
            // "cd_branch_id"=> $request->input('cd_branch_id'),
            "md_product_id"=> $latestMdProductId,
            "md_uom_id"=>  $request->input('md_uom_id'),
            "is_active" => 1,
            
            "created_by" => $request->input('created_by'),
            "updated_by" => $request->input('updated_by'),
        ]);


        $product_detail = $request->input('product_detail');
        $product_modifiers = $request->input('product_modifiers');
        $product_brands = $request->input('product_brand');
        $product_branches = $request->input('product_branch');
        $product_categories = $request->input('product_category');
        $product_allergies = $request->input('product_allergy');
        $product_diets = $request->input('product_diet');



        if ($product_detail) {
            foreach($product_detail as $item){
                $cdata = new MdProductDetail();
                 $cdata->md_product_id = $latestMdProductId;
                 $cdata->md_detail_id = $item['md_detail_id'];
                 $cdata->product_type = $item['product_type'];
                 $cdata->gross = $item['gross'];
                 $cdata->cost = $item['cost'];
                 $cdata->save();
            }
        }

        if ($product_modifiers) {
            foreach($product_modifiers as $product_modifier){
                $modifierData = new MdProductModifier();
                 $modifierData->md_product_id = $latestMdProductId;
                 $modifierData->md_modifier_id = $product_modifier['md_modifier_id'];
                 $modifierData->save();
            }
        }

        if ($product_brands) {
            foreach($product_brands as $product_brand){
                $brandData = new MdProductBrand();
                 $brandData->md_product_id = $latestMdProductId;
                 $brandData->cd_brand_id = $product_brand['cd_brands'];
                 $brandData->save();
            }
        }

        if ($product_branches) {
            foreach($product_branches as $product_branch){
                $branchData = new MdProductBranch();
                 $branchData->md_product_id = $latestMdProductId;
                 $branchData->cd_branch_id = $product_branch['cd_branches'];
                 $branchData->save();
            }
        }

        if ($product_categories) {
            foreach($product_categories as $product_category){
                $productCategoryData = new MdProductProductCategory();
                 $productCategoryData->md_product_id = $latestMdProductId;
                 $productCategoryData->md_product_category_id = $product_category['md_product_categories'];
                 $productCategoryData->save();
            }
        }

        if ($product_allergies) {
            foreach($product_allergies as $product_allergy){
                $allergyData = new MdProductAllergy();
                 $allergyData->md_product_id = $latestMdProductId;
                 $allergyData->md_allergy_id = $product_allergy['md_allergies'];
                 $allergyData->save();
            }
        }

        if ($product_diets) {
            foreach($product_diets as $product_diet){
                $dietData = new MdProductDiet();
                 $dietData->md_product_id = $latestMdProductId;
                 $dietData->md_diet_id = $product_diet['md_diets'];
                 $dietData->save();
            }
        }

        // $data = MdProduct::with('client' , 'product_branch.branch','product_brand.brand','product_product_category.product_category','product_detail','product_modifier.modifier','product_diet.diet','product_allergy.allergy')->where('md_product_id',$latestMdProductId)->get();
        // return response()->json(['data'=>$data]);

        $data = MdProduct::with([
            'client',
            "base_unit.conversion",
            'product_branch.branch',
            'product_brand.brand',
            'product_product_category.product_category',
            'product_detail',
            'product_modifier.modifier',
            'product_diet.diet',
            'product_allergy.allergy',
        ])->where('md_product_id', $latestMdProductId)->get();

          return response()->json(['data' => $data]);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(MdProduct $mdProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        //
        // return 1;
        $data = MdProduct::with([
            "base_unit.conversion",
            'product_brand',
            'product_branch',
            'product_product_category',
            'station_product',
            'product_diet',
            'product_allergy',
            'product_detail',
            'product_modifier',
        ])
        ->find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $data =  MdProduct::find($id);
        $data->product_code = $request->input('product_code');
        $data->product_name = $request->input('product_name');
        $data->product_price = $request->input('product_price');
        $data->deleting_method = $request->input('deleting_method');
        $data->total_weight = $request->input('total_weight');
        
        $data->barcode = $request->input('barcode');
        $data->maximun_day_of_product_return = $request->input('maximun_day_of_product_return');
        $data->cooking_time = $request->input('cooking_time');
        $data->description = $request->input('description');
        // $data->md_allergy_id = $request->input('md_allergy_id');
        // $data->md_diet_id = $request->input('md_diet_id');
        $data->gift = $request->input('gift');
        $data->portion = $request->input('portion');
        $data->bundle = $request->input('bundle');
        $data->not_allow_apply_discount = $request->input('not_allow_apply_discount');
        $data->sold_by_weight = $request->input('sold_by_weight');
        $data->sale_price = $request->input('sale_price');
        // $data->md_product_category_id = $request->input('md_product_category_id');
        $data->td_tax_category_id = $request->input('td_tax_category_id');
        $data->cd_client_id = $request->input('cd_client_id');
        // $data->cd_brand_id = $request->input('cd_brand_id');
        // $data->cd_branch_id = $request->input('cd_branch_id');
        $data->is_active = $request->input('is_active', '1');
        $data->created_by = $request->input('created_by');
        $data->updated_by = $request->input('updated_by');

        if ($image = $request->file('product_image')) {
            $destinationPath = public_path('img/product_image/');
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $data->product_image = $profileImage;
        }
        $data->save();

      

        $product_detail = $request->input('product_detail');
        $product_modifiers = $request->input('product_modifiers');
        $product_brands = $request->input('product_brand');
        $product_branches = $request->input('product_branch');
        $product_categories = $request->input('product_category');
        $product_allergies = $request->input('product_allergy');
        $product_diets = $request->input('product_diet');

        $product_detail_delete = MdProductDetail::where('md_product_id', $id)->delete();
        $product_modifiers_delete = MdProductModifier::where('md_product_id', $id)->delete();
        $product_brands_delete = MdProductBrand::where('md_product_id', $id)->delete();
        $product_branches_delete = MdProductBranch::where('md_product_id', $id)->delete();
        // $product_categories_delete = MdProductCategory::where('md_product_id', $id)->delete();
        $product_categories_delete = MdProductProductCategory::where('md_product_id', $id)->delete();
        $product_allergies_delete = MdProductAllergy::where('md_product_id', $id)->delete();
        $product_diets_delete = MdProductDiet::where('md_product_id', $id)->delete();


        MdProductUnit::where("md_product_id", $id)->delete();
        MdProductUnit::create([
            "cd_client_id"=> $request->input('cd_client_id'),
            // "cd_brand_id"=> $request->input('cd_brand_id'),
            // "cd_branch_id"=> $request->input('cd_branch_id'),
            "md_product_id"=> $id,
            "md_uom_id"=>  $request->input('md_uom_id'),
            "is_active" => 1,
            "created_by" => $request->input('created_by'),
            "updated_by" => $request->input('updated_by'),
        ]);

        if ($product_detail) {
            foreach($product_detail as $item){
                $cdata = new MdProductDetail();
                 $cdata->md_product_id = $id;
                 $cdata->md_detail_id = $item['md_detail_id'];
                 $cdata->product_type = $item['product_type'];
                 $cdata->gross = $item['gross'];
                 $cdata->cost = $item['cost'];
                 $cdata->save();
            }
        }

        if ($product_modifiers) {
            foreach($product_modifiers as $product_modifier){
                $modifierData = new MdProductModifier();
                 $modifierData->md_product_id = $id;
                 $modifierData->md_modifier_id = $product_modifier['md_modifier_id'];
                 $modifierData->save();
            }
        }

        if ($product_brands) {
            foreach($product_brands as $product_brand){
                $brandData = new MdProductBrand();
                 $brandData->md_product_id = $id;
                 $brandData->cd_brand_id = $product_brand['cd_brands'];
                 $brandData->save();
            }
        }

        if ($product_branches) {
            foreach($product_branches as $product_branch){
                $branchData = new MdProductBranch();
                 $branchData->md_product_id = $id;
                 $branchData->cd_branch_id = $product_branch['cd_branches'];
                 $branchData->save();
            }
        }

        if ($product_categories) {
            foreach($product_categories as $product_category){
                $productCategoryData = new MdProductProductCategory();
                 $productCategoryData->md_product_id = $id;
                 $productCategoryData->md_product_category_id = $product_category['md_product_categories'];
                 $productCategoryData->save();
            }
        }

        if ($product_allergies) {
            foreach($product_allergies as $product_allergy){
                $allergyData = new MdProductAllergy();
                 $allergyData->md_product_id = $id;
                 $allergyData->md_allergy_id = $product_allergy['md_allergies'];
                 $allergyData->save();
            }
        }

        if ($product_diets) {
            foreach($product_diets as $product_diet){
                $dietData = new MdProductDiet();
                 $dietData->md_product_id = $id;
                 $dietData->md_diet_id = $product_diet['md_diets'];
                 $dietData->save();
            }
        }

        // $data = MdProduct::with('client' , 'product_branch.branch','product_brand.brand','product_product_category.product_category','product_detail','product_modifier.modifier','product_diet.diet','product_allergy.allergy')->where('md_product_id',$id)->get();
        // return response()->json(['data'=>$data]);

        $data = MdProduct::with([
            "base_unit.conversion",
            'client',
            'product_branch.branch',
            'product_brand.brand',
            'product_product_category.product_category',
            'product_detail',
            'product_modifier.modifier',
            'product_diet.diet',
            'product_allergy.allergy',
        ])->where('md_product_id', $id)->get();

          return response()->json(['data' => $data]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $data = MdProduct::find($id);
        $data->delete();
        return response()->json($data);
    }
}
