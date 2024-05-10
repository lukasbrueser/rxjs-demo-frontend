import { Pipe, PipeTransform } from '@angular/core';
import { EyeColor } from '../data/user';

@Pipe({
  name: 'eyeColorEnum',
  standalone: true,
})
export class EyeColorEnumPipe implements PipeTransform {
  transform(value: EyeColor): string {
    switch (value) {
      case EyeColor.Blue:
        return 'Blue';
      case EyeColor.Gray:
        return 'Gray';
      case EyeColor.Brown:
        return 'Brows';
      case EyeColor.Green:
        return 'Green';
      case EyeColor.Hazel:
        return 'Hazel';
      default:
        return 'Unknown';
    }
  }
}
