<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\ReportResponse;
use App\Models\RequestItem;
use App\Models\RequestResponse;
use Illuminate\Http\Request;

class UnviewedViewController extends Controller
{
    public function getTotalUnviewedCount($id)
{
    $unviewedRequestsCount = RequestItem::whereNotExists(function ($query) use ($id) {
        $query->select('id')
            ->from('view_requests')
            ->whereRaw('view_requests.request_id = request_items.id')
            ->where('view_requests.user_id', $id);
    })->count();

    $unviewedReportsCount = Report::whereNotExists(function ($query) use ($id) {
        $query->select('id')
            ->from('view_reports')
            ->whereRaw('view_reports.report_id = reports.id')
            ->where('view_reports.user_id', $id);
    })->count();

    $unviewedReportsResponsesCount = ReportResponse::whereNotExists(function ($query) use ($id) {
        $query->select('id')
            ->from('view_report_responses')
            ->whereRaw('view_report_responses.report_response_id= report_responses.id')
            ->where('view_report_responses.user_id', $id);
    })->count();

    $unviewedRequestsResponsesCount = RequestResponse::whereNotExists(function ($query) use ($id) {
        $query->select('id')
            ->from('view_request_responses')
            ->whereRaw('view_request_responses.request_response_id= request_responses.id')
            ->where('view_request_responses.user_id', $id);
    })->count();

    $totalUnviewedCount = $unviewedRequestsCount + $unviewedReportsCount + $unviewedReportsResponsesCount +  $unviewedRequestsResponsesCount;

    return response()->json(['totalUnviewedCount' => $totalUnviewedCount]);
}

}
