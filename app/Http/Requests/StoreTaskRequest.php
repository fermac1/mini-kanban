<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
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
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in-progress,done',
            'assigned_to' => 'nullable|exists:users,id',
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
