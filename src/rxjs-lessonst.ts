import {debounceTime, Observable, map, distinctUntilChanged, fromEvent} from "rxjs";


const search$ = new Observable<Event>(observer => {
  console.log('start in observer')
  const search = document.getElementById('search');

  if (!search) {
    observer.error('element not found')
    return
  }
  search.addEventListener('input', event => {
    observer.next(event)
  })
  console.log('end in observer')
})
// const search$ = fromEvent(
//   document.getElementById('search'),
//   'input');

// @ts-ignore
// const search$: Observable<Event> = fromEvent<Event>(
//     document.getElementById('search'),
//   'input'
// )

search$.pipe(
  map(event => {
    return (event.target as HTMLInputElement).value
  }),
  debounceTime(1000
  ),
  map(value => value.length > 3 ? value : ''),
  distinctUntilChanged()
).subscribe(value => {
  console.log(value)
});



