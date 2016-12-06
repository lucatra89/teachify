<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeOfEducation extends Model {

	protected $table = 'types_of_education';
    protected $fillable = ['name'];
    public $timestamps = false;
}
