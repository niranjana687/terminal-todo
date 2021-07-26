const yargs = require('yargs');
const chalk = require('chalk');
const tasks = require('./tasks.js');
const { describe } = require('yargs');
const pomodoroEnforcer = require('pomodoro-enforcer');

yargs.version('1.1.0');

//Adding a task.
yargs.command({
    command: 'add',
    describe: 'add a new task',
    builder: {
        name: {
            describe: 'Name of the task ',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        tasks.addTask(argv.name);
    },
});

//Deleting a task
yargs.command({
    command: 'delete',
    describe: 'delete a task',
    builder: {
        name: {
            describe: 'Name of the task',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        tasks.deleteTask(argv.name);
    }
});

//Listing tasks.
yargs.command({
    command: 'list',
    describe: 'list of the incomplete tasks',
    handler: function () {
        tasks.listTasks();
    }
});

// Start the pomodoro timer
yargs.command({
    command: 'timer',
    describe: 'Starts the pomodoro timer',
    handler: function () {
        pomodoroEnforcer(25, 5);
    }
});

yargs.parse();

