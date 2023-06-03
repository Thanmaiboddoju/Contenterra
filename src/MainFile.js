import React, { useState, useEffect } from 'react';
import "./MainFile.css"
import ReactShowMoreText from 'react-show-more-text';
import Link from '@mui/material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LinkIcon from '@mui/icons-material/Link';
const MainFile = () => {
    const [info, setinfo] = useState([]);
    useEffect(() => {
        fetch("https://www.reddit.com/r/reactjs.json")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data.children);
                if (data && data.data && data.data.children) {
                    let sampleinfo = data.data.children

                    setinfo(sampleinfo);
                }
            })
    }, []);
    const convertStringToHTML = (htmlString) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(htmlString, 'text/html');
        // document.getElementById("html_text").innerHTML = html.body
        return html.body;
    }
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
    const executeOnClick = () => {
        console.log("Executed")
    }
    return (

        <div>
            <div className='nav_bar'>Contenterra Assignment</div> <br></br>
            <div className='container'>
                <div className='main_division' style={{ display: 'flex', justifyContent: "space-evenly", gap: "32px" }}>

                    {
                        info &&
                        info.map((o, index) => {
                            return (
                                <div className="card_design"
                                >
                                    <div className='card_title_division'>
                                        <div className='card_title'>{o?.data?.title}</div>
                                    </div>


                                    <div className='card_details_division'>
                                        {/* <p className="html_text">{convertStringToHTML(o?.data?.selftext_html)}</p> */}
                                        {o?.data?.selftext ?
                                            <ReactShowMoreText
                                                /* Default options */
                                                lines={7}
                                                less="Show more"
                                                more="Show less"
                                                className="content-css"
                                                anchorClass="show-more-less-clickable"
                                                onClick={executeOnClick}
                                                expanded={true}
                                                width={280}
                                                maxHeight={100}
                                            // truncatedEndingComponent={"... "}
                                            >
                                                <p className='card_text'>{o?.data?.selftext}</p>
                                            </ReactShowMoreText> : <p>Click the link icon below to get info</p>}
                                        <div className='shape-pentagon'><VisibilityIcon sx={{ color: 'black' }} />
                                            <div>{o?.data?.score}</div></div>
                                        <div className='link_division'>
                                            <a href={o?.data?.url} className='text_link '>
                                                <LinkIcon className='link_icon' sx={{ color: '#0c1421' }} />
                                                {/* <div className='App-link card_text button_view_more'>
                                                    Link<LinkIcon className='link_icon' />
                                                </div> */}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    );
}

export default MainFile;
