import {debounceTime, Observable, map, distinctUntilChanged, fromEvent, takeUntil} from "rxjs";

/*const search$ = new Observable<Event>(observer => {
  console.log('start in observer')
  const search = document.getElementById('search');
  const stop = document.getElementById('stop')

  if (!search) {
    observer.error('element not found')
    return
  }
  const onSearch = (event: Event | undefined) => {
    console.log(123);
    observer.next(event);

  }
  const onStop = event => {
    observer.complete();
    clearListener()
  }

  search.addEventListener('input', onSearch)
  stop.addEventListener('click', onStop)

  const clearListener = () =>{
    search.removeEventListener('input' ,onSearch)
    stop.removeEventListener('click' ,onStop)
  }
})

 */




const search$: Observable<Event> = fromEvent<Event>(
    document.getElementById('search'),
  'input'
);

const stop$: Observable<Event> = fromEvent<Event>(
  document.getElementById('stop'),
  'click'
);

const searchSubscription = search$.pipe(
  map(event => {
    return (event.target as HTMLInputElement).value
  }),
  debounceTime(1000
  ),
  map(value => value.length > 3 ? value : ''),
  distinctUntilChanged(),
  takeUntil(stop$)
).subscribe(value => {
  console.log(value)
});




