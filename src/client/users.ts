import randomstring from 'randomstring';

var myarray: { id: any; username: any; password: any; salutation: any; firstName: any; lastName: any; jobTitle: any; emailAddress: string; homepageClassName: any; officePhoneNumber: any; }[] = [];

export function create_users(no: number){
    
    for(let i=1; i<=no;i++){
        myarray.push(create_single_user(i));
    }
    return myarray;
    
}

export function create_single_user(id: number){
    var user = {
        id: id,
        username: randomstring.generate(10),
        password: randomstring.generate(10),
        salutation: randomstring.generate(2) ,
        firstName: randomstring.generate(10),
        lastName: randomstring.generate(10),
        jobTitle: randomstring.generate(5),
        emailAddress: randomstring.generate(3)+'@'+randomstring.generate(5)+'.com',
        homepageClassName: randomstring.generate(6),
        officePhoneNumber: randomstring.generate({length: 10, charset: 'numeric'})
    }

    return(user);
}

