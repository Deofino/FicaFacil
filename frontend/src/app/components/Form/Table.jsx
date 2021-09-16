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
        },
        {
            field: 'tituloQuestao',
            headerName: 'Titulo',
            width: 200,
        },
        {
            field: 'textoQuestao',
            headerName: 'Texto',
            width: 200,
        }, {
            field: 'imagemQuestao',
            headerName: 'Imagem',
            width: 200,
        },
        {
            field: 'delete',
            headerName: 'Apagar',
            width: 150,
            onClick: (ev) => console.log(ev)
        },
        {
            field: 'update',
            headerName: 'Atualizar',
            width: 150,
            onClick: (ev) => console.log(ev)
        },
    ];
    const linhas = questoes.map(el => {
        return { id: el.idQuestao, tituloQuestao: el.tituloQuestao, textoQuestao: el.textoQuestao, imagemQuestao: el.imagensQuestao, delete: 'Apagar', update: 'Atualizar' };
    });
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <React.Fragment>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            { colunas.map((column, i) => (
                                <TableCell
                                    key={ i }
                                    align={ 'center' }
                                    style={ { width: column.width || 100 } }
                                >
                                    { column.headerName }
                                </TableCell>
                            )) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { linhas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={ -1 } key={ i }>
                                    { colunas.map((column, i) => {
                                        const value = row[ column.field ];
                                        return (
                                            <TableCell key={ i } align={ 'center' } onClick={ (e) => column.onClick(e.target) || null }>
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
                rowsPerPageOptions={ [ 10, 25, 50 ] }
                component="div"
                count={ linhas.length }
                rowsPerPage={ rowsPerPage }
                page={ page }
                onPageChange={ handleChangePage }
                onRowsPerPageChange={ handleChangeRowsPerPage }
            />
        </React.Fragment>
    );
}
