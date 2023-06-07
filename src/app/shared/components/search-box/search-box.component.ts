import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = ""

  @Output()
  public inputValue = new EventEmitter<string>()

  emitValueInput( value: string ): void {
    this.inputValue.emit( value )
  }

}
