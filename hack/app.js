// DOM elements
const form = document.getElementById('schedule-form');
const taskList = document.getElementById('task-list');
const reminderMessage = document.getElementById('reminder-message');

// Schedule array to store tasks
let schedule = [];

// Event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskName = document.getElementById('task').value;
    const taskDate = document.getElementById('date').value;
    const taskTime = document.getElementById('time').value;

    // Create task object
    const task = {
        name: taskName,
        date: taskDate,
        time: taskTime,
    };

    // Add task to schedule
    schedule.push(task);

    // Display the updated schedule
    displaySchedule();

    // Clear the form
    form.reset();
});

// Function to display the schedule
function displaySchedule() {
    taskList.innerHTML = '';

    schedule.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = ${task.name} - ${task.date} at ${task.time};
        taskList.appendChild(listItem);
    });

    // Check for reminders
    checkReminders();
}

// Function to check for upcoming reminders
function checkReminders() {
    const now = new Date();
    let upcomingTask = null;

    schedule.forEach(task => {
        const taskDateTime = new Date(${task.date}T${task.time});
        
        if (taskDateTime > now && (!upcomingTask || taskDateTime < new Date(${upcomingTask.date}T${upcomingTask.time}))) {
            upcomingTask = task;
        }
    });

    if (upcomingTask) {
        reminderMessage.textContent = Upcoming task: ${upcomingTask.name} at ${upcomingTask.time} on ${upcomingTask.date};
    } else {
        reminderMessage.textContent = 'No reminders yet.';
    }
}

// Request notification permission from the user
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Function to schedule a notification for a task
function scheduleNotification(task) {
    const taskDateTime = new Date(${task.date}T${task.time});
    const now = new Date();

    const timeUntilTask = taskDateTime - now; // Time in milliseconds

    if (timeUntilTask > 0) {
        setTimeout(() => {
            // Create a pop-up notification
            new Notification(Reminder: ${task.name}, {
                body: It's time for ${task.name} at ${task.time} on ${task.date},
                icon: 'notification-icon.png' // Optional: Add your own icon
            });

            // Play beep sound
            playBeepSound();

            // Trigger vibration (if the device supports it)
            navigator.vibrate([200, 100, 200]); // Vibration pattern: vibrate-pause-vibrate
        }, timeUntilTask);
    }
}

// Function to play a beep sound
function playBeepSound() {
    const audio = new Audio('beep-sound.mp3'); // Add your beep sound file in the same folder
    audio.play();
}

// Function to check for upcoming reminders
function checkReminders() {
    const now = new Date();
    let upcomingTask = null;

    schedule.forEach(task => {
        const taskDateTime = new Date(${task.date}T${task.time});
        
        if (taskDateTime > now && (!upcomingTask || taskDateTime < new Date(${upcomingTask.date}T${upcomingTask.time}))) {
            upcomingTask = task;
        }

        // Schedule a notification for each task
        scheduleNotification(task);
    });

    if (upcomingTask) {
        reminderMessage.textContent = Upcoming task: ${upcomingTask.name} at ${upcomingTask.time} on ${upcomingTask.date};
    } else {
        reminderMessage.textContent = 'No reminders yet.';
    }
}