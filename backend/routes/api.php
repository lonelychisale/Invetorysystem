<?php

use App\Http\Controllers\API\AssignItemController;
use App\Http\Controllers\API\DepartmentController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\PasswordResetController;
use App\Http\Controllers\API\ReportController;
use App\Http\Controllers\API\RequestItemController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\DeleteItemsLogsController;
use App\Http\Controllers\DeleteLogsController;
use App\Http\Controllers\EditLogsController;
use App\Http\Controllers\EditLogsItemsController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\UnassignItemsLogController;
use App\Http\Controllers\UnviewedViewController;
use App\Http\Controllers\ViewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/addusers',[UserController::class,'insertusers']);
Route::post('/additems',[ItemController::class,'insertitems']);
Route::post('/assigneditems', [AssignItemController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);

Route::post('/sendemail', [PasswordResetController::class, 'index']);
Route::post('/reset-password', [PasswordResetController::class,'resetPassword']);

Route::post('/requests', [RequestItemController::class, 'insertrequests']);
Route::post('/reports', [ReportController::class, 'insertreport']);

Route::post('/requestresponse', [ResponseController::class,'storeRequestResponse']);
Route::post('/reportresponse', [ResponseController::class,'storeReportResponse']);

Route::post('/sendresponseemail', [EmailController::class, 'sendResponseEmail']);


Route::post('/insert-view-data',[ViewController::class,'store']);
Route::post('/viewrequestresponse', [ViewController::class,'insertRequestResponseView']);
Route::post('/viewreportresponse', [ViewController::class,'insertReportResponseView']);
Route::post('/adddepartments', [DepartmentController::class,'insertdepartments']);

Route::post('/deleteduserlogs', [DeleteLogsController::class,'store']);
Route::post('/editeduserlogs', [EditLogsController::class,'store']);

Route::post('/deleteditemlogs', [DeleteItemsLogsController::class,'store']);
Route::post('/editeditemlogs', [EditLogsItemsController::class,'store']);

Route::post('/unassigneditemlogs', [UnassignItemsLogController::class,'store']);

Route::get('/getunassigneditemlogs', [UnassignItemsLogController::class,'show']);

Route::get('/getdeleteduserlogs', [DeleteLogsController::class,'show']);
Route::get('/getediteduserlogs', [EditLogsController::class,'show']);

Route::get('/getdeleteditemlogs', [DeleteItemsLogsController::class,'show']);
Route::get('/getediteditemlogs', [EditLogsItemsController::class,'show']);

Route::get('/retriverequestresponse', [ResponseController::class,'requestresponses']);
Route::get('/retrivereportresponse', [ResponseController::class,'reportresponses']);
Route::get('/retrivereportresponsesearch', [ResponseController::class,'searchreportresponses']);
Route::get('/retriverequestresponsesearch', [ResponseController::class,'searchrequestresponses']);
Route::get('/all-responses/{LoggedInUserId}',[ResponseController::class,'getAllResponses']);

Route::get('/getitems',[ItemController::class,'retrieveitems']);
Route::get('/getallitems',[ItemController::class,'retrieveallitems']);
Route::get('/getspecificitem/{id}', [ItemController::class, 'show']);


Route::get('/getstationary',[ItemController::class,'retrievestationary']);
Route::get('/getlaptops',[ItemController::class,'retrievelaptops']);
Route::get('/getphones',[ItemController::class,'retrievephone']);
Route::get('/getfurniture',[ItemController::class,'retrievefurniture']);
Route::get('/itemscount',[ItemController::class,'itemsstatistics']);
Route::put('/edititems/{id}', [ItemController::class,'update']);
Route::delete('/deleteitems/{id}', [ItemController::class, 'deleteitem']);


Route::get('/autocomplete', [ItemController::class, 'autocompleteSearch']);
Route::get('/search', [ItemController::class, 'search']);
Route::get('/dashboardsearch', [ItemController::class, 'dashboardsearch']);


Route::get('/phonesearch',[ItemController::class,'searchphonetable']);
Route::get('/laptopsearch',[ItemController::class,'searchlaptoptable']);
Route::get('/stationarysearch',[ItemController::class,'searchstationarytable']);
Route::get('/furnituresearch',[ItemController::class,'searchfurnituretable']);


Route::get('/getassigneitems',[AssignItemController::class,'retrieveassigneditems']);
Route::get('/assigned-items/{email}',[AssignItemController::class,'getReportAssignedItems']);

Route::get('/assigneitemscount',[AssignItemController::class,'assignedstatistics']);
Route::delete('/assigneditems/{assignedItemId}', [AssignItemController::class, 'deleteAssignedItem']);
Route::get('/searchassigneditems', [AssignItemController::class, 'search']);


Route::get('/users', [UserController::class, 'index']);
Route::get('/getspecificuser/{id}', [UserController::class, 'show']);
Route::get('/userscount', [UserController::class, 'userstatistics']);
Route::put('/editusers/{id}', [UserController::class,'update']);
Route::delete('/deleteusers/{id}', [UserController::class, 'deleteuser']);
Route::get('/loginuser', [UserController::class, 'getUser']);
Route::get('/searchuser', [UserController::class, 'search']);


Route::get('/allrequests/{id}', [RequestItemController::class, 'retrieveallrequests']);
Route::get('/request', [RequestItemController::class, 'show']);
Route::get('/requestsearch', [RequestItemController::class, 'searchrequest']);
Route::get('/all-requests-and-reports',[RequestItemController::class,'getAllRequestsAndReports']);
Route::get('/all-requests',[RequestItemController::class,'getAllRequestss']);
Route::get('subject/requests/{subjectId}', [RequestItemController::class,'getRequestsBySubject']);


Route::get('/allreports/{id}', [ReportController::class, 'retrieveallreports']);
Route::get('/report', [ReportController::class, 'show']);
Route::get('/reportsearch', [ReportController::class, 'searchreport']);
Route::get('subject/reports/{subjectId}', [ReportController::class,'getReportsBySubject']);

Route::get('/totalunviewedcount/{id}', [UnviewedViewController::class, 'getTotalUnviewedCount']);


Route::get('/subject/reports/{id}', [SubjectController::class,'getReportDetails']);
Route::get('/subject/requests/{id}', [SubjectController::class,'getRequestDetails']);

Route::get('/user/{id}', [UserController::class, 'getUserDetails']);

Route::get('/departmentscounts', [DepartmentController::class, 'departmentstatistics']);
Route::get('/getdepartments', [DepartmentController::class, 'retrievealldepatments']);
Route::get('/searchdeprtments', [DepartmentController::class, 'search']);
Route::delete('/deletedepartment/{id}', [UserController::class, 'deletedepartment']);





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
