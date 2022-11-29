import axios from "axios";
import Swal from "sweetalert2";
import { getClientesByID } from "./Clientes";

export const getClienteDeleteState = async (id, clientes) => {

    const cliente = getClientesByID(id, clientes);

    await axios.get(`https://backend-nader.herokuapp.com/clientes/estados/${cliente.cuit_cuil}`).then((resp) => {
        if (resp.data.estadoOperacion === 'En Telegramas') {
            console.log('Entre a True');
            return true
        } else {
            console.log('Entre a False');
            return false;
        }
    });

}

export const deleteCliente = (id, cc_cliente) => {

    Swal.fire({
        title: '¿Estas Seguro?',
        text: "Esto Eliminara Permanentemente al Cliente y todos sus datos asociados. Esta accion no se puede revertir.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#41B883',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {

            axios.delete(`https://backend-nader.herokuapp.com/clientes/${id}`).then((response) => {

                axios.delete(`https://backend-nader.herokuapp.com/clientes/estados/${cc_cliente}`).then((response) => {

                    axios.delete(`https://backend-nader.herokuapp.com/clientes/firmas/${cc_cliente}`).then((response) => {

                        axios.delete(`https://backend-nader.herokuapp.com/clientes/telegramas/${cc_cliente}`).then((response) => {

                            Swal.fire({
                                title: 'Cliente Eliminado con Exito',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Continuar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            })


                        });

                    });

                });

            });
        }
    })

    return
}