import {
  Component,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userRole: string | null = null;
  showOptions: boolean = false;
  selectedOption: string = 'achat';

  constructor(
    private cdRef: ChangeDetectorRef,
    public login: LoginService,
    private router: Router
  ) {}

  isConnected: boolean = false;

  ngOnInit(): void {
    this.cdRef.detectChanges();
    this.userRole = this.login.getUserRole();
    console.log('userRole:', this.userRole);
    this.isConnected = this.login.isLoggedIn();
  }


  public logout() {
    this.login.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }


  toggleConnection(): void {
    this.isConnected = !this.isConnected;
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  redirectToRegistro() {
    this.router.navigate(['/login']); // Reemplaza 'registro' con la ruta a la página de registro
  }

  // Método para redirigir a la página de salida
  redirectToSalir() {
    this.router.navigate(['']); // Reemplaza 'salir' con la ruta a la página de salida
  }
}
