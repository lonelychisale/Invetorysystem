<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash as FacadesHash;

class UserController extends Controller
{
    public function insertusers(Request $request)
    {
        $systemuser = new User();
        $systemuser->email = $request->input('email');
       

       // Check if the email exists in the database
        $usercheck = User::where('email', $systemuser->email)->first();

        if(!$usercheck){
            $systemuser->department_id =$request->input('department');
            $systemuser->fullname = $request->input('fullname');
            $systemuser->email = $request->input('email');
            $systemuser->role = $request->input('role');
            $systemuser->password = bcrypt($request->input('password'));
            $systemuser->save();
            return response()->json([
                'status' => 200,
                'message' => 'User has been successfully added',
            ]);
        }

        else{
            // Email already exists in the database
            return response()->json([
                'status' => 409,
                'message' => 'User has been already added',
            ]);
        }

        

        
    }


    public function index()
    {
        $users = User::with('department')->get(); 
        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }
    
   

    public function userstatistics()
   {
        $userCount = User::count();

        return response()->json([
           'status' => 200,
           'userCount' => $userCount,
        ]);
    }

     //deleting specific user
     public function deleteuser($id)
{
    $deleteuser = User::find($id);

    if (!$deleteuser) {
        return response()->json([
            'status' => 404,
            'message' => 'User not found',
        ], 404);
    }

    $deleteuser->delete();

    return response()->json([
        'status' => 200,
        'message' => 'User deleted successfully',
    ]);
}


    // Retrieve a specific user by ID
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'user' => $user,
        ]);
    }



    //updating specific user

    public function update(Request $request, $id)
       {
          $user = User::find($id);
          if (!$user) {
               return response()->json(['status' => 404, 'message' => 'usernot found'], 404);
          }

         $user->update($request->all());

         return response()->json(['status' => 200, 'message' => 'user updated successfully']);
       }



       //loginin functionality
    public function login(Request $request)
    {
        $loginemail = $request->input('email');
        $loginpassword = $request->input('password');

        // Fetch the user based on email and role
        $user = User::where('email', $loginemail)
                ->where(function ($query) {
                    $query->where('role', 'Administrator')
                          ->orWhere('role', 'ICT');
                })
                ->first();

        

        if (!$user) {
            // User not found with the specified email and role
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        

        // Now, check the password
        if (!FacadesHash::check($loginpassword, $user->password)) {
            // Incorrect password
            return response()->json(['message' => 'Invalid credentials'], 402);
        }
       
        
    // Authentication passed
    // Store the user information in the session
      session(['user' => $user]);

        // Authentication passed
        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
        ]);
    }



    // Add this function in your UserController
    // UserController.php
public function logout(Request $request)
{
    try {
        Auth::logout();
        $request->session()->invalidate();
        return response()->json(['message' => 'Logged out successfully']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Logout failed'], 500);
    }
}

    
//searching for the user from database

public function search(Request $request)
{
    $query = $request->input('searchvalue');
   
    // Perform the search query based on the input parameters
    $users = User::where(function ($queryBuilder) use ($query) {
        // Search by email
        $queryBuilder->where('email', 'like', '%' . $query . '%');

        // Search by name
        $queryBuilder->orWhere('fullname', 'like', '%' . $query . '%');
    })->get();
   
    return response()->json(['users' => $users]);
}


public function getUserDetails($id)
{
    // Fetch user details by ID
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    return response()->json($user);
}

}
