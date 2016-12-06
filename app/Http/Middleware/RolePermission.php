<?php namespace App\Http\Middleware;

use Closure;
use Auth;
class RolePermission {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$permission = array_slice(func_get_args(), 2 ,func_num_args() - 2);

		if(Auth::check()){
			$groups = Auth::user()->groups;
			foreach ($groups as $group) {
				if(in_array($group->name , $permission)){
					return $next($request);
				}
			}
			return response('Unauthorized', 401);
		 }else{
		 	return redirect('login');
		}

		
	}

}
