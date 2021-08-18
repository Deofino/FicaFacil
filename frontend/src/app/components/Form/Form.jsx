import React, { useState } from 'react';
import { Button, Input, Checkbox, Select, MenuItem, Radio, RadioGroup } from './index';
// import { FaEye } from 'react-icons/fa';
export default function Form() {

    const [Checked, setChecked] = useState(false);
    const items = [
        { value: 10, label: 'Dez' },
        { value: 20, label: 'Vinte' },
        { value: 30, label: 'Trinta' },
        { value: 40, label: 'Quarenta' },
        { value: 50, label: 'Cinquenta' },

    ];
    return (
        <form action='#' className='c-form ' method='GET'>
            <h1 className='c-form__headline'>Formulario</h1>
            <p className='c-form__text'>Preencha todos os campos corretamente.</p>
            <div className="c-form__item">
                <Input title='Nome: ' />
            </div>
            <div className="c-form__item">
                <Input title='E-mail: ' />
            </div>
            <div className="c-form__item">
                <RadioGroup>
                    <Radio label='Masculindsadasdasdasdasdasdasasddasdasdasadsdsadsadaso' value='1' />
                    <Radio label='Feminino' value='2' />
                </RadioGroup>
            </div>
            <div className="c-form__item">
                <Select label='Categoria:'>
                    {items.map(e => <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)}
                </Select>
            </div>
            <div className="c-form__item">
                <Checkbox onChange={() => setChecked(!Checked)} isChecked={Checked}>Voce aceita os termos</Checkbox>
            </div>
            <div className="c-form__item ">
                <Button>Cadastrar</Button>
            </div>
        </form >
    );
}