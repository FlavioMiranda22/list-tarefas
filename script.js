document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        const button = document.createElement('button');
        button.textContent = 'Remover';
        button.addEventListener('click', () => {
            removeTask(li, taskText);
        });
        li.appendChild(button);
        taskList.appendChild(li);
    }

    function removeTask(li, taskText) {
        taskList.removeChild(li);
        deleteTask(taskText);
    }

    function saveTask(taskText) {
        fetch('tasks.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'add', task: taskText })
        });
    }

    function deleteTask(taskText) {
        fetch('tasks.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'delete', task: taskText })
        });
    }

    function loadTasks() {
        fetch('tasks.php')
            .then(response => response.json())
            .then(tasks => {
                tasks.forEach(task => addTask(task));
            });
    }

    loadTasks();
});
