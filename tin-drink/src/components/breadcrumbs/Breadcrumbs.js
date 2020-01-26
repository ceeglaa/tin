import React from 'react'
import './Breadcrumbs.css'

class Breadcrumbs extends React.Component {

    state = {
        path: []
    }

    componentDidMount () {
        console.log('INSIDE BREACRUMB')
        this.setState({
            path: this.props.path
        })
    }

    render () {
        console.log(this.state.path)
        return (
        <ul className="breadcrumb">
            {this.state.path.map((i, index) => {
                return (
                    <li key={index}><a href={i.link}>{i.title}</a> </li>
                )
            })}
        </ul>
        )
    }
}

export default Breadcrumbs;
