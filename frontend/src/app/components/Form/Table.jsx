import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

export default function StickyHeadTable() {

    const [ questoes, setQuestoes ] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/questao/index/`)
            .then(value => { setQuestoes(value.data.data); })
            .catch(error => console.error(error));
    }, []);

    const colunas = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100,
            onClick: () => { }
        },
        {
            field: 'tituloQuestao',
            headerName: 'Titulo',
            width: 200,
            onClick: () => { }
        },
        {
            field: 'textoQuestao',
            headerName: 'Texto',
            width: 200,
            onClick: () => { }
        }, {
            field: 'imagemQuestao',
            headerName: 'Imagem',
            width: 200,
            onClick: () => { }
        },
        {
            field: 'delete',
            headerName: 'Apagar',
            width: 150,
            className: 'button delete',
            onClick: (ev, id) => console.log(id)
        },
        {
            field: 'update',
            headerName: 'Atualizar',
            className: 'button update',
            width: 150,
            onClick: (ev, id) => console.log(id)
        },
    ];
    const linhas = questoes.map(el => {
        return { id: el.idQuestao, tituloQuestao: el.tituloQuestao, textoQuestao: el.textoQuestao, imagemQuestao: el.imagensQuestao, delete: 'Apagar', update: 'Atualizar' };
    });
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <section className="c-table">
            <TableContainer className='c-table__container'>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead className='c-table__head'>
                        <TableRow>
                            { colunas.map((column, i) => (
                                <TableCell
                                    key={ i }
                                    align={ 'center' }
                                    style={ { width: column.width || 100, } }
                                >
                                    { column.headerName }
                                </TableCell>
                            )) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { linhas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={ -1 } key={ i } className='c-table__row'>
                                    { colunas.map((column, i) => {
                                        const value = row[ column.field ];
                                        return (
                                            <TableCell key={ i } align={ 'center' } className={ column.className || null } onClick={ (e) => column.onClick(e.target, row.id) }>
                                                { value }
                                            </TableCell>
                                        );
                                    }) }
                                </TableRow>
                            );
                        }) }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                className='c-table__navigation'
                rowsPerPageOptions={ [ 5, 10, 25 ] }
                component="div"
                count={ linhas.length }
                rowsPerPage={ rowsPerPage }
                page={ page }
                onPageChange={ handleChangePage }
                onRowsPerPageChange={ handleChangeRowsPerPage }
            />
        </section >
    );
}
