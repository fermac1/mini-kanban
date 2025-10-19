<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        $members = User::factory()->count(3)->create();

        // $project = Project::factory()->create(['name' => 'Demo Project', 'description' => 'A demo project']);

        // Task::factory()->count(5)->create(['project_id' => $project->id]);

        $projects = Project::factory()
            ->count(2)
            ->sequence(
                ['name' => 'Demo Project 1', 'description' => 'First demo project'],
                ['name' => 'Demo Project 2', 'description' => 'Second demo project']
            )
            ->create();

        // For each project, create 5 tasks
        foreach ($projects as $project) {
            Task::factory()
                ->count(5)
                ->create([
                    'project_id' => $project->id,
                ]);
        }
    }
}
