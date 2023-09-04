import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public user = {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private snack: MatSnackBar) {} //se inyecta en el constructor

  formSubmit() {
    console.log(this.user);
    if (this.user.email == '' || this.user.email == null) {
      this.snack.open('E-mail est requis!!', 'Accepter', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    this.userService.enregistrerUtilisateur(this.user).subscribe(
      (response: any) => {
        console.log(response);
        alert('Utilisateur créé ');
        Swal.fire(
          'utilisateur enregistré avec succès dans le système',
          'success'
        );
      },
      (error) => {
        console.log(error);
        if (error.status === 400) {
          this.snack.open('Utilisateur déjà enregistré!!', 'Accepter', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        } else {
          this.snack.open('Erreur dans le système!!', 'Accepter', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      }
    );
  }
}
