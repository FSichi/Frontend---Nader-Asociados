import { types } from "../types/types";
// import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { firebase } from '../firebase/firebase-config'
import Swal from "sweetalert2";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-start',
                    showConfirmButton: false,
                    timer: 2500,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Inicio de Sesion Exitoso'
                });

                dispatch(login(user.uid, user.displayName));
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Fail', e.message, 'error');
            });
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name });

                // console.log(user);

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-start',
                    showConfirmButton: false,
                    timer: 2500,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Registro de Usuario e Inicio de Sesion Exitoso'
                })

                dispatch(login(user.uid, user.displayName));
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Fail', e.message, 'error');
            })
    }
}

/* export const startGoogleLogin = () => {

    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                // console.log(user);
                dispatch(login(user.uid, user.displayName))
            })
            .catch(function (error) {
                console.log(error.message, 7000);
            });
    }
} */

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    }
});

export const startLogOut = () => {

    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logOut());
    }
}

const logOut = () => ({
    type: types.logout
})