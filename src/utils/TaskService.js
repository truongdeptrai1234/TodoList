

const getListTask=()=>{
    return axios({
        url:"https://5fd46f77e9cda40016f5bf65.mockapi.io/TASK",
        method:"GET",
    })
}
const addTask=(task)=>{
    return axios({
        url:"https://5fd46f77e9cda40016f5bf65.mockapi.io/TASK",
        method:"POST",
        data:task,
    })
}
const deleteTask=(id)=>{
    return axios({
        url:`https://5fd46f77e9cda40016f5bf65.mockapi.io/TASK/${id}`,
        method:"DELETE",
    })
}
const getTaskById=(id)=>{
    return axios({
        url:`https://5fd46f77e9cda40016f5bf65.mockapi.io/TASK/${id}`,
        method:"GET",
    })
}
const updateTask=(task)=>{
    return axios({
        url:`https://5fd46f77e9cda40016f5bf65.mockapi.io/TASK/${task.id}`,
        method:"PUT",
        data:task,
    })
}
export { getListTask, addTask, deleteTask, getTaskById, updateTask};