<?php

use App\Http\Controllers\ReportController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;


Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::patch('/tasks/{task}/status', [TaskController::class, 'updateStatus'])->name('tasks.updateStatus');
Route::post('/reports/generate', [ReportController::class, 'generate']);
Route::get('/reports', [ReportController::class, 'index']);
Route::patch('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');

Route::get('/projects/{project}/board', [ProjectController::class, 'show'])->name('kanban.show');

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('/projects', [ProjectController::class, 'index'])->name('dashboard');

