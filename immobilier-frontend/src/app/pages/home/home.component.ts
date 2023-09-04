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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userRole: string | null = null;
  showOptions: boolean = false;
  selectedOption: string = 'achat';
  isConnected: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    public login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cdRef.detectChanges();
    this.userRole = this.login.getUserRole();
    this.isConnected = this.login.isLoggedIn();
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

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    if (this.login.isLoggedIn()) {
      this.logout();
    }
  }

  public logout() {
    this.login.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }

  showContent(option: string) {
    this.selectedOption = option;
  }
}
