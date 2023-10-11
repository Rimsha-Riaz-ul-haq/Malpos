<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MdStation;


class MdStationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        MdStation::create([
            'station_name' => 'BBQ Station',
            'count' => 10,
            'can_be_printed' => true,
            'station_reminder' => true,
            'cd_client_id' => 1,
            'cd_brand_id' => 1,
            'cd_branch_id' => 1,
            'is_active' => true,
            'created_by' => '1',
            'updated_by' => '1',
        ]);

        MdStation::create([
            'station_name' => 'Live Station',
            'count' => 5,
            'can_be_printed' => true,
            'station_reminder' => true,
            'cd_client_id' => 1,
            'cd_brand_id' => 1,
            'cd_branch_id' => 1,
            'is_active' => true,
            'created_by' => '1',
            'updated_by' => '1',
        ]);

    }
}
