<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\Log;

class TaskService
{
    public function create(array $data): Task
    {
        $task = Task::create($data);
        Log::info('Task created', ['task' => $task->id]);
        return $task;
    }

    public function update(Task $task, array $data): Task
    {
        $task->update($data);
        Log::info('Task updated', ['task' => $task->id]);
        return $task;
    }

    public function updateStatus(Task $task, string $status): Task
    {
        $task->status = $status;
        $task->save();
        Log::info('Task status changed', ['task' => $task->id, 'status' => $status]);
        return $task;
    }
}
