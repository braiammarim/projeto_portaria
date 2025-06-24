<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Login do usuário
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Dados inválidos',
                'errors' => $validator->errors()
            ], 422);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login realizado com sucesso',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'token' => $token
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'E-mail ou senha incorretos'
        ], 401);
    }

    /**
     * Logout do usuário
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout realizado com sucesso'
        ]);
    }

    /**
     * Solicitar recuperação de senha
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'E-mail inválido',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'E-mail não encontrado em nossa base de dados'
            ], 404);
        }

        // Gerar token de reset
        $token = Str::random(60);
        $user->password_reset_token = $token;
        $user->password_reset_expires_at = now()->addHours(1);
        $user->save();

        // Em um ambiente real, aqui você enviaria um e-mail com o link de reset
        // Por enquanto, vamos apenas retornar o token para fins de teste
        return response()->json([
            'success' => true,
            'message' => 'Link de recuperação enviado para seu e-mail',
            'token' => $token // Remover em produção
        ]);
    }

    /**
     * Resetar senha
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Dados inválidos',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)
                   ->where('password_reset_token', $request->token)
                   ->where('password_reset_expires_at', '>', now())
                   ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Token inválido ou expirado'
            ], 400);
        }

        // Atualizar senha
        $user->password = Hash::make($request->password);
        $user->password_reset_token = null;
        $user->password_reset_expires_at = null;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Senha alterada com sucesso'
        ]);
    }
} 