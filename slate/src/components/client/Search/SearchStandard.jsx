import React, { Component } from 'react'
import _ from 'lodash'
import { Search, Label } from 'semantic-ui-react'


			
const resultRenderer = ({ itemName, itemPrice }) => <Label content={itemName} />

export class SearchStandard extends Component {

	state = {
		isLoading : false,
		value : '',
		results : []
	}

	resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

	handleResultSelect = (e, { result }) => this.setState({ value: result.itemName })

	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value })
	
		setTimeout(() => {
		  if (this.state.value.length < 1) return this.resetComponent()
	
		  const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
		  const isMatch = result => re.test(result.itemName)
	
		  this.setState({
			isLoading: false,
			results: _.filter(this.props.source, isMatch),
		  })
		}, 300)
	  }

	render() {
		const { isLoading, value, results } = this.state
		const { source } = this.props
		return (
			<Search
				loading={isLoading}
				onResultSelect={this.handleResultSelect}
				onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
				results={results}
				value={value}
				resultRenderer={resultRenderer}
				{...this.props}
			/>
		)
	}
}

export default SearchStandard
