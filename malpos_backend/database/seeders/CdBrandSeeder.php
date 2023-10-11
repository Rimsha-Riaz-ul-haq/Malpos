<?php

namespace Database\Seeders;

use App\Models\CdBrand;
use App\Models\CdClient;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CdBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $brand = [
            [
                'name' => 'KFC',
                'cd_client_id' => '1',
                'is_active' => '1',
                'created_by' => '1',
                'updated_by' => '1',              
            ],
        ];

        foreach ($brand as $item) {
            CdBrand::create($item);
        }
    }
}
