import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject<string>()
  
  ngOnInit(): void {
    this.debouncer.pipe(
      debounceTime(400)
    )
    .subscribe( value => {
      // console.log('debouncer value', value)
      this.onDebounce.emit ( value )
    })
  }
  
  @Input()
  public placeholder: string = ""

  @Output()
  public inputValue = new EventEmitter<string>()

  @Output()
  public onDebounce = new EventEmitter<string>()

  emitValueInput( value: string ): void {
    this.inputValue.emit( value )
  }

  onKeyPress( searchTerm: string ) {
    // console.log( searchTerm )
    this.debouncer.next( searchTerm )
  }

}
