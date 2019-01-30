import React from 'react';
import './button.css';

const TYPES = {
    PRIMARY: 'primary',
    WARNING: 'warning',
    DANGER: 'danger',
    SUCCESS: 'success',
}

const Button = ({ text, onClick, type }) => {
    <button
        type = {type}
        onClick = {onClick}
        className = "custom-buttom"   
    >
       {text}
    </button>
}