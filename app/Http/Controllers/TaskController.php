<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected $service;

    public function __construct(TaskService $service)
    {
        $this->service = $service;
    }

    public function store(StoreTaskRequest $request)
    {
        $task = $this->service->create($request->validated());
        return redirect()->back()->with('success', 'Task created successfully!')->with('task', $task);
    }

    public function updateStatus(Request $request, Task $task)
    {
        $data = $request->validate(['status' => 'required|in:pending,in-progress,done']);
        $task = $this->service->updateStatus($task, $data['status']);
        // return response()->json(['success' => true, 'task' => $task]);
        return redirect()->back()->with('success', 'Task updated successfully!');
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task = $this->service->update($task, $request->validated());

        return redirect()->back()->with('success', 'Task updated successfully!');
    }
}
