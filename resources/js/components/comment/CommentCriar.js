import React from 'react'

class CommentCriar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post_id: props.post_id,
            content: ''
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

        let _this = this;

        let comment = {
            content: this.state.content
        }

        axios.post('/api/posts/' + this.state.post_id + '/comments', comment)
            .then(response => {
                _this.setState({content: ''});

                _this.props.fetchComments();
            })
            .catch(error => {
                console.log(error);

                this.setPost({
                    errors: error.response.data.errors
                })
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="text-center">Novo Comentário</h1>

                        <hr />

                        <div className="form-group">
                            <textarea rows="3" name="content" className="form-control" placeholder="Content" value={this.state.content} onChange={this.handleChange}></textarea>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-outline-success">Salvar</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default CommentCriar;