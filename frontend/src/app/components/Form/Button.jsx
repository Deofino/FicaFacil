import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'
/**
 * @function ButtonComponent
 * @param onClick: callback -- realizada no click
 * @param type: string --submit, reset, button.
 * @param styleButton:JSX -- Estilo do botao
 * @param icon: JSX  -- icone do botao
 * @param children: string  -- texto do botao
 * @param isLoading: boolean -- Mostra botao em carregamento
 */
export default function CustomButton(props) {
    return (
        <Button
            className='c-button'
            variant='contained'
            color='primary'
            type={props.type}
            startIcon={props.isLoading ? <CircularProgress className='c-button__loading' size={25} /> : props.icon}
            onClick={props.onClick || null}
            style={props.styleButton || null}

        >
            {props.children}
        </Button>
    )
}