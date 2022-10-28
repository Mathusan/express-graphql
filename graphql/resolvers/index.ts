import {signUp, logIn,} from '../../src/services/user.service'

export const resolver = {
    async login(_ : null, {email ,password } : any) {
        const data = await logIn({email,password})
        console.log(data)
        return {data}
    },

    async register(_: null,{registerInput : {name,email,password}}:any){
        const data = await signUp({name,email,password})
        return {data}
    }
}

// export const resolver = {
//         async login(_ : null, {email ,password } : any) {
//             const data = await logIn({email,password})
//             console.log(data)
//             return {data}
//         },

//         async register(_: null,{registerInput : {name,email,password}}:any){
//             const data = await signUp({name,email,password})
//             return {data}
//         }
// }