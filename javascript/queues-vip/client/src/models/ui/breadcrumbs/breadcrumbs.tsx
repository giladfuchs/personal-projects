import React from 'react';
import BreadcrumbsStyle from './breadcrumbs.module.scss';
import { MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface OwnProps {
    title: string
}

export const Breadcrumbs: React.FC<OwnProps> = (props) => {
    return (
        <div className={BreadcrumbsStyle.Breadcrumbs}>
            <Link to="/admin">
                <MdHome />
            </Link>
            <span>|</span>
            <p className={BreadcrumbsStyle.Title}>{props.title}</p>

        </div>
    )
}


