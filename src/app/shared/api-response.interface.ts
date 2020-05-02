export interface createParkingResponse {
  success: number;
  message?: string;
  data?: Array<any>
}

export interface CreateParkingLot {
  slots: number
}