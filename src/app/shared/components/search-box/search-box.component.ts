import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSuscription?: Subscription
  
  @Input()
  public placeholder: string = ""

  @Input()
  public initialValue: string = ""

  @Output()
  public inputValue = new EventEmitter<string>()

  @Output()
  public onDebounce = new EventEmitter<string>()
  
  ngOnInit(): void {
  this.debouncerSuscription = this.debouncer.pipe(
      debounceTime(400)
    )
    .subscribe( value => {
      // console.log('debouncer value', value)
      this.onDebounce.emit ( value )
    })
  }

  ngOnDestroy(): void {
    // console.log('Destruido')
    this.debouncerSuscription?.unsubscribe()
  }

  emitValueInput( value: string ): void {
    this.inputValue.emit( value )
  }

  onKeyPress( searchTerm: string ) {
    // console.log( searchTerm )
    this.debouncer.next( searchTerm )
  }

}
