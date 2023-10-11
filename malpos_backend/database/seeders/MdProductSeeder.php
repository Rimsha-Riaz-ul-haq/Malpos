<?php

namespace Database\Seeders;

use App\Models\MdProduct;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MdProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $products = [
            [

                'product_code' => 'r1',
                'product_name' => 'Rice',
                'product_price' => '400',
                'md_product_category_id' => '1',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529053651.jpg',

            ],
            [

                'product_code' => 'r2',
                'product_name' => 'biryani',
                'product_price' => '500',
                'md_product_category_id' => '1',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529053651.jpg',

            ],
            [

                'product_code' => 'ex1',
                'product_name' => 'Expresso',
                'product_price' => '250',
                'md_product_category_id' => '2',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529053718.jpg',

            ],
            [

                'product_code' => 'cc1',
                'product_name' => 'Cup Cake',
                'product_price' => '590',
                'md_product_category_id' => '3',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529053746.jpg',

            ],
            [

                'product_code' => 'sw1',
                'product_name' => 'Sandwich',
                'product_price' => '650',
                'md_product_category_id' => '4',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529053815.jpg',

            ],
            [

                'product_code' => 'swm1',
                'product_name' => 'Sandwich mix',
                'product_price' => '700',
                'md_product_category_id' => '5',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529053840.jpg',

            ],
            [

                'product_code' => 'd1',
                'product_name' => 'Drink',
                'product_price' => '200',
                'md_product_category_id' => '6',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529053905.jpg',

            ],
            [

                'product_code' => 'f1',
                'product_name' => 'Fish',
                'product_price' => '1200',
                'md_product_category_id' => '7',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529053929.jpg',

            ],
            [

                'product_code' => 'pz1',
                'product_name' => 'Pizza',
                'product_price' => '1400',
                'md_product_category_id' => '8',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529053959.jpg',

            ],
            [

                'product_code' => 'gb1',
                'product_name' => 'Garlic Bread',
                'product_price' => '700',
                'md_product_category_id' => '9',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529054031.jpg',

            ],
            [

                'product_code' => 'bj1',
                'product_name' => 'Blue Juice',
                'product_price' => '250',
                'md_product_category_id' => '10',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_image' => '20230529054055.jpg',

            ],
        ];

        foreach ($products as $product) {
            MdProduct::create($product);
        }
    }
}
