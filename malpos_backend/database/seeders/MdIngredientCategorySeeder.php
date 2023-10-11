<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class MdIngredientCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('md_ingredient_categories')->insert([
            'name' => 'Category 1',
            'parent_category_id' => null,
            'count' => 10,
            'qr_menu_count' => 5,
            'image' => 'category1.jpg',
            'cd_client_id' => 1, // Replace with the actual client ID
            'cd_brand_id' => 1,  // Replace with the actual brand ID
            'cd_branch_id' => 1, // Replace with the actual branch ID
            'is_active' => true,
            'created_by' => '1',
            'updated_by' => '1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('md_ingredient_categories')->insert([
            'name' => 'Category 2',
            'parent_category_id' => null,
            'count' => 5,
            'qr_menu_count' => 2,
            'image' => 'category2.jpg',
            'cd_client_id' => 2, // Replace with the actual client ID
            'cd_brand_id' => 2,  // Replace with the actual brand ID
            'cd_branch_id' => 2, // Replace with the actual branch ID
            'is_active' => true,
            'created_by' => '1',
            'updated_by' => '1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
    
}
