import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  OperatorFunction,
  catchError,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs';
import { fadeAnimation } from '../../../animations/fade';
import { ProblemDetails } from '../../../data/problemDetails';
import { UserService } from '../../../service/user.service';
import { UserDetailsCardComponent } from './user-details-card/user-details-card.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [UserDetailsCardComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);

  private loading = new BehaviorSubject<boolean>(true);
  public loading$ = this.loading.pipe(
    distinctUntilChanged(),
    throttleTime(300, undefined, { leading: true, trailing: true }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  private username$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('username')),
    filter((username) => !!username) as OperatorFunction<string | null, string>,
  );
  public user$ = this.username$.pipe(
    tap(() => this.loading.next(true)),
    tap(() => (this.error = undefined)),
    switchMap((username) =>
      this.userService.getUser(username).pipe(
        catchError((err) => {
          this.error = err.error;
          return of(undefined);
        }),
      ),
    ),
    tap(() => this.loading.next(false)),
    startWith(undefined),
  );

  vm$ = combineLatest([this.user$, this.loading$]).pipe(
    map(([user, loading]) => ({ user, loading })),
  );

  public error?: ProblemDetails;
}
