import { ChainId } from '../constants/chain'

const CHAIN_GRAPHQL_URL: Record<number, string> = {
  [ChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  [ChainId.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
}

const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json'
}

const postQuery = async (endpoint: string, query: string) => {
  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query })
  }
  const response = await fetch(endpoint, options)
  const data = await response.json()
  if (data.errors) {
    throw new Error(data.errors[0].message)
  } else {
    return data
  }
}

export type StakeCount = {
  id: string
  count: string
  unClaimEpoch: string
}

export async function getSingleNameInfo(networkId: ChainId, name: string): Promise<StakeCount[] | undefined> {
  if (!networkId || !name) return undefined
  const query = `
  query singleName($name: String) {
    singleName(name: $name) {
      ...NodeFields
      revealDate
      registrationDate
      migrationStartDate
      currentBlockDate
      transferEndDate
      gracePeriodEndDate
      value
      highestBid
      state
      stateError
      price
      rent
      referralFeePPM
      available
      expiryTime
      deedOwner
      registrant
      isNewRegistrar
      isDNSRegistrar
      dnsOwner
    }
  }
`

  try {
    const response = await postQuery(CHAIN_GRAPHQL_URL[networkId], query)
    return response.data
  } catch (error) {
    return undefined
  }
}

export default getSingleNameInfo
