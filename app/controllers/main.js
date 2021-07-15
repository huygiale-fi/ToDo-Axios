var dstodo = new DSToDo();
var validator = new Validation();


var getel = function(id) {
    return document.getElementById(id);
}

const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}
var validatorinput = function(input) {
    var isvalue = true;
    isvalue &= validator.checkempty(input, 'notiInput', 'Không Được Rỗng');
    return isvalue;
}

var renderDSTask = function(ds) {
    debugger
    var dsTodo = ds.filter(item => item.complete === false);
    var dsComplete = ds.filter(item => item.complete === true);

    const renderContent = (listItem) => {
        let content = '';
        listItem.forEach(item => {
            content += `
            <li>
            <span>${item.newtask}</span>
            <div class="buttons">
            <button class="remove" onclick="deleteTask('${item.id}')">
                <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" onclick="changeStatus('${item.id}')">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-check-circle"></i>
                </button>
                </div>
            </li>
        `
        })
        return content;
    }
    contentTodo = renderContent(dsTodo);
    contentComplete = renderContent(dsComplete);
    getel('todo').innerHTML = contentTodo;
    getel('completed').innerHTML = contentComplete;

}

var getTasks = async function() {
    var gettask = await dstodo.GetTasksAPI()
    renderDSTask(gettask.data);
    hideLoading();
    return gettask;
}
getTasks();


var deleteTask = async function(id) {
    displayLoading();
    await dstodo.deleteTasksAPI(id);
    getTasks();
}


var changeStatus = async function(id) {
    displayLoading();
    debugger
    var task = await dstodo.getIdTasksAPI(id);
    task.data.complete = !task.data.complete;
    var newtask = new Task(task.data.newtask, task.data.complete);
    await dstodo.updateTasksAPI(newtask, id);
    getTasks();
}



getel('addItem').addEventListener('click', async function() {
    debugger
    var newtask = getel('newTask').value;
    if (!validatorinput(newtask)) return;
    var get = await getTasks();
    var complete = false;
    var validatortrung = function(newtask) {

        for (const key in get.data) {
            if (get.data[key].newtask.toLowerCase() === newtask.toLowerCase()) {
                return true;
            } else {
                continue;
                return false;
            }
        }
    }

    if (get.data != '') {
        var trung = validatortrung(newtask);
        if (trung) {
            getel('notiInput').style.display = 'block';
            getel('notiInput').innerHTML = 'Hoạt động đã tồn tại';
            return;
        } else {
            displayLoading();
            var task = new Task(newtask, complete);
            await dstodo.PostTasksAPI(task);
            getTasks();
        }
    } else {
        displayLoading();
        var task = new Task(newtask, complete);
        await dstodo.PostTasksAPI(task);
        getTasks();
    }
    getel('newTask').addEventListener('click', function() {
        getel('newTask').value = '';
    })

})