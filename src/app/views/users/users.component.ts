import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, debounceTime, map } from 'rxjs';
import { User } from '../../data/user';
import { UserService } from '../../service/user.service';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UserCardComponent,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private _filterValue = '';
  set filterValue(value: string) {
    this._filterValue = value;
    this.filter.next(value);
  }
  get filterValue() {
    return this._filterValue;
  }
  private filter = new BehaviorSubject<string>('');
  private filter$ = this.filter.pipe(debounceTime(5000));
  private users$ = this.userService.getUsers();

  public filteredUsers$ = combineLatest([this.users$, this.filter$]).pipe(
    map(([users, filter]) => this.filterUserByUserName(users, filter)),
  );

  public onUserSelected(username: string) {
    this.router.navigate([username], { relativeTo: this.activatedRoute });
  }

  private filterUserByUserName(users: User[], filter: string): User[] {
    return users.filter((user) => user.username.toLowerCase().includes(filter.toLowerCase()));
  }
}
