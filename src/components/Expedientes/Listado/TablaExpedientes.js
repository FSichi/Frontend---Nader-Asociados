import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, TableFooter } from '@material-ui/core';
// import { Popover, Menu, FolderSharedOpenIcon, Position, TrashIcon } from 'evergreen-ui'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '30px 10px',
        maxWidth: 2000
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.90rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: '7px 15px',
        display: 'inline-block',
        fontFamily: 'Josefin Sans'
    }

}));

export const TablaExpedientes = ({ expedientes }) => {

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
        <div >
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table}>

                    <TableHead>
                        <TableRow>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>NUMERO EXP</TableCell>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>CARATULA</TableCell>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>ABOGADO GESTOR</TableCell>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>JUZGADO</TableCell>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>CANTIDAD CLIENTES</TableCell>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>TIPO DEMANDA</TableCell>
                            <TableCell className='text-center fw-bold' style={{ backgroundColor: 'black', color: 'white' }}>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className='bg-dark'>
                        {expedientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className='text-center' style={{ width: '180px' }}>
                                    <Typography
                                        className={classes.status}
                                        variant='h6'
                                        style={{
                                            backgroundColor: '#212529',
                                            fontSize: '20px',
                                            fontWeight: 'normal',
                                        }}
                                    >{row.numeroExp}</Typography>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Typography className='text-white' style={{ fontFamily: 'Josefin Sans' }} variant='h6'>{row.caratula}</Typography>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Typography
                                        className={classes.status}
                                        style={{
                                            backgroundColor:
                                                (
                                                    (row.abogadoGs === 'Micaela Frattura' && 'deepskyblue') ||
                                                    (row.abogadoGs === 'Belen Moya' && 'salmon')
                                                ),
                                            fontWeight: 'normal',
                                        }}
                                    >{row.abogadoGs}</Typography>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Typography className='text-white' style={{ fontFamily: 'Josefin Sans' }} variant='h6'>{row.juzgado}</Typography>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Typography className='text-white' style={{ fontFamily: 'Josefin Sans' }} variant='h6'>{row.cantidad}</Typography>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Typography
                                        className={classes.status}
                                        style={{
                                            backgroundColor:
                                                (
                                                    (row.tipoDemanda === 'Individual' && 'lightseagreen') ||
                                                    (row.tipoDemanda === 'Colectiva' && 'purple')
                                                ),
                                            fontWeight: 'normal',
                                        }}
                                    >{row.tipoDemanda}</Typography>
                                </TableCell>
                                <TableCell className='text-center'>

                                    <Link className='btn btn-outline-info' to={`/exp/${row.id}`}> Administrar </Link>

                                    {/* <Popover
                                        position={Position.BOTTOM_LEFT}
                                        content={
                                            <Menu>
                                                <Menu.Group>
                                                    <Menu.Item icon={FolderSharedOpenIcon}>
                                                        <Link to={`/exp/${row.id}`} style={{ textDecoration: 'none', color: 'black' }}>Visualizar</Link>
                                                    </Menu.Item>
                                                </Menu.Group>
                                                <Menu.Divider />
                                                <Menu.Group>
                                                    <Menu.Item icon={TrashIcon} intent="danger">
                                                        Eliminar
                                                    </Menu.Item>
                                                </Menu.Group>
                                            </Menu>
                                        }
                                    >
                                        <button className='btn'>
                                            <img src={`../assets/menu2.svg`} alt='Usuario' style={{ height: '20px', width: '20px' }} />
                                        </button>
                                    </Popover> */}
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 8, 10, 15]}
                            count={expedientes.length}
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


/*  */