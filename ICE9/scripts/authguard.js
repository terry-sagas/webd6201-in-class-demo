(function AuthGuard(){
    if (!sessionStorage.getItem("user")){
        location.href = '/login'
    }
})()