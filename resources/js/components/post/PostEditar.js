import React from 'react'

class PostEditar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'title': '',
            'content': ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchPost();
    }

    fetchPost = () => {
        let postId = this.props.match.params.id;

        axios.get('/api/posts/' + postId)
            .then(response => {
                this.setState(response.data.post);
            });
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let post = {
            title: this.state.title,
            content: this.state.content
        }

        axios.put('/api/posts/' + this.state.id, post)
            .then(response => {
                alert('Post atualizado!');
            })
            .catch(error => {
                this.setPost({
                    errors: error.response.data.errors
                })
            });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="mt-5">
                                <h1>Post</h1>

                                <hr />

                                <div className="form-group">
                                    <input type="text" name="title" defaultValue={ this.state.title } onChange={this.handleChange} className="form-control" />
                                </div>

                                <br />

                                <div className="form-group">
                                    <textarea rows="3" name="content" className="form-control" defaultValue={ this.state.content } onChange={this.handleChange}></textarea>
                                </div>

                                <br />

                                <div className="text-center">
                                    <button type="submit" className="btn btn-outline-success">Salvar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostEditar;