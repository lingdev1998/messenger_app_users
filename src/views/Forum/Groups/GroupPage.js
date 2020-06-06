import React, { Component, useParams, useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import Posts from '../Post/Posts'
export const GroupPage = (props) => {

    useEffect(() => {

    }, [props.match.params.id]);
    return (
        <div className="col-12 group-page">
 
            <div className="row no-gutters">
 
                <div className="col-12">
                    <Posts id={props.match.params.id} />
                </div>
             </div>
        </div>


    );
}

export default GroupPage;