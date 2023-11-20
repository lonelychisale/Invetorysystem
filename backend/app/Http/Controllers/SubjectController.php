<?
namespace App\Http\Controllers;

use App\Models\Report; // Replace with your Report model
use App\Models\RequestItem; // Replace with your Request model
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function getReportDetails($id)
    {
        // Fetch the report details by ID
        // Fetch the report details by ID
$report = Report::with('user:id,fullname')->where('id', $id)->first();

if (!$report) {
    return response()->json(['message' => 'Report not found'], 404);
}

return response()->json($report);

    }

    public function getRequestDetails($id)
    {
        // Fetch the request details by ID
        $request = RequestItem::with('user')->where('id', $id)->get();;
        

        if (!$request) {
            return response()->json(['message' => 'Request not found'], 404);
        }

        return response()->json($request);
    }
}
