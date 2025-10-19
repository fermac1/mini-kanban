<?php

use Tests\TestCase;
use App\Jobs\GenerateReportJob;
use App\Models\User;
use Illuminate\Support\Facades\Queue;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReportGenerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_trigger_report_generation()
    {
        Queue::fake();

        $response = $this->post('/reports/generate');

        $response->assertRedirect();
        Queue::assertPushed(GenerateReportJob::class);
    }
}
