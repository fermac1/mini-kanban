<?php

use Tests\TestCase;
use App\Models\Project;
use App\Models\Task;
use App\Models\Report;
use App\Services\ReportService; 
use Illuminate\Foundation\Testing\RefreshDatabase;

class CronSimulationTest extends TestCase
{
    use RefreshDatabase;

    public function test_cron_simulation_generates_reports()
    {
        $project = Project::factory()->create();
        Task::factory()->count(3)->create([
            'project_id' => $project->id,
            'status' => 'done'
        ]);
        Task::factory()->count(2)->create([
            'project_id' => $project->id,
            'status' => 'pending'
        ]);

        // simulate cron
        app(\App\Services\ReportService::class)->generateAll();

        $this->assertDatabaseHas('reports', [
            'project_id' => $project->id,
            'total_tasks' => 5,
            'completed_tasks' => 3,
            'pending_tasks' => 2,
        ]);
    }
}
