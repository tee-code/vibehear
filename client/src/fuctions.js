export const isAuthenticated = () => {
    if(localStorage.getItem('s-token') || localStorage.getItem('l-token')){
        
        return true;
    }else{
        return false
    }
}