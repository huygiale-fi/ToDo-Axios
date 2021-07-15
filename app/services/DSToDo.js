function DSToDo() {

}

DSToDo.prototype.GetTasksAPI = function() {
    return axios({
        url: 'https://60e023e56b689e001788c8f3.mockapi.io/todo',
        method: 'GET'
    })
}
DSToDo.prototype.PostTasksAPI = function(task) {
    return axios({
        url: 'https://60e023e56b689e001788c8f3.mockapi.io/todo',
        method: 'POST',
        data: task
    });
}
DSToDo.prototype.deleteTasksAPI = function(id) {
    // POST: thêm dữ liệu mới vào database
    //data : truyền dữ liệu cần cần thêm vào database
    return axios({
        url: `https://60e023e56b689e001788c8f3.mockapi.io/todo/${id}`,
        method: 'DELETE',
    });
}
DSToDo.prototype.getIdTasksAPI = function(id) {
    // GET lấy dữ liệu từ server
    // axios sẽ trả về 1 promise
    return axios({
        url: `https://60e023e56b689e001788c8f3.mockapi.io/todo/${id}`,
        method: 'GET',
    });

}
DSToDo.prototype.updateTasksAPI = function(task, id) {
    // GET lấy dữ liệu từ server
    // axios sẽ trả về 1 promise
    return axios({
        url: `https://60e023e56b689e001788c8f3.mockapi.io/todo/${id}`,
        method: 'PUT',
        data: task,
    });
}

// DSToDo.prototype.validatortrung = function(newtask) {
//     debugger
//     for (const key in get.data) {
//         if (get.data[key].newtask.toLowerCase() == newtask.toLowerCase()) {
//             return true;
//         } else {
//             continue;
//             return false;
//         }
//     }
// }