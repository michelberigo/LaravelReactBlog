import React from 'react'
import { Link } from 'react-router-dom'
import Comments from "../comment/Comments";

class PostVer extends React.Component {
    constructor(props) {
        super(props);

        let postId = this.props.match.params.id;

        this.state = {
            post: {
                id: postId,
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
        axios.get('/api/posts/' + this.state.post.id)
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
                            <h1 className="text-center">Post</h1>

                            <hr />

                            <div className="card">
                                <h5 className="card-header">{ this.state.post.title }</h5>

                                <div className="card-body">
                                    <p className="card-text">{ this.state.post.content }</p>
                                    
                                    <Link to={ this.state.post.id + '/edit' } className="btn btn-outline-primary" style={{ "marginRight": "5px" }}>Editar</Link>
                                    <button type="button" className="btn btn-outline-danger" onClick={ this.postExcluir }>Excluir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Comments post_id={ this.state.post.id } />
            </div>
        )
    }
}

export default PostVer;