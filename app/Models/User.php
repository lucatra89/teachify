<?php 
namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Hash;
use App\Models\Group;
use DB;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Storage;

class User extends Model implements AuthenticatableContract{

	use Authenticatable;

	protected $table = 'users';

    public $timestamps = false;

	protected $fillable = ['name','surname','email', 'password', 'u_type'];

	protected $hidden = ['password', 'u_type', 'remember_token'];

	protected $appends = ['photo'];


    public function groups()
    {
        return $this->belongsToMany('App\Models\Group', 'users_groups', 'user_id', 'group_id');
    }

    public function getPhotoAttribute()
    {	
    	$filename = $this->attributes['id'].'.jpg';
        if(Storage::exists($filename)){
        	return base64_encode(Storage::get($this->attributes['id'].'.jpg'));	
        }else{
        	return NULL;
        }
    }


	public static function store($param){
		$param['u_type'] = 'U';
		$param['password'] = Hash::make($param['password']);
		return User::create($param);
	}



	public static function updateWithPhoto($param)
	{
		$user = static::find($param['id']);
		$user->name = $param['name'];
		$user->surname = $param['surname'];
		$user->save();
		if(isset($param['photo'])){
		Storage::put($param['id'].'.jpg',
			base64_decode($param['photo']));
		}
	}

	public static function authenticate($user)
	{
		 return User::where('email', $user['email'])->firstOrFail();
	}


	public static function findAllAdmins()
	{	
		return User::whereHas('groups', function ($query) {
		    $query->where('name', '=', 'admin');
		})->get();

	}

	public static function createAdmin($request)
	{
		$group = Group::where('name', 'admin')->first();
		$user = User::where('email', $request['email'])->first();
		$user->groups()->attach($group->id);

		return $user->id;
	}


	public static function deleteAdmin($id)
	{
		$group = Group::where('name', 'admin')->first();
		$user = User::find($id);
		$user->groups()->detach($group->id);
	}





}
