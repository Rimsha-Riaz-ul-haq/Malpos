<?php

// use App\Http\Controllers\CdBranchController;
// use App\Http\Controllers\CdBrandController;
// use App\Http\Controllers\CdClientController;
// // use App\Http\Controllers\CdClientGroupController;
// use App\Http\Controllers\CdRoleController;
// use App\Http\Controllers\CdUserController;
// use App\Http\Controllers\GdCountryController;
// use App\Http\Controllers\GdRegionController;
// use App\Http\Controllers\KdsController;
// use App\Http\Controllers\MdAllergyController;
// use App\Http\Controllers\MdBankAccountController;
// use App\Http\Controllers\MdBankController;
// use App\Http\Controllers\MdDietController;
// use App\Http\Controllers\MdIngredientCategoryController;
// use App\Http\Controllers\MdIngredientController;
// use App\Http\Controllers\MdMenuController;
// use App\Http\Controllers\MdMenuSectionController;
// use App\Http\Controllers\MdPreparationController;
// use App\Http\Controllers\MdProductCategoryController;
// use App\Http\Controllers\MdProductController;
// use App\Http\Controllers\MdStationController;
// use App\Http\Controllers\TdCurrencyController;
// use App\Http\Controllers\TdSaleOrderController;
// use App\Http\Controllers\TdTaxCategoryController;
// use App\Http\Controllers\TdTaxRateController;
// use App\Http\Controllers\MdModifierController;
// use App\Http\Controllers\UserController;
// use App\Http\Controllers\GdCityController;
// use App\Http\Controllers\MdCustomerController;
// use App\Http\Controllers\MdCustomerGroupController;
// use App\Http\Controllers\MdStorageController;
// use App\Http\Controllers\MdSupplierController;
// use App\Http\Controllers\MdSupplyController;
// use App\Http\Controllers\MdStockController;
// use App\Http\Controllers\MdStockTransferController;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// use namespace ;





/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('user_login', [UserController::class, 'loginUser'])->name('user_login');
Route::post('brand_login', [UserController::class, 'loginBrand'])->name('brand_login');
Route::post('pin_login', [UserController::class, 'loginPin'])->name('pin_login');

Route::group([
    // 'middleware' => 'auth:sanctum'
],function(){



Route::get('product_category/{id?}', [MdProductCategoryController::class, 'index'])->name('product_category');
Route::post('product_search', [MdProductController::class, 'index'])->name('product_search');

Route::get('product/{id?}', [MdProductController::class, 'index'])->name('product');
Route::get('product/{id}/edit', [MdProductController::class, 'edit']);

Route::post('product_category_store', [MdProductCategoryController::class, 'store'])->name('product_category_store');
Route::get('product_category_edit/{id}', [MdProductCategoryController::class, 'edit'])->name('product_category_edit');
Route::post('product_category_update/{id}', [MdProductCategoryController::class, 'update'])->name('product_category_update');
Route::delete('product_category_delete/{id}', [MdProductCategoryController::class, 'destroy'])->name('product_category_delete');

Route::get('tax_category/{id?}', [TdTaxCategoryController::class, 'index'])->name('tax_category');
Route::post('tax_category_store', [TdTaxCategoryController::class, 'store'])->name('tax_category_store');
Route::get('tax_category_edit/{id}', [TdTaxCategoryController::class, 'edit'])->name('tax_category_edit');
Route::post('tax_category_update/{id}', [TdTaxCategoryController::class, 'update'])->name('tax_category_update');
Route::delete('tax_category_delete/{id}', [TdTaxCategoryController::class, 'destroy'])->name('tax_category_delete');

Route::get('tax_rate/{id?}', [TdTaxRateController::class, 'index'])->name('tax_rate');
Route::post('tax_rate_store', [TdTaxRateController::class, 'store'])->name('tax_rate_store');
Route::get('tax_rate_edit/{id}', [TdTaxRateController::class, 'edit'])->name('tax_rate_edit');
Route::post('tax_rate_update/{id}', [TdTaxRateController::class, 'update'])->name('tax_rate_update');
Route::delete('tax_rate_delete/{id}', [TdTaxRateController::class, 'destroy'])->name('tax_rate_delete');


Route::post('product_store', [MdProductController::class, 'store'])->name('product_store');
Route::get('product_edit/{id}', [MdProductController::class, 'edit'])->name('product_edit');
Route::post('product_update/{id}', [MdProductController::class, 'update'])->name('product_update');
Route::delete('product_delete/{id}', [MdProductController::class, 'destroy'])->name('product_delete');

Route::post('search_order', [TdSaleOrderController::class, 'index'])->name('search_order');
Route::post('save_order', [TdSaleOrderController::class, 'store'])->name('save_order');
Route::get('edit_order/{id}', [TdSaleOrderController::class, 'edit'])->name('edit_order');
Route::post('checkout_order/{id}', [TdSaleOrderController::class, 'checkout'])->name('checkout_order');
Route::post('update_order/{id}', [TdSaleOrderController::class, 'update'])->name('update_order');
Route::delete('delete_order/{id}', [TdSaleOrderController::class, 'destroy'])->name('delete_order');
Route::get('order_receipts/{filter?}', [TdSaleOrderController::class, 'receipt'])->name('order_receipts');
Route::get('check_order_receipt/{id}', [TdSaleOrderController::class, 'check_order_receipt'])->name('check_order_receipt');



Route::get('getuser', [UserController::class, 'index'])->name('user');
Route::post('user_store', [UserController::class, 'store'])->name('user_store');
Route::post('user_update/{id}', [UserController::class, 'update'])->name('user_update');
Route::get('user_edit/{id}', [UserController::class, 'edit'])->name('user_edit');
Route::delete('user_delete/{id}', [UserController::class, 'destroy'])->name('user_delete');




Route::post('role_store', [CdRoleController::class, 'store'])->name('role_store');
Route::get('admin_roles', [CdRoleController::class, 'index'])->name('admin_roles');
Route::get('client_roles', [CdRoleController::class, 'client_roles'])->name('client_roles');

Route::get('role_edit/{id}', [CdRoleController::class, 'edit'])->name('role_edit');
Route::post('role_update/{id}', [CdRoleController::class, 'update'])->name('role_update');
Route::delete('role_delete/{id}', [CdRoleController::class, 'destroy'])->name('role_delete');

Route::get('banks', [MdBankController::class, 'index'])->name('banks');
Route::post('bank_store', [MdBankController::class, 'store'])->name('bank_store');
Route::post('bank_update/{id}', [MdBankController::class, 'update'])->name('bank_update');
Route::get('bank_edit/{id}', [MdBankController::class, 'edit'])->name('bank_edit');
Route::delete('bank_delete/{id}', [MdBankController::class, 'destroy'])->name('bank_delete');

Route::get('bank_account', [MdBankAccountController::class, 'index'])->name('bank_account');
Route::post('bank_account_store', [MdBankAccountController::class, 'store'])->name('bank_account_store');
Route::post('bank_account_update/{id}', [MdBankAccountController::class, 'update'])->name('bank_account_update');
Route::get('bank_account_edit/{id}', [MdBankAccountController::class, 'edit'])->name('bank_account_edit');
Route::delete('bank_account_delete/{id}', [MdBankAccountController::class, 'destroy'])->name('bank_account_delete');

Route::get('station', [MdStationController::class, 'index'])->name('station');
Route::post('station_store', [MdStationController::class, 'store'])->name('station_store');
Route::post('station_update/{id}', [MdStationController::class, 'update'])->name('station_update');
Route::get('station_edit/{id}', [MdStationController::class, 'edit'])->name('station_edit');
Route::delete('station_delete/{id}', [MdStationController::class, 'destroy'])->name('station_delete');

Route::get('menu', [MdMenuController::class, 'index'])->name('menu');
Route::post('menu_store', [MdMenuController::class, 'store'])->name('menu_store');
Route::post('menu_update/{id}', [MdMenuController::class, 'update'])->name('menu_update');
Route::get('menu_edit/{id}', [MdMenuController::class, 'edit'])->name('menu_edit');
Route::delete('menu_delete/{id}', [MdMenuController::class, 'destroy'])->name('menu_delete');

Route::get('menu_section/{id?}', [MdMenuSectionController::class, 'index'])->name('menu_section');
Route::post('menu_section_store', [MdMenuSectionController::class, 'store'])->name('menu_section_store');
Route::post('menu_section_update/{id}', [MdMenuSectionController::class, 'update'])->name('menu_section_update');
Route::get('menu_section_edit/{id}', [MdMenuSectionController::class, 'edit'])->name('menu_section_edit');
Route::delete('menu_section_delete/{id}', [MdMenuSectionController::class, 'destroy'])->name('menu_section_delete');

Route::get('modifier/{id?}', [MdModifierController::class, 'index'])->name('modifier');
Route::post('modifier_store', [MdModifierController::class, 'store'])->name('modifier_store');
Route::post('modifier_update/{id}', [MdModifierController::class, 'update'])->name('modifier_update');
Route::get('modifier_edit/{id}', [MdModifierController::class, 'edit'])->name('modifier_edit');
Route::delete('modifier_delete/{id}', [MdModifierController::class, 'destroy'])->name('modifier_delete');

Route::get('allergy', [MdAllergyController::class, 'index'])->name('allergy');
Route::post('allergy_store', [MdAllergyController::class, 'store'])->name('allergy_store');
Route::post('allergy_update/{id}', [MdAllergyController::class, 'update'])->name('allergy_update');
Route::get('allergy_edit/{id}', [MdAllergyController::class, 'edit'])->name('allergy_edit');
Route::delete('allergy_delete/{id}', [MdAllergyController::class, 'destroy'])->name('allergy_delete');

Route::get('diet', [MdDietController::class, 'index'])->name('diet');
Route::post('diet_store', [MdDietController::class, 'store'])->name('diet_store');
Route::post('diet_update/{id}', [MdDietController::class, 'update'])->name('diet_update');
Route::get('diet_edit/{id}', [MdDietController::class, 'edit'])->name('diet_edit');
Route::delete('diet_delete/{id}', [MdDietController::class, 'destroy'])->name('diet_delete');


Route::get('ingredient_category', [MdIngredientCategoryController::class, 'index'])->name('ingredient_category');
Route::post('ingredient_category_store', [MdIngredientCategoryController::class, 'store'])->name('ingredient_category_store');
Route::post('ingredient_category_update/{id}', [MdIngredientCategoryController::class, 'update'])->name('ingredient_category_update');
Route::get('ingredient_category_edit/{id}', [MdIngredientCategoryController::class, 'edit'])->name('ingredient_category_edit');
Route::delete('ingredient_category_delete/{id}', [MdIngredientCategoryController::class, 'destroy'])->name('ingredient_category_delete');

Route::get('ingredient', [MdIngredientController::class, 'index'])->name('ingredient');
Route::post('ingredient_store', [MdIngredientController::class, 'store'])->name('ingredient_store');
Route::post('ingredient_update/{id}', [MdIngredientController::class, 'update'])->name('ingredient_update');
Route::get('ingredient_edit/{id}', [MdIngredientController::class, 'edit'])->name('ingredient_edit');
Route::delete('ingredient_delete/{id}', [MdIngredientController::class, 'destroy'])->name('ingredient_delete');

Route::get('preparation', [MdPreparationController::class, 'index'])->name('preparation');
Route::post('preparation_store', [MdPreparationController::class, 'store'])->name('preparation_store');
Route::post('preparation_update/{id}', [MdPreparationController::class, 'update'])->name('preparation_update');
Route::get('preparation_edit/{id}', [MdPreparationController::class, 'edit'])->name('preparation_edit');
Route::delete('preparation_delete/{id}', [MdPreparationController::class, 'destroy'])->name('preparation_delete');


Route::get('currency', [TdCurrencyController::class, 'index'])->name('currency');
Route::post('currency_store', [TdCurrencyController::class, 'store'])->name('currency_store');
Route::post('currency_update/{id}', [TdCurrencyController::class, 'update'])->name('currency_update');
Route::get('currency_edit/{id}', [TdCurrencyController::class, 'edit'])->name('currency_edit');
Route::delete('currency_delete/{id}', [TdCurrencyController::class, 'destroy'])->name('currency_delete');

Route::get('get_country', [GdCountryController::class, 'index'])->name('get_country');
Route::get('get_region/{id}', [GdRegionController::class, 'index'])->name('get_region');


Route::post('store_pin', [UserController::class, 'storePin'])->name('store_pin');
Route::post('check_pin', [UserController::class, 'checkPin'])->name('check_pin');




Route::resource('cdclients', CdClientController::class);

Route::get('get_stock', [MdStockController::class, 'index']);
Route::get('get_product_stock/{product_id}/{storage_id}', [MdStockController::class, 'product_stock']);

Route::get('get_country', [GdCityController::class, 'get_country']);
Route::get('get_city/{country}', [GdCityController::class, 'get_city']);

// Route::post('cdclient_store', [CdClientController::class, 'store'])->name('cdclient_store');
Route::post('cdclient_update/{id}', [CdClientController::class, 'update'])->name('cdclient_update');
// Route::get('cdclient_edit/{id}', [CdClientController::class, 'edit'])->name('cdclient_edit');
// Route::delete('cdclient_delete/{id}', [CdClientController::class, 'destroy'])->name('cdclient_delete');
//haris client group

Route::resource("md_customer",MdCustomerController::class);
Route::resource("md_customer_group",MdCustomerGroupController::class);

Route::post('md_customer/update/{id}', [MdCustomerController::class, 'update'])->name('md_customer_update');

Route::resource('uom', MdUOMController::class);
Route::post("uom/update/{id}",[MdUOMController::class,"update"]);
Route::get("uom/get_units_by_product/{product_id}",[MdUOMController::class,"get_units_by_product"]);

Route::resource('uom_conversion', MdUOMConversionController::class);
Route::post("uom_conversion/update/{id}",[MdUOMConversionController::class,"update"]);

Route::post("md_customer_group/update/{id}",[MdCustomerGroupController::class,"update"]);

Route::resource("md_storage",MdStorageController::class);
Route::post("md_storage/update/{id}",[MdStorageController::class,"update"]);

Route::resource("md_supplier",MdSupplierController::class);
Route::post("md_supplier/update/{id}",[MdSupplierController::class,"update"]);

Route::resource("md_supplies",MdSupplyController::class);
Route::post("md_supplies/update/{id}",[MdSupplyController::class,"update"]);

Route::resource("md_stock_transfer",MdStockTransferController::class);
Route::post("md_stock_transfer/update/{id}",[MdStockTransferController::class,"update"]);

Route::get('cduser', [CdUserController::class, 'index'])->name('cduser');
Route::post('cduser_store', [CdUserController::class, 'store'])->name('cduser_store');
Route::post('cduser_update/{id}', [CdUserController::class, 'update'])->name('cduser_update');
Route::get('cduser_edit/{id}', [CdUserController::class, 'edit'])->name('cduser_edit');
Route::delete('cduser_delete/{id}', [CdUserController::class, 'destroy'])->name('cduser_delete');

Route::get('cdbrand', [CdBrandController::class, 'index'])->name('cdbrand');
Route::post('cdbrand_store', [CdBrandController::class, 'store'])->name('cdbrand_store');
Route::post('cdbrand_update/{id}', [CdBrandController::class, 'update'])->name('cdbrand_update');
Route::get('cdbrand_edit/{id}', [CdBrandController::class, 'edit'])->name('cdbrand_edit');
Route::delete('cdbrand_delete/{id}', [CdBrandController::class, 'destroy'])->name('cdbrand_delete');


Route::get('cdbranch', [CdBranchController::class, 'index'])->name('cdbranch');
Route::post('cdbranch_store', [CdBranchController::class, 'store'])->name('cdbranch_store');
Route::post('cdbranch_update/{id}', [CdBranchController::class, 'update'])->name('cdbranch_update');
Route::get('cdbranch_edit/{id}', [CdBranchController::class, 'edit'])->name('cdbranch_edit');
Route::delete('cdbranch_delete/{id}', [CdBranchController::class, 'destroy'])->name('cdbranch_delete');

Route::post('kds_status_update', [KdsController::class, 'update'])->name('kds_status_update');
Route::post('show_kds', [KdsController::class, 'show_kds'])->name('show_kds');

});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
