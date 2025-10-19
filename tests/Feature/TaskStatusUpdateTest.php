<?php

// tests/Feature/TaskStatusUpdateTest.php

use Tests\TestCase;
use App\Models\User;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskStatusUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_update_task_status()
    {
        $this->withoutExceptionHandling();

        // $user = User::factory()->create();
        $task = Task::factory()->create(['status' => 'pending']);

        // $this->actingAs($user);

        $response = $this->patch(route('tasks.updateStatus', $task), [
            'status' => 'in-progress',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'status' => 'in-progress'
        ]);
    }
}
