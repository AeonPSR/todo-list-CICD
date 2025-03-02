"use client";

import { useState, useEffect } from "react";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Fetch tasks from the API
    useEffect(() => {
        async function fetchTasks() {
            const res = await fetch("/api/tasks");
            const data = await res.json();
            setTasks(data);
        }
        fetchTasks();
    }, []);

    // Add a new task
    async function addTask() {
        if (!newTask.trim()) return;
        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTask }),
        });
        const task = await res.json();
        setTasks([...tasks, task]);
        setNewTask("");
    }

    // Toggle task completion
    async function toggleTask(id, title, completed) {
        await fetch("/api/tasks", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, title, completed: !completed }),
        });
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !completed } : task)));
    }

    // Delete a task
    async function deleteTask(id) {
        await fetch("/api/tasks", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <main className="container">
            <h1>Todo List</h1>
            <div className="task-input">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? "completed" : ""}>
                        <span onClick={() => toggleTask(task.id, task.title, task.completed)}>
                            {task.title}
                        </span>
                        <button onClick={() => deleteTask(task.id)}>❌</button>
                    </li>
                ))}
            </ul>
            <style jsx>{`
                .container {
                    max-width: 400px;
                    margin: auto;
                    text-align: center;
                    font-family: Arial, sans-serif;
                }
                .task-input {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                    margin-bottom: 16px;
                }
                input {
                    padding: 8px;
                    flex: 1;
                }
                button {
                    padding: 8px;
                    cursor: pointer;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px;
                    border-bottom: 1px solid #ddd;
                }
                .completed {
                    text-decoration: line-through;
                    color: gray;
                }
            `}</style>
        </main>
    );
}
