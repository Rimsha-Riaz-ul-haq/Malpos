<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;



class UserController extends Controller
{

     /**
     * Display a listing of the resource.
     */

     public function index()
     {
         //
         $data =  User::with('role')->get();
         return response()->json($data);
     }

     /**
      * Show the form for creating a new resource.
      */
     public function create()
     {
         //
     }

     /**
      * Store a newly created resource in storage.
      */
     public function store(Request $request)
     {
         //
         $data = new User();
         $data->name = $request->name;
         $data->email = $request->email;
         $data->password = Hash::make($request->password);
         $data->cd_role_id = $request->cd_role_id;
         $data->actions = $request->actions;
         $data->cd_client_id = $request->cd_client_id;
         $data->cd_brand_id = $request->cd_brand_id;
         $data->cd_branch_id = $request->cd_branch_id;
         $data->is_active = $request->is_active;
         $data->created_by = $request->created_by;
         $data->updated_by = $request->updated_by;
         $data->save();
         return response()->json($data);
     }

     /**
      * Display the specified resource.
      */
     public function show(User $User)
     {
         //
     }

     /**
      * Show the form for editing the specified resource.
      */
     public function edit( $id)
     {
         $data = User::with('role')->where('id',$id)->get();
         return response()->json($data);
     }

     /**
      * Update the specified resource in storage.
      */
     public function update(Request $request, $id)
     {
         $data =  User::find($id);
         $data->name = $request->name;
         $data->email = $request->email;
         $data->password = Hash::make($request->password);
         $data->cd_role_id = $request->cd_role_id;
         $data->actions = $request->actions;
         $data->cd_client_id = $request->cd_client_id;
         $data->cd_brand_id = $request->cd_brand_id;
         $data->cd_branch_id = $request->cd_branch_id;
         $data->is_active = $request->is_active;
         $data->created_by = $request->created_by;
         $data->updated_by = $request->updated_by;
         $data->save();

         return response()->json($data);
     }

     /**
      * Remove the specified resource from storage.
      */
     public function destroy($id)
     {
         $data = User::find($id);
         $data->delete();
         return response()->json($data);
     }


    public function loginUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->plainTextToken;

            $auth_user = User::where('email', $request->email)->first();
            $auth_user->api_token = $token;
            $auth_user->save();


            return response()->json(['token' => $token, 'user' => $user], 200);
        }

        return response()->json(['message' => 'Email or password is incorrect'], 401);
    }

    public function loginBrand(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cd_brand_id' => 'required',
            'password' => 'required',
            'token' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }

        if (Auth::attempt($request->only('cd_brand_id', 'password', 'token'))) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->plainTextToken;

            // $auth_user = User::where('cd_brand_id', $request->cd_brand_id)->first();
            // $auth_user->token = $token;
            // $auth_user->save();


            return response()->json(['token' => $token, 'user' => $user], 200);
        }

        return response()->json(['message' => 'brand or password is incorrect'], 401);
    }

    public function loginPin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pin' => 'required',
            'token' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }

        if (Auth::attempt($request->only('pin', 'token'))) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->plainTextToken;

            // $auth_user = User::where('pin', $request->pin)->first();
            // $auth_user->token = $token;
            // $auth_user->save();


            return response()->json(['token' => $token, 'user' => $user], 200);
        }

        return response()->json(['message' => 'pin or token is incorrect'], 401);
    }

        public function storePin(Request $request)
    {
        $validatedData = $request->validate([
            'pin' => 'required|digits:4',
            'token' => 'required',
        ]);
        $token = $validatedData['token'];
        $user = User::where('token', $token)->first();
        $user->pin = $validatedData['pin'];
        $user->save();
        return response()->json($user);
    }

        public function checkPin(Request $request)
    {
        $validatedData = $request->validate([
            'pin' => 'required|digits:4',
            'token' => 'required',
        ]);

        $user = User::where('token', $validatedData['token'])
        ->where('pin', $validatedData['pin'])
        ->first();

        if ($user) {

        return response()->json($user);
        } else {
        return response()->json(['error' => 'Invalid token or PIN'], 422);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function userDetails(): Response
    {
        if (Auth::check()) {

            $user = Auth::user();

            return Response(['data' => $user],200);
        }

        return Response(['data' => 'Unauthorized'],401);
    }

    /**
     * Display the specified resource.
     */
    public function logout(): Response
    {
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return Response(['data' => 'User Logout successfully.'],200);
    }


}
