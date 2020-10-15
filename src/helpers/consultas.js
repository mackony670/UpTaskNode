exports.verificarClave = (pass1, pass2) =>{

    if(pass1.length >= 6  || pass2.length >= 6){
        if(pass1 === pass2){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }

}
// exports.verificarEmail = (email)=>{
//     email.contains
// }