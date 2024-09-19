<?php
$tasksFile = 'tasks.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'];
    $task = $data['task'];

    $tasks = file_exists($tasksFile) ? json_decode(file_get_contents($tasksFile), true) : [];

    if ($action === 'add') {
        $tasks[] = $task;
    } elseif ($action === 'delete') {
        $tasks = array_filter($tasks, fn($t) => $t !== $task);
    }

    file_put_contents($tasksFile, json_encode(array_values($tasks)));
    exit;
}

header('Content-Type: application/json');
echo file_exists($tasksFile) ? file_get_contents($tasksFile) : '[]';
