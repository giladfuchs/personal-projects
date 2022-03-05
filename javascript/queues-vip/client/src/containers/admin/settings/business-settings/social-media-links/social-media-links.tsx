import React from 'react';
import SocialMediaLinksStyle from './social-media-links.module.scss'
import * as language from '../../../../../assets/language/language';

import { AiOutlineLink } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

interface OwnProps {
    Links: any,
    // Links: { [key: string]: string },
    onChange: (e: any, name: string) => void,
    style?: {},
    iconColor?: string
}

const SocialMediaLinks: React.FC<OwnProps> = (props) => {
    return (
        <div className={SocialMediaLinksStyle.Links} style={props.style}>
            <div className={SocialMediaLinksStyle.Link}>
                <AiOutlineLink color={props.iconColor} />
                <input
                    type="url"
                    name="website"
                    id="website"
                    value={props.Links["website"]}
                    placeholder={" " + language.website[1]}
                    onChange={(e) => props.onChange(e, "website")}
                />
            </div>

            <div className={SocialMediaLinksStyle.Link}>
                <FaFacebookF color={props.iconColor} />
                <input
                    type="url"
                    name="facebook"
                    id="facebook"
                    value={props.Links["facebook"]}
                    placeholder={" " + language.facebook[1]}
                    onChange={(e) => props.onChange(e, "facebook")}
                />
            </div>

            <div className={SocialMediaLinksStyle.Link}>
                <FaInstagram color={props.iconColor} />
                <input
                    type="url"
                    name="instagram"
                    id="instagram"
                    value={props.Links["instagram"]}
                    placeholder={" " + language.instagram[1]}
                    onChange={(e) => props.onChange(e, "instagram")}
                />
            </div>
        </div>
    )
}

export default SocialMediaLinks;