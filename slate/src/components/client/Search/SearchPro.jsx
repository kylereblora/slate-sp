import React, { Component } from 'react'
import _ from 'lodash'
import { Search } from 'semantic-ui-react'


export class SearchPro extends Component {

	state = {
		isLoading : false,
		value : '',
		results : []
	}

	resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

	handleResultSelect = (e, { result }) => window.location.href = '/profile/' + result.key

	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value })
	
		setTimeout(() => {
			if (this.state.value.length < 1) return this.resetComponent()
	
		  	const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
	    	const res = [];
		  
			this.props.source.forEach(pro => {
				if (re.test(pro.firstName + ' ' + pro.lastName)  &&
				   (pro.occupation === 'Architect' ||  pro.occupation === 'Interior Designer') === true) 
				   
				   res.push({
					   key: pro.id, 
					   title: pro.firstName + ' ' + pro.lastName,
					   description: pro.occupation,
					});
			});
			
			this.setState({
				isLoading: false,
				results: res
		  	})
		}, 300)
	  }

	render() {
		const { isLoading, value, results } = this.state
		return (
			<Search
				loading={isLoading}
				onResultSelect={this.handleResultSelect}
				onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
				results={results}
				value={value}
				{...this.props}
			/>
		)
	}
}

export default SearchPro
