<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::withCount([
            'tasks as pending_count' => fn($q) => $q->where('status', 'pending'),
            'tasks as in_progress_count' => fn($q) => $q->where('status', 'in-progress'),
            'tasks as done_count' => fn($q) => $q->where('status', 'done'),
        ])->get();

        return Inertia::render('Dashboard/Index', [
            'projects' => $projects,
        ]);
    }
    public function show(Project $project)
    {
        // Load tasks + assigned user
        $project->load(['tasks.assignee']);

        return Inertia::render('Kanban/Board', [
            'project' => $project,
            'tasks' => $project->tasks,
        ]);
    }
}
