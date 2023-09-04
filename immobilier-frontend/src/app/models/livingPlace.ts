import { ImageConfig } from "@angular/common";

export class LivingPlace {
  propertyId: number;
  realEstateType: string;
  price: number;
  numberOfRooms: number;
  houseSurface: number;
  parking: number;
  jpgphoto: string;
  address: string | ArrayBuffer;

  constructor(
    propertyId: number,
    realEstateType: string,
    price: number,
    numberOfRooms: number,
    houseSurface: number,
    parking: number,
    jpgphoto: string,
    address: string | ArrayBuffer
  ) {
    this.propertyId = propertyId;
    this.realEstateType = realEstateType;
    this.price = price;
    this.numberOfRooms = numberOfRooms;
    this.houseSurface = houseSurface;
    this.parking = parking;
    this.jpgphoto = jpgphoto;
    this.address = address;
  }
}
