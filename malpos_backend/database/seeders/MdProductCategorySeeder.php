<?php

namespace Database\Seeders;

use App\Models\MdProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MdProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $product_category = [
            [

                'product_category_code' => 'r1',
                'product_category_name' => 'Rice',
                'product_category_description' => 'Rice',
                'td_tax_category_id'=> '1',
                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_category_image' => '20230529053651.jpg',

            ],
            [

                'product_category_code' => 'ex1',
                'product_category_name' => 'Expresso',
                'product_category_description' => 'Expresso',
                'td_tax_category_id'=> '1',
                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_category_image' => '20230529053718.jpg',

            ],
            [

                'product_category_code' => 'cc1',
                'product_category_name' => 'Cup Cake',
                'product_category_description' => 'Cup Cake',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_category_image' => '20230529053746.jpg',

            ],
            [

                'product_category_code' => 'sw1',
                'product_category_name' => 'Sandwich',
                'product_category_description' => 'Sandwich',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_category_image' => '20230529053815.jpg',

            ],
            [

                'product_category_code' => 'swm1',
                'product_category_name' => 'Sandwich mix',
                'product_category_description' => 'Sandwich mix',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_category_image' => '20230529053840.jpg',

            ],
            [

                'product_category_code' => 'd1',
                'product_category_name' => 'Drink',
                'product_category_description' => 'Drink',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_category_image' => '20230529053905.jpg',

            ],
            [

                'product_category_code' => 'f1',
                'product_category_name' => 'Fish',
                'product_category_description' => 'Fish',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_category_image' => '20230529053929.jpg',

            ],
            [

                'product_category_code' => 'pz1',
                'product_category_name' => 'Pizza',
                'product_category_description' => 'Pizza',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_category_image' => '20230529053959.jpg',

            ],
            [

                'product_category_code' => 'gb1',
                'product_category_name' => 'Garlic Bread',
                'product_category_description' => 'Garlic Bread',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_category_image' => '20230529054031.jpg',

            ],
            [

                'product_category_code' => 'bj1',
                'product_category_name' => 'Blue Juice',
                'product_category_description' => 'Blue Juice',
                'td_tax_category_id'=> '1',

                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',
                'product_category_image' => '20230529054055.jpg',

            ],
        ];

        foreach ($product_category as $category) {
            MdProductCategory::create($category);
        }
    }
}
