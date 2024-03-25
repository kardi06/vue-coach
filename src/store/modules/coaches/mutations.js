export default{
    registerCoach(state,payload){
        state.coaches.push(payload);
    },
    setCoach(state,payload){
        state.coaches = payload;
    }
}