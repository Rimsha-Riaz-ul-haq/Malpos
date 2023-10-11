<?php

namespace Database\seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CdRole;



class CdRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $roles = [
            // Existing roles
            [
                'name' => 'CFO',
                'description' => 'Chief Financial Officer',
                'role_type' => 'super_admin_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Accounts Manager',
                'description' => 'Accounts Manager',
                'role_type' => 'super_admin_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Accounts Officer',
                'description' => 'Accounts Officer',
                'role_type' => 'super_admin_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Technical Support',
                'description' => 'Technical Support',
                'role_type' => 'super_admin_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Functional Support',
                'description' => 'Functional Support',
                'role_type' => 'super_admin_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Director',
                'description' => 'Director',
                'role_type' => 'super_admin_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Sales Manager',
                'description' => 'Sales Manager',
                'role_type' => 'super_admin_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Operation Manager',
                'description' => 'Operation Manager',
                'role_type' => 'super_admin_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            // Clients roles
            [
                'name' => 'User Management',
                'description' => 'User Management',
                'role_type' => 'client_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Inventory Manager',
                'description' => 'Inventory Manager',
                'role_type' => 'client_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Customer Management',
                'description' => 'Customer Management',
                'role_type' => 'client_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Pricing and Tax Manager',
                'description' => 'Pricing and Tax Manager',
                'role_type' => 'client_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Sales Reporting',
                'description' => 'Sales Reporting',
                'role_type' => 'client_role',
                'is_active' => true,
                'created_by' => '1',
                'updated_by' => '1',
            ],
        ];

        // Insert the roles into the database
        foreach ($roles as $role) {
            CdRole::create($role);
        }

    }
}
