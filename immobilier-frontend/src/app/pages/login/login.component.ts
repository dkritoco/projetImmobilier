import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  userRole: string | null = null;
  showOptions: boolean = false;
  selectedOption: string = 'achat';
  isConnected: boolean = false;

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    public login: LoginService
  ) {}

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

  formSubmit() {
    //console.log("imprima click en el boton de login");
    if (
      this.loginData.email.trim() == '' ||
      this.loginData.email.trim() == null
    ) {
      this.snack.open('Un e-mail est requis !!', 'Accepter', {
        duration: 5000,
      });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password.trim() == null
    ) {
      this.snack.open('Le mot de passe est obligatoire !!', 'Accepter', {
        duration: 5000,
      });
      return;
    }

    console.log(this.loginData);

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        this.loginService.loginUser(data);
        setTimeout(() => {
          this.loginService.getCurrentUser().subscribe((user: any) => {
            this.loginService.setUser(user);

            if (this.loginService.getUserRole() == 'ROLE_ADMINISTRATEUR') {
              this.router.navigate(['/chercher']);
              this.loginService.loginStatusSubjec.next(true);
            } else if (this.loginService.getUserRole() == 'ROLE_UTILISATEUR') {
              //DASHBOARD USER
          
              // window.location.href = '/user-dashboard';
              this.router.navigate(['/chercher']); // con esto me permite solo entrar por iniciar sesion y no por el enlace / admin
              this.loginService.loginStatusSubjec.next(true);
            } else {
        
              this.loginService.logout();
            }
          });
        }, 1000);
      },
      (error: any) => {
        console.log(error);
        this.snack.open('Inscription invalide ! réessayez', 'Accepter', {
          duration: 5000,
        });
        alert('Erreur lors de la génération du Token');
      }
    );
  }
}
