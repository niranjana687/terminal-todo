const chalk = require('chalk');
const fs = require('fs');

//Add a task.
const addTask = (taskName) => {
    const tasks = loadTasks();
    const duplicateTasks = tasks.filter( (task) => {
        return task.name === taskName;
    });

    if (duplicateTasks.length === 0) {
        tasks.push({
            name: taskName,
        });
        saveTasks(tasks);
    }
    else {
        console.log(chalk.red.inverse('Task has been added previously!'));
    }

}

//Load existing tasks.
const loadTasks = () => {
    try {
        const taskBuffer = fs.readFileSync('tasks.json');
        const tasks = taskBuffer.toString();
        return JSON.parse(tasks);
    } catch (error) {
        return [];
    }
}

//Saves tasks.
const saveTasks = (tasks) => {
    const tasksJSON = JSON.stringify(tasks);
    fs.writeFileSync('tasks.json', tasksJSON);
};

//Delete a task.
const deleteTask = (name) => {
    const tasks = loadTasks();
    const remainingTasks = tasks.find ((task) => {
        return task.name != name;
    });
    if (remainingTasks.length === tasks.length) {
        console.log(chalk.inverse.red('task doesn\'t exist!'));
    } else {
        saveTasks(remainingTasks);
    }

};

//List incomplete tasks
const listTasks = () => {
    const tasks = loadTasks();
    if(tasks.length === 0) {
        console.log(chalk.inverse.red('No tasks to list!'));
    } else {
        tasks.forEach(task => {
            console.log(task.name);
        });
    }
}


module.exports = {
    addTask: addTask,
    loadTasks: loadTasks,
    saveTasks: saveTasks,
    deleteTask: deleteTask,
    listTasks: listTasks,
};
