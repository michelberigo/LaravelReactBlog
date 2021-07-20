import React from 'react'
import { Link } from 'react-router-dom'

class PostVer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                title: '',
                content: ''
            }
        };

        this.postExcluir = this.postExcluir.bind(this);
    }

    componentDidMount() {
        this.fetchPost();
    }

    fetchPost = () => {
        let postId = this.props.match.params.id;

        axios.get('/api/posts/' + postId)
            .then(response => {
                this.setState({post: response.data.post});
            });
    }

    postExcluir() {
        let confirm = window.confirm('Você deseja realmente excluir esse post?');

        if (confirm) {
            axios.delete('/api/posts/' + this.state.post.id)
                .then(response => {
                    alert('Post excluído com sucesso!');

                    this.props.history.push('/');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="mt-5">
                            <h1>Post</h1>

                            <hr />

                            <h3>{ this.state.post.title }</h3>

                            <p>{ this.state.post.content }</p>

                            <div>
                                <Link to={ this.state.post.id + '/edit' } className="btn btn-outline-primary" style={{ "marginRight": "5px" }}>Editar</Link>
                                <button type="button" className="btn btn-outline-danger" onClick={ this.postExcluir }>Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostVer;