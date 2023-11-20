<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
     //adding reportd to the database
     public function insertreport(Request $request){
        $email = $request->input('email');
        $subject = $request->input('subject');
        $item = $request->input('item');
        $currentDate = now()->format('Y-m-d'); // Get the current date in 'Y-m-d' format
    
        // Check if a report with the same email and subject exists on the same day
        $existingReport = Report::where('user_id', $email)
            ->where('subject', $subject)
            ->where('item_id',$item)
            ->whereDate('created_at', $currentDate)
            ->first();
    
        if (!$existingReport) {
            $report = new Report();
            $report ->subject = $subject;
            $report ->user_id = $email;
            $report ->category = $request->input('category');
            $report ->item_id = $item;
            $report ->message = $request->input('message');
            
            $report ->save();
        
            return response()->json([
                'status' => 200,
                'message' => 'Report has been successfully added'
            ]);
        } else {
            return response()->json([
                'status' => 409,
                'message' => 'Report with the same email and subject already exists for today'
            ]);
        }
    }
     

       //getting all reports form the database
       public function retrieveallreports($id){
        $getreports = Report::whereNotExists(function ($query) use ($id) {
            $query->select('id')
                ->from('view_reports')
                ->whereRaw('view_reports.report_id = reports.id')
                ->where('view_reports.user_id', $id);
        })->get();
        return response()->json([
            'status'=>200,
            'reports'=>$getreports,
        ]);
    }


     // Retrieve a specific report by ID
     public function show($id)
     {
         $reportitem = Report::find($id);
 
         if (!$reportitem) {
             return response()->json([
                 'status' => 404,
                 'message' => 'report not found',
             ], 404);
         }
 
         return response()->json([
             'status' => 200,
             'reportitem' => $reportitem,
         ]);
     }

     public function getReportsBySubject($subjectId) {
        // Query the reports table for reports related to the subject
        $reports = Report::with('user')->where('id', $subjectId)->get();

    return response()->json(['reports' => $reports]);
    }

    public function searchreport(Request $request)
    {
        $searchvalue = $request->input('searchvalue');

        // Search based on the fullname of the respondent or the one who sent the report
        $results = Report::with(['user', 'item'])
            ->whereHas('user', function ($query) use ($searchvalue) {
                $query->where('fullname', 'like', '%' . $searchvalue . '%');
            })
            ->orWhereHas('item', function ($query) use ($searchvalue) {
                $query->where('idnumber', 'like', '%' . $searchvalue . '%');
            })
            ->get();

        return response()->json([
            'reports' => $results,
        ]);
    }



     
}
