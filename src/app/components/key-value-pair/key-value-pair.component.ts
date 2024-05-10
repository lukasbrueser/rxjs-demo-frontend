import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-key-value-pair',
  standalone: true,
  imports: [],
  templateUrl: './key-value-pair.component.html',
  styleUrl: './key-value-pair.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class KeyValuePairComponent {
  @HostBinding('class.key-value-pair') class = true;
}
