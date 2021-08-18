import React from 'react'

/**
 * @param {Main}
 * @props {style} - style inline para a Main
 * @props {children} - Componentes filhos dentro de Main 
 */
export default function Main(props) {
    return (
        <main className='l-main shadow radius' style={props.style || null}>
            {props.children}
        </main>
    )
}