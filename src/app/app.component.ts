import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styles: [`
    @keyframes wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.wave-animation {
  display: inline-block;
  animation: wave 1.5s infinite ease-in-out;
}
    `],
})
export class AppComponent {
  title = 'echo-frontend';
  userService : UserService = inject(UserService);
  constructor(){
    const user = this.userService.getUserFromStorage();
    if(!user){
      const randomNumber = Math.ceil(Math.random() * 7000 + 1000);
      const randomName = `user_${randomNumber}`;
      this.userService.createUser(randomName)
      .subscribe(user => {
        console.log('User Created', user);
        this.userService.saveUserToStorage(user);
      })
    }
  }
}
