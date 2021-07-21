import React from 'react'
import CommentCriar from "./CommentCriar"

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post_id: props.post_id,
            comments: []
        };

        this.fetchComments = this.fetchComments.bind(this);
        this.renderComment = this.renderComment.bind(this);
        this.commentExcluir = this.commentExcluir.bind(this);
    }

    componentDidMount() {
        this.fetchComments();
    }

    fetchComments() {
        axios.get('/api/posts/' + this.state.post_id + '/comments/')
            .then(response => {
                this.setState({
                    comments: response.data.comments,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    commentExcluir(comment) {
        let confirm = window.confirm('Você deseja realmente excluir esse comentário?');

        if (confirm) {
            let _this = this;

            axios.delete('/api/posts/' + this.state.post_id + '/comments/' + comment.id)
                .then(response => {
                    alert('Comentário excluído com sucesso!');

                    _this.fetchComments();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    renderComment(comment) {
        return (
            <div className="mb-5" key={ comment.id }>
                <div className="card">
                    <h5 className="card-header">Comentário #{ comment.id }</h5>

                    <div className="card-body">
                        <p className="card-text">{ comment.content }</p>
                        <button type="button" className="btn btn-outline-danger" onClick={ () => { this.commentExcluir(comment) } }>Excluir</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="mt-5">
                <CommentCriar post_id={ this.state.post_id } fetchComments={ this.fetchComments }/>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="mt-5">
                            <h1 className="text-center">Todos os Comentários</h1>

                            <hr />

                            { this.state.comments.map(this.renderComment) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comments;