<?php

namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    public function index(Request $request)
   
    {
        //  Check if the email exists
        $email = $request->input('email');

        $user = User::where('email', $email)->first();

        if ($user) {
            // Generate a token
            $token = Str::random(60);

            // Store the token
            DB::table('password_resets')->updateOrInsert(
                ['email' => $user->email],
                ['token' => Hash::make($token), 'created_at' => now()]
            );

            //  Send reset email
            Mail::to($user->email)->send(new ResetPassword($token));

            // Return success message only if the email exists
         
            return response()->json([
                'status' => 200,
                'message' => 'Reset link sent',
            ]);
        }
        else{
        return response()->json(['message' => 'Email not found.']);
        }

        
        
    }

    // PasswordResetController.php

    public function resetPassword(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'email' => 'required|email', 
            'token' => 'required|string', 
            'password' => 'required|min:6', // Adjust the minimum password length as needed
        ]);
        
        if ($validatedData->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validatedData->errors()], 400);
        }
        
        $data = $validatedData->validated(); // Retrieve the validated input data
        
    

        $reset = DB::table('password_resets')
            ->where('email', $data['email'])
            //->where('token', $data['token'])
            ->first();

        if (!$reset) {
            return response()->json(['message' => 'Invalid reset request.'], 400);
        }

        $created_at = Carbon::parse($reset->created_at);
        $expires_at = $created_at->addMinutes(5);

        if (now()->gt($expires_at)) {
            return response()->json(['message' => 'Reset token has expired.'], 400);
        }

        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $user->update(['password' => Hash::make($data['password'])]);

        DB::table('password_resets')
            ->where('email', $data['email'])
            ->where('token', $data['token'])
            ->delete();

        return response()->json(['message' => 'Password reset successful.']);
    }


}
