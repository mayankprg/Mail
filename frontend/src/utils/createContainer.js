import React from 'react';
import ContainerCSS from "./container.module.css";


export default function CreateContainer() {
    const prortalId = "notifyContainer";
    let element = document.getElementById(prortalId);

    if (element){
        return element;
    }

    element = document.createElement('div');
    element.setAttribute('id', prortalId);
    element.className = ContainerCSS.container;
    document.body.appendChild(element)
    return element;

}

