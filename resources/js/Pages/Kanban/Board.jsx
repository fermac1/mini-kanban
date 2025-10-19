import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import Loader from "../../Components/Loader";

export default function Board({ project, tasks }) {
  const { props } = usePage();
  const flash = props.flash || {};

  const initialColumns = {
    pending: tasks.filter((t) => t.status === "pending"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const [columns, setColumns] = useState(initialColumns);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });
    const [editingTask, setEditingTask] = useState(null);

      // Loader state
  const [loading, setLoading] = useState(false);


  function home() {
    Inertia.visit("/");
  }

  // Drag and drop
    function onDragEnd(result) {
        const { source, destination, draggableId } = result;
        // show loader while updating
        setLoading(true);
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            setLoading(false);
            return;
        }
        const sourceCol = Array.from(columns[source.droppableId]);
        const [moved] = sourceCol.splice(source.index, 1);

        const destCol = Array.from(columns[destination.droppableId]);
        destCol.splice(destination.index, 0, moved);

        setColumns(prev => ({
        ...prev,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
        }));

        // show loader while updating
        // setLoading(true);

        Inertia.patch(`/tasks/${draggableId}/status`, { status: destination.droppableId }, {
            preserveState: true,
            onFinish: () => {
                console.log('Request finished');
                setLoading(false);
            },
            onError: (errors) => {
                console.error('Request error:', errors);
                setLoading(false);
            },
            onCancel: () => {
                console.log('Request cancelled');
                setLoading(false);
            },

        // onError: () => {
        //     window.location.reload();
        // }
        });
    }

  // Flash success message
  useEffect(() => {
    if (flash.success) {
      alert(flash.success);
      if (flash.task) {
        const task = flash.task;
        setColumns((prev) => ({
          ...prev,
          [task.status]: [...prev[task.status], task],
        }));
      }
    }
  }, [flash]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Create new task
   function handleSubmit(e) {
  e.preventDefault();
    setLoading(true);

  Inertia.post('/tasks', {
    ...form,
    project_id: project.id,
  }, {
    onSuccess: (page) => {
      const newTask = page.props.flash?.task;
      if (newTask) {
        setColumns(prev => ({
          ...prev,
          [form.status]: [...prev[form.status], newTask],
        }));
      }
      setForm({ title: '', description: '', status: 'pending' });
      },
       onFinish: () => setLoading(false),
    onError: (errors) => {
      console.error(errors);
      alert('Failed to create task');
    },
  });
}

  // Edit task
  function startEditing(task) {
    setEditingTask(task);
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditingTask((prev) => ({ ...prev, [name]: value }));
  }

    function saveEdit(taskId) {
      setLoading(true);
    Inertia.patch(`/tasks/${taskId}`, editingTask, {
      preserveState: true,
      onSuccess: () => {
        setColumns((prev) => {
          const updated = { ...prev };
          for (const key in updated) {
            updated[key] = updated[key].map((t) => (t.id === taskId ? editingTask : t));
          }
          return updated;
        });
        setEditingTask(null);
        },
      onFinish: () => setLoading(false),
    });
  }

  return (
  <div style={{ padding: '32px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
    {loading && <Loader />}

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{project.name}</h1>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          + New Task
        </button>

        <button
          onClick={home}
          style={{
            backgroundColor: '#e5e7eb',
            color: '#374151',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Go Home
        </button>
      </div>
    </div>

    {showForm && (
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          padding: '12px',
          width: '500px',
          marginBottom: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task title"
            required
            style={{
              width: '95%',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              padding: '8px',
              marginBottom: '8px',
            }}
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Task description"
            style={{
              width: '95%',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              padding: '8px',
              marginBottom: '8px',
            }}
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{
              width: '95%',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              padding: '8px',
              marginBottom: '8px',
            }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                backgroundColor: '#e5e7eb',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: '#2563eb',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    )}

          {/* drag and drop */}
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: '24px', overflowX: 'auto' }}>
        {['pending', 'in-progress', 'done'].map((colKey) => (
          <Droppable droppableId={colKey} key={colKey}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  flex: 1,
                  minWidth: '300px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #f3f4f6',
                  padding: '16px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                <h3
                  style={{
                    fontWeight: '600',
                    fontSize: '16px',
                    marginBottom: '16px',
                    color:
                      colKey === 'pending'
                        ? '#ca8a04'
                        : colKey === 'in-progress'
                        ? '#2563eb'
                        : '#16a34a',
                    textTransform: 'capitalize',
                  }}
                >
                  {colKey.replace('-', ' ')}
                </h3>

                {columns[colKey].map((task, index) => (
                  <Draggable draggableId={String(task.id)} index={index} key={task.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          padding: '10px',
                          marginBottom: '12px',
                        }}
                      >
                        {editingTask?.id === task.id ? (
                          <>
                            <input
                              type="text"
                              name="title"
                              value={editingTask.title}
                              onChange={handleEditChange}
                              style={{
                                width: '95%',
                                marginBottom: '8px',
                                padding: '6px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                              }}
                            />
                            <select
                              name="status"
                              value={editingTask.status}
                              onChange={handleEditChange}
                              style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                              }}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="done">Done</option>
                            </select>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '8px' }}>
                              <button
                                onClick={() => saveEdit(task.id)}
                                style={{
                                  backgroundColor: '#16a34a',
                                  color: '#fff',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                }}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingTask(null)}
                                style={{
                                  backgroundColor: '#9ca3af',
                                  color: '#fff',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <h4 style={{ fontWeight: '500', color: '#1f2937' }}>{task.title}</h4>
                            <p style={{ fontSize: '12px', color: '#6b7280' }}>
                              {task.assignee?.name || 'Unassigned'}
                            </p>
                            <button
                              onClick={() => startEditing(task)}
                              style={{
                                color: '#2563eb',
                                fontSize: '12px',
                                marginTop: '6px',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                background: 'none',
                                border: 'none',
                                padding: 0,
                              }}
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  </div>
);

}
