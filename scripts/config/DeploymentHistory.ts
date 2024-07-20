interface IDeploymentHistory {
	address: string
	proxyAdmin?: string
	tx?: string
	ether?: string
	implementation?: string
	initialized?: boolean
	addressesSet?: boolean
	collateralAdded?: boolean
	parametersSet?: boolean
}
