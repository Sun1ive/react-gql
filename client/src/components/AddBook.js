import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../queries';

class AddBook extends Component {
	state = {
		name: '',
		genre: '',
		authorId: ''
	};

	changeNameHandler = val => {
		const oldState = { ...this.state };
		oldState.name = val;
		this.setState(oldState);
	};

	changeGenreHandler = val => {
		const oldState = { ...this.state };
		oldState.genre = val;
		this.setState(oldState);
	};

	changeAuthorHandler = val => {
		const oldState = { ...this.state };
		oldState.authorId = val;
		this.setState(oldState);
	};

	submitFormHandler = e => {
		e.preventDefault();
		console.log(this.state);
		const { name, genre, authorId } = this.state;
		this.props.addBookMutation({
			variables: {
				name,
				genre,
				authorId
			}
		});
	};

	render() {
		let authors = <option disabled>Authors loading...</option>;
		if (this.props.getAuthorsQuery.authors) {
			authors = this.props.getAuthorsQuery.authors.map(author => (
				<option key={author.id} value={author.id}>
					{author.name}
				</option>
			));
		}
		return (
			<form onSubmit={e => this.submitFormHandler(e)}>
				<div className="field">
					<label>Book name:</label>
					<input
						type="text"
						onChange={e => this.changeNameHandler(e.target.value)}
					/>
				</div>
				<div className="field">
					<label>Genre:</label>
					<input
						type="text"
						onChange={e => this.changeGenreHandler(e.target.value)}
					/>
				</div>
				<div className="field">
					<label>Author:</label>
					<select onChange={e => this.changeAuthorHandler(e.target.value)}>
						<option>Select Author</option>
						{authors}
					</select>
				</div>
				<button>Add Book</button>
			</form>
		);
	}
}

export default compose(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
