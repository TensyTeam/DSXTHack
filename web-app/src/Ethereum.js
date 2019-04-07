import React from 'react';

import { address, abi } from './sets'


export default class Ethereum extends React.Component {
    componentDidMount() {
		let web3 = window.web3

		if (typeof(web3) == 'undefined') {
			return console.log("Metamask is not installed")
		}

		let contract = web3.eth.contract(abi).at(address)

		// console.log(web3);
		// console.log(contract);

		function getTokens(user) {
			return new Promise(function(resolve, reject) {
				contract.getTokens.call(
					user,
					{gasPrice: web3.toWei(8.1, 'Gwei'), gas: 3000000},
					(err, res) => {
						if (err) {
							return console.log(err)
						}
						// console.log(res)
						resolve(res.c[0])
					}
				)
			})
		}
		
		getTokens('0xbE2D0109E4626B813980546B870CDaE4566CCa56').then(res => {
			console.log(res)
		})
	}

	render() {
		return (
			<div></div>
		)
	}
}