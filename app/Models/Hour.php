<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hour extends Model {

	protected $table = 'hours';

    protected $fillable = ['value'];
    
    public $timestamps = false;
	
}
