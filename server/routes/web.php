<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
 * Qualquer outra rota vai para app.blade.php
 */
Route::get('{any}', function () {
    return view('app');
}).where(['any' => '.*']);

//Route::get('/', function () {
//    return view('app');
//});
