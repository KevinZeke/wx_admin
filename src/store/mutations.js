const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setCurSelectedFac(state, select){
    	state.adminCurSelectedFac = select;
    }
};

export default mutations;
