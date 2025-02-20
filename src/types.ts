export type ProvidersData = Record<string, Provider>

export type TripNormalize = Record<string, Trips>

export type allTrip = Record<string, Trips>

export type Provider = {
  name: string
  dni: string
  trips: Trips[]
}

export type Trips = {
  date: string
  license_plate: string
  origin: string
  remittance: number
  d_discount: number
  p_payment: number
  amount: number
  RETE_FTE: number
  RETE_ICA: number
  completed_date: string
  owner: string
  driver: string
  destiny: string
  STAND_BY: number
  advance: number
  CXP: number
  payment_date: string
}

//pto pago == pronto pago