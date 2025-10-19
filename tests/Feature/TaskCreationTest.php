<?php

use App\Models\Project;
use Tests\TestCase;
use App\Models\User;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_task()
    {
        $this->withoutExceptionHandling();
        $project = Project::factory()->create();
        $payload = [
            'title' => 'Test Task',
            'description' => 'Details here',
            'project_id' => $project->id,
            'status' => 'pending',
        ];

        $response = $this->post(route('tasks.store'), $payload);

        $response->assertRedirect();
        $this->assertDatabaseHas('tasks', ['title' => 'Test Task', 'status' => 'pending']);
    }
}
