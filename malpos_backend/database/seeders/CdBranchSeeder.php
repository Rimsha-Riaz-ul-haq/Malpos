<?php

namespace Database\Seeders;

use App\Models\CdBranch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CdBranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $branch = [
            [
                'name' => 'KFC Johar Town',
                'cd_brand_id' => '1',
                'gd_country_id' => '1',
                'gd_region_id' => '1',
                'td_currency_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',              
            ],
        ];

        foreach ($branch as $item) {
            CdBranch::create($item);
        }
    
    }
}
