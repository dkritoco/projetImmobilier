import { Component, OnInit } from '@angular/core';
import { LivingPlace } from 'src/app/models/livingPlace';
import { ChercherService } from 'src/app/services/chercher.service';
import { LoginService } from 'src/app/services/login.service'; 

@Component({
  selector: 'app-chercher',
  templateUrl: './chercher.component.html',
  styleUrls: ['./chercher.component.css'],
})
export class ChercherComponent implements OnInit {
  livingPlace: LivingPlace[] = [];
  filteredLivingPlace: LivingPlace[] = [];

  selectedCity: string = 'Tout'; // Opción de ciudad seleccionada
  selectedTransaction: string = 'Tout'; // Opción de transacción seleccionada
  isAdmin: boolean = false;

  constructor(
    private chercherService: ChercherService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loadLivingPlaceData();
    this.isAdmin = this.loginService.getUserRole() === 'ROLE_ADMINISTRATEUR';
    console.log('isAdmin:', this.isAdmin);
  }

  loadLivingPlaceData(): void {
    this.chercherService.getChercher().subscribe((data: any[]) => {
      this.livingPlace = data.map((item) => this.createLivingPlace(item));
      this.filteredLivingPlace = this.livingPlace;
    });
  }

  onSearchOptionChange(option: string, isCityOption: boolean): void {
    if (isCityOption) {
      this.selectedCity = option;
      if (this.selectedCity !== 'Tout' && this.selectedTransaction === 'Tout') {
        this.filterLivingPlaceByCity(this.selectedCity);
      } else {
        this.filterLivingPlace();
      }
    } else {
      this.selectedTransaction = option;
      this.selectedCity = 'Tout'; // Reiniciamos la selección de ciudad
      this.filterLivingPlace();
    }
  }

  filterLivingPlaceByCity(city: string): void {
    this.chercherService
      .getChercherParameterVille(city)
      .subscribe((data: any[]) => {
        this.filteredLivingPlace = data.map((item) =>
          this.createLivingPlace(item)
        );
      });
  }

  filterLivingPlace(): void {
    if (this.selectedCity === 'Tout' && this.selectedTransaction === 'Tout') {
      this.loadLivingPlaceData();
    } else if (
      this.selectedCity !== 'Tout' &&
      this.selectedTransaction === 'Tout'
    ) {
      this.chercherService
        .getChercherParameterVille(this.selectedCity)
        .subscribe((data: any[]) => {
          this.filteredLivingPlace = data.map((item) =>
            this.createLivingPlace(item)
          );
        });
    } else if (
      this.selectedCity === 'Tout' &&
      this.selectedTransaction !== 'Tout'
    ) {
      this.chercherService
        .getChercherParameter(this.selectedTransaction)
        .subscribe((data: any[]) => {
          this.filteredLivingPlace = data.map((item) =>
            this.createLivingPlace(item)
          );
        });
    } else {
      this.loadLivingPlaceData();
      // this.chercherService
      //   .getChercherParameterAll(this.selectedCity, this.selectedTransaction)
      //   .subscribe((data: any[]) => {
      //     this.filteredLivingPlace = data.map((item) =>
      //       this.createLivingPlace(item)
      //     );
      //   });
    }
  }

  private createLivingPlace(item: any): LivingPlace {
    return new LivingPlace(
      item[0], // propertyId
      item[1], // realEstateType
      item[2], // address
      item[3], // price
      item[4], // numberOfRooms
      item[5], // houseSurface
      item[6], // parking
      item[7] // jpgphoto
    );
  }


  deleteProperty() {
    // Lógica para eliminar la propiedad con el ID proporcionado
    console.log('Eliminar propiedad con ID:');
  }

  updateProperty() {
    // Lógica para actualizar la propiedad con el ID proporcionado
    console.log('Actualizar propiedad con ID:');
  }

  insertProperty() {
    // Lógica para insertar una nueva propiedad
    console.log('Insertar propiedad');
  }
}

// ngOnInit(): void {
//   this.chercherService.getChercher().subscribe((data: LivingPlace[]) => {
//     this.livingPlace = data;
//     console.log('datos de livingplace ' + data);
//   });
// }
// async ngOnInit(): Promise<void> {
//   this.chercherService.getChercher().subscribe(async (data: any[]) => {
//     this.livingPlace = await Promise.all(
//       data.map(async (item) => {
//         return new LivingPlace(
//           item[0], // propertyId
//           item[1], // realEstateType
//           item[2], // address
//           item[3], // price
//           item[4], // numberOfRooms
//           item[5], // houseSurface
//           item[6], // parking
//           await this.decodeImage(item[7]) // jpgphoto
//         );
//       })
//     );
//     console.log('datos de livingplace ', this.livingPlace);
//   });
// }

// async decodeImage(imageData: any): Promise<string | ArrayBuffer> {
//   if (typeof imageData === 'string') {
//     return imageData; // Si es una URL de imagen, simplemente la retornamos
//   } else if (imageData instanceof Blob) {
//     try {
//       const base64String = await this.blobToBase64(imageData);
//       return base64String; // Retorna la cadena base64 decodificada
//     } catch (error) {
//       console.error('Error al decodificar imagen:', error);
//       return ''; // En caso de error, retorna una cadena vacía
//     }
//   } else {
//     return ''; // Retornar una cadena vacía si no se puede decodificar
//   }
// }

// private blobToBase64(blob: Blob): Promise<string> {
//   return new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const base64String = reader.result as string;
//       resolve(base64String);
//     };
//     reader.onerror = (error) => {
//       reject(error);
//     };
//     reader.readAsDataURL(blob);
//   });
// }
