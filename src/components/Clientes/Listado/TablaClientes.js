import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    TableFooter,
} from '@material-ui/core';

// import { Popover, Menu, PeopleIcon, EditIcon, Position, TrashIcon } from 'evergreen-ui'
import { Popover, Menu, PeopleIcon, EditIcon, Position } from 'evergreen-ui'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '30px 10px',
        maxWidth: 2000,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: theme.palette.getContrastText(theme.palette.primary.dark),
    },
    avatar: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.light),
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark,
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.90rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: '7px 15px',
        display: 'inline-block',
        fontFamily: 'Josefin Sans',
    }
}));

export const TablaClientes = ({ clientes }) => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>CUIT/CUIL</TableCell>
                            <TableCell className={classes.tableHeaderCell}>NOMBRE</TableCell>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>EMPRESA</TableCell>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>TIPO DE CESE</TableCell>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='bg-dark'>
                        {clientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className='text-center'>
                                    <Typography
                                        className={classes.status}
                                        variant='h6'
                                        style={{
                                            backgroundColor: '#212529',
                                            fontSize: '20px',
                                            fontWeight: 'normal',
                                        }}
                                    >{row.cuit_cuil}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className='text-white' style={{ fontFamily: 'Josefin Sans' }} variant='h6'>{row.apellidoyNombre}</Typography>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Typography
                                        className={classes.status}
                                        style={{
                                            backgroundColor:
                                                (
                                                    (row.callCenter === 'TELEPERFORMANCE' && 'lightseagreen') ||
                                                    (row.callCenter === 'AEGIS' && 'deepskyblue') ||
                                                    (row.callCenter === 'ATENTO' && 'purple') ||
                                                    (row.callCenter === 'OTRO' && 'salmon')
                                                ),
                                            fontWeight: 'normal',
                                        }}
                                    >{row.callCenter}</Typography>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Typography
                                        className={classes.status}
                                        style={{
                                            backgroundColor: '#212529',
                                            fontWeight: 'normal',
                                            fontSize: '16px'
                                        }}
                                    >
                                        {
                                            (row.tipoCese === 'INDUCCION A LA RENUNCIA CON GR')
                                                ?
                                                ('INDUCCION A LA RENUNCIA')
                                                :
                                                (row.tipoCese)
                                        }
                                    </Typography>
                                </TableCell>
                                <TableCell className=' text-center'>

                                    {/* <Link className='btn btn-outline-info' to={`/cli/${row.id}`}> Administrar </Link> */}

                                    <Popover
                                        position={Position.BOTTOM_LEFT}
                                        content={
                                            <Menu>
                                                <Menu.Group>
                                                    <Menu.Item icon={PeopleIcon}>
                                                        <Link to={`/cli/${row.id}`} style={{ textDecoration: 'none', color: 'black' }}>Visualizar</Link>
                                                    </Menu.Item>
                                                    <Menu.Divider />
                                                    <Menu.Item icon={EditIcon}>
                                                        <Link to={`/cli/${row.id}/edit`} style={{ textDecoration: 'none', color: 'black' }}>Editar</Link>
                                                    </Menu.Item>
                                                </Menu.Group>
                                                <Menu.Divider />
                                                {/* <Menu.Group>
                                                    <Menu.Item icon={TrashIcon} intent="danger">
                                                        Eliminar
                                                    </Menu.Item>
                                                </Menu.Group> */}
                                            </Menu>
                                        }
                                    >
                                        <button className='btn '>
                                            <img src={`../assets/menu2.svg`} alt='Usuario' style={{ height: '20px', width: '20px' }} />
                                        </button>
                                    </Popover>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 8, 10, 15]}

                            count={clientes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>

        </div>

    )
}
