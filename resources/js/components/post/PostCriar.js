import React from 'react'

class PostCriar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'title': '',
            'content': ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        axios.post('/api/posts', post)
            .then(response => {
                this.props.history.push('/posts/' + response.data.post.id);
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    render() {
        return (
            <div className="container">
                <form id="form_post_criar" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="mt-5">
                                <h1 className="text-center">Novo Post</h1>

                                <hr />

                                <div className="form-group">
                                    <input type="text" name="title" className="form-control" placeholder="Title" value={this.state.title} onChange={this.handleChange} />
                                </div>

                                <br />

                                <div className="form-group">
                                    <textarea rows="5" name="content" className="form-control" placeholder="Content" value={this.state.content} onChange={this.handleChange}></textarea>
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

export default PostCriar;