import React from "react";
import { Link } from "react-router-dom";

import "../assets/css/styles.css";


export const Cards = ({ items }) => {
    return (
        <>
            <div className="container">
                {items &&
                    items.map(({ id, name, image, types }) => {
                        return id ? (
                            <Link to={`/${id}`} key={id}>
                                <div className="post" >
                                    <div className="header_post">
                                        <img src={image} alt="" />
                                    </div>

                                    <div className="body_post">
                                        <div className="post_content">
                                            <h1>{name}</h1>
                                            <div className="container_infos">
                                                <div className="container_tags">
                                                    <span>Tipo:</span>
                                                    <div className="tags">
                                                        <ul>
                                                            {types &&
                                                                types.map((type, idx) => {
                                                                    return <li key={idx}>{type}</li>;
                                                                })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ) : null;
                    })}
            </div>
        </>
    );
}
