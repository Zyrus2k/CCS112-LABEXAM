<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    protected $fillable = [
        'station_name',
        'category',
        'hourly_rate',
    ];

    protected function casts(): array
    {
        return [
            'hourly_rate' => 'decimal:2',
        ];
    }
}