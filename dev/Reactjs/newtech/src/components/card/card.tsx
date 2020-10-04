import React from "react";
import { Tag } from "../../globalStyles";
import "./card.css";

interface ICard {
    selected?: boolean,
    rest?: any,
    title: string,
    subtitle?: string,
    description?: string,
    tags?: { text: string, color?: string }[],
    onClick?: () => void,
}

function Card(props: ICard) {
    const { selected = false, title, subtitle, description, tags } = props;
    return (
        <div className={`card ${selected ? 'selected' : 'unselected'}`} onClick={props.onClick} >
            <div style={{ padding: 10 }} >
                <span className="title" >{title}</span>
                <br />
                <span className="subtitle" >{subtitle}</span>
                <br />
                {tags && tags.map((item, key) => {
                    if(item.text.length) {
                        return <Tag width={item.text.length * 10} color={item.color} float="left" >{item.text}</Tag>
                    }
                })}
                <br/><br/>
                <span className="description" >{description}</span>
            </div>
        </div>
    )
}

export default Card;