export type ProvidersData = Record<string, Provider>

export type TripNormalize = Record<string, Trips>

export type Provider = {
  name: string
  dni: string
  trips: Trips[]
}

export type Trips = {
  origin: string
  amount: number
  RETE_FTE: number
  RETE_ICA: number
}