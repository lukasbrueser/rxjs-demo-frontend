import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { KeyValuePairComponent } from '../../../../components/key-value-pair/key-value-pair.component';
import { User } from '../../../../data/user';
import { EyeColorEnumPipe } from '../../../../enums/eye-color-enum.pipe';

@Component({
  selector: 'app-user-details-card',
  standalone: true,
  imports: [CommonModule, KeyValuePairComponent, EyeColorEnumPipe],
  templateUrl: './user-details-card.component.html',
  styleUrl: './user-details-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsCardComponent {
  @HostBinding('class.user-details-card') private class = true;
  @Input() user?: User;
}
