<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'required|in:pending,in-progress,done',
            'due_date' => 'nullable|date',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The task title is required.',
            'assigned_to.exists' => 'The selected user does not exist.',
            'status.in' => 'Status must be pending, in-progress, or done.',
        ];
    }
}
