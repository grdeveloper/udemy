import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-process-image',
  templateUrl: './process-image.component.html',
  styleUrls: ['./process-image.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ProcessImageComponent,
      multi: true
    }
  ]
})
export class ProcessImageComponent implements ControlValueAccessor {
  @Input() image: string = '';

  @HostListener('change', ['$event.target.files']) onSelectImage(fileList: FileList): void {
    const reader = new FileReader();
    const selectedFile = fileList.item(0);

    this.onChange(selectedFile!);
    reader.readAsDataURL(selectedFile!);
    reader.onloadend = () => this.image = reader.result as string;
  }

  @ViewChild('imageEl', { static: true }) fileInput: ElementRef | undefined;

  onTouch = () => {};
  onChange = (imageUrl: File | null) => {};

  constructor() { }

  removeImage(): void {
    this.image = '';
    this.onChange(null);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: string): void {}
}
