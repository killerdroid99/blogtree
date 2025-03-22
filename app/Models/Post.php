<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = ['title', 'body', 'author_id'];
    protected $hidden = ['author_id'];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime'
        ];
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
