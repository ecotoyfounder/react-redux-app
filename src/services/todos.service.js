import httpService from "./http.service";
const todosEndpoint = "todos/"

const todosService = {
    fetch: async () => {
        const {data} = await httpService.get(todosEndpoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        })
        return data
    },
    create: async (newTask) => {
        const {data} = await httpService.post(todosEndpoint, newTask)
        console.log('data',data)
        return data
    }
}

export default todosService