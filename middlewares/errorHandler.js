function errorHandler(err, req, res, next){
    let code
    let message 

    console.log(err.name, "ini dari error handler");

    switch (err.name) {
        case "Username/Password Salah":
            code = 401
            message = err.name
            break;
    
        case "SequelizeUniqueConstraintError":
            code = 400
            message = "Sequelize Unique Error"
            break;
        
        case "SequelizeDatabaseError":
            code = 400
            message = "Sequelize Error"
            break;
        
        case "JsonWebTokenError":  
            code = 401  
            message = "Authentication Failed"  
            break;
        
        case "Authentication Failed!":  
            code = 401  
            message = "Authentication Failed"  
            break;
        
        case "Authorization Failed!":  
            code = 401  
            message = "Authorization Failed"  
            break;
    
        case "Task not found":  
            code = 404  
            message = "Task not found"  
            break;

        case "Error":
            code = 400
            message = "Price and Stock has to be NUMBER >= 0"
            break;
        
        case "Price and Stock has to be NUMBER >= 0":
          code = 400
          message = "Price and Stock has to be NUMBER >= 0"
          break;

        default:
            code = 500
            message = "Internal Server Error"
            break;
    }
    res.status(code).json({message, errDev:err})
}

module.exports = {errorHandler}