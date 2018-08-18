import React, {Component, Fragment} from 'react';


export default class Levels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '/questions/1',
            question: '',
            answer: '',
            userAnswer: ''
        }
    }

    componentDidMount() {
        fetch(this.state.url).then(resp => {
            return resp.json();
        }).then((data) => {
            const question = data.question;
            const answer = data.answer;
            this.setState({
                question: question,
                answer: answer
            });
        }).catch(err => {
            console.log('Błąd', err);
        });

    }

    onChangeAnswer = (e) => {
        this.setState({
            userAnswer: e.target.value
        })
    };

    onSubmit = () => {
        let count = 1;
        if (this.state.answer === this.state.userAnswer) {
            this.setState({
                url: `/questions/${count+1}`
            });
            console.log(this.state.url);
        } else {
            console.log('błędna odpowiedź');
        }
    };


    render() {
        return (
            <Fragment>
                <div className='container'>
                    <h1>To jest ekran kolejnych zadań.</h1>
                    <h2>Przykładowe zadanie 1.</h2>
                    <div>
                        {this.state.question}
                    </div>
                    <input type="text" className="form-control" aria-label="Large"
                           aria-describedby="inputGroup-sizing-sm" onChange={this.onChangeAnswer}/>
                    <div className="input-group-append">
                        <button onClick={() => this.onSubmit()} className="btn btn-outline-secondary"
                                type="submit">Sprawdź
                        </button>
                    </div>
                </div>
            </Fragment>

        );

    }
}

