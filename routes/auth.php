<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

/*google redirect url*/

Route::get('login', function () {
    return Socialite::driver('google')->redirect();
})->name('login');

/*google login url*/

Route::get('/redirect/google', function () {
    try {
        $googleUser = Socialite::driver('google')->user();

        $user = User::updateOrCreate(
            ['google_id' => $googleUser->id],
            [
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'google_avatar' => $googleUser->avatar,
                'google_access_token' => $googleUser->token,
                'google_refresh_token' => $googleUser->refreshToken,
                'google_expires_in' => $googleUser->expiresIn,
            ],
        );

        Auth::login($user);
        /*dd(Auth::user());*/
        return redirect('/dashboard');
    } catch (\Exception $e) {
        dd($e);
        return 'Failed to login';
    }
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
