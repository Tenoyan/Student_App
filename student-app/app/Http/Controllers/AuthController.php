<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        // validate the incoming request
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        // create new user
        $user = User::create($fields);

        // generate a sanctum token
        $token = $user->createToken($request->name);

        // return response
        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function login(Request $request)
    {
        // validate login details
        $request->validate([
        
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        // find user in the database
        $user = User::where('email', $request->email)->first();

        // verify password
        if (!$user || !Hash::check($request->password, $user->password)) {

            return [
                'errors' => [
                    'email' => ['The provided credentials are incorrect.']
                ]
            ];
            // return [
            //     'message' => 'The provided credentials are incorrect.'
            // ];
        }

        // generate token
        $token = $user->createToken($user->name);

        // return success response
        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];

    }

    public function logout(Request $request)
    {
        // Delete the current user's token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

}
