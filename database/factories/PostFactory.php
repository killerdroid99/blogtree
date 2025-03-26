<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->realTextBetween(10, 80),
            'body' => fake()->realTextBetween(20, 300),
            /*'author_id' => '01jpy4azp999q50v8d70mqmrzb',*/
            'author_id' => '01jpwtf515x3dzf1pc4mn28dgn',
        ];
    }
}
