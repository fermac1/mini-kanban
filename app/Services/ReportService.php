<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Report;
use Illuminate\Support\Facades\Log;

class ReportService
{
    public function generateForProject(Project $project): Report
    {
        $counts = $project->tasks()
            ->selectRaw('status, count(*) as cnt')
            ->groupBy('status')
            ->pluck('cnt', 'status')->toArray();

        $total = array_sum($counts);
        $completed = $counts['done'] ?? 0;
        $pending = $counts['pending'] ?? 0;
        $inProgress = $counts['in-progress'] ?? 0;

        $report = Report::updateOrCreate(
            ['project_id' => $project->id],
            [
                'total_tasks' => $total,
                'completed_tasks' => $completed,
                'pending_tasks' => $pending,
                'in_progress_tasks' => $inProgress,
                'last_generated_at' => now(),
            ]
        );

        Log::info('Report generated', ['project' => $project->id, 'report' => $report->id]);
        return $report;
    }

    public function generateAll()
    {
        Project::chunk(50, function ($projects) {
            foreach ($projects as $p) $this->generateForProject($p);
        });
    }
}
