import React from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            pageCount: 1,
            currentPage: 1
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        axios.get('/api/posts', {
            params: {
                page: this.state.currentPage
            }
        })
        .then(response => {
            this.setState({
                posts: response.data.posts.data,
                pageCount: response.data.posts.last_page,
                currentPage: response.data.posts.current_page
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    renderPost(post) {
        return (
            <div className="mb-5" key={ post.id }>
                <div className="card">
                    <h5 className="card-header">{ post.title }</h5>

                    <div className="card-body">
                        <p className="card-text">{ post.content }</p>
                        <Link to={ "posts/" + post.id } className="btn btn-outline-info">Link para abrir</Link>
                    </div>
                </div>
            </div>
        )
    }

    async handlePageClick(data) {
        let page = data.selected + 1;

        await this.setState({currentPage: page});

		this.fetchPosts();
	}

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="mt-5">
                            <h1 className="text-center">Todas as Postagens</h1>

                            <Link to="posts/create" className="btn btn-outline-success">Novo Post</Link>

                            <hr />

                            { this.state.posts.map(this.renderPost) }

                            <ReactPaginate
                                pageCount = { this.state.pageCount }
                                previousLabel = "Previous"
                                nextLabel = "Next"
                                breakClassName = "page-item"
                                breakLinkClassName = "page-link"
                                onPageChange= { this.handlePageClick }
                                containerClassName = "pagination"
                                pageClassName = "page-item"
                                pageLinkClassName = "page-link"
                                activeClassName = "active"
                                previousClassName = "page-item"
                                previousLinkClassName = "page-link"
                                nextLinkClassName = "page-link"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Posts;