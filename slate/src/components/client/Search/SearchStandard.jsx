import React, { Component } from 'react'
import _ from 'lodash'
import { Search } from 'semantic-ui-react'
import './search.css'

export class SearchStandard extends Component {

	state = {
		isLoading : false,
		value : '',
		results : []
	}

	resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

	handleResultSelect = (e, { result }) => window.location.href = '/item/' + result.description + '/' + result.key

	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value })
	
		setTimeout(() => {
		  if (this.state.value.length < 1) return this.resetComponent()
		  
		  const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
			const res = [];
			
			this.props.source.forEach(item => {
				if (re.test(item.itemName) === true) 
					res.push({
						key: item.id, 
						title: item.itemName, 
						price: '₱' + item.itemPrice, 
						description: item.itemCategory,
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

export default SearchStandard
