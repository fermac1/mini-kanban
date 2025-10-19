<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\GenerateReportJob;
use App\Services\ReportService;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    protected $reportService;

    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }
    public function generate(Request $request)
    {
        GenerateReportJob::dispatch();
        return redirect()->back()->with('success', 'Report generated!');
    }

    public function index()
    {
        $reports = \App\Models\Report::with('project')->get();
        return inertia('Reports/Index', ['reports' => $reports]);
    }
}
