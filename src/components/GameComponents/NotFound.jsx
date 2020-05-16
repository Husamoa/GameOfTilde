import React, {Component} from "react";
import {Link} from 'react-router-dom';


class NotFound extends Component {
    render() {
        // const {name} = this.props;
        // let sheDo = name[name.length - 1] === 'a' ? 'zrobiła' : 'zrobił';
        return <div className='jumbotron text-center'>
            <h1 className='h1'>Błąd 404</h1>
            <h2 className='h2'>Oj nie ładnie! Nie masz jeszcze dostępu do tego poziomu. Tata nie lubi jak się oszukuje.</h2>
            <Link className='btn btn-info btn-lg' to={'/levels-progress'}>Powrót</Link>
        </div>
    }

};

export default NotFound;