import Service from "./Service";

export default class WorkoutService extends Service {
    constructor(){
        super()
    }

    async getWorkouts(){
        const response = await this.axiosInstance.get('/workouts')

        return response.data
    }
    
    async postWorkout(data : {
        name: string,
        level: string,
        description: string
        type: string
    }){
        const response = await this.axiosInstance.post('/workouts', {...data, userId: '3782794e-8b15-4345-85bb-ddeea17dbcf3'})

        return response.data
    }
    
    async getWorkoutById(id: string){
        const response = await this.axiosInstance.get(`/workouts/${id}`)
        return response.data
    }
    
}