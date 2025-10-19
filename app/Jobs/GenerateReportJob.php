<?php

namespace App\Jobs;

use App\Services\ReportService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GenerateReportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     */
    public function handle(ReportService $reportService): void
    {
        if (!file_exists(database_path('database.sqlite'))) {
            Log::error('SQLite database file missing at: ' . database_path('database.sqlite'));
            return;
        }else {

            Log::info('GenerateReportJob started');
            $reportService->generateAll();
            Log::info('GenerateReportJob finished');
        }
    }
}
