export const getSender = (loggedUser, e) => {  
  console.log("element", e)
    if(loggedUser.data._id === e._id ){
      return e._id
    } 
    // e._id === loggedUser.data._id ? e.first_name : e.first_name;
    
  }