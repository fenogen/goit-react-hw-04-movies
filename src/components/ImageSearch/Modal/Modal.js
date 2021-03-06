import React, { Component } from 'react'
import style from './Modal.module.css';



export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.fnCloseEscape);
    }

    componentWillUnmount() { 
        window.removeEventListener('keydown', this.fnCloseEscape);
    }

    fnCloseEscape = (event) => {
        if (event.code === 'Escape') {
            this.props.fnTogleModal();
        }
    }

    fnCloseBackdrop = (event) => {
        // if (event.target === event.curentTarget) {   //----> Не срабатывает
        if (event.target.nodeName !== "IMG" ) {
            this.props.fnTogleModal();
        }
    }

    render() {
        return (
            <div className={style.modal__backdrop}
            onClick={this.fnCloseBackdrop}>
                <div className={style.modal__content}>{this.props.children}</div>
            </div>
        )
    }
}
