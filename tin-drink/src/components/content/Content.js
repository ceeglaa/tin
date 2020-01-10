import React from 'react'
import './Content.css'
import Sidebar from './sidebar/Sidebar'

function Content() {
    return (
        <div className="content">
            <div className="sidebar-pos">
                <Sidebar />
            </div>
        </div>
    )
}

export default Content;