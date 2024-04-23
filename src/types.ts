export interface MarkerData {
  id: string,
  address: string,
  coordinates: [number, number],
  name: string,
  description: string,
}

export interface ModalPayload {
  marker: MarkerData,
  type: 'ADD' | 'EDIT' | 'REMOVE',
}
