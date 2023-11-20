<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    //adding departiment to the database
    public function insertdepartments(Request $request){
        $departments = new Department();
        $departments->name = $request->input('name');
    
        $checkDepartment= Department::where('name', $departments->name)->first();
    
        if(!$checkDepartment){
            $departments->name = $request->input('name');
            $departments->branch = $request->input('branch');
            $departments->leader = $request->input('leader');
           
        
            $departments->save();
        
            return response()->json([
                'status'=>200,
                'message'=>'department has been successfully added'
            ]);
        }
      else{
        return response()->json([
            'status'=>409,
            'message'=>'department has been already added'
        ]);
      }
    
        
       } 

       //getting all depatments form the database
       public function retrievealldepatments(){
        $getdepartments = Department::all();
        return response()->json([
            'status'=>200,
            'departmets'=>$getdepartments,
        ]);
    }

     // Retrieve a specific department by ID
     public function show($id)
     {
         $department = Department::find($id);
 
         if (!$department) {
             return response()->json([
                 'status' => 404,
                 'message' => 'department not found',
             ], 404);
         }
 
         return response()->json([
             'status' => 200,
             'department' => $department,
         ]);
     }

      //updating specificdepartment
    
      public function update(Request $request, $id)
      {
         $departmentupdate = Department::find($id);
         if (!$departmentupdate) {
              return response()->json(['status' => 404, 'message' => 'department not found'], 404);
         }

        $departmentupdate->update($request->all());

        return response()->json(['status' => 200, 'message' => 'department updated successfully']);
      }


       //deleting specific department
       public function deletedepartment($id){
        $deletedepartment = Department::find($id);
        $deletedepartment -> delete();

        
        return response()->json([
            'status' => 200,
            'message' => 'deleted successfully',
         ]);
    }


     //searching department
     public function search(Request $request)
     {
         $query = $request->input('searchvalue');
         $category = $request->input('branch');
     
         // Perform the search query based on the input parameters
         $searchdepartments = Department::when($query, function ($queryBuilder) use ($category, $query) {
             // Filter by category if provided
             if ($category !== 'all') {
                 $queryBuilder->where('branch', $category);
             }
     
             // Filter by department name or any other fields you want to search
             $queryBuilder->where(function ($queryInner) use ($query) {
                 $queryInner->where('name', 'like', '%' . $query . '%');
                 $queryInner->orWhere('leader', 'like', '%' . $query . '%');
                 
             });
     
             return $queryBuilder;
         })->get();
     
         return response()->json(['departments' => $searchdepartments]);
     }

      //items statistics
      public function departmentstatistics()
      {
           $departmentCount = Department::count();
   
           return response()->json([
              'status' => 200,
              'DepartmentCount' => $departmentCount,
           ]);
       }

}
