import React from "react";
import Table from "@material-ui/core/Table";
import axios from "axios";
import { AlertWarning } from "../Alert/Modal";
import { ToastSuccess, ToastError } from "../Alert/Toast";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
/**
 * @description Ira gerar automaticamente de acordo com os parametros uma tabela dinamica que podera excluir
 * @param {colunas}{ colunas = [
            field: 'id',
            headerName: 'ID',
            width: 80,
        ], linhas = [{refField='id}], tabela='nome da api chamada (controller)', className = '', nome='Nome do campo' }, style
 * @returns MaterialUI Table  
 */
export default function StickyHeadTable({
  colunas = [],
  linhas = [],
  tabela,
  className = "",
  nome,
  style,
}) {
  const functionDelete = (id = -1, tabela, nome) => {
    let conf = AlertWarning({
      title: "Cuidado...",
      text: "Deseja Mesmo deletar essa " + nome + "?",
      textButton1: "Sim!",
      textButton2: "Nao",
    });
    conf.then((v) => {
      if (v.isConfirmed) {
        axios
          .post(`${process.env.REACT_APP_API}/${tabela}/delete/${id}/`)
          .then((value) => {
            ToastSuccess({ text: nome + " deletada com sucesso" });
          })
          .catch((error) =>
            ToastError({ text: "Nao pode excluir por causa da Foreign Key" })
          );

        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    });
  };

  colunas = colunas.map((el) => {
    el.onClick = () => {};
    return el;
  });

  if (colunas[colunas.length - 1] !== "update") {
    colunas.push(
      {
        field: "delete",
        headerName: "Apagar",
        width: 150,
        className: "button delete",
        onClick: (ev, id) => functionDelete(id, tabela, nome),
      },
      {
        field: "update",
        headerName: "Modificar",
        className: "button update",
        width: 150,
        onClick: (ev, id) => console.log(id),
      }
    );
  }

  linhas = linhas.map((el) => {
    el.delete = "Excluir";
    el.update = "Atualizar";
    return el;
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <section className={"c-table " + className} style={style || null}>
      <TableContainer className={"c-table__container "}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="c-table__head">
            <TableRow>
              {colunas.map((column, i) => (
                <TableCell
                  key={i}
                  align={"center"}
                  style={{ maxWidth: column.width || 100 }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {linhas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={i}
                    className="c-table__row"
                  >
                    {colunas.map((column, i) => {
                      const value = row[column.field];
                      if (value !== "Excluir" || value !== "Atualizar") {
                        return (
                          <TableCell
                            key={i}
                            align={"center"}
                            style={{
                              maxWidth: column.width || 100,
                              overflow: "hidden",
                            }}
                            className={column.className || null}
                            onClick={(e) => column.onClick(e.target, row.id)}
                          >
                            {value}
                          </TableCell>
                        );
                      }
                      return null;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="c-table__navigation"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={linhas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </section>
  );
}
